export interface NavDict {
  home: string
  about: string
  howIHelp: string
  faq: string
  blog: string
  contact: string
  bookCall: string
}

export interface HomeDict {
  heroTagline: string
  heroSubhead: string
  heroPrimary: string
  heroSecondary: string
  aboutStripHeading: string
  aboutStripBody: string
  audienceHeading: string
  audience: {
    expats: { label: string; description: string }
    professionals: { label: string; description: string }
    parents: { label: string; description: string }
  }
  testimonialsHeading: string
  testimonials: Array<{ quote: string; attribution: string }>
  ctaBannerHeading: string
  ctaBannerBody: string
  ctaBannerButton: string
}

export interface AboutDict {
  pageTitle: string
  pageSubtitle: string
  storyHeading: string
  credentialsHeading: string
  approachHeading: string
}

export interface HowIHelpDict {
  pageTitle: string
  pageSubtitle: string
  services: {
    expats: { title: string; description: string; learnMore: string }
    burnout: { title: string; description: string; learnMore: string }
    parenting: { title: string; description: string; learnMore: string }
  }
}

export interface FaqDict {
  pageTitle: string
  pageSubtitle: string
  items: Array<{ question: string; answer: string }>
}

export interface BlogDict {
  pageTitle: string
  pageSubtitle: string
  sections: {
    expats: { heading: string; intro: string }
    professionals: { heading: string; intro: string }
    parents: { heading: string; intro: string }
  }
  readMore: string
  readingTime: (minutes: number) => string
  relatedPosts: string
  publishedOn: string
}

export interface ContactDict {
  pageTitle: string
  pageSubtitle: string
  formHeading: string
  calendlyHeading: string
  calendlyFallback: string
  fields: {
    name: string
    email: string
    message: string
    preferredLanguage: string
    languageEn: string
    languageFr: string
    submit: string
  }
  validation: {
    nameRequired: string
    emailRequired: string
    emailInvalid: string
    messageRequired: string
  }
  success: string
  error: string
}

export interface CtaDict {
  bookCall: string
  bookCallBody: string
  bookCallButton: string
}

export interface FormsDict {
  submitting: string
  tryAgain: string
}

export interface Dictionary {
  nav: NavDict
  home: HomeDict
  about: AboutDict
  howIHelp: HowIHelpDict
  faq: FaqDict
  blog: BlogDict
  contact: ContactDict
  cta: CtaDict
  forms: FormsDict
}
