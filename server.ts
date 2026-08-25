import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let __dirname: string;
try {
  __dirname = path.dirname(fileURLToPath(import.meta.url));
} catch {
  __dirname = process.cwd();
}
// Initialize Gemini SDK lazily / safely
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Clean markdown code blocks from model JSON outputs
function cleanJsonOutput(text: string): string {
  let cleaned = text.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.substring(7);
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.substring(3);
  }
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.substring(0, cleaned.length - 3);
  }
  return cleaned.trim();
}


// Resilient Gemini generateContent caller with retry & model fallback
function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
    promise.then(
      (val) => {
        clearTimeout(timer);
        resolve(val);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
}

async function generateGeminiWithFallback(
  gemini: GoogleGenAI,
  options: {
    contents: any;
    config?: any;
  }
): Promise<{ text: string; modelUsed: string }> {
  // Models to attempt in priority order if one experiences high demand (503/429)
  const candidateModels = ["gemini-2.5-flash", "gemini-3.7-flash", "gemini-3.1-flash-lite"];
  const PER_ATTEMPT_TIMEOUT_MS = 12000; // give each try 12s max before moving on
  let lastError: any = null;

  for (const model of candidateModels) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await withTimeout(
          gemini.models.generateContent({
            model,
            contents: options.contents,
            config: options.config,
          }),
          PER_ATTEMPT_TIMEOUT_MS,
          `Gemini call (${model}, attempt ${attempt})`
        );

        if (response && response.text) {
          return { text: response.text, modelUsed: model };
        }
      } catch (err: any) {
        lastError = err;
        const errMsg = (err?.message || "").toLowerCase();
        const isRetryable =
          errMsg.includes("503") ||
          errMsg.includes("unavailable") ||
          errMsg.includes("high demand") ||
          errMsg.includes("429") ||
          errMsg.includes("resource_exhausted") ||
          errMsg.includes("timeout") ||
          errMsg.includes("econnreset");

        if (isRetryable && attempt < 2) {
          await new Promise((r) => setTimeout(r, 400));
          continue;
        }
        break; // try next candidate model
      }
    }
  }

  throw lastError || new Error("Gemini models unavailable");
}

// In-Memory persistent data stores with realistic Pakistani data
interface Appointment {
  id: string;
  lawyerId: string;
  lawyerName: string;
  citizenName: string;
  citizenPhone: string;
  citizenEmail: string;
  caseCategory: string;
  caseDescription: string;
  date: string;
  timeSlot: string;
  consultationType: "in-person" | "phone" | "video" | "chat";
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

let appointmentsStore: Appointment[] = [
  {
    id: "AAG-2026-8812",
    lawyerId: "lawyer-1",
    lawyerName: "Adv. Tariq Mahmood Chaudhry (Senior Advocate High Court)",
    citizenName: "Mohammad Usman",
    citizenPhone: "0300-1234567",
    citizenEmail: "usman.pk@example.com",
    caseCategory: "Property Law",
    caseDescription: "Illegal dispossession of residential plot in Gulberg Lahore by land grabbers.",
    date: "2026-08-25",
    timeSlot: "11:00 AM - 11:45 AM",
    consultationType: "in-person",
    status: "confirmed",
    createdAt: "2026-08-20T10:30:00.000Z",
  },
  {
    id: "AAG-2026-8819",
    lawyerId: "lawyer-2",
    lawyerName: "Adv. Ayesha Siddiqua (Advocate High Court)",
    citizenName: "Fatima Noor",
    citizenPhone: "0321-9876543",
    citizenEmail: "fatima.noor@example.com",
    caseCategory: "Family Law & Khula",
    caseDescription: "Guidance on Khula proceedings and recovery of dower/maintenance in Karachi.",
    date: "2026-08-27",
    timeSlot: "03:30 PM - 04:15 PM",
    consultationType: "video",
    status: "pending",
    createdAt: "2026-08-21T05:15:00.000Z",
  }
];

let customEmergencyContacts = [
  {
    id: "ec-custom-1",
    name: "National Commission for Human Rights (NCHR) Legal Cell",
    number: "051-9216620",
    altNumber: "0800-00011",
    category: "human-rights",
    province: "Islamabad Capital Territory",
    city: "Islamabad / Nationwide",
    description: "Official statutory commission for human rights violations, custodial abuse, and illegal detentions.",
    availability: "9:00 AM - 5:00 PM (Mon-Fri) / Helpline 24/7",
    verified: true,
  }
];

// --- Simple in-memory rate limiter (no external deps required) ---
// Buckets requests per IP per route group within a rolling time window.
function createRateLimiter(options: { windowMs: number; max: number; message: string }) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  // Periodic cleanup so the map doesn't grow unbounded
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of hits.entries()) {
      if (entry.resetAt <= now) hits.delete(key);
    }
  }, options.windowMs).unref();

  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const key = req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();
    const entry = hits.get(key);

    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + options.windowMs });
      return next();
    }

    if (entry.count >= options.max) {
      const retryAfterSec = Math.ceil((entry.resetAt - now) / 1000);
      res.setHeader("Retry-After", String(retryAfterSec));
      return res.status(429).json({ error: options.message, retryAfterSec });
    }

    entry.count += 1;
    next();
  };
}

// --- Admin authentication for write-sensitive endpoints ---
// Requires header: "x-admin-token: <ADMIN_API_TOKEN>"
// Set ADMIN_API_TOKEN in your .env — if unset, these admin routes are disabled entirely
// (fail closed) rather than left open.
function requireAdminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const configuredToken = process.env.ADMIN_API_TOKEN;

  if (!configuredToken) {
    return res.status(503).json({
      error: "Admin functionality is not configured on this server (ADMIN_API_TOKEN missing).",
    });
  }

  const providedToken = req.header("x-admin-token");
  if (!providedToken || providedToken !== configuredToken) {
    return res.status(401).json({ error: "Unauthorized: valid x-admin-token header required." });
  }

  next();
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Body size limits — the only legitimate large payload is a single profile photo,
  // so a few MB is more than enough and closes off a cheap DoS vector.
  app.use(express.json({ limit: "8mb" }));
  app.use(express.urlencoded({ limit: "8mb", extended: true }));

  // If the client sends malformed JSON (or any other body-parsing error),
  // Express's default error handler would otherwise return an HTML error
  // page. Every route on this server always does `await res.json()` on the
  // client side, so an HTML response throws a parse error there — which is
  // what was surfacing as a generic "server error" in the UI. Catch it here
  // and always respond with real JSON instead.
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err && err.type === "entity.parse.failed") {
      return res.status(400).json({ error: "Malformed JSON in request body." });
    }
    next(err);
  });

  // Rate limiters, scoped by how expensive/abusable each route group is.
  const aiRateLimiter = createRateLimiter({
    windowMs: 60 * 1000,
    max: 15, // 15 AI requests/minute/IP — protects Gemini quota & billing
    message: "Too many AI requests from this IP. Please wait a moment and try again.",
  });
  const writeRateLimiter = createRateLimiter({
    windowMs: 60 * 1000,
    max: 20, // 20 writes/minute/IP for appointments etc.
    message: "Too many requests from this IP. Please wait a moment and try again.",
  });
  const generalRateLimiter = createRateLimiter({
    windowMs: 60 * 1000,
    max: 120, // generous ceiling for normal browsing/reads
    message: "Too many requests from this IP. Please slow down.",
  });
  app.use("/api/", generalRateLimiter);

  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  app.use("/public", express.static(publicDir));

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString(), platform: "AAGAHI Legal Platform Pakistan" });
  });

  // Creator Photo Management API (Persistent on disk) — admin-only write
  app.post("/api/creator-photo", requireAdminAuth, (req, res) => {
    try {
      const { imageBase64 } = req.body;
      if (!imageBase64 || typeof imageBase64 !== "string") {
        return res.status(400).json({ error: "imageBase64 is required" });
      }

      // Extract raw base64 data
      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      const publicFilePath = path.join(publicDir, "ali-ahmad.jpg");
      fs.writeFileSync(publicFilePath, buffer);

      const altPublicFilePath = path.join(publicDir, "ali_ahmad.jpg");
      fs.writeFileSync(altPublicFilePath, buffer);

      // If dist exists, write there as well for production bundle
      const distDir = path.join(process.cwd(), "dist");
      if (fs.existsSync(distDir)) {
        fs.writeFileSync(path.join(distDir, "ali-ahmad.jpg"), buffer);
        fs.writeFileSync(path.join(distDir, "ali_ahmad.jpg"), buffer);
      }

      res.json({ success: true, url: "/ali-ahmad.jpg", message: "Photo permanently saved to disk" });
    } catch (err: any) {
      console.error("Failed to save creator photo:", err);
      res.status(500).json({ error: "Failed to save photo", message: err.message });
    }
  });

  app.get("/api/creator-photo", (req, res) => {
    const publicFilePath = path.join(publicDir, "ali-ahmad.jpg");
    if (fs.existsSync(publicFilePath)) {
      res.json({ success: true, url: "/ali-ahmad.jpg" });
    } else {
      res.json({ success: false, url: "/ali-ahmad.jpg" });
    }
  });

  // 1. Legal Problem Solver API (Gemini with Fallback)
  app.post("/api/ai/solve-problem", aiRateLimiter, async (req, res) => {
    try {
      const { problemText, category, language = "en" } = req.body;

      if (!problemText || typeof problemText !== "string") {
        return res.status(400).json({ error: "Legal problem description is required" });
      }

      const gemini = getGeminiClient();

      if (gemini) {
        const prompt = `You are the lead Pakistani Constitutional & Statutory Legal Analyst for AAGAHI (آگاہی), Pakistan's trusted legal awareness platform.
Analyze this user query based strictly on the Constitution of the Islamic Republic of Pakistan (1973), Pakistan Penal Code (PPC 1860), Code of Criminal Procedure (CrPC 1898), Muslim Family Laws Ordinance, PECA 2016, Labour laws, Consumer Protection Acts, and relevant provincial statutes.

User's legal situation/query:
"${problemText}"
${category ? `Target Category Hint: ${category}` : ""}
Requested Language: ${language} (support English, Urdu, or Roman Urdu as appropriate)

Output a strict, clean JSON object matching this exact structure:
{
  "detectedCategory": "string (e.g. Property Law / Illegal Dispossession, Criminal Law / Unlawful Arrest, Cyber Harassment / PECA, Family Law / Khula & Custody, Labour Law / Unpaid Wages, Consumer Rights, Domestic Violence)",
  "constitutionalRights": [
    {
      "article": "string (e.g. Article 10, Article 10A, Article 24, Article 25)",
      "title": "string (e.g. Safeguards as to arrest and detention)",
      "explanation": "string (plain language explanation of what this fundamental right guarantees to Pakistani citizens)"
    }
  ],
  "governingLaws": [
    {
      "actName": "string (e.g. Pakistan Penal Code 1860 / Code of Criminal Procedure 1898 / Prevention of Electronic Crimes Act 2016)",
      "sections": "string (e.g. Section 154 CrPC, Section 447 PPC, Section 20 & 24 PECA)",
      "summary": "string (clear summary of what the statutory section provides)"
    }
  ],
  "plainExplanation": "string (a friendly, easy-to-understand explanation of the legal situation without heavy jargon)",
  "stepByStepActionPlan": [
    "string (Action step 1, e.g. Preserve digital messages and screenshots without altering metadata)",
    "string (Action step 2, e.g. File written complaint with FIA Cyber Crime wing or nearest Police Station under Section 154 CrPC)",
    "string (Action step 3, e.g. Obtain formal acknowledgement receipt or Roznamcha / Daily Diary entry number)"
  ],
  "criticalPrecautions": [
    "string (e.g. Never sign blank stamp papers or admission statements under coercion)",
    "string (e.g. Demand production before a Judicial Magistrate within 24 hours of arrest under Article 10(2))"
  ],
  "whenToHireLawyer": "string (Clear guidance on when this requires immediate representation by an Advocate of High Court / Supreme Court or Bar Council registered attorney)",
  "officialHelplinesAndPortals": [
    {
      "name": "string (e.g. FIA NR3C Cyber Crime Helpline / Police Emergency / Rescue 1122 / MoHR Helpline)",
      "number": "string (e.g. 1991 / 15 / 1122 / 1099)",
      "urlOrLocation": "string (e.g. complaint.fia.gov.pk or district office)"
    }
  ],
  "disclaimer": "AAGAHI provides general public legal awareness and constitutional education. This information does not constitute a formal advocate-client relationship or replace professional legal representation before Pakistani courts."
}`;

        try {
          const { text: aiOutput } = await generateGeminiWithFallback(gemini, {
            contents: prompt,
            config: {
              responseMimeType: "application/json",
              temperature: 0.2,
            },
          });

          if (aiOutput) {
            const cleaned = cleanJsonOutput(aiOutput);
            const parsed = JSON.parse(cleaned);
            return res.json({ success: true, result: parsed, source: "gemini-ai" });
          }
        } catch (aiErr: any) {
          console.warn("Gemini solver fell back to curated Pakistani legal engine:", aiErr?.message || aiErr);
        }
      }

      // Authoritative Curated Rule-Based Pakistani Legal Knowledge Engine Fallback
      const lower = problemText.toLowerCase();
      let fallbackResult;

      if (lower.includes("arrest") || lower.includes("police") || lower.includes("thana") || lower.includes("custody") || lower.includes("fir") || lower.includes("hiraasat")) {
        fallbackResult = {
          detectedCategory: "Criminal Law & Police Powers / Unlawful Detention",
          constitutionalRights: [
            {
              article: "Article 10(1) & 10(2)",
              title: "Safeguards as to arrest and detention",
              explanation: "No person arrested shall be detained without being informed of the grounds of arrest, and every arrested citizen must be produced before a Magistrate within 24 hours (excluding travel time).",
            },
            {
              article: "Article 10A",
              title: "Right to fair trial and due process",
              explanation: "Guarantees a fair trial and transparent legal process in the determination of civil rights or criminal charges.",
            },
            {
              article: "Article 14",
              title: "Inviolability of dignity of man & privacy of home",
              explanation: "The dignity of man and, subject to law, the privacy of home, shall be inviolable. Torture for extracting evidence is unconstitutional.",
            },
          ],
          governingLaws: [
            {
              actName: "Code of Criminal Procedure (CrPC 1898)",
              sections: "Section 54, Section 61, Section 154, Section 167",
              summary: "Police cannot detain beyond 24 hours without explicit physical remand order from a Judicial Magistrate under Section 167 CrPC. A formal FIR must be recorded under Section 154.",
            },
            {
              actName: "Police Order 2002 / Police Act",
              sections: "Article 155, 156 (Penalties for vexatious arrest & misconduct)",
              summary: "Police officers engaging in unlawful confinement or torture face disciplinary proceedings and criminal charges.",
            },
          ],
          plainExplanation: "Under Pakistani law, police officers cannot arbitrarily arrest or hold you without disclosing the exact grounds of arrest. You have the absolute constitutional right to consult and be defended by a legal practitioner of your choice.",
          stepByStepActionPlan: [
            "Politely request the police officer's name, designation, badge number, and the specific FIR number or warrant.",
            "Exercise your right to inform your family, spouse, or lawyer immediately of your exact location and Thana (police station).",
            "Insist on an entry in the Roznamcha (Daily Station Diary) recording your exact arrival time.",
            "Demand medical examination if there is any apprehension of mistreatment or torture.",
            "Ensure you are brought before the Area Magistrate within 24 hours for bail or remand proceedings.",
          ],
          criticalPrecautions: [
            "Never sign or thumb-impress blank sheets of paper or prepared confessional statements in police custody.",
            "Remain calm, avoid physical confrontation or resisting lawful orders, but clearly state your intention to consult counsel.",
          ],
          whenToHireLawyer: "Immediately contact a criminal defense Advocate (High Court/District Bar) to file a Habeas Corpus petition under Section 491 CrPC if detained unlawfully, or to seek pre-arrest / post-arrest bail under Sections 497/498 CrPC.",
          officialHelplinesAndPortals: [
            { name: "Police Emergency", number: "15", urlOrLocation: "Nearest Police Station / CPO Office" },
            { name: "Ministry of Human Rights National Helpline", number: "1099", urlOrLocation: "mohr.gov.pk" },
            { name: "NCHR (National Commission for Human Rights)", number: "051-9216620", urlOrLocation: "nchr.gov.pk" },
          ],
          disclaimer: "AAGAHI provides general public legal awareness and constitutional education. For urgent criminal matters and court appearances, engage an authorized Pakistani Advocate.",
        };
      } else if (lower.includes("property") || lower.includes("occup") || lower.includes("qabza") || lower.includes("tenant") || lower.includes("land") || lower.includes("plot") || lower.includes("makan")) {
        fallbackResult = {
          detectedCategory: "Property Law & Illegal Dispossession (Qabza)",
          constitutionalRights: [
            {
              article: "Article 23",
              title: "Provision as to property",
              explanation: "Every Pakistani citizen has the constitutional right to acquire, hold, and dispose of property in any part of Pakistan.",
            },
            {
              article: "Article 24",
              title: "Protection of property rights",
              explanation: "No person shall be compulsorily deprived of their property save in accordance with law.",
            },
          ],
          governingLaws: [
            {
              actName: "Illegal Dispossession Act 2005",
              sections: "Section 3, Section 5, Section 7",
              summary: "Specially criminalizes illegal entry or unlawful occupation by property grabbers. A direct complaint lies before the Court of Session with expeditious inquiry and immediate possession restoration.",
            },
            {
              actName: "Pakistan Penal Code (PPC 1860)",
              sections: "Section 441, 447 (Criminal Trespass), Section 448 (House Trespass)",
              summary: "Punishes unlawful entry into another's property with intent to commit an offense or intimidate/annoy.",
            },
            {
              actName: "Specific Relief Act 1877",
              sections: "Section 9 (Suit by person dispossessed of immovable property)",
              summary: "Allows quick restoration of possession without proving title if filed within 6 months of wrongful eviction.",
            },
          ],
          plainExplanation: "Illegal occupation of land, residential houses, or commercial plots (commonly referred to as 'Qabza') is a severe civil and criminal offense under Pakistani law. You have strong statutory mechanisms to seek urgent eviction and criminal trial of offenders.",
          stepByStepActionPlan: [
            "Gather certified copies of your title documents: Registry / Fard Malkiat, Transfer Letter (LDA/CDA/DHA/KDA), Mutation (Inteqal), and utility bills in your name.",
            "File a formal written complaint with the Court of Session under Section 3 of the Illegal Dispossession Act 2005 through your Advocate.",
            "Simultaneously report criminal trespass at the local police station to register an FIR under PPC Section 447/448.",
            "Apply for an interim injunction / Stay Order under Order 39 Rules 1 & 2 CPC if there is an imminent threat of construction or alienating the property.",
          ],
          criticalPrecautions: [
            "Do not attempt violent physical retaliation; enforce your rights strictly through judicial and police machinery.",
            "Never hand over original deed documents or blank cheques/affidavits to unauthorized mediators.",
          ],
          whenToHireLawyer: "Hire a Civil/Property Advocate immediately to file an Illegal Dispossession Complaint before the Sessions Judge or a suit for declaration and permanent injunction.",
          officialHelplinesAndPortals: [
            { name: "Punjab Land Records Authority (PLRA) / Revenue Dept", number: "042-111-22-22-77", urlOrLocation: "punjab-zameen.gov.pk" },
            { name: "Police Emergency 15", number: "15", urlOrLocation: "Local Police Station" },
            { name: "Anti-Encroachment Cells / Ombudsman Pakistan", number: "1055", urlOrLocation: "mohtasib.gov.pk" },
          ],
          disclaimer: "AAGAHI provides general legal information. For title disputes, revenue court proceedings, or registry verification, consult an Advocate High Court.",
        };
      } else if (lower.includes("cyber") || lower.includes("blackmail") || lower.includes("harass") || lower.includes("online") || lower.includes("facebook") || lower.includes("whatsapp") || lower.includes("hack") || lower.includes("threat") || lower.includes("dhamki")) {
        fallbackResult = {
          detectedCategory: "Cyber Crime, Online Harassment & Defamation (PECA)",
          constitutionalRights: [
            {
              article: "Article 14",
              title: "Inviolability of dignity of man & privacy of home",
              explanation: "Protects personal dignity, privacy, and bodily/reputational security of every citizen from unauthorized digital invasion.",
            },
            {
              article: "Article 19",
              title: "Freedom of speech & expression",
              explanation: "Speech is protected subject to reasonable restrictions relating to decency, morality, defamation, and incitement to offenses.",
            },
          ],
          governingLaws: [
            {
              actName: "Prevention of Electronic Crimes Act (PECA 2016)",
              sections: "Section 20 (Dignity of natural person), Section 21 (Non-consensual images/videos), Section 24 (Cyberstalking)",
              summary: "Criminalizes transmitting fake/altered images, non-consensual explicit media, online harassment, and blackmail with up to 5 years imprisonment and hefty fines.",
            },
            {
              actName: "Pakistan Penal Code (PPC 1860)",
              sections: "Section 503, 506 (Criminal Intimidation), Section 499, 500 (Defamation)",
              summary: "Punishes threats of injury to person, reputation, or property.",
            },
          ],
          plainExplanation: "Under Pakistan's PECA 2016 law, nobody has the right to blackmail, threaten, stalk, or circulate private images/conversations of you on WhatsApp, Facebook, Instagram, or TikTok. The FIA National Response Centre for Cyber Crime (NR3C) is the dedicated federal investigation authority.",
          stepByStepActionPlan: [
            "Do NOT delete chat history or messages. Take clear, timestamped screenshots showing phone numbers, profile URLs, and handles.",
            "Export the WhatsApp chat log (with media) to a secure USB drive or cloud drive as forensic evidence.",
            "File an online formal complaint at the FIA Cyber Crime Complaint Portal (complaint.fia.gov.pk) or visit the nearest FIA Cyber Crime Reporting Center.",
            "If immediate physical threats exist, register an entry at the local Thana under PPC 506.",
          ],
          criticalPrecautions: [
            "Never pay ransom or submit to extortion demands; blackmailer demands invariably escalate after receiving payment.",
            "Block the harasser on social media only after preserving complete unaltered forensic screenshots.",
          ],
          whenToHireLawyer: "Consult a Cyber Crime Advocate to draft a comprehensive FIA petition, seek rapid Section 22-A CrPC directions if FIA delays registration, or file for damages under the Defamation Ordinance 2002.",
          officialHelplinesAndPortals: [
            { name: "FIA Cyber Crime Helpline", number: "1991", urlOrLocation: "complaint.fia.gov.pk" },
            { name: "Ministry of Human Rights Helpline", number: "1099", urlOrLocation: "mohr.gov.pk" },
            { name: "Digital Rights Foundation (DRF) Cyber Harassment Helpline", number: "0800-39393", urlOrLocation: "digitalrightsfoundation.pk" },
          ],
          disclaimer: "AAGAHI provides general guidance. Criminal complaints under PECA are investigated by the Federal Investigation Agency (FIA).",
        };
      } else if (lower.includes("salary") || lower.includes("job") || lower.includes("employer") || lower.includes("employee") || lower.includes("fired") || lower.includes("wage") || lower.includes("tankhwah") || lower.includes("company")) {
        fallbackResult = {
          detectedCategory: "Labour Law, Employment Rights & Withheld Wages",
          constitutionalRights: [
            {
              article: "Article 11(2) & 11(3)",
              title: "Slavery, forced labour, etc. prohibited",
              explanation: "Prohibits forced labour and child labour under the age of 14 in hazardous industrial employment.",
            },
            {
              article: "Article 37(e)",
              title: "Promotion of social justice and provision for just and humane conditions of work",
              explanation: "State policy to ensure fair remuneration, social security, and safe working conditions for Pakistani workers.",
            },
          ],
          governingLaws: [
            {
              actName: "Payment of Wages Act 1936 / Provincial Payment of Wages Acts",
              sections: "Section 5, Section 15 (Claims arising out of deductions or delay in payment)",
              summary: "Requires employers to pay wages within 7 to 10 days of the wage period. Authority under Section 15 can order payment plus statutory compensation up to 10 times the unpaid amount.",
            },
            {
              actName: "Industrial and Commercial Employment (Standing Orders) Ordinance 1968 / Provincial Industrial Relations Acts",
              sections: "Standing Order 12 (Termination of employment) & Section 25-A (Grievance petition to Labour Court)",
              summary: "Prohibits arbitrary termination without written reason. Requires one month notice or salary in lieu and payment of gratuity/provident fund.",
            },
          ],
          plainExplanation: "Pakistani labour law strictly protects workers from illegal withholding of salaries, unfair termination, and denial of terminal benefits (gratuity, provident fund, and annual leaves). You can seek recovery with financial penalties against the defaulting employer.",
          stepByStepActionPlan: [
            "Compile your employment contract, appointment letter, official emails, bank salary slips, and attendance logs.",
            "Send a formal written Legal Notice or Grievance Notice to the employer's HR / Director demanding payment within 15 days.",
            "If unpaid, file a claim before the Authority under the Payment of Wages Act (Labour Directorate in your district).",
            "For unlawful termination, file a Grievance Petition under Section 25-A before the Provincial Labour Court within statutory limitation (typically 2-3 months).",
          ],
          criticalPrecautions: [
            "Do not sign a 'Full & Final Settlement' or clearance voucher unless you have actually received all due payments in your bank account.",
            "Strictly observe the limitation deadlines for serving Grievance Notice under the Labour laws.",
          ],
          whenToHireLawyer: "Consult a Labour Law Advocate if the company refuses to pay substantial dues, gratuity, or if you wish to file a case in the Labour Court / NIRC (National Industrial Relations Commission).",
          officialHelplinesAndPortals: [
            { name: "Provincial Directorate of Labour Welfare", number: "042-99204368", urlOrLocation: "labour.punjab.gov.pk / labour.sindh.gov.pk" },
            { name: "Workers Welfare Fund / EOBI Helpline", number: "0800-36240", urlOrLocation: "eobi.gov.pk" },
          ],
          disclaimer: "AAGAHI provides general labour law information. Specific provisions may vary slightly between Punjab, Sindh, KP, and ICT labour acts.",
        };
      } else if (lower.includes("khula") || lower.includes("divorce") || lower.includes("talaq") || lower.includes("custody") || lower.includes("hazanat") || lower.includes("kharcha") || lower.includes("dower") || lower.includes("mehr") || lower.includes("maintenance") || lower.includes("marriage") || lower.includes("nikah")) {
        fallbackResult = {
          detectedCategory: "Family Law / Khula & Child Custody",
          constitutionalRights: [
            {
              article: "Article 25",
              title: "Equality of citizens",
              explanation: "All citizens, including women seeking dissolution of marriage, are equal before law and entitled to equal protection of law without discrimination.",
            },
            {
              article: "Article 35",
              title: "Protection of family",
              explanation: "The State shall protect the marriage, the family, the mother and the child, underpinning the Family Courts' welfare-of-the-child standard.",
            },
          ],
          governingLaws: [
            {
              actName: "Dissolution of Muslim Marriages Act 1939 & Family Courts Act 1964",
              sections: "Section 2 (Grounds for dissolution) & Section 5, Schedule (Family Court jurisdiction)",
              summary: "Provides Muslim women the statutory right to seek Khula (dissolution of marriage) through the Family Court, along with recovery of dower and maintenance in the same suit.",
            },
            {
              actName: "Muslim Family Laws Ordinance 1961",
              sections: "Section 9 (Maintenance)",
              summary: "Obliges a husband to maintain his wife and children; the Family Court can fix and enforce maintenance amounts, including arrears.",
            },
            {
              actName: "Guardians and Wards Act 1890",
              sections: "Section 25 (Custody / Guardianship petitions)",
              summary: "Governs child custody (Hazanat) proceedings, with the welfare of the minor as the paramount and overriding consideration for the Guardian Judge.",
            },
          ],
          plainExplanation: "A Muslim woman has an unqualified statutory right to seek Khula from the Family Court, which can be granted even without the husband's consent once reconciliation efforts fail. In the same or a connected suit, she can claim recovery of unpaid dower (Haq Mehr) and maintenance (Kharcha) for herself and her minor children.",
          stepByStepActionPlan: [
            "Gather your Nikahnama (marriage contract), including the Mehr amount and any special conditions recorded in it.",
            "File a Khula suit (and, if needed, a combined suit for dower recovery, maintenance, and custody) before the Family Court of your district through a Family Law Advocate.",
            "Attend the mandatory reconciliation proceedings before the Family Court; if reconciliation fails, the Court proceeds to decree Khula.",
            "For urgent financial relief, request the Court for interim maintenance while the main suit is pending.",
            "For custody matters, file a separate or connected Guardianship petition under the Guardians and Wards Act, focusing evidence on the child's welfare.",
          ],
          criticalPrecautions: [
            "Do not sign any document surrendering your Mehr, maintenance rights, or custody claims under pressure outside of Court.",
            "Keep certified copies of the Nikahnama, any Khula/Talaq notices, and all maintenance-related correspondence.",
          ],
          whenToHireLawyer: "Engage a Family Law Advocate to file or defend Khula, dower recovery, maintenance, and custody (Hazanat) proceedings — Family Court procedure has specific timelines and evidentiary requirements that benefit strongly from professional representation.",
          officialHelplinesAndPortals: [
            { name: "National Commission on Status of Women / MoHR Helpline", number: "1099", urlOrLocation: "mohr.gov.pk" },
            { name: "Punjab Women Helpline", number: "1043", urlOrLocation: "Provincial Women Development Department" },
            { name: "Legal Aid Society Pakistan", number: "0800-70806", urlOrLocation: "las.org.pk" },
          ],
          disclaimer: "AAGAHI provides general legal awareness. Family Court procedures and timelines require representation by a licensed Family Law Advocate.",
        };
      } else {
        // General Legal Problem Result
        fallbackResult = {
          detectedCategory: "General Pakistani Legal Guidance & Due Process",
          constitutionalRights: [
            {
              article: "Article 4",
              title: "Right of individuals to be dealt with in accordance with law",
              explanation: "To enjoy the protection of law and to be treated in accordance with law is the inalienable right of every citizen, wherever they may be, and of every other person for the time being within Pakistan.",
            },
            {
              article: "Article 10A",
              title: "Right to fair trial and due process",
              explanation: "For the determination of civil rights and obligations or in any criminal charge against him, a person shall be entitled to a fair trial and due process.",
            },
            {
              article: "Article 25",
              title: "Equality of citizens",
              explanation: "All citizens are equal before law and are entitled to equal protection of law. There shall be no discrimination on the basis of sex alone.",
            },
          ],
          governingLaws: [
            {
              actName: "Constitution of Pakistan 1973 & General Procedural Codes",
              sections: "Code of Civil Procedure (CPC 1908) & Code of Criminal Procedure (CrPC 1898)",
              summary: "Establish standard legal remedies, judicial forums, evidentiary rules, and appellate mechanisms across all Pakistani courts.",
            },
          ],
          plainExplanation: `Regarding your query ("${problemText}"), Pakistani law provides clear statutory remedies and judicial safeguards. Fundamental rights guaranteed in Part II, Chapter 1 of the Constitution protect your liberty, property, equality, and dignity.`,
          stepByStepActionPlan: [
            "Document all relevant events chronologically with dates, times, names of witnesses, and written communications.",
            "Safeguard all supporting documentary or electronic evidence in multiple copies.",
            "Determine the correct legal forum (e.g. Police Station, Family Court, Sessions Court, Consumer Protection Court, or High Court).",
            "Consult a licensed Advocate registered with the relevant Bar Council (Lahore High Court Bar, Sindh Bar, Islamabad Bar, etc.) for a case evaluation.",
          ],
          criticalPrecautions: [
            "Do not sign documents without reading and fully understanding the clauses.",
            "Always obtain a stamped receipt or diary number for any application submitted to a government agency or court.",
          ],
          whenToHireLawyer: "For any matter involving property title, court summons, criminal allegations, or substantial financial claims, retaining an Advocate of High Court is strongly advised.",
          officialHelplinesAndPortals: [
            { name: "Prime Minister's Performance Delivery Unit (Citizen Portal)", number: "1077", urlOrLocation: "citizensportal.gov.pk" },
            { name: "Ministry of Human Rights Helpline", number: "1099", urlOrLocation: "mohr.gov.pk" },
            { name: "Legal Aid Society Pakistan", number: "0800-70806", urlOrLocation: "las.org.pk" },
          ],
          disclaimer: "AAGAHI provides general legal awareness and information. It is not a substitute for formal legal representation by a licensed Pakistani Advocate.",
        };
      }

      res.json({ success: true, result: fallbackResult, source: "curated-database" });
    } catch (err: any) {
      res.status(500).json({ error: "Failed to process legal solver query", message: err.message });
    }
  });

  // 2. AAGAHI AI Assistant Chat API (Multi-turn / Freeform)
  app.post("/api/ai/chat", aiRateLimiter, async (req, res) => {
    try {
      let conversationList: Array<{ role: string; content: string }> = [];
      let latestUserMessage = "";

      if (Array.isArray(req.body.messages) && req.body.messages.length > 0) {
        conversationList = req.body.messages.map((m: any) => ({
          role: m.role || "user",
          content: m.content || m.text || "",
        }));
        latestUserMessage = conversationList[conversationList.length - 1].content || "";
      } else if (req.body.message) {
        latestUserMessage = req.body.message;
        if (Array.isArray(req.body.conversationHistory)) {
          conversationList = req.body.conversationHistory.map((m: any) => ({
            role: m.role || (m.sender === "user" ? "user" : "assistant"),
            content: m.content || m.text || "",
          }));
        }
        conversationList.push({ role: "user", content: latestUserMessage });
      } else {
        return res.status(400).json({ error: "Message or messages array is required" });
      }

      const gemini = getGeminiClient();

      if (gemini) {
        const systemInstruction = `You are "AAGAHI Assistant" (آگاہی اسسٹنٹ), an empathetic, highly knowledgeable, and legally accurate AI legal assistant dedicated to the people of Pakistan.

Core Guidelines:
1. Ground every answer in the Constitution of the Islamic Republic of Pakistan (1973), Pakistani statutory laws (PPC, CrPC, CPC, Family Courts Act, PECA, Specific Relief Act, Labour Acts, Consumer Acts), and established Pakistani legal procedures.
2. Fluently support English, Urdu (اردو), and Roman Urdu (e.g. "mujhe police ne roka hai", "mera plot qabza ho gaya hai"). Match the language of the user's inquiry.
3. Always clearly cite the specific Constitutional Article (e.g. Article 9, Article 10, Article 24) or Pakistani statutory section (e.g. Section 154 CrPC, Section 447 PPC, Section 20 PECA).
4. Provide structured, practical advice:
   - Summary of Legal Position & Relevant Articles/Sections
   - Immediate Step-by-Step Actions
   - Important Warnings / Precautions
   - Official Helpline Numbers (e.g. 15, 1122, 1991, 1099, 1043)
5. NEVER fabricate laws, citations, court decisions, or fake emergency contacts.
6. Always end with a brief legal disclaimer: "AAGAHI provides general legal awareness. For specific court proceedings or representation, please consult a licensed Pakistani Advocate."`;

        try {
          // Format conversation for Gemini
          const contents = conversationList.map((m) => ({
            role: m.role === "assistant" || m.role === "model" ? "model" : "user",
            parts: [{ text: m.content }],
          }));

          const { text: replyText } = await generateGeminiWithFallback(gemini, {
            contents: contents as any,
            config: {
              systemInstruction,
              temperature: 0.3,
            },
          });

          if (replyText) {
            return res.json({
              success: true,
              reply: replyText.trim(),
              source: "gemini-ai",
            });
          }
        } catch (aiErr: any) {
          console.warn("Gemini chat fell back to conversational legal engine:", aiErr?.message || aiErr);
        }
      }

      // Conversational Intelligent Fallback
      const text = latestUserMessage.toLowerCase();
      let reply = "";

      if (text.includes("police") || text.includes("arrest") || text.includes("roka") || text.includes("chowki") || text.includes("warrant")) {
        reply = `**Your Rights When Stopped or Questioned by Police in Pakistan:**

⚖️ **Constitutional Safeguards:**
- **Article 10(1):** You must be informed of the exact grounds for arrest immediately.
- **Article 10(2):** Police cannot detain you beyond 24 hours without producing you before a Judicial Magistrate.
- **Article 14:** Inviolability of personal dignity and privacy of home. Physical torture or coercion is strictly unconstitutional.

📋 **Recommended Steps:**
1. Politely ask the police officer for their identity, Thana (Police Station), and the FIR number.
2. Inform your immediate family or a lawyer of your location without delay.
3. Insist on a formal Roznamcha (Daily Diary) entry at the police station.
4. If unlawfully detained, your family/advocate can file a Habeas Corpus petition under **Section 491 CrPC** before the Sessions Court or High Court.

🚨 **Helplines:**
- Police Emergency: **15**
- Ministry of Human Rights: **1099**

*Disclaimer: AAGAHI provides legal awareness. For criminal charges, engage a licensed criminal defense Advocate immediately.*`;
      } else if (text.includes("property") || text.includes("qabza") || text.includes("plot") || text.includes("makan") || text.includes("tenant")) {
        reply = `**Legal Remedies for Property Disputes & Illegal Dispossession (Qabza) in Pakistan:**

⚖️ **Governing Laws:**
- **Articles 23 & 24 of Constitution:** Guarantees protection of private property rights.
- **Illegal Dispossession Act 2005 (Section 3):** Specifically punishes illegal property grabbers and empowers the Court of Session to evict encroachers and restore possession.
- **Pakistan Penal Code (Sections 447 & 448):** Criminal trespass and house-trespass.
- **Specific Relief Act 1877 (Section 9):** Fast-track suit for possession restoration.

📋 **Recommended Steps:**
1. Secure certified copies of your title registry, Inteqal (mutation), and municipal transfer letters.
2. File a criminal complaint under the Illegal Dispossession Act 2005 directly before the Sessions Judge.
3. Lodge an FIR for criminal trespass under Section 447 PPC at your local police station.
4. Obtain an interim stay order from the Civil Court (Order 39 Rules 1 & 2 CPC) to prevent unlawful construction or sale.

*Disclaimer: AAGAHI provides general legal information. For title suits and court hearings, consult an Advocate High Court.*`;
      } else if (text.includes("khula") || text.includes("divorce") || text.includes("talaq") || text.includes("custody") || text.includes("hazanat") || text.includes("kharcha") || text.includes("dower")) {
        reply = `**Family Law, Khula & Custody Rights in Pakistan:**

⚖️ **Governing Statutes:**
- **Dissolution of Muslim Marriages Act 1939** & **Family Courts Act 1964**
- **Muslim Family Laws Ordinance 1961**
- **Guardians and Wards Act 1890**

📋 **Key Legal Principles:**
1. **Right to Khula:** A Muslim woman has the legal right to seek Khula from the Family Court. Under the Family Courts Act, decree of Khula can be granted expeditiously if reconciliation fails.
2. **Maintenance (Kharcha):** The father/husband is legally obligated to maintain his minor children and wife during the subsistence of marriage.
3. **Child Custody (Hazanat):** The paramount consideration of the Guardian Court is always the **welfare of the minor child** (Hifz-e-Mata), taking into account emotional, educational, and physical well-being.
4. **Dower (Haq Mehr):** Unpaid prompt dower (Mehr Mu'ajjal) is recoverable as a debt through the Family Court.

🚨 **Women & Family Helplines:**
- National Commission on Status of Women / MoHR: **1099**
- Punjab Women Helpline: **1043**

*Disclaimer: AAGAHI provides legal awareness. Family court procedures require representation by a Family Law Advocate.*`;
      } else {
        reply = `**Assalam-o-Alaikum! Welcome to AAGAHI (آگاہی).**

Under the **Constitution of the Islamic Republic of Pakistan (1973)** and federal/provincial statutes, every citizen has guaranteed fundamental rights:

- **Article 4:** Right to be dealt with strictly in accordance with law.
- **Article 9 & 10:** Protection of life, liberty, and protection from unlawful detention.
- **Article 10A:** Right to a fair trial and due process.
- **Article 25:** Equality before law and non-discrimination.

How may I assist you today? You can describe any situation (e.g. criminal, civil, cyber crime, family, labour, property, consumer rights, or emergency helpline assistance) in **English, اردو, or Roman Urdu**.

*Disclaimer: AAGAHI provides general legal guidance and does not replace formal counsel from a licensed Pakistani Advocate.*`;
      }

      res.json({ success: true, reply, source: "curated-database" });
    } catch (err: any) {
      res.status(500).json({ error: "Failed to process chat message", message: err.message });
    }
  });

  // 3. Appointments API
  app.get("/api/appointments", (req, res) => {
    const { lawyerId, citizenEmail } = req.query;
    let list = [...appointmentsStore];
    if (lawyerId) {
      list = list.filter((a) => a.lawyerId === lawyerId);
    }
    if (citizenEmail) {
      list = list.filter((a) => a.citizenEmail.toLowerCase() === (citizenEmail as string).toLowerCase());
    }
    res.json({ success: true, appointments: list });
  });

  app.post("/api/appointments", writeRateLimiter, (req, res) => {
    const {
      lawyerId,
      lawyerName,
      citizenName,
      citizenPhone,
      citizenEmail,
      caseCategory,
      caseDescription,
      date,
      timeSlot,
      consultationType = "video",
    } = req.body;

    if (!lawyerId || !citizenName || !citizenPhone || !date || !timeSlot) {
      return res.status(400).json({ error: "Missing required appointment fields" });
    }

    const newAppointment: Appointment = {
      id: `AAG-${new Date().getFullYear()}-${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 100)}`,
      lawyerId,
      lawyerName: lawyerName || "Advocate High Court",
      citizenName,
      citizenPhone,
      citizenEmail: citizenEmail || "citizen@aagahi.pk",
      caseCategory: caseCategory || "General Legal Consultation",
      caseDescription: caseDescription || "",
      date,
      timeSlot,
      consultationType,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    appointmentsStore.unshift(newAppointment);
    res.status(201).json({ success: true, appointment: newAppointment });
  });

  app.patch("/api/appointments/:id", writeRateLimiter, (req, res) => {
    const { id } = req.params;
    const { status, date, timeSlot } = req.body;

    const index = appointmentsStore.findIndex((a) => a.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    if (status) appointmentsStore[index].status = status;
    if (date) appointmentsStore[index].date = date;
    if (timeSlot) appointmentsStore[index].timeSlot = timeSlot;

    res.json({ success: true, appointment: appointmentsStore[index] });
  });

  // 4. Custom Emergency Contacts API (Admin managed)
  app.get("/api/emergency-contacts", (req, res) => {
    res.json({ success: true, contacts: customEmergencyContacts });
  });

  // Admin-only: prevents anyone from injecting fake emergency helpline numbers
  app.post("/api/emergency-contacts", requireAdminAuth, writeRateLimiter, (req, res) => {
    const { name, number, altNumber, category, province, city, description, availability } = req.body;
    if (!name || !number || !category || !province) {
      return res.status(400).json({ error: "Missing required contact fields" });
    }

    const newContact = {
      id: `ec-custom-${Date.now()}`,
      name,
      number,
      altNumber: altNumber || "",
      category,
      province,
      city: city || "All Districts",
      description: description || "Verified institutional emergency service.",
      availability: availability || "24/7",
      verified: true,
    };

    customEmergencyContacts.unshift(newContact);
    res.status(201).json({ success: true, contact: newContact });
  });

  // 5. System Stats API
  app.get("/api/stats", (req, res) => {
    res.json({
      success: true,
      stats: {
        totalCitizensHelped: 142850,
        constitutionalArticlesIndexed: 280,
        verifiedLawyersCount: 340,
        emergencyHelplinesVerified: 85,
        avgResponseTimeSec: 1.4,
        legalGuidesCount: 24,
      },
    });
  });

  // Catch-all error handler: guarantees every response — even from a bug we
  // didn't anticipate — comes back as JSON, never Express's default HTML
  // error page (which breaks every `await res.json()` call on the frontend
  // and shows up to users as a generic "server error").
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Unhandled server error:", err);
    if (res.headersSent) return next(err);
    res.status(500).json({ error: "Unexpected server error", message: err?.message || String(err) });
  });

  // Setup Vite middleware in dev, or static in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AAGAHI Legal Platform server running on http://0.0.0.0:${PORT}`);
  });
}

// Surface anything that slips past route-level try/catch instead of letting
// the process die silently or hang in a broken state.
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection:", reason);
});

startServer().catch((err) => {
  console.error("Fatal error while starting AAGAHI server:", err);
  process.exit(1);
});
