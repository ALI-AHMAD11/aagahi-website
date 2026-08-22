export type Language = "en" | "ur";

export type ViewTab =
  | "home"
  | "solver"
  | "constitution"
  | "emergency"
  | "lawyers"
  | "guides"
  | "search"
  | "dashboard"
  | "about";

export interface ConstitutionalArticle {
  id: string;
  articleNumber: string;
  titleEn: string;
  titleUr: string;
  titleRoman?: string;
  category: "liberty" | "fair-trial" | "equality" | "property" | "speech" | "dignity" | "religion" | "education" | "welfare";
  clauseText: string;
  simpleExplanationEn: string;
  simpleExplanationUr: string;
  simpleExplanationRoman?: string;
  whoItProtects: string;
  practicalExampleEn: string;
  practicalExampleUr: string;
  officialSource: string;
  keyKeywords: string[];
}

export interface PakistaniStatute {
  id: string;
  actNameEn: string;
  actNameUr: string;
  shortCode: string;
  enactedYear: string;
  jurisdiction: "Federal" | "Punjab" | "Sindh" | "KPK" | "Balochistan" | "ICT";
  category: string;
  keySections: {
    sectionNumber: string;
    title: string;
    description: string;
    penaltyOrRemedy?: string;
  }[];
  officialReference: string;
}

export interface EmergencyContact {
  id: string;
  nameEn: string;
  nameUr: string;
  number: string;
  altNumber?: string;
  category: "police" | "rescue" | "women" | "child" | "cybercrime" | "human-rights" | "legal-aid" | "disaster" | "motorway";
  province: "All Pakistan" | "Punjab" | "Sindh" | "Khyber Pakhtunkhwa" | "Balochistan" | "Islamabad Capital Territory" | "Gilgit-Baltistan" | "Azad Kashmir";
  cityDistrict: string;
  descriptionEn: string;
  descriptionUr: string;
  availability: string;
  verifiedGovtAgency: boolean;
  tollFree?: boolean;
}

export interface Lawyer {
  id: string;
  name: string;
  nameUr: string;
  title: string; // e.g. Advocate High Court, Advocate Supreme Court
  barCouncilNumber: string;
  barAssociation: string; // e.g. Lahore High Court Bar, Sindh Bar Council, Islamabad Bar Association
  photoUrl: string;
  experienceYears: number;
  province: string;
  city: string;
  practiceAreas: string[];
  languages: string[];
  bioEn: string;
  bioUr: string;
  rating: number;
  reviewsCount: number;
  consultationFeePkr: number; // 0 for pro bono
  isProBonoAvailable: boolean;
  isVerified: boolean;
  availableSlots: {
    day: string;
    time: string;
  }[];
  consultationMethods: ("in-person" | "phone" | "video" | "chat")[];
  officeAddress: string;
}

export interface Appointment {
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

export interface LegalGuide {
  id: string;
  titleEn: string;
  titleUr: string;
  titleRoman?: string;
  category: string;
  iconName: string;
  readTimeMin: number;
  summaryEn: string;
  summaryUr: string;
  steps: {
    stepNumber: number;
    titleEn: string;
    titleUr: string;
    detailEn: string;
    detailUr: string;
    legalNote?: string;
  }[];
  criticalDoAndDonts: {
    dos: string[];
    donts: string[];
  };
  relevantArticles: string[];
  relevantActs: string[];
  helplines: { name: string; number: string }[];
}

export interface LegalProblemAnalysis {
  detectedCategory: string;
  constitutionalRights: {
    article: string;
    title: string;
    explanation: string;
  }[];
  governingLaws: {
    actName: string;
    sections: string;
    summary: string;
  }[];
  plainExplanation: string;
  stepByStepActionPlan: string[];
  criticalPrecautions: string[];
  whenToHireLawyer: string;
  officialHelplinesAndPortals: {
    name: string;
    number: string;
    urlOrLocation?: string;
  }[];
  disclaimer: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  sources?: string[];
}
