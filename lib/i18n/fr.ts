import type { Dictionary } from './types'
import { FEES } from '../fees'

const fr: Dictionary = {
  nav: {
    home: "Accueil",
    about: "À propos",
    howIHelp: "Mon approche",
    mySpecialties: "Mes spécialités",
    faq: "Questions",
    blog: "Blog",
    contact: "Contact",
    bookCall: "Réserver",
  },

  home: {
    heroTagline:
      "Se sentir mieux. Penser plus clairement. Construire une vie plus équilibrée.",
    heroSubhead:
      "Thérapie TCC en ligne, en français et en anglais, pour adultes et adolescents. Accompagnement spécialisé en anxiété, stress, transitions de vie, exigences de la parentalité, pression professionnelle et burn-out.",
    heroPrimary: "Réserver un appel découverte gratuit",
    heroSecondary: "En savoir plus sur moi",
    introHeading:
      "Vivez-vous de l'anxiété, du stress, une faible estime de vous-même ou des difficultés émotionnelles ?",
    introBody:
      "Vous n'avez pas à traverser cela seul·e. La thérapie peut vous aider à mieux comprendre ce que vous vivez et à développer des outils concrets pour retrouver un équilibre et un mieux-être.",
    aboutStripHeading: "Une thérapie qui vous parle",
    aboutStripBody:
      "Je suis thérapeute bilingue en thérapie cognitivo-comportementale (TCC). J'ai vécu l'expatriation, connu la pression du monde de l'entreprise et je suis mère. Mon approche est collaborative, pratique et orientée vers les solutions. Je vous accueille avec bienveillance, sans jugement, pour que vous puissiez explorer vos difficultés et avancer à votre rythme. Mon parcours diversifié, mon expérience en entreprise et mes certifications en psychothérapie me permettent de vous proposer un accompagnement adapté à vos besoins et à vos objectifs.",
    credentialBadges: [
      "Certifiée en TCC",
      "Expérience vécue de l'expatriation",
      "15 ans d'expérience en entreprise",
      "Certifiée en accompagnement à la parentalité",
    ],
    audienceHeading: "Avec qui je travaille",
    audience: {
      expats: {
        label: "Expatrié·e·s à la recherche d'un·e thérapeute qui parle leur langue",
        description:
          "Isolement, choc culturel, questionnements identitaires et poids invisible de construire une vie ailleurs.",
      },
      professionals: {
        label: "Personnes confrontées à la pression professionnelle ou au burn-out",
        description:
          "Anxiété, perfectionnisme, syndrome de l'imposteur — et l'épuisement de devoir toujours tenir.",
      },
      parents: {
        label: "Parents qui se sentent dépassé·e·s",
        description:
          "Anxiété périnatale, ambivalence de la maternité et pression de tout gérer sans en parler.",
      },
      stuck: {
        label: "Personnes qui se sentent bloquées",
        description:
          "Celles et ceux qui sentent que quelque chose ne va pas sans pouvoir le nommer — et qui souhaitent mieux se comprendre, sortir de schémas anciens et vivre de manière plus alignée.",
      },
    },
    testimonialsHeading: "Ce que disent les patient·e·s",
    testimonials: [
      {
        quote:
          "Sarah comprenait l'expérience de l'expatriation d'une façon que je n'avais jamais trouvée chez un thérapeute auparavant. [PLACEHOLDER]",
        attribution: "C., Expatriée à Paris",
      },
      {
        quote:
          "Après des mois d'épuisement, son approche m'a aidé à retrouver mes repères. Elle connaissait le monde de l'entreprise de l'intérieur. [PLACEHOLDER]",
        attribution: "J., Professionnel·le",
      },
      {
        quote:
          "Nouvelle maman, je me sentais très seule jusqu'à ce que je trouve le soutien de Sarah. Elle a tenu un espace sans jugement pour tout ce que je ressentais. [PLACEHOLDER]",
        attribution: "M., Parent",
      },
    ],
    ctaBannerHeading: "Prêt·e à faire le premier pas ?",
    ctaBannerBody:
      "Un appel découverte gratuit de 15 minutes vous permet de poser vos questions et de voir si travailler ensemble vous convient — sans engagement.",
    ctaBannerButton: "Réserver votre appel découverte gratuit",
  },

  about: {
    pageTitle: "À propos de moi",
    pageSubtitle:
      "Thérapeute TCC bilingue avec une expérience vécue de l'expatriation, du stress professionnel et de la parentalité.",
    storyHeading: "De l'entreprise à la psychologie",
    storyParagraphs: [
      "Pendant quinze ans, j'ai évolué dans des environnements exigeants, où la performance, la résilience et la capacité à gérer la pression étaient essentielles. Je sais ce que c'est que de réussir en apparence tout en luttant intérieurement. En travaillant dans la communication interne et l'engagement des collaborateurs, j'ai accompagné des personnes confrontées aux changements organisationnels, à la pression professionnelle et aux défis croissants liés au stress, au burn-out et à l'équilibre entre vie professionnelle et vie personnelle.",
      "Cette expérience m'a permis de développer une compréhension approfondie de l'impact psychologique et émotionnel des environnements de travail modernes. Elle m'a naturellement conduite à me former en psychologie et en psychothérapie, en obtenant une certification en thérapie cognitivo-comportementale (TCC) et en développant une pratique fondée à la fois sur la rigueur clinique et l'expérience du terrain.",
      "Je suis également certifiée en accompagnement à la parentalité. Je crois profondément qu'accompagner les parents est essentiel dans le monde d'aujourd'hui. Être parent n'est pas simple — je le suis moi-même, et je comprends les défis que cela représente. Lorsque les parents se sentent soutenus, cela contribue au développement plus serein et plus confiant de leurs enfants. Aujourd'hui, j'associe des outils thérapeutiques fondés sur des approches validées scientifiquement à une compréhension concrète des dynamiques professionnelles et familiales, afin de proposer un accompagnement pratique, humain et personnalisé.",
      "Ayant grandi dans un environnement international et vécu de nombreuses années à l'étranger, j'ai un parcours multiculturel. J'accompagne avec aisance des expatriés et des personnes issues de cultures diverses, en proposant des thérapies en français et en anglais.",
    ],
    credentialsHeading: "Mes certifications et affiliations",
    credentials: [
      "Thérapeute TCC certifiée par l'EFPP — E-Faculté de Psychologie et Psychanalyse, institut de référence basé en France",
      "Certification en accompagnement à la parentalité — EFPP",
      "FAA Level 3 Award en supervision des Premiers Secours en Santé Mentale, délivré par FAA First Aid Awards Ltd",
      "Membre de la FNP — Fédération Nationale de Psychothérapie",
      "Bachelor in Business Administration (BBA) — ESSEC Business School, France",
    ],
  },

  howIHelp: {
    pageTitle: "Mon approche",
    pageSubtitle:
      "J'utilise la thérapie cognitivo-comportementale (TCC) pour vous aider à mieux comprendre l'anxiété ou les difficultés que vous traversez, réduire la surcharge mentale et construire des schémas plus sains.",
    intro:
      "J'utilise la thérapie cognitivo-comportementale (TCC) pour vous aider à mieux comprendre l'anxiété ou les difficultés que vous traversez, réduire la surcharge mentale et construire des schémas plus sains. J'accompagne les professionnels, les expatriés et les parents confrontés à l'anxiété, au stress, aux difficultés émotionnelles ou au burn-out, afin de retrouver un meilleur équilibre.",
    cbt: {
      heading: "Qu'est-ce que la thérapie cognitivo-comportementale (TCC) ?",
      paragraphs: [
        "La thérapie cognitivo-comportementale (TCC) est une approche thérapeutique scientifiquement validée, largement utilisée pour traiter l'anxiété, le stress et de nombreuses difficultés émotionnelles.",
        "La TCC s'intéresse aux liens entre les pensées, les émotions et les comportements. Certains schémas de pensée ou comportements peuvent parfois entretenir ou intensifier la souffrance émotionnelle.",
      ],
      helpsYouLead: "La TCC vous aide à :",
      helpsYou: [
        "identifier les schémas qui entretiennent les difficultés",
        "mieux comprendre votre fonctionnement émotionnel",
        "développer des stratégies d'adaptation plus saines",
        "mettre en place des changements concrets et durables dans votre quotidien",
      ],
      closing: "La TCC est une approche structurée, pratique et orientée vers des objectifs concrets.",
    },
    whoIWorkWith: {
      heading: "Avec qui je travaille",
      lead:
        "J'accompagne des adultes et des adolescents qui souhaitent mieux se comprendre et développer des outils pour améliorer leur bien-être émotionnel.",
      suitableLead: "La thérapie en ligne peut être particulièrement adaptée si vous :",
      suitable: [
        "vous sentez submergé·e par le stress ou l'anxiété",
        "traversez une période de vie difficile",
        "souhaitez renforcer votre confiance en vous et votre résilience émotionnelle",
        "recherchez des stratégies concrètes pour mieux faire face aux difficultés",
      ],
      closing:
        "Toutes les séances ayant lieu en ligne, la thérapie reste accessible où que vous soyez.",
    },
    commonIssues: {
      heading: "Les difficultés que j'accompagne fréquemment",
      lead: "J'accompagne notamment des personnes confrontées à :",
      items: [
        "l'anxiété et les troubles anxieux",
        "le stress et le stress chronique",
        "le burn-out et la pression professionnelle",
        "une faible estime de soi et un manque de confiance en soi",
        "des difficultés de régulation émotionnelle",
        "des difficultés relationnelles",
        "des transitions de vie et des changements personnels",
        "des défis liés à l'expatriation",
        "certaines phobies et comportements addictifs",
      ],
      closing:
        "Chaque accompagnement est adapté à votre histoire, vos besoins et vos objectifs.",
    },
    howItWorks: {
      heading: "Comment se déroule la thérapie",
      lead: "La thérapie est un processus collaboratif.",
      firstSession: {
        heading: "Première séance",
        lead: "La première séance permet de :",
        items: [
          "explorer ce que vous vivez actuellement",
          "comprendre vos besoins et vos objectifs",
          "répondre à vos questions",
          "voir si cette approche vous convient",
        ],
      },
      ongoing: {
        heading: "Séances suivantes",
        lead: "Lors des séances suivantes, nous travaillerons ensemble pour :",
        items: [
          "identifier les schémas de pensée ou de comportement qui entretiennent les difficultés",
          "mieux comprendre vos réactions émotionnelles",
          "développer des stratégies d'adaptation concrètes",
        ],
        closing:
          "La TCC inclut souvent des outils et exercices pratiques à expérimenter entre les séances afin d'ancrer durablement les changements.",
      },
      fees: {
        heading: "Tarifs",
        sessionLength:
          "Les séances durent généralement entre 45 et 60 minutes et se déroulent en visioconférence sécurisée.",
        feeLine: `Tarif : ${FEES.singleSession}€ par séance`,
        packagesLead:
          "Je propose également des forfaits afin de rendre l'accompagnement plus accessible financièrement.",
        packages: [
          `4 séances : ${FEES.package4}€`,
          `8 séances : ${FEES.package8}€`,
        ],
      },
    },
  },

  mySpecialties: {
    pageTitle: "Mes spécialités",
    pageSubtitle:
      "Des domaines d'accompagnement nourris à la fois par une formation professionnelle et une expérience vécue.",
    services: {
      expats: {
        title: "Expatriés",
        description:
          "Isolement, choc culturel, questionnements identitaires et tensions liées à la construction d'une vie à l'étranger — des expériences souvent complexes et invisibles pour l'entourage. Je les connais de l'intérieur.",
        learnMore: "Lire la suite",
      },
      burnout: {
        title: "Burn-out et stress professionnel",
        description:
          "Anxiété, perfectionnisme, pression constante et épuisement liés aux environnements exigeants. Après quinze ans en entreprise, je comprends les réalités du monde professionnel de l'intérieur.",
        learnMore: "Lire la suite",
      },
      parenting: {
        title: "Soutien à la parentalité : anxiété parentale, maternité, surcharge mentale…",
        description:
          "Anxiété périnatale, ambivalence de la maternité, charge mentale et poids invisible de la parentalité moderne. Certifiée en accompagnement à la parentalité et mère moi-même, je propose un espace de soutien sans jugement.",
        learnMore: "Lire la suite",
      },
    },
  },

  faq: {
    pageTitle: "Questions fréquentes",
    pageSubtitle: "Tout ce que vous devez savoir avant de réserver.",
    items: [
      {
        question: "Comment se déroulent les séances en ligne ?",
        answer:
          "Les séances durent entre 45 et 60 minutes et se déroulent en visioconférence sécurisée. Vous avez simplement besoin d'un endroit calme et privé ainsi que d'une connexion internet stable. La thérapie en ligne offre plus de flexibilité et permet d'accéder à un accompagnement où que vous soyez dans le monde. Nous nous retrouvons généralement chaque semaine ou toutes les deux semaines, selon vos besoins et votre rythme.",
      },
      {
        question: "Combien de temps dure un accompagnement ?",
        answer:
          "Cela dépend de vos besoins et de vos objectifs. Certaines personnes viennent pour quelques séances afin de travailler sur une difficulté précise, tandis que d'autres choisissent un accompagnement plus approfondi sur une plus longue durée. Nous faisons régulièrement le point ensemble sur votre évolution et vos besoins.",
      },
      {
        question: "Où êtes-vous basée et quels fuseaux horaires couvrez-vous ?",
        answer:
          "Je suis basée en France et je propose des horaires adaptés aux fuseaux européens ainsi qu'aux horaires américains qui se chevauchent. Ayant moi-même vécu à l'étranger, je me spécialise dans l'accompagnement des expatriés et des professionnels internationaux. L'expatriation peut faire émerger des défis spécifiques : isolement, questionnements identitaires, pression de « réussir son expatriation » ou difficulté à trouver sa place. La thérapie peut vous aider à traverser ces expériences avec plus de soutien et de clarté.",
      },
      {
        question: "Quels sont vos tarifs ?",
        answer: `Une séance individuelle coûte ${FEES.singleSession}€. Je propose également des forfaits afin de rendre l'accompagnement plus accessible financièrement :`,
        answerBullets: [
          `4 séances : ${FEES.package4}€`,
          `8 séances : ${FEES.package8}€`,
        ],
      },
      {
        question: "La thérapie en ligne est-elle plus abordable ?",
        answer:
          "Je propose une tarification transparente et accessible, souvent plus avantageuse que la thérapie privée dans des pays comme le Royaume-Uni, la Suisse ou Dubaï. La thérapie en ligne permet de bénéficier d'un accompagnement régulier et flexible, sans les contraintes de déplacement ni les longues listes d'attente. Des forfaits sont également proposés afin de rendre le suivi thérapeutique plus accessible dans la durée.",
      },
      {
        question: "Quels types de difficultés accompagnez-vous ?",
        answer: "J'accompagne principalement des personnes confrontées à :",
        answerBullets: [
          "l'anxiété",
          "le stress et le burn-out",
          "la pression professionnelle",
          "les transitions de vie (expatriation, changement de carrière, parentalité, etc.)",
          "la surcharge émotionnelle et la difficulté à déconnecter",
        ],
      },
      {
        question: "Comment savoir si la thérapie est faite pour moi ?",
        answer:
          "Vous n'avez pas besoin d'être en crise pour commencer une thérapie. Si vous vous sentez submergé·e, anxieux·se, épuisé·e ou bloqué·e dans certains schémas, la thérapie peut vous aider à retrouver plus de compréhension, de clarté et d'équilibre. Beaucoup de personnes commencent simplement parce qu'elles veulent se sentir mieux dans leur quotidien. L'essentiel est de vous sentir à l'aise avec votre thérapeute. L'appel découverte est justement un espace pour poser vos questions, partager brièvement ce que vous traversez et voir si travailler ensemble vous convient — sans pression ni engagement.",
      },
      {
        question: "Comment commencer ?",
        answer:
          "Vous pouvez réserver un appel découverte gratuit de 15 minutes pour échanger sur ce que vous traversez, ce que vous recherchez et la manière dont nous pourrions travailler ensemble. C'est également l'occasion de voir si vous vous sentez à l'aise avec moi.",
      },
    ],
  },

  blog: {
    pageTitle: "Blog",
    pageSubtitle:
      "Réflexions et ressources pratiques autour de l'expatriation, du stress professionnel, du burn-out et de la charge émotionnelle de la parentalité.",
    sections: {
      expats: {
        heading: "Pour les expatriés et les nomades",
        intro:
          "Vivre à l'étranger est une expérience à la fois enrichissante et complexe. Ces articles explorent l'anxiété, les questionnements identitaires, l'isolement et les pressions invisibles liées à l'expatriation — ainsi que les ressources qui peuvent réellement aider.",
      },
      professionals: {
        heading: "Pour les professionnels confrontés au stress et au burn-out",
        intro:
          "La recherche de performance a un coût. Ces articles abordent le burn-out, le perfectionnisme, l'anxiété professionnelle et les outils issus de la TCC pour retrouver plus d'équilibre et prévenir l'épuisement.",
      },
      parents: {
        heading: "Pour les parents et les jeunes mères",
        intro:
          "La parentalité transforme profondément l'équilibre émotionnel. Ces articles parlent d'anxiété périnatale, d'ambivalence maternelle et de la charge mentale liée au fait d'élever des enfants — avec honnêteté, nuance et sans jugement.",
      },
    },
    readMore: "Lire l'article",
    readingTime: (minutes) => `${minutes} min de lecture`,
    relatedPosts: "Vous pourriez aussi aimer",
    publishedOn: "Publié le",
  },

  contact: {
    pageTitle: "Me contacter",
    pageSubtitle:
      "Envoyez-moi un message, réservez un appel découverte gratuit de 15 minutes, ou réservez directement une séance — à vous de choisir ce qui vous convient.",
    formHeading: "Envoyer un message",
    calendlyDiscoveryHeading: "Réserver un appel découverte",
    calendlyDiscoveryDescription: "Appel découverte gratuit de 15 minutes — sans engagement.",
    calendlySessionHeading: "Réserver une séance",
    calendlySessionDescription: "Séance de thérapie individuelle, 1 heure.",
    calendlyFallback: "Lien de réservation non configuré.",
    fields: {
      name: "Votre prénom et nom",
      email: "Votre e-mail",
      message: "Votre message",
      preferredLanguage: "Langue préférée pour les séances",
      languageEn: "Anglais",
      languageFr: "Français",
      submit: "Envoyer le message",
    },
    validation: {
      nameRequired: "Veuillez entrer votre prénom et nom.",
      emailRequired: "Veuillez entrer votre adresse e-mail.",
      emailInvalid: "Veuillez entrer une adresse e-mail valide.",
      messageRequired: "Veuillez entrer un message.",
    },
    success: "Merci — je vous répondrai sous 48 heures.",
    error:
      "Une erreur s'est produite. Veuillez réessayer ou m'écrire directement.",
  },

  cta: {
    bookCall: "Quand vous serez prêt·e",
    bookCallBody:
      "Un appel découverte gratuit de 15 minutes est la manière la plus simple de commencer. Sans engagement — simplement une première conversation.",
    bookCallButton: "Réserver votre appel découverte gratuit",
  },

  forms: {
    submitting: "Envoi en cours…",
    tryAgain: "Réessayer",
  },
}

export default fr
