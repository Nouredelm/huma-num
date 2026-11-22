export interface HistoryMilestone {id:string;year:string;era:'pionniers'|'standardisation'|'contemporain';title:string;subtitle:string;description:string;source:string;url:string;icon:string;}
export const HISTORY_MILESTONES:HistoryMilestone[]=[
  {
    "id": "1949",
    "year": "1949",
    "era": "pionniers",
    "title": "Roberto Busa et l’Index Thomisticus",
    "subtitle": "Analyse mécanographique des textes",
    "description": "Roberto Busa entreprend, avec le soutien d’IBM, la constitution d’un index des œuvres de Thomas d’Aquin et d’auteurs apparentés. L’initiative montre qu’un ensemble textuel volumineux peut être traité par des machines, mais elle mobilise aussi des équipes humaines de transcription et de contrôle.",
    "source": "Susan Hockey, The History of Humanities Computing (2004)",
    "url": "https://companions.digitalhumanities.org/DH/?chapter=content%2F9781405103213_chapter_1.html",
    "icon": "text"
  },
  {
    "id": "1966",
    "year": "1966",
    "era": "pionniers",
    "title": "Une communauté scientifique se structure",
    "subtitle": "Revue Computers and the Humanities",
    "description": "La parution de Computers and the Humanities offre un lieu de discussion sur l’usage des ordinateurs dans les études littéraires, linguistiques, historiques et documentaires.",
    "source": "JSTOR, Computers and the Humanities (1966–2004)",
    "url": "https://www.jstor.org/journal/comphuma",
    "icon": "journal"
  },
  {
    "id": "1976",
    "year": "1976",
    "era": "pionniers",
    "title": "Les corpus numériques deviennent des archives",
    "subtitle": "Oxford Text Archive",
    "description": "L’Oxford Text Archive commence à rassembler et à préserver des ressources textuelles numériques. Au-delà des calculs, le partage et la conservation des corpus deviennent des enjeux centraux.",
    "source": "Mapping the Humanities, Oxford Text Archive",
    "url": "https://www.humanities.org.uk/infrastructures/4281",
    "icon": "corpus"
  },
  {
    "id": "1987",
    "year": "1987",
    "era": "standardisation",
    "title": "Naissance de la Text Encoding Initiative",
    "subtitle": "Des textes structurés et échangeables",
    "description": "La TEI est créée pour élaborer des méthodes communes d’encodage des données textuelles en sciences humaines. L’objectif est de préserver les structures et les interprétations éditoriales dans des formats partageables.",
    "source": "Text Encoding Initiative, History",
    "url": "https://tei-c.org/about/history/",
    "icon": "standard"
  },
  {
    "id": "1990s",
    "year": "Années 1990",
    "era": "standardisation",
    "title": "Le Web transforme la diffusion du savoir",
    "subtitle": "Éditions électroniques et bibliothèques numériques",
    "description": "La diffusion du Web et des ordinateurs personnels ouvre de nouveaux modes de consultation, de publication et de collaboration : éditions savantes en ligne, bases documentaires et collections patrimoniales.",
    "source": "Susan Hockey, The History of Humanities Computing",
    "url": "https://companions.digitalhumanities.org/DH/?chapter=content%2F9781405103213_chapter_1.html",
    "icon": "network"
  },
  {
    "id": "2004",
    "year": "2004",
    "era": "standardisation",
    "title": "Le champ se présente comme Digital Humanities",
    "subtitle": "A Companion to Digital Humanities",
    "description": "La publication de cet ouvrage collectif témoigne de la diversification des sujets et des communautés scientifiques : textes, archéologie, histoire, arts, information, patrimoine et édition.",
    "source": "Schreibman, Siemens et Unsworth (dir.), A Companion to Digital Humanities",
    "url": "https://companions.digitalhumanities.org/DH/",
    "icon": "book"
  },
  {
    "id": "2010",
    "year": "2010",
    "era": "contemporain",
    "title": "Un manifeste francophone",
    "subtitle": "THATCamp Paris",
    "description": "Le manifeste issu du THATCamp Paris affirme une communauté de pratiques ouverte, interdisciplinaire et attentive au partage des savoirs et aux outils de recherche.",
    "source": "Marin Dacos, Manifeste des Digital Humanities",
    "url": "https://marin.dacos.org/manifeste-des-digital-humanities/",
    "icon": "community"
  },
  {
    "id": "2016",
    "year": "2016",
    "era": "contemporain",
    "title": "Les données de recherche et les principes FAIR",
    "subtitle": "Découvrabilité, accessibilité, interopérabilité et réutilisation",
    "description": "La publication des principes FAIR rappelle que la recherche numérique suppose des données bien décrites, identifiables et réutilisables dans des conditions explicites. FAIR n’implique pas que toutes les données soient ouvertes.",
    "source": "Wilkinson et al., Scientific Data (2016)",
    "url": "https://www.nature.com/articles/sdata201618",
    "icon": "data"
  },
  {
    "id": "2021",
    "year": "2021 et après",
    "era": "contemporain",
    "title": "Éthique, IA et pluralité des savoirs",
    "subtitle": "Des méthodes puissantes à interroger",
    "description": "La recommandation de l’UNESCO sur l’éthique de l’intelligence artificielle fournit un cadre de réflexion sur les droits, la responsabilité et les impacts sociaux. Les humanités numériques interrogent désormais aussi la production automatisée des résultats, les biais et la diversité des langues et des patrimoines.",
    "source": "UNESCO, Recommandation sur l’éthique de l’IA (2021)",
    "url": "https://www.unesco.org/en/legal-affairs/recommendation-ethics-artificial-intelligence",
    "icon": "ethics"
  }
];
export const DISCOVERY_CASES=[
  {
    "id": "manuscrits",
    "title": "Explorer des manuscrits marocains",
    "question": "Comment suivre les variantes d’un texte conservé dans plusieurs fonds ?",
    "source": "Manuscrits et notices de catalogues, cotes, reproductions autorisées.",
    "method": "Décrire les témoins, transcrire un échantillon et encoder les variantes en XML-TEI.",
    "outcome": "Une édition critique documentée qui renvoie aux fac-similés.",
    "caution": "Les lectures sont interprétées par des spécialistes ; droits et provenances doivent être contrôlés.",
    "href": "/arabes",
    "cta": "Explorer les humanités arabes"
  },
  {
    "id": "reseaux",
    "title": "Cartographier des correspondances",
    "question": "Quels itinéraires et acteurs relient un réseau intellectuel ?",
    "source": "Lettres datées, auteurs, destinataires et lieux mentionnés.",
    "method": "Constituer une table sourcée, harmoniser les identifiants et représenter des relations.",
    "outcome": "Un graphe et une carte explicitant les données absentes et incertaines.",
    "caution": "Une centralité de réseau ne mesure pas directement l’influence historique.",
    "href": "/cartographie",
    "cta": "Explorer les méthodes"
  },
  {
    "id": "presse",
    "title": "Comparer des journaux anciens",
    "question": "Comment évolue un thème dans des corpus de presse de périodes différentes ?",
    "source": "Pages numérisées, métadonnées, texte OCR contrôlé.",
    "method": "Préparer des sous-corpus comparables, analyser fréquences et concordances, relire les passages.",
    "outcome": "Un rapport associant indicateurs, extraits et références documentaires.",
    "caution": "L’OCR, les tailles de corpus et les contextes éditoriaux influencent les résultats.",
    "href": "/laboratoire",
    "cta": "Essayer le laboratoire"
  }
] as const;
export const DISCOVERY_SOURCES=[
  {
    "name": "Susan Hockey, The History of Humanities Computing (2004)",
    "url": "https://companions.digitalhumanities.org/DH/?chapter=content%2F9781405103213_chapter_1.html"
  },
  {
    "name": "JSTOR, Computers and the Humanities (1966–2004)",
    "url": "https://www.jstor.org/journal/comphuma"
  },
  {
    "name": "Mapping the Humanities, Oxford Text Archive",
    "url": "https://www.humanities.org.uk/infrastructures/4281"
  },
  {
    "name": "Text Encoding Initiative, History",
    "url": "https://tei-c.org/about/history/"
  },
  {
    "name": "Schreibman, Siemens et Unsworth (dir.), A Companion to Digital Humanities",
    "url": "https://companions.digitalhumanities.org/DH/"
  },
  {
    "name": "Marin Dacos, Manifeste des Digital Humanities",
    "url": "https://marin.dacos.org/manifeste-des-digital-humanities/"
  },
  {
    "name": "Wilkinson et al., Scientific Data (2016)",
    "url": "https://www.nature.com/articles/sdata201618"
  },
  {
    "name": "UNESCO, Recommandation sur l’éthique de l’IA (2021)",
    "url": "https://www.unesco.org/en/legal-affairs/recommendation-ethics-artificial-intelligence"
  },
  {
    "name": "Alternative Historiographies of the Digital Humanities (2021)",
    "url": "https://www.jstor.org/stable/j.ctv1r7878x"
  },
  {
    "name": "Hidden Histories of Digital Humanities",
    "url": "https://idohl.org/hiddenhistories/home"
  }
] as const;
