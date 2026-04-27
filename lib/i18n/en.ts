import type { Dictionary } from './types'

const en: Dictionary = {
  nav: {
    home: "Home",
    about: "About",
    howIHelp: "How I Help",
    faq: "FAQ",
    blog: "Blog",
    contact: "Contact",
    bookCall: "Book a free call",
  },

  home: {
    heroTagline:
      "Therapy for the life you're actually living — expat pressures, career stress, and the weight of modern parenthood",
    heroSubhead:
      "Bilingual CBT therapist online, with lived expat experience and 15 years in corporate.",
    heroPrimary: "Book a free discovery call",
    heroSecondary: "Learn more about Sarah",
    aboutStripHeading: "Therapy that knows your world",
    aboutStripBody:
      "Sarah Cousin Roshay is a bilingual CBT therapist who has lived the expat life, navigated corporate burnout, and experienced parenthood first-hand. She brings 15 years of corporate experience, certified CBT training, and a parenting support qualification to every session.",
    audienceHeading: "Who I work with",
    audience: {
      expats: {
        label: "I'm an expat navigating life abroad",
        description:
          "Isolation, culture shock, identity and the invisible weight of building a life somewhere new.",
      },
      professionals: {
        label: "I'm struggling with work stress or burnout",
        description:
          "Anxiety, perfectionism, imposter syndrome — and the exhaustion of pushing through it.",
      },
      parents: {
        label: "I'm a parent feeling overwhelmed",
        description:
          "Perinatal anxiety, the identity shift of new parenthood, and the pressure of doing it all.",
      },
    },
    testimonialsHeading: "What clients say",
    testimonials: [
      {
        quote:
          "Sarah's understanding of the expat experience was invaluable. She knew things about my life I had never had to explain to a therapist before. [PLACEHOLDER]",
        attribution: "C., Expat in Paris",
      },
      {
        quote:
          "After months of burnout, her approach helped me find my footing again. She understood the corporate world in a way that made all the difference. [PLACEHOLDER]",
        attribution: "J., Professional",
      },
      {
        quote:
          "As a new parent I felt so alone until I found Sarah's support. She held space for everything I was feeling without judgement. [PLACEHOLDER]",
        attribution: "M., Parent",
      },
    ],
    ctaBannerHeading: "Ready to take the first step?",
    ctaBannerBody:
      "A free 20-minute discovery call lets you ask questions and feel whether working together is the right fit — no pressure.",
    ctaBannerButton: "Book your free discovery call",
  },

  about: {
    pageTitle: "About Sarah",
    pageSubtitle:
      "Bilingual CBT therapist with lived experience of expat life, corporate stress, and parenthood.",
    storyHeading: "How I got here",
    credentialsHeading: "Training & qualifications",
    approachHeading: "How I work",
  },

  howIHelp: {
    pageTitle: "How I Help",
    pageSubtitle:
      "Three areas where I specialise — each drawing on both professional training and personal experience.",
    services: {
      expats: {
        title: "Therapy for Expats",
        description:
          "Isolation, culture shock, identity shifts and the strain of building a life in a new country — this is complex, and often invisible. I've lived it.",
        learnMore: "Read more about expat therapy",
      },
      burnout: {
        title: "Burnout & Work Stress",
        description:
          "Anxiety, perfectionism, and the exhaustion of high performance. Fifteen years in corporate means I understand your world from the inside.",
        learnMore: "Read more about burnout therapy",
      },
      parenting: {
        title: "Parenting Support",
        description:
          "Perinatal anxiety, matrescence, overwhelm, and the invisible weight of modern parenthood. Certified in parenting support and a parent myself.",
        learnMore: "Read more about parenting support",
      },
    },
  },

  faq: {
    pageTitle: "Frequently Asked Questions",
    pageSubtitle: "Everything you need to know before booking.",
    items: [
      {
        question: "How do sessions work?",
        answer:
          "Sessions are 50 minutes long and take place online via a secure, encrypted video platform. We typically meet weekly or bi-weekly depending on your needs and availability.",
      },
      {
        question: "What languages do you offer therapy in?",
        answer:
          "I offer therapy in both English and French. You choose the language for each session — or we can switch between them if that feels right.",
      },
      {
        question: "Where are you based and what time zones do you cover?",
        answer:
          "I'm based in France and work flexibly across European time zones and overlapping US hours. We'll find a slot that works for your schedule.",
      },
      {
        question: "What is CBT?",
        answer:
          "Cognitive Behavioural Therapy (CBT) is a practical, evidence-based approach that helps you identify and shift the thought patterns and behaviours that are keeping you stuck. Read more in my blog post on what CBT is and whether it's right for you.",
      },
      {
        question: "Is online therapy effective?",
        answer:
          "Yes — research shows that online CBT is as effective as in-person therapy for most issues. I've written about this in detail on the blog. Online therapy is especially convenient for expats, busy professionals, and parents.",
      },
      {
        question: "What about confidentiality?",
        answer:
          "[VERIFY WITH SARAH] Everything discussed in our sessions is confidential, governed by professional ethics and applicable regulations. I am a member of [professional body — Sarah to verify] and bound by their code of conduct.",
      },
      {
        question: "How do I book?",
        answer:
          "You can book a free 20-minute discovery call directly via the booking link on the Contact page. Alternatively, send me a message through the contact form and I'll get back to you within 48 hours.",
      },
      {
        question: "What does a free discovery call cover?",
        answer:
          "It's a chance for you to ask questions, tell me a little about what you're going through, and get a feel for whether working together is the right fit. There's no pressure and no commitment required.",
      },
    ],
  },

  blog: {
    pageTitle: "Therapy Blog",
    pageSubtitle:
      "Practical insights on expat life, work stress, burnout, and the emotional weight of parenthood.",
    sections: {
      expats: {
        heading: "For Expats & Global Nomads",
        intro:
          "Living abroad is rich and complicated. These posts explore the anxiety, identity shifts, and invisible pressures that come with expat life — and what actually helps.",
      },
      professionals: {
        heading: "For Professionals & Burnout Recovery",
        intro:
          "High performance has a cost. These posts tackle burnout, perfectionism, work anxiety, and the CBT tools that help you find your way back.",
      },
      parents: {
        heading: "For Parents & New Mothers",
        intro:
          "Parenthood changes everything. These posts cover perinatal anxiety, matrescence, and the emotional weight of raising children — with honesty and no judgement.",
      },
    },
    readMore: "Read article",
    readingTime: (minutes) => `${minutes} min read`,
    relatedPosts: "You might also like",
    publishedOn: "Published",
  },

  contact: {
    pageTitle: "Get in Touch",
    pageSubtitle:
      "Send a message or book a free 20-minute discovery call — whichever feels easier.",
    formHeading: "Send a message",
    calendlyHeading: "Book a call directly",
    calendlyFallback: "Booking link not configured.",
    fields: {
      name: "Your name",
      email: "Your email",
      message: "Your message",
      preferredLanguage: "Preferred language for sessions",
      languageEn: "English",
      languageFr: "French",
      submit: "Send message",
    },
    validation: {
      nameRequired: "Please enter your name.",
      emailRequired: "Please enter your email address.",
      emailInvalid: "Please enter a valid email address.",
      messageRequired: "Please enter a message.",
    },
    success: "Thank you — I'll be in touch within 48 hours.",
    error: "Something went wrong. Please try again or email me directly.",
  },

  cta: {
    bookCall: "Ready when you are",
    bookCallBody:
      "A free 20-minute discovery call is the easiest way to start. No commitment, just a conversation.",
    bookCallButton: "Book your free discovery call",
  },

  forms: {
    submitting: "Sending…",
    tryAgain: "Try again",
  },
}

export default en
