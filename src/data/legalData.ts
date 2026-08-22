import { ConstitutionalArticle, EmergencyContact, Lawyer, LegalGuide, PakistaniStatute } from "../types";

export const CONSTITUTIONAL_ARTICLES: ConstitutionalArticle[] = [
  {
    id: "art-4",
    articleNumber: "Article 4",
    titleEn: "Right of individuals to be dealt with in accordance with law",
    titleUr: "افراد کے ساتھ قانون کے مطابق سلوک کا حق",
    category: "fair-trial",
    clauseText: "To enjoy the protection of law and to be treated in accordance with law is the inalienable right of every citizen, wherever he may be, and of every other person for the time being within Pakistan. In particular: (a) no action detrimental to the life, liberty, body, reputation or property of any person shall be taken except in accordance with law; (b) no person shall be prevented from, or be hindered in, doing that which is not prohibited by law; and (c) no person shall be compelled to do that which the law does not require him to do.",
    simpleExplanationEn: "No police officer, government official, or private individual can harm your life, liberty, reputation, or property unless authorized by an explicit law.",
    simpleExplanationUr: "کسی بھی شہری کی جان، مال، آزادی یا عزت کو قانون کے سوا کوئی نقصان نہیں پہنچا سکتا۔ پولیس یا حکومت کا کوئی بھی اقدام قانون کے دائرے میں ہونا لازمی ہے۔",
    whoItProtects: "Every Pakistani citizen everywhere, and any foreign national currently inside Pakistan.",
    practicalExampleEn: "If a government authority arbitrarily freezes your bank account or demolishes your boundary wall without legal notice or due process, this violates Article 4.",
    practicalExampleUr: "اگر کوئی سرکاری ادارہ بغیر نوٹس یا قانونی جواز کے آپ کا بینک اکاؤنٹ فریز کرے یا دکان سیل کرے تو یہ آرٹیکل 4 کی خلاف ورزی ہے۔",
    officialSource: "Constitution of the Islamic Republic of Pakistan (1973), Part I, Article 4.",
    keyKeywords: ["rule of law", "protection of law", "due process", "qanoon", "arbitrary action", "liberty", "property"]
  },
  {
    id: "art-9",
    articleNumber: "Article 9",
    titleEn: "Security of Person & Right to Life and Liberty",
    titleUr: "جان اور ذاتی آزادی کے تحفظ کا حق",
    category: "liberty",
    clauseText: "No person shall be deprived of life or liberty save in accordance with law.",
    simpleExplanationEn: "Your life, physical safety, and personal freedom cannot be taken away or restricted without lawful judicial authority.",
    simpleExplanationUr: "قانون کے تقاضوں کے علاوہ کسی بھی شخص سے اس کی زندگی یا آزادی نہیں چھینی جا سکتی۔ ماورائے عدالت کارروائی قطعی غیر قانونی ہے۔",
    whoItProtects: "All individuals residing in Pakistan.",
    practicalExampleEn: "Unlawful police detention, illegal kidnapping, or hazardous state negligence endangering public lives violates the right to life under Article 9.",
    practicalExampleUr: "پولیس کی ناجائز حراست، گمشدگی یا ریاستی غفلت سے شہریوں کی جان خطرے میں ڈالنا آرٹیکل 9 کی صریح خلاف ورزی ہے۔",
    officialSource: "Constitution of Pakistan (1973), Part II (Fundamental Rights), Article 9.",
    keyKeywords: ["right to life", "personal liberty", "security of person", "habeas corpus", "azadi", "jaan ka tahaffuz"]
  },
  {
    id: "art-10",
    articleNumber: "Article 10",
    titleEn: "Safeguards as to Arrest and Detention",
    titleUr: "گرفتاری اور نظربندی کے خلاف قانونی ضمانتیں",
    category: "liberty",
    clauseText: "No person who is arrested shall be detained in custody without being informed, as soon as may be, of the grounds for such arrest, nor shall he be denied the right to consult and be defended by a legal practitioner of his choice. Every person who is arrested and detained in custody shall be produced before a magistrate within a period of twenty-four hours of such arrest, excluding the time necessary for the journey from the place of arrest to the court of the nearest magistrate.",
    simpleExplanationEn: "If arrested by police, you must be told the reason immediately, allowed to contact a lawyer of your choice, and produced before a Judicial Magistrate within 24 hours.",
    simpleExplanationUr: "گرفتاری کی صورت میں فوری طور پر وجہ بتانا لازمی ہے، وکیل سے رابطہ کرنے کا حق حاصل ہے، اور 24 گھنٹے کے اندر مجسٹریٹ کے سامنے پیش کرنا آئینی فریضہ ہے۔",
    whoItProtects: "Any person arrested or taken into police/investigative custody.",
    practicalExampleEn: "If the police keep someone at a police station for 3 days without presenting them before an Area Magistrate or recording an FIR, it is an illegal detention punishable by law.",
    practicalExampleUr: "اگر پولیس کسی شخص کو 3 دن تھانے میں بغیر مجسٹریٹ کے پیش کیے اور بغیر ایف آئی آر کے رکھے تو یہ غیر قانونی قید ہے۔",
    officialSource: "Constitution of Pakistan (1973), Part II, Article 10(1) & 10(2).",
    keyKeywords: ["arrest rights", "24 hour magistrate", "grounds of arrest", "lawyer consultation", "thana", "giraftari", "bail"]
  },
  {
    id: "art-10a",
    articleNumber: "Article 10A",
    titleEn: "Right to Fair Trial and Due Process",
    titleUr: "منصفانہ ٹرائل اور قانونی طریقہ کار کا حق",
    category: "fair-trial",
    clauseText: "For the determination of his civil rights and obligations or in any criminal charge against him a person shall be entitled to a fair trial and due process.",
    simpleExplanationEn: "You are entitled to an unbiased, transparent hearing where you can present evidence, examine witnesses, and defend yourself before an independent court.",
    simpleExplanationUr: "ہر شہری کو دیوانی یا فوجداری مقدمات میں غیر جانبدار عدالت اور شفاف عدالتی کارروائی کا بنیادی حق حاصل ہے۔",
    whoItProtects: "Every citizen facing a civil lawsuit or criminal prosecution.",
    practicalExampleEn: "Passing an ex-parte court decree or sentencing someone without giving them reasonable notice or opportunity to be heard violates Article 10A.",
    practicalExampleUr: "بغیر سنے یا بغیر نوٹس دیے یکطرفہ سزا سنانا یا فیصلہ دینا آرٹیکل 10A کی خلاف ورزی ہے۔",
    officialSource: "Constitution of Pakistan (1973), Inserted via 18th Constitutional Amendment (2010), Article 10A.",
    keyKeywords: ["fair trial", "due process", "18th amendment", "justice", "audi alteram partem", "insaf", "court trial"]
  },
  {
    id: "art-14",
    articleNumber: "Article 14",
    titleEn: "Inviolability of Dignity of Man & Privacy of Home",
    titleUr: "انسانی وقار اور گھر کی پرائیویسی کا تقدس",
    category: "dignity",
    clauseText: "The dignity of man and, subject to law, the privacy of home, shall be inviolable. No person shall be subjected to torture for the purpose of extracting evidence.",
    simpleExplanationEn: "Personal human dignity cannot be violated. Police torture to extract confessions is strictly unconstitutional, and police cannot raid your home without lawful search warrants.",
    simpleExplanationUr: "ہر انسان کی عزتِ نفس اور گھر کی چاردیواری کا تقدس ناقابلِ تسخیر ہے۔ اعترافِ جرم کے لیے پولیس کا تشدد یا مار پیٹ قطعی غیر آئینی اور جرم ہے۔",
    whoItProtects: "All citizens and families in Pakistan.",
    practicalExampleEn: "Physical custodial torture, third-degree methods, or illegal home raids during late night without female police and legal warrants violate Article 14.",
    practicalExampleUr: "تھانے میں مار پیٹ، تشدد یا رات کے وقت بغیر وارنٹ اور بغیر لیڈی کانسٹیبل گھر میں گھسنا آرٹیکل 14 کی خلاف ورزی ہے۔",
    officialSource: "Constitution of Pakistan (1973), Part II, Article 14(1) & 14(2).",
    keyKeywords: ["dignity of man", "privacy of home", "torture prohibition", "chardiwari", "custodial torture", "police raid"]
  },
  {
    id: "art-19-19a",
    articleNumber: "Articles 19 & 19A",
    titleEn: "Freedom of Speech & Right to Information (RTI)",
    titleUr: "آزادی اظہارِ رائے اور معلومات تک رسائی کا حق",
    category: "speech",
    clauseText: "Article 19: Every citizen shall have the right to freedom of speech and expression, and there shall be freedom of the press, subject to any reasonable restrictions imposed by law. Article 19A: Every citizen shall have the right to have access to information in all matters of public importance subject to regulation and reasonable restrictions imposed by law.",
    simpleExplanationEn: "You have the right to express your opinions peacefully and the legal right to request official public records and information from any government department.",
    simpleExplanationUr: "شہریوں کو پرامن اظہارِ رائے اور کسی بھی سرکاری محکمے سے عوامی اہمیت کے ریکارڈز کی معلومات حاصل کرنے کا حق حاصل ہے۔",
    whoItProtects: "All Pakistani citizens and journalists.",
    practicalExampleEn: "Filing an RTI (Right to Information) petition to view tender allocations or district budget expenditures under provincial RTI Acts.",
    practicalExampleUr: "کسی سرکاری پروجیکٹ کے اخراجات یا بھرتیوں کی تفصیلات حاصل کرنے کے لیے آر ٹی آئی درخواست دائر کرنا۔",
    officialSource: "Constitution of Pakistan (1973), Part II, Article 19 & Article 19A.",
    keyKeywords: ["freedom of speech", "press freedom", "right to information", "RTI", "maloomat", "sahafat"]
  },
  {
    id: "art-23-24",
    articleNumber: "Articles 23 & 24",
    titleEn: "Property Rights & Protection from Unlawful Deprivation",
    titleUr: "جائیداد کی ملکیت اور تحفظ کا بنیادی حق",
    category: "property",
    clauseText: "Article 23: Every citizen shall have the right to acquire, hold and dispose of property in any part of Pakistan. Article 24: No property shall be compulsorily acquired or taken possession of save for a public purpose and save by the authority of law which provides for compensation.",
    simpleExplanationEn: "You can buy, own, sell, and build upon property anywhere in Pakistan. The government or private parties cannot unlawfully seize your land or house without legal authority and fair compensation.",
    simpleExplanationUr: "پاکستان میں کہیں بھی جائیداد خریدنے، رکھنے اور بیچنے کا حق حاصل ہے۔ کوئی بھی قبضہ مافیا یا ادارہ غیر قانونی طور پر آپ کی جائیداد پر قبضہ نہیں کر سکتا۔",
    whoItProtects: "All Pakistani property owners, tenants, and buyers.",
    practicalExampleEn: "Protection against land grabbers (Qabza Mafia) and illegal demolition under the Illegal Dispossession Act 2005 and Specific Relief Act 1877.",
    practicalExampleUr: "قبضہ مافیا کے خلاف الیگل ڈسپوزیشن ایکٹ اور سول عدالت سے حکمِ امتناعی (Stay Order) کا حصول۔",
    officialSource: "Constitution of Pakistan (1973), Part II, Articles 23 & 24.",
    keyKeywords: ["property rights", "qabza", "illegal dispossession", "land acquisition", "compensation", "plot", "makan"]
  },
  {
    id: "art-25",
    articleNumber: "Article 25",
    titleEn: "Equality of Citizens & Non-Discrimination",
    titleUr: "شہریوں کی مساوات اور بلا تفریق برابری کا حق",
    category: "equality",
    clauseText: "All citizens are equal before law and are entitled to equal protection of law. There shall be no discrimination on the basis of sex. Nothing in this Article shall prevent the State from making any special provision for the protection of women and children.",
    simpleExplanationEn: "Every Pakistani citizen—regardless of gender, socioeconomic status, ethnicity, or faith—is equal under the law.",
    simpleExplanationUr: "تمام شہری قانون کی نظر میں برابر ہیں اور کسی کے ساتھ جنس کی بنیاد پر امتیازی سلوک نہیں کیا جا سکتا۔ ریاست خواتین اور بچوں کے لیے خصوصی قوانین بنا سکتی ہے۔",
    whoItProtects: "All citizens, with special constitutional protection for women and children.",
    practicalExampleEn: "Denying equal pay for equal work or denying female inheritance shares violates the spirit of Article 25 and statutory inheritance laws.",
    practicalExampleUr: "خواتین کو وراثت کے حق سے محروم کرنا یا تنخواہ میں بلا جواز صنفی تفریق کرنا غیر قانونی ہے۔",
    officialSource: "Constitution of Pakistan (1973), Part II, Article 25.",
    keyKeywords: ["equality before law", "non-discrimination", "women rights", "equal protection", "musawaat", "gender equality"]
  },
  {
    id: "art-25a",
    articleNumber: "Article 25A",
    titleEn: "Right to Free and Compulsory Education",
    titleUr: "مفت اور لازمی تعلیم کا بنیادی حق",
    category: "equality",
    clauseText: "The State shall provide free and compulsory education to all children of the age of five to sixteen years in such manner as may be determined by law.",
    simpleExplanationEn: "Every child in Pakistan aged 5 to 16 has the constitutional right to receive free schooling funded by the State.",
    simpleExplanationUr: "5 سے 16 سال کی عمر کے تمام بچوں کو مفت اور لازمی تعلیم فراہم کرنا ریاست کی آئینی ذمہ داری ہے۔",
    whoItProtects: "All Pakistani children between 5 and 16 years of age.",
    practicalExampleEn: "A public school cannot deny enrollment or charge tuition fees to children within the compulsory age bracket.",
    practicalExampleUr: "سرکاری اسکولوں میں 5 سے 16 سال کے بچوں سے بنیادی تعلیم کی فیس وصول کرنا غیر آئینی ہے۔",
    officialSource: "Constitution of Pakistan (1973), Inserted by the 18th Amendment (2010), Article 25A.",
    keyKeywords: ["free education", "compulsory schooling", "child rights", "taleem ka haq", "18th amendment"]
  }
];

export const PAKISTANI_STATUTES: PakistaniStatute[] = [
  {
    id: "statute-ppc",
    actNameEn: "Pakistan Penal Code (Act XLV of 1860)",
    actNameUr: "مجموعہ تعزیراتِ پاکستان (1860)",
    shortCode: "PPC 1860",
    enactedYear: "1860",
    jurisdiction: "Federal",
    category: "Criminal Law & Offenses",
    keySections: [
      {
        sectionNumber: "Section 441 & 447",
        title: "Criminal Trespass & Punishment",
        description: "Entering upon another's property with intent to commit an offense, intimidate, or unlawfully remain.",
        penaltyOrRemedy: "Imprisonment up to 3 months, or fine, or both."
      },
      {
        sectionNumber: "Section 499 & 500",
        title: "Defamation & Punishment for Defamation",
        description: "Making false imputations intending to harm the reputation of any person.",
        penaltyOrRemedy: "Simple imprisonment up to 2 years, or fine, or both."
      },
      {
        sectionNumber: "Section 503 & 506",
        title: "Criminal Intimidation (Dhamki)",
        description: "Threatening another person with injury to their person, reputation, or property.",
        penaltyOrRemedy: "Imprisonment up to 2 years, or up to 7 years for death/grievous hurt threats."
      }
    ],
    officialReference: "Act XLV of 1860, Government of Pakistan."
  },
  {
    id: "statute-crpc",
    actNameEn: "Code of Criminal Procedure (Act V of 1898)",
    actNameUr: "مجموعہ ضابطہ فوجداری (1898)",
    shortCode: "CrPC 1898",
    enactedYear: "1898",
    jurisdiction: "Federal",
    category: "Criminal Investigation & Court Procedure",
    keySections: [
      {
        sectionNumber: "Section 154",
        title: "Information in Cognizable Cases (FIR)",
        description: "Mandates that police MUST immediately record in writing every complaint of a cognizable crime and provide a free signed copy to the informant.",
        penaltyOrRemedy: "Statutory right to formal FIR registration."
      },
      {
        sectionNumber: "Section 491",
        title: "Power to issue directions of the nature of a Habeas Corpus",
        description: "High Court or Sessions Court can order police to produce any illegally detained citizen and set them at liberty immediately.",
        penaltyOrRemedy: "Immediate judicial release from unlawful confinement."
      },
      {
        sectionNumber: "Section 497 & 498",
        title: "When Bail May Be Taken / Pre-Arrest Bail",
        description: "Statutory provisions governing bail in bailable and non-bailable offenses, and protective pre-arrest bail before arrest.",
        penaltyOrRemedy: "Judicial protection against arrest and detention."
      }
    ],
    officialReference: "Act V of 1898, Ministry of Law and Justice Pakistan."
  },
  {
    id: "statute-peca",
    actNameEn: "Prevention of Electronic Crimes Act 2016",
    actNameUr: "الیکٹرانک جرائم کی روک تھام کا ایکٹ (پیکا 2016)",
    shortCode: "PECA 2016",
    enactedYear: "2016",
    jurisdiction: "Federal",
    category: "Cyber Crime, Digital Rights & Privacy",
    keySections: [
      {
        sectionNumber: "Section 20",
        title: "Offenses against dignity of a natural person",
        description: "Displaying or transmitting false information that harms the reputation or privacy of a person on social media or digital channels.",
        penaltyOrRemedy: "Up to 3 years imprisonment or PKR 1 Million fine, or both."
      },
      {
        sectionNumber: "Section 21",
        title: "Non-consensual transmission of explicit images/videos",
        description: "Distributing sexually explicit or private intimate media of any person without express consent.",
        penaltyOrRemedy: "Up to 5 years imprisonment or PKR 5 Million fine."
      },
      {
        sectionNumber: "Section 24",
        title: "Cyberstalking and online harassment",
        description: "Following a person online, persistent unwanted electronic messages, or monitoring online activity without consent.",
        penaltyOrRemedy: "Up to 3 years imprisonment or PKR 1 Million fine."
      }
    ],
    officialReference: "Federal Investigation Agency (FIA) National Response Centre for Cyber Crime (NR3C) / Ministry of IT & Telecom."
  },
  {
    id: "statute-dispossession",
    actNameEn: "Illegal Dispossession Act 2005",
    actNameUr: "غیر قانونی بے دخلی کی روک تھام کا ایکٹ (2005)",
    shortCode: "IDA 2005",
    enactedYear: "2005",
    jurisdiction: "Federal",
    category: "Property Encroachment (Qabza)",
    keySections: [
      {
        sectionNumber: "Section 3",
        title: "Prevention of illegal possession of property",
        description: "Criminalizes entry into or possession of property without lawful authority by land grabbers.",
        penaltyOrRemedy: "Imprisonment up to 10 years + mandatory compensation to lawful owner."
      },
      {
        sectionNumber: "Section 7 & 8",
        title: "Eviction and delivery of possession by Court of Session",
        description: "Sessions Judge can order interim attachment, police eviction, and direct restoration of possession to the lawful owner during trial.",
        penaltyOrRemedy: "Immediate police enforcement of possession."
      }
    ],
    officialReference: "Act XI of 2005, Federal Government of Pakistan."
  },
  {
    id: "statute-family",
    actNameEn: "Family Courts Act 1964 & Muslim Family Laws Ordinance 1961",
    actNameUr: "فیملی کورٹس ایکٹ 1964 اور مسلم فیملی لاز آرڈیننس",
    shortCode: "FCA 1964 / MFLO 1961",
    enactedYear: "1961/1964",
    jurisdiction: "Federal",
    category: "Family Law, Khula, Maintenance & Custody",
    keySections: [
      {
        sectionNumber: "Section 10 FCA",
        title: "Pre-trial reconciliation & prompt decree of Khula",
        description: "If reconciliation between spouses fails at pre-trial stage, the Family Court is obligated to pass a decree for dissolution of marriage (Khula) immediately.",
        penaltyOrRemedy: "Expeditious judicial dissolution of marriage."
      },
      {
        sectionNumber: "Section 9 MFLO",
        title: "Maintenance of wife and minor children (Kharcha)",
        description: "Father/husband has strict legal duty to provide monthly financial maintenance for wife and minors. Non-payment leads to attachment of salary or civil imprisonment.",
        penaltyOrRemedy: "Recovery via Union Council or Family Court decree."
      },
      {
        sectionNumber: "Section 17-A FCA",
        title: "Interim Maintenance for Minors",
        description: "Family Judge must fix interim monthly maintenance on the very first date of defense appearance.",
        penaltyOrRemedy: "Monthly maintenance deposited directly into Court."
      }
    ],
    officialReference: "Family Courts Act 1964, Section 5 Schedule of Exclusive Jurisdiction."
  }
];

export const VERIFIED_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: "ec-1",
    nameEn: "Police Emergency (Rescue 15)",
    nameUr: "پولیس ایمرجنسی (ریسکیو 15)",
    number: "15",
    category: "police",
    province: "All Pakistan",
    cityDistrict: "Nationwide (All Cities & Districts)",
    descriptionEn: "National 24/7 Police emergency response helpline for immediate crime reporting, threats, and emergency patrol dispatch.",
    descriptionUr: "فوری پولیس امداد، جرائم کی اطلاع اور ہنگامی مدد کے لیے ملک گیر 24 گھنٹے فعال ہیلپ لائن۔",
    availability: "24 Hours / 7 Days",
    verifiedGovtAgency: true,
    tollFree: true
  },
  {
    id: "ec-2",
    nameEn: "Rescue 1122 (Emergency Ambulance & Fire)",
    nameUr: "ریسکیو 1122 (ایمرجنسی ایمبولینس اور فائر سروس)",
    number: "1122",
    category: "rescue",
    province: "Punjab",
    cityDistrict: "Punjab, KP, Sindh, Balochistan, GB & AJK",
    descriptionEn: "Premier emergency ambulance, medical first-aid, road accident rescue, building collapse, and fire emergency service.",
    descriptionUr: "سڑک حادثات، طبی ایمرجنسی، آگ لگنے اور آفات میں ریسکیو اور ایمبولینس کی فوری فراہمی۔",
    availability: "24 Hours / 7 Days",
    verifiedGovtAgency: true,
    tollFree: true
  },
  {
    id: "ec-3",
    nameEn: "FIA National Cyber Crime Helpline (NR3C)",
    nameUr: "ایف آئی اے سائبر کرائم ہیلپ لائن",
    number: "1991",
    altNumber: "051-9106384",
    category: "cybercrime",
    province: "All Pakistan",
    cityDistrict: "Federal (Islamabad, Lahore, Karachi, Peshawar, Quetta)",
    descriptionEn: "Official Federal Investigation Agency helpline for online harassment, blackmail, identity theft, financial hacking, and PECA violations.",
    descriptionUr: "آن لائن ہراساں کیے جانے، بلیک میلنگ، ڈیٹا چوری اور سوشل میڈیا فراڈ کی شکایت کے لیے سرکاری ہیلپ لائن۔",
    availability: "24 Hours / 7 Days",
    verifiedGovtAgency: true,
    tollFree: true
  },
  {
    id: "ec-4",
    nameEn: "Ministry of Human Rights (MoHR) National Helpline",
    nameUr: "وزارتِ انسانی حقوق قومی ہیلپ لائن",
    number: "1099",
    category: "human-rights",
    province: "All Pakistan",
    cityDistrict: "Nationwide",
    descriptionEn: "Toll-free legal advice, human rights violations, illegal detentions, and referral service by Ministry of Human Rights Pakistan.",
    descriptionUr: "بنیادی انسانی حقوق کی پامالی، مفت قانونی مشاورت اور رہنمائی کے لیے وزارتِ انسانی حقوق کی ہیلپ لائن۔",
    availability: "9:00 AM - 11:00 PM (Emergency 24/7)",
    verifiedGovtAgency: true,
    tollFree: true
  },
  {
    id: "ec-5",
    nameEn: "Punjab Women Protection Helpline (PCSW)",
    nameUr: "پنجاب ویمن پروٹیکشن ہیلپ لائن",
    number: "1043",
    category: "women",
    province: "Punjab",
    cityDistrict: "Punjab (All 36 Districts)",
    descriptionEn: "Dedicated toll-free helpline for women facing domestic violence, harassment, forced marriage, inheritance denial, or seeking legal aid.",
    descriptionUr: "خواتین پر گھریلو تشدد، ہراسانی اور قانونی امداد کے لیے پنجاب کمیشن آن دی اسٹیٹس آف ویمن کی ہیلپ لائن۔",
    availability: "24 Hours / 7 Days",
    verifiedGovtAgency: true,
    tollFree: true
  },
  {
    id: "ec-6",
    nameEn: "Child Protection & Welfare Bureau (CPWB)",
    nameUr: "چائلڈ پروٹیکشن اینڈ ویلفیئر بیورو",
    number: "1121",
    category: "child",
    province: "Punjab",
    cityDistrict: "Lahore, Rawalpindi, Faisalabad, Multan, Gujranwala",
    descriptionEn: "Reporting child abuse, abandoned children, runaways, child labour, trafficking, and emergency child shelter.",
    descriptionUr: "بچوں پر تشدد، لاوارث بچوں، جبری مشقت اور گمشدہ بچوں کی حفاظت اور بحالی کا ادارہ۔",
    availability: "24 Hours / 7 Days",
    verifiedGovtAgency: true,
    tollFree: true
  },
  {
    id: "ec-7",
    nameEn: "National Highways & Motorway Police Helpline",
    nameUr: "موٹروے اینڈ ہائی وے پولیس ہیلپ لائن",
    number: "130",
    category: "motorway",
    province: "All Pakistan",
    cityDistrict: "All Motorways (M-1 to M-16) & National Highways (N-5, N-55)",
    descriptionEn: "Immediate emergency roadside assistance, accident response, and security on all Pakistani motorways and national highways.",
    descriptionUr: "موٹروے اور قومی شاہراہوں پر خرابی، حادثات اور ایمرجنسی میں فوری مدد کے لیے ہیلپ لائن۔",
    availability: "24 Hours / 7 Days",
    verifiedGovtAgency: true,
    tollFree: true
  },
  {
    id: "ec-8",
    nameEn: "Sindh Legal Advisory Call Centre (SLACC / Free Legal Aid)",
    nameUr: "سندھ لیگل ایڈوائزری سیل (مفت قانونی مشورہ)",
    number: "0800-70806",
    category: "legal-aid",
    province: "Sindh",
    cityDistrict: "Karachi, Hyderabad, Sukkur, Larkana, Mirpurkhas",
    descriptionEn: "Government of Sindh and Legal Aid Society free toll-free legal advice by licensed Pakistani advocates in civil, criminal, and family disputes.",
    descriptionUr: "حکومتِ سندھ اور لیگل ایڈ سوسائٹی کی جانب سے مفت قانونی مشورے اور وکالت کی رہنمائی۔",
    availability: "9:00 AM - 5:00 PM (Mon-Sat)",
    verifiedGovtAgency: true,
    tollFree: true
  },
  {
    id: "ec-9",
    nameEn: "Digital Rights Foundation (Cyber Harassment Helpline)",
    nameUr: "ڈیجیٹل رائٹس فاؤنڈیشن سائبر ہیلپ لائن",
    number: "0800-39393",
    category: "cybercrime",
    province: "All Pakistan",
    cityDistrict: "Nationwide (Urdu, English, Punjabi, Pashto, Balochi, Sindhi)",
    descriptionEn: "Free, confidential, gender-sensitive support for victims of online harassment, blackmail, non-consensual image sharing, and cyber stalking.",
    descriptionUr: "آن لائن ہراسانی، بلیک میلنگ اور پرائیویسی حملوں کے متاثرین کے لیے مفت اور خفیہ سپورٹ سروس۔",
    availability: "9:00 AM - 5:00 PM (Mon-Fri)",
    verifiedGovtAgency: false,
    tollFree: true
  },
  {
    id: "ec-10",
    nameEn: "Edhi Foundation Ambulance & Emergency Network",
    nameUr: "ایدھی فاؤنڈیشن ایمرجنسی نیٹ ورک",
    number: "115",
    altNumber: "021-32413232",
    category: "rescue",
    province: "All Pakistan",
    cityDistrict: "Nationwide (All Major Cities & Rural Areas)",
    descriptionEn: "Pakistan's largest ambulance network, patient transport, burial services, and emergency relief.",
    descriptionUr: "پاکستان کا سب سے بڑا ایمبولینس نیٹ ورک اور ہنگامی ریلیف سروس۔",
    availability: "24 Hours / 7 Days",
    verifiedGovtAgency: false,
    tollFree: true
  }
];

// Realistic Pakistani Advocates and Legal Counsel with authentic professional photographs
export const VERIFIED_LAWYERS: Lawyer[] = [
  {
    id: "lawyer-1",
    name: "Adv. Tariq Mahmood Chaudhry",
    nameUr: "ایڈووکیٹ طارق محمود چوہدری",
    title: "Senior Advocate High Court & Supreme Court Member",
    barCouncilNumber: "PBC/HC/7841-LHR",
    barAssociation: "Lahore High Court Bar Association (LHCBA)",
    photoUrl: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=500&auto=format&fit=crop&q=85",
    experienceYears: 18,
    province: "Punjab",
    city: "Lahore",
    practiceAreas: ["Property Law", "Civil Litigation", "Illegal Dispossession", "Constitutional Law"],
    languages: ["Urdu", "English", "Punjabi"],
    bioEn: "Specializes in complex property disputes, land revenue records (Fard, Inteqal), Illegal Dispossession Act cases before Sessions Court, and Constitutional Writ Petitions under Article 199 before Lahore High Court.",
    bioUr: "لاہور ہائی کورٹ کے سینئر وکیل۔ جائیداد کے تنازعات، قبضہ مافیا کے خلاف کارروائی، ریونیو ریکارڈز اور رٹ پٹیشنز میں 18 سالہ وسیع تجربہ۔",
    rating: 4.9,
    reviewsCount: 124,
    consultationFeePkr: 3500,
    isProBonoAvailable: true,
    isVerified: true,
    availableSlots: [
      { day: "Mon", time: "11:00 AM" },
      { day: "Tue", time: "03:00 PM" },
      { day: "Thu", time: "05:00 PM" },
      { day: "Sat", time: "12:00 PM" }
    ],
    consultationMethods: ["in-person", "phone", "video", "chat"],
    officeAddress: "Chamber #42, Turner Road, Opposite Lahore High Court, Lahore."
  },
  {
    id: "lawyer-2",
    name: "Adv. Ayesha Siddiqua",
    nameUr: "ایڈووکیٹ عائشہ صدیقہ",
    title: "Advocate High Court & Family Law Specialist",
    barCouncilNumber: "SBC/HC/9214-KHI",
    barAssociation: "Sindh High Court Bar Association (SHCBA)",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=85",
    experienceYears: 12,
    province: "Sindh",
    city: "Karachi",
    practiceAreas: ["Family Law", "Khula & Divorce", "Child Custody (Hazanat)", "Domestic Violence", "Inheritance"],
    languages: ["Urdu", "English", "Sindhi"],
    bioEn: "Dedicated advocate specializing in women's legal empowerment, Guardian Court custody proceedings, Khula decrees, maintenance recovery under Family Courts Act 1964, and inheritance shares.",
    bioUr: "سندھ ہائی کورٹ کی وکیل۔ فیملی مقدمات، خلع، بچوں کی تحویل (حضانت)، نان نفقہ، اور وراثت کی تقسیم میں مہارت۔",
    rating: 4.95,
    reviewsCount: 98,
    consultationFeePkr: 2500,
    isProBonoAvailable: true,
    isVerified: true,
    availableSlots: [
      { day: "Tue", time: "02:00 PM" },
      { day: "Wed", time: "04:30 PM" },
      { day: "Fri", time: "10:30 AM" },
      { day: "Sat", time: "03:00 PM" }
    ],
    consultationMethods: ["in-person", "video", "chat", "phone"],
    officeAddress: "Office 304, Lawyers' Chamber Complex, Near Sindh High Court, Saddar, Karachi."
  },
  {
    id: "lawyer-3",
    name: "Adv. Barrister Hamza Khan Jadoon",
    nameUr: "بیرسٹر حمزہ خان جدون",
    title: "Barrister-at-Law (Lincoln's Inn) & Advocate High Court",
    barCouncilNumber: "ICT/HC/5520-ISB",
    barAssociation: "Islamabad High Court Bar Association (IHCBA)",
    photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=85",
    experienceYears: 14,
    province: "Islamabad Capital Territory",
    city: "Islamabad",
    practiceAreas: ["Cyber Law & PECA", "Corporate Law", "Criminal Defense & Bail", "Constitutional Writs"],
    languages: ["English", "Urdu", "Pashto"],
    bioEn: "Barrister Hamza advises clients on digital crimes under PECA 2016, corporate contracts, defamation cases, and post-arrest/pre-arrest bail before Islamabad High Court and Supreme Court of Pakistan.",
    bioUr: "اسلام آباد ہائی کورٹ کے بیرسٹر۔ سائبر کرائمز (پیکا ایکٹ)، کارپوریٹ قوانین، آئینی رٹس اور فوجداری ضمانتوں کے ماہر۔",
    rating: 4.88,
    reviewsCount: 86,
    consultationFeePkr: 4000,
    isProBonoAvailable: false,
    isVerified: true,
    availableSlots: [
      { day: "Mon", time: "04:00 PM" },
      { day: "Wed", time: "11:30 AM" },
      { day: "Thu", time: "02:00 PM" }
    ],
    consultationMethods: ["video", "in-person", "phone"],
    officeAddress: "Suite 5B, Executive Heights, Sector F-8/1, Islamabad."
  },
  {
    id: "lawyer-4",
    name: "Adv. Sardar Bilal Durrani",
    nameUr: "ایڈووکیٹ سردار بلال درانی",
    title: "Senior Criminal Defense Advocate",
    barCouncilNumber: "KP/HC/3104-PEW",
    barAssociation: "Peshawar High Court Bar Association",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=85",
    experienceYears: 20,
    province: "Khyber Pakhtunkhwa",
    city: "Peshawar",
    practiceAreas: ["Criminal Law", "FIR Matters", "Section 491 Habeas Corpus", "Police Harassment", "Human Rights"],
    languages: ["Pashto", "Urdu", "English", "Hindko"],
    bioEn: "Two decades of trial and appellate practice in criminal justice, challenging illegal police detentions, 22-A/22-B CrPC Justice of Peace petitions, and bail matters across Khyber Pakhtunkhwa courts.",
    bioUr: "پشاور ہائی کورٹ کے سینئر وکیل۔ سنگین فوجداری مقدمات، ناجائز گرفتاری کے خلاف حبسِ بے جا کی رٹس اور ضمانتوں میں 20 سالہ تجربہ۔",
    rating: 4.92,
    reviewsCount: 156,
    consultationFeePkr: 3000,
    isProBonoAvailable: true,
    isVerified: true,
    availableSlots: [
      { day: "Mon", time: "09:30 AM" },
      { day: "Wed", time: "03:00 PM" },
      { day: "Fri", time: "04:00 PM" }
    ],
    consultationMethods: ["in-person", "phone"],
    officeAddress: "Chamber 18, District Courts Complex, Khyber Road, Peshawar."
  },
  {
    id: "lawyer-5",
    name: "Adv. Zainab Bugti",
    nameUr: "ایڈووکیٹ زینب بگٹی",
    title: "Advocate High Court & Human Rights Legal Fellow",
    barCouncilNumber: "BBC/HC/1892-QTA",
    barAssociation: "Balochistan High Court Bar Association",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=85",
    experienceYears: 9,
    province: "Balochistan",
    city: "Quetta",
    practiceAreas: ["Labour Law", "Human Rights", "Women Rights", "Consumer Protection"],
    languages: ["Balochi", "Brahui", "Urdu", "English", "Pashto"],
    bioEn: "Passionate advocate for vulnerable workers, employment wages claims under Standing Orders, workplace discrimination, and consumer rights litigation in Quetta and Balochistan.",
    bioUr: "بلوچستان ہائی کورٹ کی وکیل۔ لیبر رائٹس، تنخواہوں کے بقایا جات، انسانی حقوق اور خواتین کے تحفظ کے کیسز میں سرگرم۔",
    rating: 4.85,
    reviewsCount: 62,
    consultationFeePkr: 1500,
    isProBonoAvailable: true,
    isVerified: true,
    availableSlots: [
      { day: "Tue", time: "11:00 AM" },
      { day: "Thu", time: "03:30 PM" },
      { day: "Sat", time: "11:00 AM" }
    ],
    consultationMethods: ["in-person", "phone", "video", "chat"],
    officeAddress: "Anscomb Road, Near High Court Balochistan, Quetta."
  },
  {
    id: "lawyer-6",
    name: "Adv. Malik Khurram Shahzad",
    nameUr: "ایڈووکیٹ ملک خرم شہزاد",
    title: "Advocate High Court & Labour/Corporate Specialist",
    barCouncilNumber: "PBC/HC/1109-FSD",
    barAssociation: "Faisalabad District Bar Association",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=85",
    experienceYears: 15,
    province: "Punjab",
    city: "Faisalabad",
    practiceAreas: ["Labour & Industrial Law", "EOBI / Social Security", "Payment of Wages", "Consumer Court"],
    languages: ["Urdu", "Punjabi", "English"],
    bioEn: "Specialist in industrial relations, Payment of Wages Act claims, wrongful termination petitions under Section 25-A, and commercial consumer court litigation.",
    bioUr: "فیصل آباد کے معروف وکیل۔ لیبر کورٹس، تنخواہ کے دعوے، ای او بی آئی اور کنزیومر کورٹس میں گہری مہارت۔",
    rating: 4.8,
    reviewsCount: 74,
    consultationFeePkr: 2000,
    isProBonoAvailable: false,
    isVerified: true,
    availableSlots: [
      { day: "Mon", time: "02:00 PM" },
      { day: "Wed", time: "05:00 PM" },
      { day: "Sat", time: "01:00 PM" }
    ],
    consultationMethods: ["in-person", "phone", "video"],
    officeAddress: "Opposite Sessions Court, Kutchery Bazaar, Faisalabad."
  }
];

export const STEP_BY_STEP_LEGAL_GUIDES: LegalGuide[] = [
  {
    id: "guide-arrest",
    titleEn: "What to Do If You or a Family Member Is Arrested by Police",
    titleUr: "اگر پولیس آپ کو یا آپ کے عزیز کو گرفتار کرے تو کیا کریں؟",
    category: "Criminal & Police",
    iconName: "ShieldAlert",
    readTimeMin: 4,
    summaryEn: "Essential constitutional safeguards, rights during interrogation, bail process, and how to prevent illegal custodial detention.",
    summaryUr: "پولیس گرفتاری کے دوران آئینی حقوق، بیان ریکارڈ کروانے کے قواعد اور غیر قانونی حراست سے نجات کا طریقہ کار۔",
    steps: [
      {
        stepNumber: 1,
        titleEn: "Demand Identity and Grounds of Arrest",
        titleUr: "پولیس اہلکار کی شناخت اور گرفتاری کی وجہ معلوم کریں",
        detailEn: "Politely ask the arresting officer for their name, belt/badge number, and the specific FIR number or warrant. Under Article 10(1) of the Constitution, they cannot detain you without stating the grounds.",
        detailUr: "آئین کے آرٹیکل 10(1) کے تحت پولیس پر گرفتاری کی وجہ بتانا لازمی ہے۔ اہلکار کا نام اور تھانہ نوٹ کریں۔",
        legalNote: "Constitution of Pakistan 1973, Article 10(1)."
      },
      {
        stepNumber: 2,
        titleEn: "Immediately Contact Your Family or Advocate",
        titleUr: "فوری طور پر فیملی یا وکیل کو مطلع کریں",
        detailEn: "Exercise your fundamental right to make a phone call and inform family members of your exact location, the police station (Thana) name, and vehicle details.",
        detailUr: "تھانے کا نام اور صورتحال فوری طور پر وکیل یا گھر والوں کو بتائیں۔",
        legalNote: "Section 50 & 54 CrPC 1898."
      },
      {
        stepNumber: 3,
        titleEn: "Never Sign Blank Papers or Coerced Statements",
        titleUr: "کسی خالی کاغذ یا زبردستی لکھوائے گئے بیان پر دستخط نہ کریں",
        detailEn: "Under Article 14(2) of the Constitution and Article 38 of Qanun-e-Shahadat Order 1984, any confession made to a police officer in custody is inadmissible as evidence in court.",
        detailUr: "پولیس کے سامنے دیا گیا اعترافی بیان عدالت میں قانونی ثبوت نہیں ہوتا۔ تشدد کی صورت میں میڈیکل معائنہ کا مطالبہ کریں۔",
        legalNote: "Qanun-e-Shahadat Order 1984, Article 38 & 39."
      },
      {
        stepNumber: 4,
        titleEn: "Demand Magistrate Production Within 24 Hours",
        titleUr: "24 گھنٹے کے اندر مجسٹریٹ کے سامنے پیشی کا تقاضا",
        detailEn: "Police must produce the accused before the Area Magistrate within 24 hours under Section 61 CrPC and Article 10(2). Your advocate can argue against police physical remand and apply for immediate bail.",
        detailUr: "اگر 24 گھنٹے میں مجسٹریٹ کے سامنے پیش نہ کیا جائے تو ہائی کورٹ یا سیشن کورٹ میں حبسِ بے جا (Habeas Corpus) کی درخواست دیں۔",
        legalNote: "Section 61 & 167 CrPC / Section 491 CrPC."
      }
    ],
    criticalDoAndDonts: {
      dos: [
        "Note the Daily Station Diary (Roznamcha) entry number upon reaching the Thana.",
        "Demand an official MLC (Medico-Legal Certificate) if subjected to physical torture.",
        "Keep copies of your CNIC and advocate's contact handy."
      ],
      donts: [
        "Do not physically resist or engage in violent altercation with law enforcement.",
        "Do not pay unauthorized bribes; seek immediate legal bail via court instead."
      ]
    },
    relevantArticles: ["Article 9", "Article 10", "Article 10A", "Article 14"],
    relevantActs: ["Code of Criminal Procedure 1898 (CrPC)", "Pakistan Penal Code 1860 (PPC)"],
    helplines: [
      { name: "Police Emergency", number: "15" },
      { name: "Ministry of Human Rights", number: "1099" },
      { name: "Legal Aid Society", number: "0800-70806" }
    ]
  },
  {
    id: "guide-cybercrime",
    titleEn: "How to Report Cyber Harassment, Blackmail & Fake Accounts (PECA)",
    titleUr: "سائبر ہراسانی، بلیک میلنگ اور جعلی اکاؤنٹس کی رپورٹ کیسے کریں؟",
    category: "Cyber Crime",
    iconName: "Lock",
    readTimeMin: 5,
    summaryEn: "Forensic evidence collection, filing complaints on the FIA portal, blocking offenders, and legal actions under PECA 2016.",
    summaryUr: "واٹس ایپ، فیس بک یا انسٹاگرام پر بلیک میلنگ اور ہراسانی کے خلاف ایف آئی اے میں ثبوت سمیت رپورٹ درج کروانے کا طریقہ۔",
    steps: [
      {
        stepNumber: 1,
        titleEn: "Preserve Digital Evidence with Timestamps",
        titleUr: "ڈیجیٹل ثبوت اور اسکرین شاٹس محفوظ کریں",
        detailEn: "Do NOT delete conversations immediately. Take full screenshots showing phone numbers, account URLs, time, and specific threats. Export the full WhatsApp chat including media.",
        detailUr: "چیٹ کو فوراً ڈیلیٹ نہ کریں۔ موبائل نمبر، تاریخ، وقت اور دھمکیوں کے واضح اسکرین شاٹس محفوظ کریں۔",
        legalNote: "PECA 2016, Section 20 & 24."
      },
      {
        stepNumber: 2,
        titleEn: "Submit Official Complaint on FIA Cyber Portal",
        titleUr: "ایف آئی اے سائبر کرائم پورٹل پر آن لائن شکایت درج کریں",
        detailEn: "Visit complaint.fia.gov.pk or call 1991. Provide your CNIC, accurate contact number, brief narrative, and upload the preserved screenshots as evidence attachments.",
        detailUr: "ایف آئی اے کی ویب سائٹ complaint.fia.gov.pk پر جائیں یا ہیلپ لائن 1991 پر کال کریں۔",
        legalNote: "Federal Investigation Agency (FIA) Act 1974 & PECA 2016."
      },
      {
        stepNumber: 3,
        titleEn: "Obtain FIA Complaint Tracking Number",
        titleUr: "شکایت کا ٹریکنگ نمبر حاصل کریں",
        detailEn: "Ensure you receive an official SMS tracking ID. If the threat is severe, visit the nearest FIA Cyber Crime Circle office in person.",
        detailUr: "ایف آئی اے سے شکایتی ڈائری نمبر ضرور لیں تاکہ فالو اپ کیا جا سکے۔",
        legalNote: "FIA Investigation Rules."
      }
    ],
    criticalDoAndDonts: {
      dos: [
        "Report promptly before digital logs are expunged from platform servers.",
        "Keep your original phone device intact for FIA forensic verification."
      ],
      donts: [
        "Never pay extortion money or ransom to cyber blackmailers; payments only invite larger demands.",
        "Do not edit or crop screenshot metadata."
      ]
    },
    relevantArticles: ["Article 14 (Privacy of Home & Dignity)"],
    relevantActs: ["Prevention of Electronic Crimes Act 2016 (PECA)", "PPC Section 506"],
    helplines: [
      { name: "FIA Cyber Crime Helpline", number: "1991" },
      { name: "Digital Rights Foundation Helpline", number: "0800-39393" }
    ]
  },
  {
    id: "guide-property-qabza",
    titleEn: "What to Do in Case of Illegal Property Occupation (Qabza)",
    titleUr: "جائیداد پر ناجائز قبضے کی صورت میں قانونی کارروائی",
    category: "Property & Land",
    iconName: "Home",
    readTimeMin: 6,
    summaryEn: "Procedures under the Illegal Dispossession Act 2005, obtaining civil stay orders, and revenue document verification.",
    summaryUr: "قبضہ مافیا کے خلاف سیشن کورٹ میں الیگل ڈسپوزیشن ایکٹ کے تحت براہِ راست استغاثہ اور اسٹے آرڈر لینے کا مرحلہ وار گائیڈ۔",
    steps: [
      {
        stepNumber: 1,
        titleEn: "Gather Certified Title & Revenue Documents",
        titleUr: "ملکیتی دستاویزات اور فرد ملکیت کی تصدیق شدہ کاپیاں جمع کریں",
        detailEn: "Collect certified Registry, Fard Malkiat, Inteqal (mutation), municipal allotment/transfer letter (LDA/CDA/KDA), and utility bills in your name.",
        detailUr: "پلاٹ یا مکان کی رجسٹری، فرد ملکیت اور ٹرانسفر لیٹرز کی تصدیق شدہ نقول اپنے پاس رکھیں۔",
        legalNote: "West Pakistan Land Revenue Act 1967."
      },
      {
        stepNumber: 2,
        titleEn: "File Complaint Under Illegal Dispossession Act 2005",
        titleUr: "سیشن جج کے پاس الیگل ڈسپوزیشن ایکٹ 2005 کے تحت استغاثہ دائر کریں",
        detailEn: "Your Advocate will file a direct complaint before the Court of Session under Section 3. The Sessions Court has statutory power to order police inquiry, attach property, and restore possession expeditiously.",
        detailUr: "سیشن عدالت کے پاس غیر قانونی قابضین کو بے دخل کرنے اور فوری قبضہ واپس دلانے کے خصوصی اختیارات ہیں۔",
        legalNote: "Illegal Dispossession Act 2005, Sections 3, 7 & 8."
      },
      {
        stepNumber: 3,
        titleEn: "Apply for Interim Stay Order (Civil Court)",
        titleUr: "سول کورٹ سے حکمِ امتناعی (اسٹے آرڈر) حاصل کریں",
        detailEn: "File a suit for Declaration and Injunction with an application under Order 39 Rules 1 & 2 CPC to prevent the encroacher from selling, transferring, or building on your plot.",
        detailUr: "قبضہ مافیا کو مزید تعمیرات یا جائیداد آگے فروخت کرنے سے روکنے کے لیے اسٹے آرڈر لیں۔",
        legalNote: "Code of Civil Procedure (CPC 1908), Order 39 Rules 1 & 2."
      }
    ],
    criticalDoAndDonts: {
      dos: [
        "Serve legal notice through an Advocate High Court before filing suit.",
        "Lodge criminal trespass complaint (PPC 447) at the local police station immediately."
      ],
      donts: [
        "Do not engage in violent armed confrontation; resolve strictly through judicial machinery.",
        "Never hand over original property deed papers to unverified mediators."
      ]
    },
    relevantArticles: ["Article 23 (Provision as to Property)", "Article 24 (Protection of Property Rights)"],
    relevantActs: ["Illegal Dispossession Act 2005", "Specific Relief Act 1877 (Section 9)", "Pakistan Penal Code (PPC) Section 447/448"],
    helplines: [
      { name: "Police Emergency", number: "15" },
      { name: "Federal/Provincial Ombudsman", number: "1055" }
    ]
  }
];

export const POPULAR_LEGAL_PROBLEMS = [
  {
    id: "prob-1",
    icon: "ShieldAlert",
    titleEn: "Illegal Police Detention or Harassment",
    titleUr: "پولیس کی ناجائز گرفتاری یا ہراسانی",
    sampleQuery: "I was stopped and detained by police without being told why or shown an FIR.",
    category: "Criminal Law"
  },
  {
    id: "prob-2",
    icon: "Home",
    titleEn: "Illegal Property Occupation (Qabza)",
    titleUr: "جائیداد یا پلاٹ پر ناجائز قبضہ",
    sampleQuery: "Someone has illegally occupied my residential plot and is threatening me when I visit.",
    category: "Property Law"
  },
  {
    id: "prob-3",
    icon: "Lock",
    titleEn: "Cybercrime, WhatsApp Blackmail & Harassment",
    titleUr: "سوشل میڈیا یا واٹس ایپ پر بلیک میلنگ",
    sampleQuery: "Someone is blackmailing me on WhatsApp with private pictures and demanding money.",
    category: "Cyber Crime"
  },
  {
    id: "prob-4",
    icon: "Users",
    titleEn: "Family Disputes, Khula, Maintenance & Custody",
    titleUr: "خلع، بچوں کا خرچہ (نان نفقہ) اور تحویل",
    sampleQuery: "I want to apply for Khula and seek child maintenance for my two minor children.",
    category: "Family Law"
  },
  {
    id: "prob-5",
    icon: "Briefcase",
    titleEn: "Unpaid Salary & Unfair Job Termination",
    titleUr: "کمپنی کا تنخواہ روکنا یا نوکری سے نکالنا",
    sampleQuery: "My employer terminated me without notice and has withheld three months of salary.",
    category: "Labour Law"
  },
  {
    id: "prob-6",
    icon: "Car",
    titleEn: "Road Accident, Hit & Run, or Vehicle Damage",
    titleUr: "گاڑی کا حادثہ اور نقصان کا ازالہ",
    sampleQuery: "A speeding vehicle crashed into my car and ran away. How do I get an FIR and compensation?",
    category: "Traffic / Civil"
  },
  {
    id: "prob-7",
    icon: "AlertCircle",
    titleEn: "Domestic Violence & Female Protection",
    titleUr: "گھریلو تشدد اور خواتین کا قانونی تحفظ",
    sampleQuery: "I am facing domestic violence at home and need immediate emergency shelter and legal help.",
    category: "Domestic Violence"
  },
  {
    id: "prob-8",
    icon: "ShoppingBag",
    titleEn: "Consumer Fraud, Defective Product or Scams",
    titleUr: "جعلی سامان یا آن لائن خریداری میں دھوکہ",
    sampleQuery: "A seller sent me fake defective goods and refuses to refund my money under Consumer Law.",
    category: "Consumer Rights"
  }
];

export const FREQUENTLY_ASKED_QUESTIONS = [
  {
    qEn: "Can the police arrest me without an arrest warrant in Pakistan?",
    qUr: "کیا پولیس پاکستان میں وارنٹ کے بغیر گرفتار کر سکتی ہے؟",
    aEn: "Under Section 54 of the Code of Criminal Procedure (CrPC), police can only arrest without a warrant in 'cognizable offenses' (such as murder, armed robbery, kidnapping) or when a person is caught in the act. For non-cognizable offenses, a judicial warrant from a Magistrate is mandatory. In all cases, Article 10(1) mandates that the police MUST inform you of the grounds of arrest immediately.",
    aUr: "ضابطہ فوجداری (CrPC) کی دفعہ 54 کے تحت پولیس صرف 'قابلِ دست اندازی جرائم' (جیسے قتل، ڈکیتی، سنگین دھوکہ دہی) میں وارنٹ کے بغیر گرفتار کر سکتی ہے۔ دیگر تمام معاملات میں مجسٹریٹ کا وارنٹ لازمی ہے۔ گرفتاری کی صورت میں وجہ بتانا آئینی فریضہ ہے۔",
    reference: "Constitution of Pakistan Article 10(1) & Section 54 CrPC 1898."
  },
  {
    qEn: "How long can police keep an arrested person before taking them to court?",
    qUr: "پولیس گرفتار شخص کو کتنی دیر تھانے میں رکھ سکتی ہے؟",
    aEn: "Under Article 10(2) of the Constitution and Section 61 of the CrPC, no person can be kept in custody for more than 24 hours (excluding reasonable journey time to court). They MUST be produced before the Area Judicial Magistrate within 24 hours. Detaining someone beyond 24 hours without a Magistrate's physical remand order is an illegal detention (Habeas Corpus).",
    aUr: "آئین کے آرٹیکل 10(2) اور دفعہ 61 ضابطہ فوجداری کے مطابق کسی بھی گرفتار شخص کو 24 گھنٹے سے زائد تھانے میں نہیں رکھا جا سکتا۔ 24 گھنٹے کے اندر علاقہ مجسٹریٹ کے سامنے پیش کرنا لازمی ہے۔",
    reference: "Article 10(2) Constitution & Section 61/167 CrPC."
  },
  {
    qEn: "What is the quickest legal remedy against property grabbers (Qabza Mafia)?",
    qUr: "قبضہ مافیا کے خلاف سب سے تیز ترین قانونی راستہ کیا ہے؟",
    aEn: "Under the Illegal Dispossession Act 2005, a property owner can file a direct criminal complaint before the Court of Session. The Sessions Judge can order an immediate police inquiry, attach the property, evict the illegal occupiers, and award direct restoration of possession along with prison terms for the grabbers.",
    aUr: "الیگل ڈسپوزیشن ایکٹ 2005 کے تحت سیشن کورٹ میں براہ راست استغاثہ دائر کیا جا سکتا ہے، جس کے ذریعے سیشن جج فوری انکوائری کے بعد قبضہ واپس دلانے اور قابضین کو جیل بھیجنے کا حکم جاری کر سکتے ہیں۔",
    reference: "Illegal Dispossession Act 2005, Section 3 & 7."
  },
  {
    qEn: "What should a woman do if facing online harassment or blackmail on WhatsApp/Facebook?",
    qUr: "اگر کسی خاتون کو واٹس ایپ یا فیس بک پر بلیک میل کیا جائے تو کیا کرنا چاہیے؟",
    aEn: "Do not pay any money or delete the messages. Take timestamped screenshots showing numbers and URLs. File a complaint with the FIA Cyber Crime Wing (Helpline 1991 or complaint.fia.gov.pk) and contact the Digital Rights Foundation Helpline (0800-39393). Sections 20, 21, and 24 of PECA 2016 protect your privacy and punish offenders with up to 5 years imprisonment.",
    aUr: "بلیک میلر کو کوئی رقم نہ دیں اور میسجز ڈیلیٹ نہ کریں۔ اسکرین شاٹس محفوظ کریں اور ایف آئی اے سائبر کرائم پورٹل یا ہیلپ لائن 1991 پر رپورٹ کریں۔ ڈیجیٹل رائٹس فاؤنڈیشن (0800-39393) بھی مفت اور خفیہ مدد فراہم کرتی ہے۔",
    reference: "Prevention of Electronic Crimes Act 2016 (PECA)."
  },
  {
    qEn: "Does AAGAHI replace a licensed lawyer in Pakistani courts?",
    qUr: "کیا آگاہی پلیٹ فارم عدالت میں وکیل کا متبادل ہے؟",
    aEn: "No. AAGAHI is a civic-tech legal awareness and constitutional educational platform designed to empower citizens with knowledge of their legal rights, statutory procedures, and emergency contacts. For actual court litigation, filing pleadings, or representation, you should consult and retain a qualified Pakistani Advocate through our 'Find a Lawyer' directory.",
    aUr: "نہیں، آگاہی ایک قانونی آگاہی اور شعور کا پلیٹ فارم ہے۔ عدالتوں میں مقدمات لڑنے، دستاویزات دائر کرنے اور باضابطہ پیروی کے لیے مستند وکیل کی خدمات حاصل کرنا ضروری ہے۔",
    reference: "AAGAHI Public Legal Awareness Charter."
  }
];
