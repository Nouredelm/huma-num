export type ToolCategory =
  | 'Analyse textuelle'
  | 'Édition & HTR'
  | 'Réseaux & SIG'
  | 'Gestion & Données'
  | 'Services & Infrastructures';

export type LicenseType = 'Logiciel libre' | 'Institutionnel' | 'Freemium';
export type DifficultyLevel = 'Initiation' | 'Intermédiaire' | 'Avancé';

export interface DhTool {
  id: string;
  name: string;
  category: ToolCategory;
  license: LicenseType;
  level: DifficultyLevel;
  maintainer: string;
  summary: string;
  description: string;
  formats: string[];
  useCases: string[];
  workflowSteps: string[];
  url: string;
  citationBibtex: string;
}

export interface ResearchPhase {
  id: string;
  index: string;
  title: string;
  shortTitle: string;
  summary: string;
  standards: string[];
  pitfall: string;
  deliverable: string;
  recommendedToolIds: string[];
}

export interface TimelineMilestone {
  year: string;
  title: string;
  actor: string;
  description: string;
}

export interface CorpusItem {
  id: string;
  name: string;
  institution: string;
  scope: string;
  access: string;
  description: string;
  apiOrStandard: string;
  url: string;
}

export interface StandardSpec {
  id: string;
  name: string;
  acronym: string;
  domain: string;
  summary: string;
  whyItMatters: string;
  snippetLabel: string;
  snippet: string;
  url?: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  english: string;
  category: string;
  definition: string;
  related: string[];
}

export interface BibEntry {
  id: string;
  authors: string;
  year: number;
  title: string;
  publisher: string;
  theme: 'Fondements' | 'Méthodes' | 'Édition & Archives' | 'Épistémologie';
  abstract: string;
  iso690: string;
  bibtex: string;
}

export type EcosystemType = 'Revues' | 'Formations' | 'Infrastructures' | 'Réseaux & Veille';

export interface EcosystemItem {
  id: string;
  name: string;
  type: EcosystemType;
  location: string;
  accessNote: string;
  description: string;
  url: string;
}

export interface SavedItem {
  id: string;
  kind: 'outil' | 'corpus' | 'bibliographie';
  title: string;
  subtitle: string;
  url?: string;
  bibtex?: string;
  iso690?: string;
  note?: string;
}

export const GENERATED_IMAGES = {
  heroArchive: '/src/assets/images/hero_dh_archive_1795271930485.jpg',
  corpusDigitization: '/src/assets/images/corpus_digitization_1795271930604.jpg',
  spatialAtlas: '/src/assets/images/spatial_network_atlas_1795271931076.jpg',
  editorialPrinting: '/src/assets/images/editorial_printing_tei_1795271930875.jpg',
} as const;

export const RESEARCH_PHASES: ResearchPhase[] = [
  {
    id: 'collecte',
    index: '01',
    title: 'Collecte & Numérisation des sources',
    shortTitle: 'Collecte & Numérisation',
    summary:
      'Constituer un corpus fiable à partir d’archives physiques, de bibliothèques numériques (Gallica, Europeana) ou de moissonnage raisonné, tout en documentant la provenance de chaque témoin.',
    standards: ['IIIF Image / Presentation API', 'OAI-PMH', 'TIFF 600 dpi', 'METS / ALTO'],
    pitfall:
      'Collecter des images ou du texte brut sans conserver les métadonnées archivistiques (cote, folio, institution détentrice) compromet toute citation ultérieure.',
    deliverable: 'Dossier de corpus inventorié avec identifiants pérennes et plan de nommage normalisé.',
    recommendedToolIds: ['tropy', 'escriptorium', 'zotero', 'sharedocs'],
  },
  {
    id: 'structuration',
    index: '02',
    title: 'Structuration, Transcription & Encodage',
    shortTitle: 'Structuration & TEI',
    summary:
      'Transformer des fac-similés en données exploitables par reconnaissance d’écriture manuscrite (HTR), puis encoder structure logique, variantes et entités selon les recommandations de la TEI.',
    standards: ['XML-TEI P5', 'PageXML', 'ALTO XML', 'Dublin Core / EAD'],
    pitfall:
      'Surenchérir sur la granularité du balisage dès le début du projet rend la saisie insoutenable ; il faut formaliser un schéma ODD minimal adapté aux questions de recherche.',
    deliverable: 'Fichiers XML-TEI validés par schéma RelaxNG et transcriptions HTR relues.',
    recommendedToolIds: ['escriptorium', 'transkribus', 'oxygen-tei', 'openrefine'],
  },
  {
    id: 'analyse-textuelle',
    index: '03',
    title: 'Analyse textuelle, Lexicométrie & Stylométrie',
    shortTitle: 'Analyse textuelle',
    summary:
      'Articuler lecture distante et retour au texte grâce aux concordances, calculs de spécificités lexicales, lemmatisation morphosyntaxique et attribution stylométrique.',
    standards: ['UTF-8', 'CoNLL-U', 'XML-TXM', 'CSV tabulé'],
    pitfall:
      'Interpréter un nuage de mots ou une classification factorielle sans contrôler la qualité de l’OCR ou la taille inégale des sous-corpus fausse les résultats.',
    deliverable: 'Tableaux de spécificités, concordanciers et protocoles reproductibles (scripts R ou Python).',
    recommendedToolIds: ['txm', 'voyant', 'antconc', 'hyperbase', 'iramuteq', 'stylo', 'spacy'],
  },
  {
    id: 'spatial-reseaux',
    index: '04',
    title: 'Analyse spatiale, Cartographie & Réseaux',
    shortTitle: 'Réseaux & SIG',
    summary:
      'Modéliser des correspondances épistolaires, des circulations éditoriales ou des données prosopographiques sous forme de graphes et de systèmes d’information géographique historiques.',
    standards: ['GeoJSON', 'GEXF / GraphML', 'GeoTIFF', 'CIDOC-CRM'],
    pitfall:
      'Projeter des lieux anciens sur un fond cartographique contemporain anachronique sans géoréférencer les frontières historiques.',
    deliverable: 'Cartes thématiques reproductibles et graphes bipartites exportés avec table des nœuds.',
    recommendedToolIds: ['gephi', 'qgis', 'nodegoat', 'palladio', 'khartis', 'recogito'],
  },
  {
    id: 'edition-diffusion',
    index: '05',
    title: 'Édition critique & Valorisation scientifique',
    shortTitle: 'Édition & Visualisation',
    summary:
      'Publier les résultats dans des éditions numériques savantes reliant fac-similé synchronisé, apparat critique, index des personnes et narration scientifique ouverte.',
    standards: ['HTML5 / XSLT', 'IIIF Mirador', 'JSON-LD', 'OpenEdition / Hypothèses'],
    pitfall:
      'Dépendre d’un CMS propriétaire lourd pour publier une édition critique alors que la séparation entre source XML-TEI et moteur de rendu garantit la pérennité.',
    deliverable: 'Édition Web statique ou entrepôt consultable accompagné d’un apparat méthodologique.',
    recommendedToolIds: ['omeka-s', 'tei-publisher', 'mirador', 'hypotheses', 'oxygen-tei'],
  },
  {
    id: 'archivage-fair',
    index: '06',
    title: 'Archivage pérenne & Ouverture FAIR',
    shortTitle: 'Archivage & FAIR',
    summary:
      'Déposer jeux de données, codes et schémas dans des entrepôts disciplinaires certifiés pour garantir qu’ils restent Faciles à trouver, Accessibles, Interopérables et Réutilisables.',
    standards: ['Principes FAIR', 'DOI / ARK / Handle', 'Licences CC-BY / Etalab', 'DMP Opidor'],
    pitfall:
      'Héberger ses données uniquement sur un serveur de laboratoire non maintenu ou sur un disque personnel après la soutenance ou la fin du contrat.',
    deliverable: 'Dépôt Nakala / Zenodo doté d’un DOI, d’une licence explicite et d’un fichier README.',
    recommendedToolIds: ['nakala', 'dmp-opidor', 'hal-shs', 'heurist', 'zotero'],
  },
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: '1949',
    title: 'L’Index Thomisticus et les origines mécanographiques',
    actor: 'Roberto Busa & IBM',
    description:
      'Première lemmatisation automatique d’un corpus de onze millions de mots latins (Thomas d’Aquin), acte fondateur de l’informatique appliquée aux textes.',
  },
  {
    year: '1987',
    title: 'Naissance de la Text Encoding Initiative (TEI)',
    actor: 'Consortium TEI (Vassar College)',
    description:
      'Élaboration d’un standard commun d’encodage sémantique des textes patrimoniaux en SGML puis XML, aujourd’hui pilier de l’édition scientifique.',
  },
  {
    year: '2000',
    title: 'La « lecture distante » et l’histoire littéraire quantitative',
    actor: 'Franco Moretti',
    description:
      'Formalisation de méthodes statistiques, cartographiques et arborescentes pour interroger des séries littéraires dépassant l’échelle de la lecture individuelle.',
  },
  {
    year: '2010',
    title: 'Manifeste des Digital Humanities',
    actor: 'THATCamp Paris',
    description:
      'Texte collectif fondateur dans l’espace francophone affirmant les humanités numériques comme une transdiscipline ouverte aux méthodes, savoirs et valeurs du libre.',
  },
  {
    year: '2013',
    title: 'Structuration nationale avec l’infrastructure Huma-Num',
    actor: 'CNRS, Campus Condorcet & universités',
    description:
      'Déploiement des services Isidore, Nakala et des consortiums disciplinaires pour accompagner le cycle de vie des données en sciences humaines et sociales.',
  },
  {
    year: '2020–2026',
    title: 'HTR neuronal, IIIF généralisé et critique des modèles d’IA',
    actor: 'Communauté HN internationale',
    description:
      'Démocratisation de la transcription automatique des manuscrits (eScriptorium, Kraken) et interrogation épistémologique des grands modèles de langue sur corpus.',
  },
];

export const TOOLS: DhTool[] = [
  {
    id: 'txm',
    name: 'TXM (Textométrie)',
    category: 'Analyse textuelle',
    license: 'Logiciel libre',
    level: 'Intermédiaire',
    maintainer: 'ENS de Lyon / ICAR / CNRS',
    summary: 'Plateforme modulaire d’analyse textométrique et de concordances sur corpus XML-TEI annotés.',
    description:
      'Développé à l’ENS de Lyon, TXM combine les techniques statistiques de la lexicométrie française (spécificités, analyse factorielle des correspondances) avec un retour permanent aux éditions XML-TEI et aux concordanciers.',
    formats: ['XML-TEI', 'TXT', 'CSV', 'CoNLL-U'],
    useCases: [
      'Étude des spécificités lexicales selon des partitions chronologiques ou auctoriales',
      'Interrogation par expressions régulières sur le langage CQP (Corpus Query Processor)',
      'Retour synoptique vers les fac-similés et éditions annotées',
    ],
    workflowSteps: [
      'Préparer un corpus structuré (TXT avec métadonnées ou XML-TEI)',
      'Appliquer la tokénisation et l’étiquetage morphosyntaxique (TreeTagger / UDPipe)',
      'Calculer les cooccurrences, spécificités et graphiques de progression lexicale',
    ],
    url: 'https://txm.gitpages.huma-num.fr/textometrie/',
    citationBibtex: `@software{txm_heiden,\n  author = {Heiden, Serge and Magué, Jean-Philippe and Pincemin, Bénédicte},\n  title = {TXM : Plateforme logicielle open-source de textométrie},\n  institution = {ENS de Lyon, CNRS},\n  url = {https://txm.gitpages.huma-num.fr/textometrie/}\n}`,
  },
  {
    id: 'voyant',
    name: 'Voyant Tools',
    category: 'Analyse textuelle',
    license: 'Logiciel libre',
    level: 'Initiation',
    maintainer: 'Stéfan Sinclair & Geoffrey Rockwell',
    summary: 'Environnement Web d’exploration textuelle immédiate sans installation locale.',
    description:
      'Voyant Tools permet d’importer rapidement un corpus hétérogène (TXT, PDF, XML, URL) pour générer des vues interactives de fréquences, tendances lexicales, contextes KWIC et réseaux de cooccurrences.',
    formats: ['TXT', 'XML', 'HTML', 'PDF', 'DOCX'],
    useCases: [
      'Atelier pédagogique d’initiation à la lecture distante en licence ou master',
      'Repérage exploratoire des thèmes dominants dans un corpus d’articles de presse',
      'Intégration de panneaux interactifs (Cirrus, Trends) dans un carnet Hypothèses',
    ],
    workflowSteps: [
      'Charger un ou plusieurs documents via l’interface Web ou une instance locale Voyant Server',
      'Configurer une liste de mots vides (stopwords) adaptée à la langue du corpus',
      'Exporter les tableaux de fréquences et les concordances pour vérification qualitative',
    ],
    url: 'https://voyant-tools.org/',
    citationBibtex: `@misc{sinclair_rockwell_voyant,\n  author = {Sinclair, Stéfan and Rockwell, Geoffrey},\n  title = {Voyant Tools},\n  year = {2016},\n  url = {https://voyant-tools.org/}\n}`,
  },
  {
    id: 'iramuteq',
    name: 'IRaMuTeQ',
    category: 'Analyse textuelle',
    license: 'Logiciel libre',
    level: 'Intermédiaire',
    maintainer: 'Pierre Ratinaud (LERASS, Toulouse)',
    summary: 'Interface de R pour l’analyse multidimensionnelle de textes et de questionnaires (méthode Reinert).',
    description:
      'Très utilisé en sociologie, histoire contemporaine et sciences du langage, IRaMuTeQ automatise la classification descendante hiérarchique (méthode Alceste/Reinert) et les analyses de similitude à partir de corpus balisés.',
    formats: ['TXT balisé (****)', 'CSV', 'GraphML'],
    useCases: [
      'Classification thématique d’entretiens semi-directifs ou de réponses ouvertes',
      'Analyse des représentations sociales dans un corpus de discours politiques',
      'Visualisation des mondes lexicaux et de leurs variables associées',
    ],
    workflowSteps: [
      'Formatter le fichier texte brut avec les marqueurs de variables étoilées (**** *loc_01)',
      'Choisir le dictionnaire de lemmatisation adapté et lancer la classification Reinert',
      'Croiser les classes obtenues avec les segments de texte caractéristiques',
    ],
    url: 'http://www.iramuteq.org/',
    citationBibtex: `@software{ratinaud_iramuteq,\n  author = {Ratinaud, Pierre},\n  title = {IRaMuTeQ : Interface de R pour les Analyses Multidimensionnelles de Textes et de Questionnaires},\n  institution = {Université Toulouse Jean-Jaurès, LERASS},\n  url = {http://www.iramuteq.org/}\n}`,
  },
  {
    id: 'stylo',
    name: 'Stylo (Package R)',
    category: 'Analyse textuelle',
    license: 'Logiciel libre',
    level: 'Avancé',
    maintainer: 'Computational Stylistics Group (Maciej Eder et al.)',
    summary: 'Boîte à outils R de référence pour la stylométrie, l’attribution d’auteur et les arbres de consensus.',
    description:
      'Stylo offre une interface graphique simplifiée sous R ainsi que des fonctions scriptables pour calculer la distance Delta de Burrows, les analyses en composantes principales et les réseaux de proximité stylistique.',
    formats: ['TXT', 'XML', 'HTML', 'PDF (graphiques)'],
    useCases: [
      'Attribution de textes anonymes ou controversés (théâtre classique, pamphlets)',
      'Cartographie diachronique des proximités stylistiques d’un auteur ou d’un genre',
      'Analyse de traductions comparées par fréquence des mots-outils',
    ],
    workflowSteps: [
      'Organiser les fichiers dans un répertoire corpus/ avec nomenclature Auteur_Titre.txt',
      'Exécuter stylo() pour comparer les fréquences des 100 à 1000 mots les plus fréquents',
      'Valider la robustesse des regroupements via une analyse de consensus Bootstrap',
    ],
    url: 'https://computationalstylistics.github.io/stylo/',
    citationBibtex: `@article{eder2016stylo,\n  author = {Eder, Maciej and Rybicki, Jan and Kestemont, Mike},\n  title = {Stylometry with R: A Package for Computational Text Analysis},\n  journal = {The R Journal},\n  year = {2016},\n  volume = {8},\n  number = {1},\n  pages = {107--121}\n}`,
  },
  {
    id: 'spacy',
    name: 'spaCy',
    category: 'Analyse textuelle',
    license: 'Logiciel libre',
    level: 'Avancé',
    maintainer: 'Explosion AI / Communauté Python',
    summary: 'Bibliothèque Python industrielle et modulaire de traitement automatique des langues (TAL).',
    description:
      'Adoptée dans de nombreux projets d’humanités numériques, spaCy permet d’enchaîner tokénisation, lemmatisation, analyse syntaxique en dépendances et reconnaissance d’entités nommées (NER) sur de grands corpus.',
    formats: ['Python / JSON', 'CoNLL-U', 'DocBin'],
    useCases: [
      'Extraction automatique de noms de personnes, lieux et dates dans des archives judiciaires',
      'Fine-tuning de modèles d’entités nommées sur le français ancien ou classique',
      'Pré-annotation automatique avant conversion vers XML-TEI',
    ],
    workflowSteps: [
      'Installer le modèle linguistique adapté (fr_core_news_lg ou modèle spécialisé)',
      'Construire un pipeline nlp.pipe() optimisé pour le traitement par lots',
      'Évaluer la précision/rappel sur un échantillon annoté manuellement (gold standard)',
    ],
    url: 'https://spacy.io/',
    citationBibtex: `@software{honnibal_spacy,\n  author = {Honnibal, Matthew and Montani, Ines and Van Landeghem, Sofie and Boyd, Adriane},\n  title = {spaCy: Industrial-strength Natural Language Processing in Python},\n  year = {2020},\n  doi = {10.5281/zenodo.1212303}\n}`,
  },
  {
    id: 'escriptorium',
    name: 'eScriptorium',
    category: 'Édition & HTR',
    license: 'Logiciel libre',
    level: 'Intermédiaire',
    maintainer: 'EPHE / PSL / INRIA (Projet Scripta)',
    summary: 'Plateforme libre de segmentation et transcription automatique de manuscrits et imprimés anciens (HTR/OCR).',
    description:
      'Basé sur le moteur neuronal Kraken, eScriptorium permet de segmenter la mise en page complexe (gloses, colonnes, marginalia), d’entraîner des modèles HTR propres à un scriptorium ou une main, et d’exporter en ALTO ou PageXML.',
    formats: ['IIIF Manifest', 'ALTO XML', 'PageXML', 'TXT'],
    useCases: [
      'Transcription massive de registres paroissiaux, notariaux ou médiévaux',
      'Entraînement de modèles spécialisés pour des écritures non latines (arabe, grec, hébreu)',
      'Correction collaborative en ligne directement alignée sur l’image IIIF',
    ],
    workflowSteps: [
      'Importer les planches numérisées ou un manifeste IIIF depuis Gallica / e-codices',
      'Appliquer et corriger la segmentation (régions et lignes de base)',
      'Appliquer un modèle Kraken existant ou entraîner un modèle sur 30 à 50 pages transcrites',
    ],
    url: 'https://escriptorium.fr/',
    citationBibtex: `@inproceedings{kiessling2019escriptorium,\n  author = {Kiessling, Benjamin and Tissot, Robin and Stokes, Peter and Stökl Ben Ezra, Daniel},\n  title = {eScriptorium: An Open Source Platform for Historical Document Analysis},\n  booktitle = {ICDAR Workshops},\n  year = {2019}\n}`,
  },
  {
    id: 'transkribus',
    name: 'Transkribus',
    category: 'Édition & HTR',
    license: 'Freemium',
    level: 'Initiation',
    maintainer: 'READ-COOP (Université d’Innsbruck)',
    summary: 'Plateforme coopérative européenne de reconnaissance d’écritures manuscrites et imprimées historiques.',
    description:
      'Transkribus met à disposition un large catalogue de modèles publics multilingues prêts à l’emploi pour déchiffrer des archives du Moyen Âge au XXe siècle, avec des exports compatibles TEI et PDF indexable.',
    formats: ['XML-TEI', 'PageXML', 'ALTO', 'DOCX', 'PDF'],
    useCases: [
      'Déchiffrement rapide de correspondances manuscrites du XVIIIe–XIXe siècle',
      'Création de corpus consultables plein texte pour des fonds d’archives départementales',
      'Partage de modèles publics auprès de la communauté scientifique',
    ],
    workflowSteps: [
      'Téléverser un lot d’images dans une collection privée',
      'Tester un modèle public compatible avec la période et la langue du document',
      'Exporter les résultats en XML-TEI ou PageXML pour l’édition critique',
    ],
    url: 'https://www.transkribus.org/',
    citationBibtex: `@inproceedings{kahle2017transkribus,\n  author = {Kahle, Philipp and Colutto, Sebastian and Hackl, Günter and Mühlberger, Günter},\n  title = {Transkribus - A Service Platform for Transcription, Recognition and Retrieval of Historical Documents},\n  booktitle = {ICDAR},\n  year = {2017}\n}`,
  },
  {
    id: 'oxygen-tei',
    name: 'oXygen XML / Chaîne XML-TEI',
    category: 'Édition & HTR',
    license: 'Institutionnel',
    level: 'Intermédiaire',
    maintainer: 'Syncro Soft / Consortium TEI',
    summary: 'Environnement de référence pour la rédaction, la validation RelaxNG et la transformation XSLT d’éditions TEI.',
    description:
      'Bien que propriétaire, oXygen XML Editor reste l’atelier standard dans les laboratoires et écoles doctorales (École des chartes, CESR) pour éditer du XML-TEI P5, écrire des schémas ODD et exécuter des pipelines XSLT/XQuery.',
    formats: ['XML-TEI P5', 'ODD', 'RelaxNG', 'XSLT / XQuery'],
    useCases: [
      'Édition critique de correspondances avec apparat de variantes et index onomastique',
      'Encodage génétique de manuscrits d’écrivains modernes (ratures, ajouts, campagnes)',
      'Transformation vers HTML5, LaTeX/PDF ou ePub via TEI Publisher ou XSLT',
    ],
    workflowSteps: [
      'Définir un schéma ODD spécifique avec Roma (TEI Consortium)',
      'Valider en continu la conformité structurelle et sémantique des fichiers XML',
      'Publier via XSLT, eXist-db ou TEI Publisher avec visionneuse IIIF synchronisée',
    ],
    url: 'https://www.tei-c.org/',
    citationBibtex: `@manual{tei_consortium_p5,\n  author = {{TEI Consortium}},\n  title = {TEI P5: Guidelines for Electronic Text Encoding and Interchange},\n  year = {2025},\n  url = {https://www.tei-c.org/release/doc/tei-p5-doc/fr/html/}\n}`,
  },
  {
    id: 'omeka-s',
    name: 'Omeka S',
    category: 'Édition & HTR',
    license: 'Logiciel libre',
    level: 'Intermédiaire',
    maintainer: 'Roy Rosenzweig Center for History and New Media',
    summary: 'CMS scientifique orienté Web sémantique pour publier des collections patrimoniales et expositions virtuelles.',
    description:
      'Conçu spécifiquement pour les bibliothèques, musées et équipes de recherche, Omeka S permet de gérer plusieurs sites à partir d’un même réservoir de ressources décrites en RDF, Dublin Core, CIDOC-CRM et IIIF.',
    formats: ['JSON-LD', 'RDF', 'IIIF', 'Dublin Core', 'CSV'],
    useCases: [
      'Exposition numérique de fonds iconographiques ou photographiques d’un laboratoire',
      'Catalogue raisonné reliant œuvres, lieux, personnes et bibliographie Zotero',
      'Moissonnage et redistribution de notices via OAI-PMH',
    ],
    workflowSteps: [
      'Modéliser les modèles de ressources (Resource Templates) avec des vocabulaires standards',
      'Importer les items et médias (ou manifestes IIIF externes) par lot',
      'Construire des parcours éditoriaux thématiques par glisser-déposer de blocs',
    ],
    url: 'https://omeka.org/s/',
    citationBibtex: `@software{rrchnm_omeka_s,\n  author = {{Roy Rosenzweig Center for History and New Media}},\n  title = {Omeka S: Next-generation web publishing platform for institutions},\n  url = {https://omeka.org/s/}\n}`,
  },
  {
    id: 'gephi',
    name: 'Gephi',
    category: 'Réseaux & SIG',
    license: 'Logiciel libre',
    level: 'Initiation',
    maintainer: 'Consortium Gephi / Sciences Po médialab',
    summary: 'Logiciel de référence pour l’exploration, la spatialisation et l’analyse statistique de réseaux.',
    description:
      'Gephi permet de visualiser et de mesurer la topologie de réseaux sociaux historiques, de graphes de citations ou de réseaux bipartites (acteurs × lieux), avec calcul de centralités, modularité et exports vectoriels haute définition.',
    formats: ['GEXF', 'GraphML', 'CSV (Nœuds/Liens)', 'SVG / PDF'],
    useCases: [
      'Analyse des réseaux de sociabilité et de correspondance de la République des Lettres',
      'Détection de communautés dans des données prosopographiques',
      'Cartographie des citations entre revues ou institutions académiques',
    ],
    workflowSteps: [
      'Préparer deux tables CSV propres : une table des nœuds (Id, Label) et des liens (Source, Target)',
      'Calculer les métriques de graphe (degré, centralité d’intermédiarité, modularité)',
      'Appliquer un algorithme de spatialisation (ForceAtlas2) puis exporter en SVG ou GEXF',
    ],
    url: 'https://gephi.org/',
    citationBibtex: `@inproceedings{bastian2009gephi,\n  author = {Bastian, Mathieu and Heymann, Sebastien and Jacomy, Mathieu},\n  title = {Gephi: An Open Source Software for Exploring and Manipulating Networks},\n  booktitle = {ICWSM},\n  year = {2009}\n}`,
  },
  {
    id: 'qgis',
    name: 'QGIS',
    category: 'Réseaux & SIG',
    license: 'Logiciel libre',
    level: 'Intermédiaire',
    maintainer: 'OSGeo / Communauté QGIS',
    summary: 'Système d’information géographique (SIG) libre pour les humanités spatiales et la cartographie historique.',
    description:
      'QGIS est incontournable en archéologie, histoire urbaine et géographie historique : il permet de géoréférencer des plans anciens sur des référentiels modernes, de numériser des parcellaires et de réaliser des analyses spatiales.',
    formats: ['GeoJSON', 'Shapefile', 'GeoPackage', 'GeoTIFF', 'CSV'],
    useCases: [
      'Géoréférencement de cadastres napoléoniens ou de cartes de Cassini',
      'Reconstitution vectorielle de l’évolution du bâti ou des réseaux de transport',
      'Jointure de données démographiques ou fiscales historiques à l’échelle communale',
    ],
    workflowSteps: [
      'Définir un système de coordonnées de référence adapté (ex. Lambert-93 ou WGS84)',
      'Géoréférencer le plan ancien par points de contrôle fiables (églises, carrefours)',
      'Vectoriser les entités dans un GeoPackage et rédiger la mise en page cartographique',
    ],
    url: 'https://qgis.org/',
    citationBibtex: `@software{qgis_project,\n  author = {{QGIS Development Team}},\n  title = {QGIS Geographic Information System},\n  organization = {Open Source Geospatial Foundation},\n  url = {https://qgis.org/}\n}`,
  },
  {
    id: 'palladio',
    name: 'Palladio',
    category: 'Réseaux & SIG',
    license: 'Logiciel libre',
    level: 'Initiation',
    maintainer: 'Stanford Humanities + Design Lab',
    summary: 'Application Web légère pour croiser rapidement cartes, graphes et chronologies sur des données tabulaires.',
    description:
      'Conçu pour l’exploration rapide sans programmation, Palladio permet de charger un simple tableur CSV contenant des dates, coordonnées et relations afin d’en tester visuellement les dynamiques spatiales et relationnelles.',
    formats: ['CSV', 'TSV', 'JSON (projet)'],
    useCases: [
      'Visualisation exploratoire de trajets d’artistes ou d’imprimeurs entre XVIe et XVIIIe siècle',
      'Atelier pratique de découverte des humanités spatiales et des réseaux',
      'Croisement rapide entre filtre chronologique et graphe de relations',
    ],
    workflowSteps: [
      'Nettoyer une table CSV contenant colonnes de dates, coordonnées (lat, lon) et entités',
      'Importer les données dans le navigateur (traitement local côté client)',
      'Basculer entre vue Carte, vue Graphe et facettes temporelles pour formuler des hypothèses',
    ],
    url: 'https://hdlab.stanford.edu/palladio/',
    citationBibtex: `@software{stanford_palladio,\n  author = {{Humanities + Design Research Lab, Stanford University}},\n  title = {Palladio: Visualize complex historical data with ease},\n  url = {https://hdlab.stanford.edu/palladio/}\n}`,
  },
  {
    id: 'khartis',
    name: 'Khartis',
    category: 'Réseaux & SIG',
    license: 'Logiciel libre',
    level: 'Initiation',
    maintainer: 'Atelier de cartographie de Sciences Po',
    summary: 'Outil libre de cartographie thématique respectant rigoureusement les règles de sémiologie graphique.',
    description:
      'Khartis guide les chercheurs dans la création de cartes statistiques justes (symboles proportionnels, plages colorées, double représentation) à partir de données géographiques ou de fonds de cartes historiques et contemporains.',
    formats: ['CSV', 'SVG', 'PNG', 'Fonds GeoJSON'],
    useCases: [
      'Production de cartes de publication prêtes pour l’édition imprimée ou Web (SVG)',
      'Représentation de flux migratoires, électoraux ou commerciaux',
      'Validation des choix de discrétisation et de palettes perceptuellement uniformes',
    ],
    workflowSteps: [
      'Choisir un fond de carte ou importer son propre fond GeoJSON',
      'Importer le tableau CSV et vérifier l’appariement des identifiants géographiques',
      'Sélectionner la visualisation adaptée au type de variable (stock vs ratio) et exporter en SVG',
    ],
    url: 'https://www.sciencespo.fr/cartographie/khartis/',
    citationBibtex: `@software{sciencespo_khartis,\n  author = {{Atelier de cartographie de Sciences Po}},\n  title = {Khartis : Outil de cartographie thématique},\n  url = {https://www.sciencespo.fr/cartographie/khartis/}\n}`,
  },
  {
    id: 'recogito',
    name: 'Recogito',
    category: 'Réseaux & SIG',
    license: 'Logiciel libre',
    level: 'Initiation',
    maintainer: 'Pelagios Network',
    summary: 'Espace d’annotation sémantique collaborative reliant textes, images et gazetteers géographiques.',
    description:
      'Recogito permet d’annoter des entités géographiques et des personnes directement sur des textes ou des cartes numérisées, puis de les aligner sur des référentiels ouverts (Pleiades, GeoNames, Wikidata) pour générer cartes et exports TEI ou RDF.',
    formats: ['XML-TEI', 'CSV', 'GeoJSON', 'RDF (Web Annotation)'],
    useCases: [
      'Alignement toponymique de récits de voyage anciens sur des gazetteers historiques',
      'Annotation pédagogique collective d’un corpus de sources en séminaire',
      'Génération rapide de jeux de données géolocalisées sans codage manuel',
    ],
    workflowSteps: [
      'Importer un texte brut, un XML-TEI ou un manifeste IIIF dans un espace de travail',
      'Surligner les toponymes et valider leur résolution sur Pleiades ou GeoNames',
      'Visualiser la carte générée et exporter en CSV, GeoJSON ou XML-TEI enrichi',
    ],
    url: 'https://recogito.pelagios.org/',
    citationBibtex: `@article{simon2017recogito,\n  author = {Simon, Rainer and Barker, Elton and Isaksen, Leif and de Soto Cañamares, Pau},\n  title = {Linked Data Annotation Without the Pointy Brackets: Introducing Recogito 2},\n  journal = {Journal of Map & Geography Libraries},\n  year = {2017}\n}`,
  },
  {
    id: 'zotero',
    name: 'Zotero',
    category: 'Gestion & Données',
    license: 'Logiciel libre',
    level: 'Initiation',
    maintainer: 'Corporation for Digital Scholarship',
    summary: 'Gestionnaire de références bibliographiques, de PDF et de sources archivistiques en open source.',
    description:
      'Indispensable dans toute démarche scientifique, Zotero capture les métadonnées depuis les catalogues (BnF, Sudoc, OpenEdition, Isidore), génère des citations conformes aux styles francophones (CSL) et permet de travailler en bibliothèques de groupe.',
    formats: ['BibTeX / BibLaTeX', 'RIS', 'CSL-JSON', 'RDF'],
    useCases: [
      'Constitution d’une bibliographie collaborative de laboratoire ou de séminaire',
      'Rédaction dans LibreOffice, Word ou LaTeX/Pandoc avec citations dynamiques',
      'Export structuré pour alimenter un carnet Hypothèses ou un dépôt Omeka',
    ],
    workflowSteps: [
      'Installer Zotero et le connecteur navigateur pour capter les notices bibliographiques',
      'Organiser les collections thématiques et normaliser les étiquettes (tags)',
      'Exporter en BibLaTeX ou connecter directement à son éditeur de texte',
    ],
    url: 'https://www.zotero.org/',
    citationBibtex: `@software{zotero_cds,\n  author = {{Corporation for Digital Scholarship}},\n  title = {Zotero: Your personal research assistant},\n  url = {https://www.zotero.org/}\n}`,
  },
  {
    id: 'tropy',
    name: 'Tropy',
    category: 'Gestion & Données',
    license: 'Logiciel libre',
    level: 'Initiation',
    maintainer: 'Digital Scholar (RRCHNM)',
    summary: 'Gestionnaire d’images de recherche pensé pour organiser et décrire les photographies prises en archives.',
    description:
      'Tropy comble le fossé entre la prise de vue en salle de lecture et l’exploitation scientifique : il regroupe les clichés d’un même dossier d’archive, permet d’appliquer des modèles de métadonnées (fonds, cote, folio) et de transcrire en regard.',
    formats: ['JSON-LD', 'CSV', 'OMK (Omeka)', 'IIIF'],
    useCases: [
      'Classement de milliers de photos d’archives non cataloguées prises sur le terrain',
      'Description archivistique fine respectant les normes ISAD(G) ou Dublin Core',
      'Annotation et recadrage de détails paléographiques ou sigillographiques',
    ],
    workflowSteps: [
      'Importer les dossiers de photographies par campagne d’archives',
      'Fusionner les clichés appartenant à une même pièce d’archive et renseigner la cote',
      'Exporter les notices et transcriptions vers Omeka S ou Markdown',
    ],
    url: 'https://tropy.org/',
    citationBibtex: `@software{tropy_ds,\n  author = {{Digital Scholar}},\n  title = {Tropy: Research photo management},\n  url = {https://tropy.org/}\n}`,
  },
  {
    id: 'nakala',
    name: 'Nakala (Huma-Num)',
    category: 'Gestion & Données',
    license: 'Institutionnel',
    level: 'Intermédiaire',
    maintainer: 'IR* Huma-Num (CNRS)',
    summary: 'Entrepôt disciplinaire français pour partager, publier et pérenniser les données de recherche en SHS.',
    description:
      'Nakala attribue automatiquement des identifiants pérennes (DOI) aux jeux de données déposés, expose les images en IIIF, garantit leur archivage à long terme au CINES et s’intègre aux principaux outils d’édition (Omeka, Isidore).',
    formats: ['Tous formats ouverts', 'IIIF', 'Dublin Core / DataCite', 'API REST'],
    useCases: [
      'Dépôt FAIR d’un corpus de recherche associé à une thèse ou un programme ANR',
      'Diffusion d’images patrimoniales via un serveur IIIF institutionnel sans coût d’hébergement',
      'Moissonnage automatique des métadonnées par le moteur de recherche Isidore',
    ],
    workflowSteps: [
      'Se connecter avec son compte fédéré (Renater / HumanID) et préparer les métadonnées minimales',
      'Déposer les données avec licence ouverte (CC-BY, Etalab) et regrouper en collections',
      'Citer le DOI généré dans le Plan de Gestion de Données (DMP) et les publications',
    ],
    url: 'https://nakala.fr/',
    citationBibtex: `@misc{humanum_nakala,\n  author = {{IR* Huma-Num}},\n  title = {Nakala : Entrepôt de données de recherche en sciences humaines et sociales},\n  institution = {CNRS},\n  url = {https://nakala.fr/}\n}`,
  },
  {
    id: 'antconc',
    name: 'AntConc',
    category: 'Analyse textuelle',
    license: 'Freemium',
    level: 'Initiation',
    maintainer: 'Laurence Anthony (Waseda University)',
    summary: 'Concordancier léger multiplateforme pour l’exploration rapide de corpus textuels et collocations.',
    description:
      'Très répandu en linguistique de corpus, traduction et études littéraires, AntConc fonctionne sans installation serveur et permet d’extraire concordances KWIC, n-grammes, mots-clés statistiques (keyness) et cartes de dispersion.',
    formats: ['TXT (UTF-8)', 'XML simplifié', 'CSV'],
    useCases: [
      'Repérage rapide de collocations et d’expressions figées dans un corpus littéraire',
      'Comparaison de mots-clés spécifiques entre deux corpus (corpus d’étude vs corpus de référence)',
      'Visualisation de la répartition d’un terme le long d’une œuvre (Plot)',
    ],
    workflowSteps: [
      'Convertir les textes sources au format TXT encodé en UTF-8',
      'Charger le dossier de corpus dans File > Open Corpus Manager',
      'Interroger les motifs lexicaux via KWIC, Clusters/N-Grams et Keyword List',
    ],
    url: 'https://www.laurenceanthony.net/software/antconc/',
    citationBibtex: `@software{anthony_antconc,\n  author = {Anthony, Laurence},\n  title = {AntConc: A freeware corpus analysis toolkit for concordancing and text analysis},\n  institution = {Waseda University},\n  url = {https://www.laurenceanthony.net/software/antconc/}\n}`,
  },
  {
    id: 'hyperbase',
    name: 'Hyperbase',
    category: 'Analyse textuelle',
    license: 'Institutionnel',
    level: 'Intermédiaire',
    maintainer: 'Laboratoire BCL (UMR 7320, Université Côte d’Azur / CNRS)',
    summary: 'Logiciel de logométrie et d’analyse statistique approfondie des grands corpus littéraires et politiques.',
    description:
      'Héritier de l’école française de statistique lexicale fondée par Étienne Brunet, Hyperbase associe indexation hypertextuelle, calcul d’accroissement lexical, distance intertextuelle et analyses factorielles sur des corpus lemmatisés.',
    formats: ['TXT balisé', 'CSV', 'Exports graphiques'],
    useCases: [
      'Mesure de la richesse lexicale et de la distance stylistique entre écrivains ou discours',
      'Étude diachronique des thèmes et vocabulaires politiques sur plusieurs décennies',
      'Exploration hypertextuelle des cooccurrences et contextes d’apparition',
    ],
    workflowSteps: [
      'Préparer les textes partitionnés par auteur, date ou locuteur',
      'Importer et lemmatiser le corpus dans l’environnement Hyperbase Web ou bureau',
      'Générer les arbres arborés de proximité et courbes d’évolution lexicale',
    ],
    url: 'https://hyperbase.unice.fr/',
    citationBibtex: `@software{brunet_hyperbase,\n  author = {Brunet, Étienne and Vanni, Laurent},\n  title = {Hyperbase : Logiciel de traitement documentaire et statistique des corpus textuels},\n  institution = {BCL, CNRS, Université Côte d'Azur},\n  url = {https://hyperbase.unice.fr/}\n}`,
  },
  {
    id: 'tei-publisher',
    name: 'TEI Publisher',
    category: 'Édition & HTR',
    license: 'Logiciel libre',
    level: 'Intermédiaire',
    maintainer: 'e-editiones Society',
    summary: 'Boîte à outils et moteur de publication open source pour transformer directement le XML-TEI en éditions Web.',
    description:
      'Basé sur la spécification TEI Processing Model (incluse dans les fichiers ODD), TEI Publisher permet de publier des éditions critiques, fac-similés IIIF synchronisés, traductions parallèles et exports LaTeX/PDF/ePub sans écrire de lourdes feuilles XSLT.',
    formats: ['XML-TEI P5', 'ODD (Processing Model)', 'IIIF', 'HTML5 / LaTeX / ePub'],
    useCases: [
      'Déploiement rapide d’une édition critique numérique avec vue synoptique image/texte',
      'Génération multiformat (site Web, PDF imprimable, ePub) depuis une même source TEI',
      'Création d’un portail d’édition collaboratif pérenne sans dépendance propriétaire',
    ],
    workflowSteps: [
      'Rédiger les règles de rendu <model> dans le fichier ODD du projet',
      'Déposer les fichiers XML-TEI dans l’instance eXist-db ou Docker de TEI Publisher',
      'Générer et personnaliser l’application autonome d’édition critique',
    ],
    url: 'https://teipublisher.com/',
    citationBibtex: `@software{eeditiones_tei_publisher,\n  author = {{e-editiones Society}},\n  title = {TEI Publisher: The Instant Publishing Toolbox},\n  url = {https://teipublisher.com/}\n}`,
  },
  {
    id: 'mirador',
    name: 'Mirador (Visionneuse IIIF)',
    category: 'Édition & HTR',
    license: 'Logiciel libre',
    level: 'Initiation',
    maintainer: 'Project Mirador / Consortium IIIF',
    summary: 'Visionneuse et espace de travail comparatif pour consulter et annoter des manuscrits IIIF multi-sources.',
    description:
      'Mirador permet d’ouvrir côte à côte des manuscrits conservés dans différentes institutions (Gallica, Vatican, Bodleian, Nakala) à partir de l’URL de leur manifeste IIIF, de zoomer en très haute définition et d’afficher les couches d’annotations ou transcriptions.',
    formats: ['IIIF Presentation API 2/3', 'IIIF Image API', 'Web Annotation (JSON-LD)'],
    useCases: [
      'Comparaison paléographique simultanée de plusieurs témoins d’un même texte médiéval',
      'Reconstitution virtuelle d’un manuscrit démembré entre plusieurs bibliothèques',
      'Intégration d’une visionneuse scientifique zoomable dans Omeka S ou une édition TEI',
    ],
    workflowSteps: [
      'Récupérer l’URL du manifeste IIIF (manifest.json) sur Gallica, Biblissima ou Nakala',
      'Charger un ou plusieurs manifestes dans l’espace multi-fenêtres Mirador',
      'Activer les panneaux de tables des matières, métadonnées et annotations',
    ],
    url: 'https://projectmirador.org/',
    citationBibtex: `@software{project_mirador,\n  author = {{Project Mirador Contributors}},\n  title = {Mirador: Open-source configurable IIIF viewer},\n  url = {https://projectmirador.org/}\n}`,
  },
  {
    id: 'nodegoat',
    name: 'nodegoat',
    category: 'Réseaux & SIG',
    license: 'Logiciel libre',
    level: 'Intermédiaire',
    maintainer: 'LAB1100 (Pim van Bree & Geert Kessels)',
    summary: 'Environnement Web de gestion de données relationnelles, diachroniques et spatiales pour les SHS.',
    description:
      'Conçu spécialement pour l’histoire, la prosopographie et la sociologie historique, nodegoat permet de modéliser des objets complexes situés dans le temps et l’espace (sub-objects datés et géolocalisés) et d’en visualiser instantanément cartes et réseaux dynamiques.',
    formats: ['CSV', 'JSON', 'GeoJSON', 'RDF / API REST'],
    useCases: [
      'Base prosopographique retraçant carrières, résidences et sociabilités sur plusieurs siècles',
      'Cartographie dynamique et filtrage chronologique de réseaux d’acteurs historiques',
      'Modélisation de données biographiques avec gestion de l’incertitude chronologique',
    ],
    workflowSteps: [
      'Définir les types d’objets (Personnes, Œuvres, Institutions) et leurs sous-objets datés',
      'Importer les données par lots CSV ou saisir via des formulaires normalisés',
      'Explorer et exporter les vues géo-temporelles et graphes de relations',
    ],
    url: 'https://nodegoat.net/',
    citationBibtex: `@software{vanbree_nodegoat,\n  author = {van Bree, Pim and Kessels, Geert},\n  title = {nodegoat: A web-based data management, network analysis & visualisation environment},\n  organization = {LAB1100},\n  url = {https://nodegoat.net/}\n}`,
  },
  {
    id: 'openrefine',
    name: 'OpenRefine',
    category: 'Gestion & Données',
    license: 'Logiciel libre',
    level: 'Initiation',
    maintainer: 'Communauté OpenRefine (ex-Freebase Gridworks)',
    summary: 'Atelier libre pour nettoyer, transformer et réconcilier des données tabulaires avec des référentiels ouverts.',
    description:
      'Exécuté localement dans le navigateur sans envoyer les données en ligne, OpenRefine détecte les doublons orthographiques (clustering), normalise dates et toponymes et aligne automatiquement les entités avec Wikidata, IdRef, VIAF ou GeoNames.',
    formats: ['CSV / TSV', 'JSON', 'XML', 'XLSX', 'RDF'],
    useCases: [
      'Nettoyage d’inventaires d’archives ou de tableaux prosopographiques hétérogènes',
      'Alignement automatique de noms d’auteurs ou de lieux sur Wikidata et IdRef',
      'Enrichissement de corpus par interrogation d’API externes directement en colonnes',
    ],
    workflowSteps: [
      'Créer un projet en important un fichier CSV, Excel ou JSON',
      'Appliquer les facettes et algorithmes de regroupement (Text Facet > Cluster) pour normaliser',
      'Lancer une réconciliation (Reconcile) vers Wikidata ou GeoNames puis exporter en CSV propre',
    ],
    url: 'https://openrefine.org/',
    citationBibtex: `@software{openrefine_community,\n  author = {{OpenRefine Contributors}},\n  title = {OpenRefine: A free, open source power tool for working with messy data},\n  url = {https://openrefine.org/}\n}`,
  },
  {
    id: 'sharedocs',
    name: 'Sharedocs (Huma-Num)',
    category: 'Services & Infrastructures',
    license: 'Institutionnel',
    level: 'Initiation',
    maintainer: 'IR* Huma-Num (CNRS)',
    summary: 'Service collaboratif national de stockage sécurisé, partage de fichiers et exposition Web/IIIF pour les SHS.',
    description:
      'Hébergé sur l’infrastructure publique du CNRS, Sharedocs offre aux équipes de recherche un espace souverain (Nextcloud + serveur Web/IIIF) pour stocker des corpus en cours d’élaboration, gérer les droits par groupe et publier des ressources de travail.',
    formats: ['Stockage multi-formats', 'WebDAV', 'IIIF', 'Partage fédéré HumanID'],
    useCases: [
      'Partage souverain de campagnes de numérisation ou de transcriptions au sein d’un projet ANR',
      'Exposition directe de dossiers d’images au format IIIF pour alimenter eScriptorium ou Omeka',
      'Travail collaboratif sans recourir à des clouds commerciaux hors Union européenne',
    ],
    workflowSteps: [
      'Demander l’ouverture d’un espace projet auprès d’Huma-Num avec son compte HumanID',
      'Organiser l’arborescence partagée et attribuer les droits de lecture/écriture aux partenaires',
      'Synchroniser en local via WebDAV ou exposer les répertoires Web/IIIF utiles au projet',
    ],
    url: 'https://documentation.huma-num.fr/sharedocs/',
    citationBibtex: `@misc{humanum_sharedocs,\n  author = {{IR* Huma-Num}},\n  title = {Sharedocs : Service de partage et de stockage collaboratif pour les SHS},\n  institution = {CNRS},\n  url = {https://documentation.huma-num.fr/sharedocs/}\n}`,
  },
  {
    id: 'dmp-opidor',
    name: 'DMP OPIDoR (Inist-CNRS)',
    category: 'Services & Infrastructures',
    license: 'Institutionnel',
    level: 'Initiation',
    maintainer: 'Inist-CNRS',
    summary: 'Service en ligne d’accompagnement pour rédiger et partager des Plans de Gestion de Données (DMP) FAIR.',
    description:
      'Outil national de référence mis à disposition par le CNRS, DMP OPIDoR propose des modèles structurés (ANR, Horizon Europe, Science Europe) et des recommandations disciplinaires pour planifier la collecte, l’éthique, les licences et l’archivage des données SHS.',
    formats: ['Modèles ANR / Horizon Europe', 'Export PDF / DOCX / JSON (maDMP)'],
    useCases: [
      'Rédaction du Plan de Gestion de Données exigé à T+6 mois par l’ANR ou Horizon Europe',
      'Formalisation de la politique de sauvegarde et d’ouverture des données d’une thèse',
      'Collaboration entre chercheurs, ingénieurs et délégués à la protection des données (DPO)',
    ],
    workflowSteps: [
      'Se connecter via la fédération d’identité académique (Renater) et choisir le modèle ANR ou générique',
      'Renseigner les jeux de données du projet (formats ouverts, métadonnées, entrepôt Nakala)',
      'Partager le plan avec l’équipe et exporter la version livrable en PDF ou maDMP JSON',
    ],
    url: 'https://dmp.opidor.fr/',
    citationBibtex: `@misc{inist_dmp_opidor,\n  author = {{Inist-CNRS}},\n  title = {DMP OPIDoR : Outil d'aide à la rédaction de plans de gestion de données},\n  institution = {CNRS},\n  url = {https://dmp.opidor.fr/}\n}`,
  },
  {
    id: 'hal-shs',
    name: 'HAL-SHS & Sciencesconf (CCSD)',
    category: 'Services & Infrastructures',
    license: 'Institutionnel',
    level: 'Initiation',
    maintainer: 'CCSD (CNRS, INRIA, INRAE)',
    summary: 'Services nationaux d’archive ouverte pluridisciplinaire, gestion de colloques et revues Episciences.',
    description:
      'Le Centre pour la communication scientifique directe (CCSD) opère l’archive ouverte HAL (et son portail HAL-SHS) pour le dépôt pérenne des publications et thèses, ainsi que Sciencesconf pour l’organisation des colloques et Episciences pour les épi-revues diamant.',
    formats: ['PDF/A', 'XML-TEI HAL', 'BibTeX', 'API REST / OAI-PMH', 'SWORD'],
    useCases: [
      'Dépôt en accès ouvert des articles, communications et thèses avec identifiant pérenne',
      'Création d’une collection HAL de laboratoire ou de programme de recherche avec export CV',
      'Gestion complète des soumissions, relectures et actes d’un colloque sur Sciencesconf',
    ],
    workflowSteps: [
      'Créer son IdHAL pour unifier ses différentes formes de signature d’auteur',
      'Déposer le manuscrit auteur accepté (MAA) ou la publication ouverte avec métadonnées complètes',
      'Récupérer les exports BibTeX, TEI ou listes de publications pour les rapports HCÉRES / ANR',
    ],
    url: 'https://hal.science/',
    citationBibtex: `@misc{ccsd_hal,\n  author = {{CCSD - CNRS}},\n  title = {HAL : Archive ouverte pluridisciplinaire},\n  institution = {CNRS},\n  url = {https://hal.science/}\n}`,
  },
  {
    id: 'heurist',
    name: 'Heurist (Service Huma-Num)',
    category: 'Services & Infrastructures',
    license: 'Logiciel libre',
    level: 'Intermédiaire',
    maintainer: 'University of Sydney / IR* Huma-Num',
    summary: 'Service hébergé de conception de bases de données relationnelles et éditoriales sans programmation pour les SHS.',
    description:
      'Déployé gratuitement pour la communauté française via Huma-Num, Heurist permet aux chercheurs en histoire, archéologie ou histoire de l’art de modéliser rapidement des bases de données complexes (entités, relations, cartes, chronologies) et d’en générer le site Web public.',
    formats: ['XML', 'JSON', 'GeoJSON', 'CSV', 'RDF / KML'],
    useCases: [
      'Création d’une base prosopographique, archéologique ou d’inventaire patrimonial sans développeur',
      'Visualisation cartographique et réseau directement adossée aux fiches de recherche',
      'Publication d’un site vitrine et moteur de recherche multi-critères hébergé durablement',
    ],
    workflowSteps: [
      'Ouvrir une base sur l’instance heurist.huma-num.fr via son compte HumanID',
      'Adapter les types d’entités et vocabulaires contrôlés à son objet d’étude',
      'Importer les données CSV/XML et publier les vues Web, cartes et réseaux',
    ],
    url: 'https://heurist.huma-num.fr/',
    citationBibtex: `@software{johnson_heurist,\n  author = {Johnson, Ian},\n  title = {Heurist: Flexible database and web publishing system for humanities research},\n  institution = {University of Sydney / IR* Huma-Num},\n  url = {https://heuristnetwork.org/}\n}`,
  },
  {
    id: 'hypotheses',
    name: 'Hypothèses (OpenEdition)',
    category: 'Services & Infrastructures',
    license: 'Institutionnel',
    level: 'Initiation',
    maintainer: 'OpenEdition (CNRS, AMU, EHESS, Avignon Université)',
    summary: 'Service public d’hébergement et de valorisation de carnets de recherche scientifiques en sciences humaines.',
    description:
      'Plateforme francophone et européenne de blogging scientifique, Hypothèses permet de documenter la recherche « en train de se faire » (billets méthodologiques, séminaires, veille bibliographique) avec attribution d’un ISSN et indexation automatique dans Isidore et la BnF.',
    formats: ['WordPress scientifique', 'RSS / Atom', 'OAI-PMH', 'Intégration Zotero / Nakala'],
    useCases: [
      'Diffusion régulière des avancées méthodologiques et comptes rendus d’un séminaire doctoral',
      'Valorisation ouverte des coulisses d’une édition critique ou d’une enquête de terrain',
      'Publication de bibliographies commentées synchronisées avec Zotero',
    ],
    workflowSteps: [
      'Soumettre une demande d’ouverture de carnet présentant le projet éditorial scientifique',
      'Configurer les métadonnées académiques et obtenir l’ISSN du carnet',
      'Publier des billets citables et archivés sur le long terme dans le catalogue OpenEdition',
    ],
    url: 'https://hypotheses.org/',
    citationBibtex: `@misc{openedition_hypotheses,\n  author = {{OpenEdition}},\n  title = {Hypothèses : Plateforme de carnets de recherche en sciences humaines et sociales},\n  institution = {CNRS, EHESS, Aix-Marseille Université},\n  url = {https://hypotheses.org/}\n}`,
  },
  {
    "id": "kraken",
    "name": "Kraken",
    "category": "Édition & HTR",
    "license": "Logiciel libre",
    "level": "Avancé",
    "maintainer": "Projet et communauté — voir le site officiel",
    "url": "https://kraken.re/",
    "summary": "OCR et HTR pour les documents historiques, dont des écritures arabes.",
    "description": "OCR et HTR pour les documents historiques, dont des écritures arabes. Choisir les paramètres selon le corpus, documenter les versions et vérifier les résultats sur un échantillon de référence.",
    "formats": [
      "PAGE XML",
      "ALTO XML",
      "TXT"
    ],
    "useCases": [
      "OCR et HTR pour les documents historiques, dont des écritures arabes."
    ],
    "workflowSteps": [
      "Constituer des transcriptions de référence",
      "Séparer entraînement et test",
      "Mesurer le CER et relire les erreurs"
    ],
    "citationBibtex": "@misc{kraken,\n title={Kraken},\n howpublished={https://kraken.re/},\n note={Documentation officielle ; préciser la version utilisée}\n}"
  },
  {
    "id": "tesseract",
    "name": "Tesseract OCR",
    "category": "Édition & HTR",
    "license": "Logiciel libre",
    "level": "Intermédiaire",
    "maintainer": "Projet et communauté — voir le site officiel",
    "url": "https://tesseract-ocr.github.io/",
    "summary": "Reconnaissance de caractères imprimés ; choisir un modèle linguistique adapté.",
    "description": "Reconnaissance de caractères imprimés ; choisir un modèle linguistique adapté. Choisir les paramètres selon le corpus, documenter les versions et vérifier les résultats sur un échantillon de référence.",
    "formats": [
      "TXT",
      "hOCR",
      "TSV"
    ],
    "useCases": [
      "Reconnaissance de caractères imprimés ; choisir un modèle linguistique adapté."
    ],
    "workflowSteps": [
      "Préparer les images",
      "Sélectionner le modèle linguistique",
      "Comparer à une transcription humaine"
    ],
    "citationBibtex": "@misc{tesseract,\n title={Tesseract OCR},\n howpublished={https://tesseract-ocr.github.io/},\n note={Documentation officielle ; préciser la version utilisée}\n}"
  },
  {
    "id": "catma",
    "name": "CATMA",
    "category": "Analyse textuelle",
    "license": "Logiciel libre",
    "level": "Initiation",
    "maintainer": "Projet et communauté — voir le site officiel",
    "url": "https://catma.de/",
    "summary": "Annotation qualitative et exploration collaborative de textes.",
    "description": "Annotation qualitative et exploration collaborative de textes. Choisir les paramètres selon le corpus, documenter les versions et vérifier les résultats sur un échantillon de référence.",
    "formats": [
      "TXT",
      "XML",
      "CSV"
    ],
    "useCases": [
      "Annotation qualitative et exploration collaborative de textes."
    ],
    "workflowSteps": [
      "Définir les catégories",
      "Annoter un échantillon",
      "Comparer les interprétations"
    ],
    "citationBibtex": "@misc{catma,\n title={CATMA},\n howpublished={https://catma.de/},\n note={Documentation officielle ; préciser la version utilisée}\n}"
  },
  {
    "id": "inception",
    "name": "INCEpTION",
    "category": "Analyse textuelle",
    "license": "Logiciel libre",
    "level": "Avancé",
    "maintainer": "Projet et communauté — voir le site officiel",
    "url": "https://inception-project.github.io/",
    "summary": "Annotation linguistique et sémantique, entités et relations.",
    "description": "Annotation linguistique et sémantique, entités et relations. Choisir les paramètres selon le corpus, documenter les versions et vérifier les résultats sur un échantillon de référence.",
    "formats": [
      "CoNLL",
      "UIMA CAS"
    ],
    "useCases": [
      "Annotation linguistique et sémantique, entités et relations."
    ],
    "workflowSteps": [
      "Créer les couches d’annotation",
      "Fixer un guide de décision",
      "Auditer les annotations"
    ],
    "citationBibtex": "@misc{inception,\n title={INCEpTION},\n howpublished={https://inception-project.github.io/},\n note={Documentation officielle ; préciser la version utilisée}\n}"
  },
  {
    "id": "nltk",
    "name": "NLTK",
    "category": "Analyse textuelle",
    "license": "Logiciel libre",
    "level": "Intermédiaire",
    "maintainer": "Projet et communauté — voir le site officiel",
    "url": "https://www.nltk.org/",
    "summary": "Bibliothèque Python de traitement linguistique et de concordances.",
    "description": "Bibliothèque Python de traitement linguistique et de concordances. Choisir les paramètres selon le corpus, documenter les versions et vérifier les résultats sur un échantillon de référence.",
    "formats": [
      "TXT",
      "Python"
    ],
    "useCases": [
      "Bibliothèque Python de traitement linguistique et de concordances."
    ],
    "workflowSteps": [
      "Choisir un tokenizer adapté",
      "Contrôler les sorties",
      "Documenter les versions"
    ],
    "citationBibtex": "@misc{nltk,\n title={NLTK},\n howpublished={https://www.nltk.org/},\n note={Documentation officielle ; préciser la version utilisée}\n}"
  },
  {
    "id": "quanteda",
    "name": "quanteda",
    "category": "Analyse textuelle",
    "license": "Logiciel libre",
    "level": "Intermédiaire",
    "maintainer": "Projet et communauté — voir le site officiel",
    "url": "https://quanteda.io/",
    "summary": "Analyse quantitative de corpus et matrices documents-termes avec R.",
    "description": "Analyse quantitative de corpus et matrices documents-termes avec R. Choisir les paramètres selon le corpus, documenter les versions et vérifier les résultats sur un échantillon de référence.",
    "formats": [
      "TXT",
      "CSV",
      "R"
    ],
    "useCases": [
      "Analyse quantitative de corpus et matrices documents-termes avec R."
    ],
    "workflowSteps": [
      "Définir les unités",
      "Construire une matrice",
      "Comparer les fréquences normalisées"
    ],
    "citationBibtex": "@misc{quanteda,\n title={quanteda},\n howpublished={https://quanteda.io/},\n note={Documentation officielle ; préciser la version utilisée}\n}"
  },
  {
    "id": "jupyter",
    "name": "JupyterLab",
    "category": "Gestion & Données",
    "license": "Logiciel libre",
    "level": "Intermédiaire",
    "maintainer": "Projet et communauté — voir le site officiel",
    "url": "https://jupyter.org/",
    "summary": "Notebooks associant code, explications et résultats pour la recherche reproductible.",
    "description": "Notebooks associant code, explications et résultats pour la recherche reproductible. Choisir les paramètres selon le corpus, documenter les versions et vérifier les résultats sur un échantillon de référence.",
    "formats": [
      "IPYNB",
      "CSV",
      "Python"
    ],
    "useCases": [
      "Notebooks associant code, explications et résultats pour la recherche reproductible."
    ],
    "workflowSteps": [
      "Fixer les dépendances",
      "Exécuter depuis zéro",
      "Partager notebook et README"
    ],
    "citationBibtex": "@misc{jupyter,\n title={JupyterLab},\n howpublished={https://jupyter.org/},\n note={Documentation officielle ; préciser la version utilisée}\n}"
  },
  {
    "id": "pandas",
    "name": "pandas",
    "category": "Gestion & Données",
    "license": "Logiciel libre",
    "level": "Intermédiaire",
    "maintainer": "Projet et communauté — voir le site officiel",
    "url": "https://pandas.pydata.org/",
    "summary": "Manipulation et nettoyage de tableaux de données scientifiques.",
    "description": "Manipulation et nettoyage de tableaux de données scientifiques. Choisir les paramètres selon le corpus, documenter les versions et vérifier les résultats sur un échantillon de référence.",
    "formats": [
      "CSV",
      "JSON",
      "Parquet"
    ],
    "useCases": [
      "Manipulation et nettoyage de tableaux de données scientifiques."
    ],
    "workflowSteps": [
      "Décrire les colonnes",
      "Tester doublons et données manquantes",
      "Exporter une table documentée"
    ],
    "citationBibtex": "@misc{pandas,\n title={pandas},\n howpublished={https://pandas.pydata.org/},\n note={Documentation officielle ; préciser la version utilisée}\n}"
  },
  {
    "id": "networkx",
    "name": "NetworkX",
    "category": "Réseaux & SIG",
    "license": "Logiciel libre",
    "level": "Avancé",
    "maintainer": "Projet et communauté — voir le site officiel",
    "url": "https://networkx.org/",
    "summary": "Analyse de graphes et relations entre personnes, lieux et œuvres.",
    "description": "Analyse de graphes et relations entre personnes, lieux et œuvres. Choisir les paramètres selon le corpus, documenter les versions et vérifier les résultats sur un échantillon de référence.",
    "formats": [
      "GraphML",
      "GEXF",
      "CSV"
    ],
    "useCases": [
      "Analyse de graphes et relations entre personnes, lieux et œuvres."
    ],
    "workflowSteps": [
      "Définir nœuds et liens",
      "Tester les effets des lacunes",
      "Confronter mesures et sources"
    ],
    "citationBibtex": "@misc{networkx,\n title={NetworkX},\n howpublished={https://networkx.org/},\n note={Documentation officielle ; préciser la version utilisée}\n}"
  },
  {
    "id": "leaflet",
    "name": "Leaflet",
    "category": "Réseaux & SIG",
    "license": "Logiciel libre",
    "level": "Intermédiaire",
    "maintainer": "Projet et communauté — voir le site officiel",
    "url": "https://leafletjs.com/",
    "summary": "Publication de cartes interactives et couches géographiques.",
    "description": "Publication de cartes interactives et couches géographiques. Choisir les paramètres selon le corpus, documenter les versions et vérifier les résultats sur un échantillon de référence.",
    "formats": [
      "GeoJSON",
      "HTML",
      "JavaScript"
    ],
    "useCases": [
      "Publication de cartes interactives et couches géographiques."
    ],
    "workflowSteps": [
      "Préparer les coordonnées",
      "Créer les couches",
      "Indiquer sources et licences"
    ],
    "citationBibtex": "@misc{leaflet,\n title={Leaflet},\n howpublished={https://leafletjs.com/},\n note={Documentation officielle ; préciser la version utilisée}\n}"
  },
  {
    "id": "git",
    "name": "Git",
    "category": "Gestion & Données",
    "license": "Logiciel libre",
    "level": "Intermédiaire",
    "maintainer": "Projet et communauté — voir le site officiel",
    "url": "https://git-scm.com/",
    "summary": "Gestion de versions des sources, scripts et documents de recherche.",
    "description": "Gestion de versions des sources, scripts et documents de recherche. Choisir les paramètres selon le corpus, documenter les versions et vérifier les résultats sur un échantillon de référence.",
    "formats": [
      "TXT",
      "XML",
      "MD"
    ],
    "useCases": [
      "Gestion de versions des sources, scripts et documents de recherche."
    ],
    "workflowSteps": [
      "Créer un dépôt",
      "Documenter les changements",
      "Identifier la version citée"
    ],
    "citationBibtex": "@misc{git,\n title={Git},\n howpublished={https://git-scm.com/},\n note={Documentation officielle ; préciser la version utilisée}\n}"
  },
  {
    "id": "blender",
    "name": "Blender",
    "category": "Édition & HTR",
    "license": "Logiciel libre",
    "level": "Avancé",
    "maintainer": "Projet et communauté — voir le site officiel",
    "url": "https://www.blender.org/",
    "summary": "Traitement et présentation des modèles 3D patrimoniaux.",
    "description": "Traitement et présentation des modèles 3D patrimoniaux. Choisir les paramètres selon le corpus, documenter les versions et vérifier les résultats sur un échantillon de référence.",
    "formats": [
      "OBJ",
      "PLY",
      "glTF"
    ],
    "useCases": [
      "Traitement et présentation des modèles 3D patrimoniaux."
    ],
    "workflowSteps": [
      "Importer le maillage",
      "Documenter les transformations",
      "Distinguer mesure et restitution"
    ],
    "citationBibtex": "@misc{blender,\n title={Blender},\n howpublished={https://www.blender.org/},\n note={Documentation officielle ; préciser la version utilisée}\n}"
  },
];

export const CORPORA: CorpusItem[] = [
  {
    id: 'gallica',
    name: 'Gallica & Gallica Labs',
    institution: 'Bibliothèque nationale de France (BnF)',
    scope: 'Plus de 10 millions de documents patrimoniaux numérisés',
    access: 'Accès libre · API IIIF, SRU & OAI-PMH',
    description:
      'Bibliothèque numérique encyclopédique donnant accès aux imprimés, manuscrits, cartes, estampes et presse ancienne, doublée d’un portail dédié aux chercheurs pour extraire des corpus par API et OCR ALTO.',
    apiOrStandard: 'IIIF / SRU / ALTO XML',
    url: 'https://gallica.bnf.fr/',
  },
  {
    id: 'isidore',
    name: 'Isidore',
    institution: 'IR* Huma-Num (CNRS)',
    scope: 'Moteur de recherche unifié sur les données SHS francophones et européennes',
    access: 'Accès ouvert · Enrichissement sémantique multilingue',
    description:
      'Plateforme de découverte moissonnant des millions de publications, jeux de données, thèses et carnets de recherche, enrichis automatiquement par des référentiels disciplinaires (GeoNames, RAMEAU, Pactols).',
    apiOrStandard: 'OAI-PMH / RDF / SPARQL',
    url: 'https://isidore.science/',
  },
  {
    id: 'openedition',
    name: 'OpenEdition',
    institution: 'CNRS, Aix-Marseille Université, EHESS, Avignon Université',
    scope: 'Revues, Livres, Carnets Hypothèses et Annonces Calenda',
    access: 'Accès ouvert freemium · Export XML-TEI / BibTeX',
    description:
      'Infrastructure éditoriale de référence pour l’édition scientifique ouverte en sciences humaines et sociales, fédérant plus de 600 revues et plusieurs milliers de carnets de recherche.',
    apiOrStandard: 'XML-TEI OpenEdition / OAI-PMH',
    url: 'https://www.openedition.org/',
  },
  {
    id: 'persee',
    name: 'Persée',
    institution: 'ENS de Lyon, CNRS, Ministère ESR',
    scope: 'Collections rétrospectives de revues scientifiques francophones',
    access: 'Accès libre · Triples RDF & Data Persée',
    description:
      'Portail de diffusion patrimoniale permettant d’interroger des siècles d’articles scientifiques numérisés, avec mise à disposition de graphes de métadonnées et de corpus plein texte sur Perséides.',
    apiOrStandard: 'RDF / OAI-PMH / TEI',
    url: 'https://www.persee.fr/',
  },
  {
    id: 'europeana',
    name: 'Europeana',
    institution: 'Fondation Europeana (Union européenne)',
    scope: 'Patrimoine culturel européen (musées, archives, bibliothèques)',
    access: 'Données ouvertes · API REST & modèle EDM',
    description:
      'Agrégateur culturel fédérant des dizaines de millions d’objets patrimoniaux européens décrits selon l’Europeana Data Model (EDM) et interrogeables par API pour des études comparatives.',
    apiOrStandard: 'EDM (RDF) / IIIF / API REST',
    url: 'https://www.europeana.eu/',
  },
  {
    id: 'perseus',
    name: 'Perseus Digital Library & Scaife',
    institution: 'Tufts University',
    scope: 'Textes grecs, latins et de la Renaissance avec appareil morphologique',
    access: 'Licence CC BY-SA · Citable CTS URN',
    description:
      'Modèle historique de bibliothèque philologique numérique articulant éditions critiques, dictionnaires de référence, traductions alignées et identifiants canoniques CTS.',
    apiOrStandard: 'XML-TEI EpiDoc / CTS URN',
    url: 'https://www.perseus.tufts.edu/',
  },
  {
    "id": "bnrm",
    "name": "Bibliothèque nationale du Royaume du Maroc",
    "institution": "BNRM",
    "scope": "Maroc · patrimoine écrit",
    "access": "Selon les fonds",
    "description": "Manuscrits, lithographies, journaux et livres rares. Relever cotes, droits et provenance.",
    "apiOrStandard": "Catalogue et fonds numérisés",
    "url": "https://www.bnrm.ma/"
  },
  {
    "id": "openiti",
    "name": "OpenITI",
    "institution": "Open Islamicate Texts Initiative",
    "scope": "Textes arabes et persans",
    "access": "Conditions selon version",
    "description": "Corpus exploitable par programme ; vérifier transcriptions, métadonnées et éditions sources.",
    "apiOrStandard": "Texte balisé, Git, Zenodo",
    "url": "https://openiti.org/documentation/"
  },
  {
    "id": "qdl",
    "name": "Qatar Digital Library",
    "institution": "QNL et British Library",
    "scope": "Golfe et Moyen-Orient",
    "access": "Consultation en ligne",
    "description": "Archives, cartes et manuscrits relatifs à la région ; contrôler provenance et droits.",
    "apiOrStandard": "Notices et images",
    "url": "https://www.qdl.qa/en"
  },
  {
    "id": "dlme",
    "name": "Digital Library of the Middle East",
    "institution": "Stanford Libraries et partenaires",
    "scope": "Moyen-Orient et Afrique du Nord",
    "access": "Droits par objet",
    "description": "Agrégateur de ressources patrimoniales ; consulter les notices originales.",
    "apiOrStandard": "Métadonnées agrégées",
    "url": "https://dlmenetwork.org/"
  },
  {
    "id": "qalamos",
    "name": "Qalamos",
    "institution": "Staatsbibliothek zu Berlin et partenaires",
    "scope": "Manuscrits orientaux",
    "access": "Selon les collections",
    "description": "Portail de manuscrits d’Asie et d’Afrique, utile pour identifier les témoins et cotes.",
    "apiOrStandard": "Notices et reproductions",
    "url": "https://www.qalamos.net/"
  },
  {
    "id": "loc",
    "name": "Library of Congress Digital Collections",
    "institution": "Library of Congress",
    "scope": "Collections internationales",
    "access": "Droits par objet",
    "description": "Documents, cartes, photographies et enregistrements ; distinguer notices et fichiers.",
    "apiOrStandard": "API JSON",
    "url": "https://www.loc.gov/collections/"
  },
  {
    "id": "dpla",
    "name": "Digital Public Library of America",
    "institution": "DPLA et partenaires",
    "scope": "États-Unis",
    "access": "Droits variables",
    "description": "Recherche fédérée dans les collections de bibliothèques, archives et musées.",
    "apiOrStandard": "Métadonnées agrégées",
    "url": "https://dp.la/"
  },
  {
    "id": "internet-archive",
    "name": "Internet Archive",
    "institution": "Internet Archive",
    "scope": "International · documents et Web",
    "access": "Accès variable",
    "description": "Livres numérisés, médias et archives de sites ; identifier version et droits.",
    "apiOrStandard": "Métadonnées et fichiers",
    "url": "https://archive.org/"
  },
  {
    "id": "clarin-vlo",
    "name": "Virtual Language Observatory",
    "institution": "CLARIN ERIC",
    "scope": "Ressources linguistiques",
    "access": "Accès variable",
    "description": "Moteur de découverte de corpus et outils linguistiques.",
    "apiOrStandard": "CMDI et liens",
    "url": "https://vlo.clarin.eu/"
  },
  {
    "id": "zenodo",
    "name": "Zenodo",
    "institution": "CERN et OpenAIRE",
    "scope": "Données scientifiques",
    "access": "Selon le dépôt",
    "description": "Entrepôt de données, code et documents ; contrôler licence et version.",
    "apiOrStandard": "DOI, API REST",
    "url": "https://zenodo.org/"
  },
  {
    "id": "wikidata-corpus",
    "name": "Wikidata",
    "institution": "Wikimedia et communauté",
    "scope": "Données liées",
    "access": "Données structurées CC0",
    "description": "Référentiel d’identifiants et relations ; vérifier les sources et biais de couverture.",
    "apiOrStandard": "RDF, SPARQL",
    "url": "https://www.wikidata.org/"
  },
  {
    "id": "data-bnf",
    "name": "data.bnf.fr",
    "institution": "Bibliothèque nationale de France",
    "scope": "Autorités et œuvres",
    "access": "Conditions du service",
    "description": "Relier auteurs, œuvres et notices pour l’alignement d’entités.",
    "apiOrStandard": "RDF, SPARQL",
    "url": "https://data.bnf.fr/"
  },
];

export const STANDARDS: StandardSpec[] = [
  {
    id: 'tei',
    name: 'Text Encoding Initiative (TEI P5)',
    acronym: 'XML-TEI',
    domain: 'Édition critique et balisage structurel',
    summary:
      'Standard international exprimé en XML pour représenter avec précision la structure logique, matérielle et sémantique des textes littéraires, historiques ou épigraphiques.',
    whyItMatters:
      'Il dissocie le contenu intellectuel de son affichage logiciel : un texte encodé en TEI reste lisible, validable et transformable sur plusieurs décennies.',
    snippetLabel: 'Extrait d’encodage d’une lettre historique en XML-TEI P5',
    snippet: `<TEI xmlns="http://www.tei-c.org/ns/1.0">
  <teiHeader>
    <fileDesc>
      <titleStmt><title>Lettre à Mme de Grignan, 1671</title></titleStmt>
      <publicationStmt><p>Édition critique numérique — Licence CC-BY 4.0</p></publicationStmt>
      <sourceDesc><msDesc><msIdentifier><repository>BnF</repository><idno>NAF 1234</idno></msIdentifier></msDesc></sourceDesc>
    </fileDesc>
  </teiHeader>
  <text>
    <body>
      <div type="letter" xml:id="L1671-04">
        <dateline>À <placeName ref="#paris">Paris</placeName>, le <date when="1671-04-20">20 avril 1671</date>.</dateline>
        <p>Je vous écris avec toute l'émotion d'une archive enfin lisible.</p>
      </div>
    </body>
  </text>
</TEI>`,
  },
  {
    id: 'iiif',
    name: 'International Image Interoperability Framework',
    acronym: 'IIIF',
    domain: 'Interopérabilité des images patrimoniales',
    summary:
      'Protocole ouvert permettant aux bibliothèques et musées d’exposer des images haute résolution et leurs métadonnées structurelles via une API standardisée.',
    whyItMatters:
      'Un chercheur peut comparer côte à côte dans une même visionneuse (Mirador) un manuscrit de la BnF, un feuillet de la Bodleian et un détail du Vatican sans dupliquer les fichiers.',
    snippetLabel: 'Structure simplifiée d’un Manifeste IIIF Presentation 3.0',
    snippet: `{
  "@context": "http://iiif.io/api/presentation/3/context.json",
  "id": "https://gallica.bnf.fr/iiif/ark:/12148/btv1b84473026/manifest.json",
  "type": "Manifest",
  "label": { "fr": ["Roman de la Rose — Manuscrit enluminé"] },
  "items": [
    {
      "id": "https://gallica.bnf.fr/iiif/.../canvas/f1",
      "type": "Canvas",
      "height": 4200,
      "width": 3100,
      "items": [{ "type": "AnnotationPage", "items": [/* Image API v3 */] }]
    }
  ]
}`,
  },
  {
    id: 'cidoc',
    name: 'CIDOC-CRM & Linked Open Data',
    acronym: 'CIDOC-CRM',
    domain: 'Ontologies et graphes de connaissances patrimoniaux',
    summary:
      'Modèle conceptuel de référence (ISO 21127) centré sur les événements pour relier objets, acteurs, lieux et périodes historiques dans le Web sémantique.',
    whyItMatters:
      'Il évite les silos documentaires en permettant d’interroger conjointement des bases archéologiques, muséales et archivistiques via SPARQL.',
    snippetLabel: 'Modélisation Turtle (RDF) d’un événement de production éditoriale',
    snippet: `@prefix crm: <http://www.cidoc-crm.org/cidoc-crm/> .
@prefix ex:  <https://humnum.example.org/data/> .

ex:edition_1532 a crm:E22_Human-Made_Object ;
  crm:P1_is_identified_by "Pantagruel, édition princeps" ;
  crm:P108i_was_produced_by ex:impression_lyon .

ex:impression_lyon a crm:E12_Production ;
  crm:P14_carried_out_by ex:claude_nourry ;
  crm:P7_took_place_at ex:lyon ;
  crm:P4_has_time-span "1532" .`,
  },
  {
    id: 'fair',
    name: 'Principes FAIR & Plan de Gestion (DMP)',
    acronym: 'FAIR / DMP',
    domain: 'Gouvernance et ouverture des données SHS',
    summary:
      'Cadre méthodologique assurant que les données produites sont Faciles à trouver, Accessibles, Interopérables et Réutilisables par les humains comme par les machines.',
    whyItMatters:
      'Exigés par l’ANR, Horizon Europe et le CNRS, les principes FAIR transforment un corpus individuel en bien scientifique vérifiable et réplicable.',
    snippetLabel: 'Structure minimale d’un dossier de dépôt FAIR (README + métadonnées)',
    snippet: `corpus-correspondances-xviii/
├── README.md              # Contexte scientifique, licence (CC-BY-4.0), protocole
├── CITATION.cff           # Citation normalisée avec DOI Nakala / Zenodo
├── data/
│   ├── tei/               # Fichiers XML-TEI P5 validés
│   └── metadata.csv       # Encodage UTF-8, dates ISO 8601 (AAAA-MM-JJ)
├── schema/
│   └── corpus.odd         # Documentation et schéma RelaxNG
└── scripts/
    └── analyse_reseau.R   # Script reproductible documenté`,
  },
  {
    "id": "dublin-core",
    "name": "Dublin Core Metadata Terms",
    "acronym": "DCMI",
    "domain": "Métadonnées",
    "summary": "Vocabulaire de description de ressources.",
    "whyItMatters": "Faciliter les échanges et le moissonnage.",
    "snippetLabel": "Turtle",
    "snippet": "@prefix dct: <http://purl.org/dc/terms/> .\n<https://example.org/1> dct:title \"Manuscrit\"@fr .",
    "url": "https://www.dublincore.org/specifications/dublin-core/dcmi-terms/"
  },
  {
    "id": "rdf-standard",
    "name": "RDF et SPARQL",
    "acronym": "RDF",
    "domain": "Données liées",
    "summary": "Modèle de triplets et langage de requête.",
    "whyItMatters": "Relier et interroger les ressources.",
    "snippetLabel": "SPARQL",
    "snippet": "PREFIX dct: <http://purl.org/dc/terms/>\nSELECT ?s ?titre WHERE { ?s dct:title ?titre } LIMIT 10",
    "url": "https://www.w3.org/TR/rdf11-concepts/"
  },
  {
    "id": "skos-standard",
    "name": "Simple Knowledge Organization System",
    "acronym": "SKOS",
    "domain": "Thésaurus",
    "summary": "Vocabulaire RDF de systèmes d’organisation des connaissances.",
    "whyItMatters": "Décrire concepts et libellés multilingues.",
    "snippetLabel": "Turtle",
    "snippet": "@prefix skos: <http://www.w3.org/2004/02/skos/core#> .\n<https://example.org/c1> a skos:Concept ; skos:prefLabel \"Manuscrit\"@fr .",
    "url": "https://www.w3.org/TR/skos-reference/"
  },
  {
    "id": "web-annotation",
    "name": "Web Annotation Data Model",
    "acronym": "W3C OA",
    "domain": "Annotation",
    "summary": "Associer un contenu à une cible documentaire.",
    "whyItMatters": "Rattacher une annotation à une source.",
    "snippetLabel": "JSON-LD",
    "snippet": "{\n  \"@context\": \"http://www.w3.org/ns/anno.jsonld\",\n  \"id\": \"https://example.org/a1\",\n  \"type\": \"Annotation\",\n  \"body\": {\n    \"type\": \"TextualBody\",\n    \"value\": \"Lecture incertaine\"\n  },\n  \"target\": \"https://example.org/p1\"\n}",
    "url": "https://www.w3.org/TR/annotation-model/"
  },
  {
    "id": "prov",
    "name": "PROV-O",
    "acronym": "PROV",
    "domain": "Traçabilité",
    "summary": "Ontologie d’entités, activités et agents.",
    "whyItMatters": "Consigner l’origine et le traitement d’un fichier.",
    "snippetLabel": "Turtle",
    "snippet": "@prefix prov: <http://www.w3.org/ns/prov#> .\n<https://example.org/texte> prov:wasDerivedFrom <https://example.org/image> .",
    "url": "https://www.w3.org/TR/prov-o/"
  },
  {
    "id": "ro-crate",
    "name": "Research Object Crate",
    "acronym": "RO-Crate",
    "domain": "Reproductibilité",
    "summary": "Description de données et métadonnées dans un paquet JSON-LD.",
    "whyItMatters": "Associer corpus, code et documentation.",
    "snippetLabel": "Fragment JSON-LD",
    "snippet": "{\n  \"@graph\": [\n    {\n      \"@id\": \"./\",\n      \"@type\": \"Dataset\",\n      \"name\": \"Corpus\",\n      \"hasPart\": {\n        \"@id\": \"corpus.csv\"\n      }\n    },\n    {\n      \"@id\": \"corpus.csv\",\n      \"@type\": \"File\"\n    }\n  ]\n}",
    "url": "https://www.researchobject.org/ro-crate/specification"
  },
  {
    "id": "geojson",
    "name": "GeoJSON",
    "acronym": "RFC 7946",
    "domain": "Cartographie",
    "summary": "Format JSON de données géographiques.",
    "whyItMatters": "Échanger des géométries ; ordre longitude, latitude.",
    "snippetLabel": "Exemple Point",
    "snippet": "{\n  \"type\": \"Feature\",\n  \"geometry\": {\n    \"type\": \"Point\",\n    \"coordinates\": [\n      -6.84,\n      34.02\n    ]\n  },\n  \"properties\": {\n    \"name\": \"Rabat (exemple)\"\n  }\n}",
    "url": "https://www.rfc-editor.org/rfc/rfc7946"
  },
  {
    "id": "alto",
    "name": "ALTO XML",
    "acronym": "ALTO",
    "domain": "OCR et mise en page",
    "summary": "Format XML du texte reconnu et de sa position sur la page.",
    "whyItMatters": "Relier image, lignes et mots.",
    "snippetLabel": "Fragment XML",
    "snippet": "<TextLine ID=\"l1\">\n <String CONTENT=\"Exemple\" HPOS=\"100\" VPOS=\"200\" WIDTH=\"80\" HEIGHT=\"20\"/>\n</TextLine>",
    "url": "https://www.loc.gov/standards/alto/"
  },
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'lecture-distante',
    term: 'Lecture distante',
    english: 'Distant Reading',
    category: 'Épistémologie',
    definition:
      'Concept théorisé par Franco Moretti désignant l’analyse de vastes ensembles textuels par des outils statistiques, lexicométriques ou visuels, complémentaire de la lecture attentive (close reading).',
    related: ['Textométrie', 'Stylométrie'],
  },
  {
    id: 'tei',
    term: 'XML-TEI',
    english: 'Text Encoding Initiative',
    category: 'Encodage',
    definition:
      'Langage de balisage extensible et cadre normatif international définissant plus de 500 éléments pour décrire structure, apparat critique, entités nommées et matérialité des documents.',
    related: ['Apparat critique numérique', 'ODD'],
  },
  {
    id: 'htr',
    term: 'HTR / OCR',
    english: 'Handwritten Text Recognition',
    category: 'Acquisition',
    definition:
      'Reconnaissance automatique de texte manuscrit (HTR, par réseaux de neurones comme Kraken ou Transkribus) ou imprimé (OCR), produisant du texte aligné sur les coordonnées de l’image.',
    related: ['IIIF', 'XML-TEI'],
  },
  {
    id: 'textometrie',
    term: 'Textométrie',
    english: 'Corpus & Quantitative Text Analysis',
    category: 'Analyse',
    definition:
      'Approche issue de la lexicométrie française combinant calculs statistiques (spécificités, cooccurrences, AFC) et retour systématique au contexte textuel original.',
    related: ['Lecture distante', 'Lemmatisation'],
  },
  {
    id: 'lemmatisation',
    term: 'Lemmatisation',
    english: 'Lemmatization',
    category: 'TAL',
    definition:
      'Opération linguistique consistant à ramener chaque forme fléchie d’un texte à son entrée lexicale canonique (lemme), en s’appuyant sur son contexte morphosyntaxique.',
    related: ['Textométrie', 'Entités nommées'],
  },
  {
    id: 'entites-nommees',
    term: 'Reconnaissance d’entités nommées (REN)',
    english: 'Named Entity Recognition (NER)',
    category: 'TAL',
    definition:
      'Tâche de traitement automatique des langues visant à identifier et catégoriser dans un corpus les noms de personnes, lieux, organisations, œuvres ou dates.',
    related: ['Prosopographie', 'Web sémantique'],
  },
  {
    id: 'iiif',
    term: 'IIIF',
    english: 'International Image Interoperability Framework',
    category: 'Standards',
    definition:
      'Ensemble de spécifications ouvertes permettant d’afficher, zoomer, annoter et comparer à distance des images patrimoniales hébergées par différentes institutions.',
    related: ['HTR / OCR', 'Linked Open Data'],
  },
  {
    id: 'fair',
    term: 'Principes FAIR',
    english: 'Findable, Accessible, Interoperable, Reusable',
    category: 'Gouvernance',
    definition:
      'Quatre critères internationaux guidant la gestion des données scientifiques pour en assurer la découvrabilité (identifiants pérennes), l’interopérabilité et la réutilisation éthique.',
    related: ['Plan de gestion de données'],
  },
  {
    id: 'stylometrie',
    term: 'Stylométrie',
    english: 'Stylometry',
    category: 'Analyse',
    definition:
      'Mesure quantitative des traits stylistiques d’un texte — notamment la distribution des mots-outils très fréquents — pour étudier l’attribution d’auteur, la chronologie ou les genres.',
    related: ['Lecture distante', 'Textométrie'],
  },
  {
    id: 'prosopographie',
    term: 'Prosopographie numérique',
    english: 'Digital Prosopography',
    category: 'Histoire & Réseaux',
    definition:
      'Méthode d’histoire sociale étudiant les trajectoires, fonctions et réseaux relationnels d’un groupe d’acteurs historiques modélisés dans des bases de données structurées.',
    related: ['Linked Open Data', 'Entités nommées'],
  },
  {
    id: 'lod',
    term: 'Web sémantique / LOD',
    english: 'Linked Open Data',
    category: 'Standards',
    definition:
      'Publication de données structurées reliées entre elles par des URI pérennes et des ontologies partagées (RDF, CIDOC-CRM, Wikidata) afin de croiser les connaissances à l’échelle du Web.',
    related: ['IIIF', 'Prosopographie numérique'],
  },
  {
    id: 'apparat',
    term: 'Apparat critique numérique',
    english: 'Digital Critical Apparatus',
    category: 'Édition',
    definition:
      'Dispositif éditorial encodant les variantes entre témoins manuscrits ou imprimés, permettant au lecteur de comparer dynamiquement les états du texte et les notes philologiques.',
    related: ['XML-TEI'],
  },
  {
    "id": "ocr",
    "term": "OCR",
    "english": "Optical character recognition",
    "category": "Acquisition",
    "definition": "Reconnaissance de caractères à partir d’images ; contrôler la qualité sur des pages représentatives.",
    "related": [
      "HTR",
      "CER"
    ]
  },
  {
    "id": "cer",
    "term": "CER",
    "english": "Character error rate",
    "category": "Acquisition",
    "definition": "Rapport des insertions, suppressions et substitutions de caractères à la longueur de la référence ; peut dépasser 100 %.",
    "related": [
      "OCR",
      "WER"
    ]
  },
  {
    "id": "wer",
    "term": "WER",
    "english": "Word error rate",
    "category": "Acquisition",
    "definition": "Taux d’erreur sur les mots, sensible aux règles de segmentation.",
    "related": [
      "CER",
      "Tokenisation"
    ]
  },
  {
    "id": "tokenisation",
    "term": "Tokenisation",
    "english": "Tokenization",
    "category": "TAL",
    "definition": "Découpage d’un texte en unités de traitement, adaptées à la langue et à l’objectif.",
    "related": [
      "Lemmatisation",
      "Normalisation"
    ]
  },
  {
    "id": "normalisation",
    "term": "Normalisation",
    "english": "Normalization",
    "category": "TAL",
    "definition": "Transformation vers une convention explicite ; conserver les formes originales.",
    "related": [
      "Unicode",
      "Tokenisation"
    ]
  },
  {
    "id": "concordance",
    "term": "Concordance",
    "english": "Concordance / KWIC",
    "category": "Analyse",
    "definition": "Occurrences d’un terme dans leur contexte, reliant statistiques et usages.",
    "related": [
      "Lecture distante",
      "Cooccurrence"
    ]
  },
  {
    "id": "cooccurrence",
    "term": "Cooccurrence",
    "english": "Co-occurrence",
    "category": "Analyse",
    "definition": "Présence conjointe de deux unités dans une fenêtre définie.",
    "related": [
      "Concordance",
      "Textométrie"
    ]
  },
  {
    "id": "tfidf",
    "term": "TF-IDF",
    "english": "Term frequency–inverse document frequency",
    "category": "Analyse",
    "definition": "Pondération valorisant les termes fréquents dans un document mais rares dans l’ensemble.",
    "related": [
      "Textométrie",
      "Classification"
    ]
  },
  {
    "id": "topic-model",
    "term": "Modélisation thématique",
    "english": "Topic modelling",
    "category": "Analyse",
    "definition": "Recherche de structures lexicales latentes ; les thèmes demandent interprétation et validation.",
    "related": [
      "Lecture distante",
      "TF-IDF"
    ]
  },
  {
    "id": "embedding",
    "term": "Plongement vectoriel",
    "english": "Embedding",
    "category": "TAL",
    "definition": "Représentation numérique apprise d’un mot, passage ou image ; proximité n’est pas équivalence.",
    "related": [
      "TAL",
      "RAG"
    ]
  },
  {
    "id": "rag",
    "term": "RAG",
    "english": "Retrieval-augmented generation",
    "category": "TAL",
    "definition": "Génération enrichie de documents retrouvés ; vérifier les résultats dans les passages sources.",
    "related": [
      "Plongement vectoriel",
      "Hallucination"
    ]
  },
  {
    "id": "hallucination",
    "term": "Hallucination d’un modèle",
    "english": "Model hallucination",
    "category": "Épistémologie",
    "definition": "Production plausible mais fausse ou non étayée, notamment une référence inexistante.",
    "related": [
      "RAG",
      "Validation humaine"
    ]
  },
  {
    "id": "biais",
    "term": "Biais de corpus",
    "english": "Corpus bias",
    "category": "Épistémologie",
    "definition": "Distorsion liée à la sélection, conservation, numérisation ou collecte des documents.",
    "related": [
      "Provenance",
      "Représentativité"
    ]
  },
  {
    "id": "provenance",
    "term": "Provenance",
    "english": "Provenance",
    "category": "Gouvernance",
    "definition": "Historique de l’origine, des transformations et des agents associés aux données.",
    "related": [
      "Métadonnées",
      "PROV"
    ]
  },
  {
    "id": "metadata",
    "term": "Métadonnées",
    "english": "Metadata",
    "category": "Standards",
    "definition": "Informations descriptives, structurelles ou administratives associées à une ressource.",
    "related": [
      "Dublin Core",
      "FAIR"
    ]
  },
  {
    "id": "doi",
    "term": "DOI",
    "english": "Digital object identifier",
    "category": "Standards",
    "definition": "Identifiant persistant d’un objet numérique ; ne garantit ni libre accès ni qualité.",
    "related": [
      "ORCID",
      "FAIR"
    ]
  },
  {
    "id": "orcid",
    "term": "ORCID",
    "english": "Open researcher and contributor ID",
    "category": "Standards",
    "definition": "Identifiant de contributeur scientifique distinguant des homonymes.",
    "related": [
      "DOI",
      "Autorité"
    ]
  },
  {
    "id": "rdf",
    "term": "RDF",
    "english": "Resource description framework",
    "category": "Standards",
    "definition": "Modèle de graphes fondé sur des triplets sujet, prédicat, objet.",
    "related": [
      "SPARQL",
      "LOD"
    ]
  },
  {
    "id": "sparql",
    "term": "SPARQL",
    "english": "SPARQL protocol and RDF query language",
    "category": "Standards",
    "definition": "Langage de requêtes sur les graphes RDF.",
    "related": [
      "RDF",
      "CIDOC CRM"
    ]
  },
  {
    "id": "skos",
    "term": "SKOS",
    "english": "Simple knowledge organization system",
    "category": "Standards",
    "definition": "Vocabulaire RDF pour concepts, libellés et relations de thésaurus.",
    "related": [
      "RDF",
      "Ontologie"
    ]
  },
  {
    "id": "ontologie",
    "term": "Ontologie",
    "english": "Ontology",
    "category": "Standards",
    "definition": "Modèle explicite des classes, propriétés et relations d’un domaine.",
    "related": [
      "RDF",
      "CIDOC CRM"
    ]
  },
  {
    "id": "alignement",
    "term": "Alignement d’entités",
    "english": "Entity reconciliation",
    "category": "Gestion",
    "definition": "Association de notices locales à des identifiants d’autorité ; conserver les cas incertains.",
    "related": [
      "Wikidata",
      "Autorité"
    ]
  },
  {
    "id": "georeferencement",
    "term": "Géoréférencement",
    "english": "Georeferencing",
    "category": "Histoire & Réseaux",
    "definition": "Associer une carte à un système de coordonnées, mesurer les incertitudes.",
    "related": [
      "SIG",
      "GeoJSON"
    ]
  },
  {
    "id": "sig",
    "term": "SIG",
    "english": "Geographic information system",
    "category": "Histoire & Réseaux",
    "definition": "Système de gestion, analyse et représentation de données spatialisées.",
    "related": [
      "Géoréférencement",
      "Cartographie"
    ]
  },
  {
    "id": "graphe",
    "term": "Graphe",
    "english": "Graph",
    "category": "Histoire & Réseaux",
    "definition": "Modèle de nœuds et liens ; centralités et communautés dépendent des règles de construction.",
    "related": [
      "Prosopographie",
      "Centralité"
    ]
  },
  {
    "id": "unicode",
    "term": "Unicode",
    "english": "Unicode",
    "category": "Encodage",
    "definition": "Standard des caractères ; UTF-8 est une forme d’encodage.",
    "related": [
      "Tokenisation",
      "TEI"
    ]
  },
  {
    "id": "reproductibilite",
    "term": "Reproductibilité",
    "english": "Reproducibility",
    "category": "Gouvernance",
    "definition": "Possibilité de retrouver des résultats à partir des données, versions et procédures documentées.",
    "related": [
      "FAIR",
      "Provenance"
    ]
  },
  {
    "id": "dmp",
    "term": "Plan de gestion des données",
    "english": "Data management plan",
    "category": "Gouvernance",
    "definition": "Document évolutif décrivant collecte, stockage, droits, partage et conservation.",
    "related": [
      "FAIR",
      "Reproductibilité"
    ]
  },
];

export const BIBLIOGRAPHY: BibEntry[] = [
  {
    id: 'dacos-mounier-2010',
    authors: 'Dacos, Marin et Mounier, Pierre',
    year: 2010,
    title: 'L’édition électronique',
    publisher: 'Paris, La Découverte (coll. Repères)',
    theme: 'Édition & Archives',
    abstract:
      'Synthèse de référence sur les mutations des supports, des formats ouverts et des modèles économiques de l’édition scientifique à l’ère numérique.',
    iso690: 'DACOS, Marin et MOUNIER, Pierre. L’édition électronique. Paris : La Découverte, 2010. 128 p. (Repères).',
    bibtex: `@book{dacos2010edition,\n  author = {Dacos, Marin and Mounier, Pierre},\n  title = {L'édition électronique},\n  year = {2010},\n  publisher = {La Découverte},\n  address = {Paris}\n}`,
  },
  {
    id: 'doueihi-2011',
    authors: 'Doueihi, Milad',
    year: 2011,
    title: 'Pour un humanisme numérique',
    publisher: 'Paris, Seuil',
    theme: 'Épistémologie',
    abstract:
      'Réflexion philosophique et historique analysant comment la culture numérique transforme nos catégories de mémoire, d’archive, de droit d’auteur et d’autorité savante.',
    iso690: 'DOUEIHI, Milad. Pour un humanisme numérique. Paris : Seuil, 2011. 192 p.',
    bibtex: `@book{doueihi2011humanisme,\n  author = {Doueihi, Milad},\n  title = {Pour un humanisme numérique},\n  year = {2011},\n  publisher = {Seuil},\n  address = {Paris}\n}`,
  },
  {
    id: 'moretti-2008',
    authors: 'Moretti, Franco',
    year: 2008,
    title: 'Graphes, cartes et arbres : modèles abstraits pour une autre histoire de la littérature',
    publisher: 'Paris, Les Prairies ordinaires',
    theme: 'Méthodes',
    abstract:
      'Ouvrage manifeste de la lecture distante illustrant comment l’analyse quantitative, la cartographie des romans et les arbres morphologiques renouvellent l’histoire littéraire.',
    iso690: 'MORETTI, Franco. Graphes, cartes et arbres : modèles abstraits pour une autre histoire de la littérature. Paris : Les Prairies ordinaires, 2008.',
    bibtex: `@book{moretti2008graphes,\n  author = {Moretti, Franco},\n  title = {Graphes, cartes et arbres : modèles abstraits pour une autre histoire de la littérature},\n  year = {2008},\n  publisher = {Les Prairies ordinaires},\n  address = {Paris}\n}`,
  },
  {
    id: 'vinck-2016',
    authors: 'Vinck, Dominique',
    year: 2016,
    title: 'Humanités numériques : la culture face aux nouvelles technologies',
    publisher: 'Paris, Le Cavalier Bleu',
    theme: 'Fondements',
    abstract:
      'Introduction critique qui déconstruit les idées reçues sur le tournant numérique en sciences humaines et en analyse les enjeux sociotechniques.',
    iso690: 'VINCK, Dominique. Humanités numériques : la culture face aux nouvelles technologies. Paris : Le Cavalier Bleu, 2016.',
    bibtex: `@book{vinck2016humanites,\n  author = {Vinck, Dominique},\n  title = {Humanités numériques : la culture face aux nouvelles technologies},\n  year = {2016},\n  publisher = {Le Cavalier Bleu},\n  address = {Paris}\n}`,
  },
  {
    id: 'berra-2015',
    authors: 'Berra, Aurélien',
    year: 2015,
    title: 'Faire des humanités numériques',
    publisher: 'In Read/Write Book 2, OpenEdition Press',
    theme: 'Fondements',
    abstract:
      'Chapitre incontournable situant les humanités numériques dans l’histoire longue de l’érudition philologique et des pratiques collectives de recherche.',
    iso690: 'BERRA, Aurélien. Faire des humanités numériques. In : MOUNIER, Pierre (dir.), Read/Write Book 2. Marseille : OpenEdition Press, 2015.',
    bibtex: `@incollection{berra2015faire,\n  author = {Berra, Aurélien},\n  title = {Faire des humanités numériques},\n  booktitle = {Read/Write Book 2 : Une introduction aux humanités numériques},\n  editor = {Mounier, Pierre},\n  year = {2015},\n  publisher = {OpenEdition Press}\n}`,
  },
  {
    id: 'drucker-2021',
    authors: 'Drucker, Johanna',
    year: 2021,
    title: 'The Digital Humanities Coursebook: An Introduction to Digital Methods for Research and Scholarship',
    publisher: 'London, Routledge',
    theme: 'Méthodes',
    abstract:
      'Manuel pédagogique complet couvrant la modélisation des données (« capta »), la visualisation critique, l’analyse de réseaux et l’architecture de l’information.',
    iso690: 'DRUCKER, Johanna. The Digital Humanities Coursebook. London : Routledge, 2021. 254 p.',
    bibtex: `@book{drucker2021coursebook,\n  author = {Drucker, Johanna},\n  title = {The Digital Humanities Coursebook},\n  year = {2021},\n  publisher = {Routledge},\n  address = {London}\n}`,
  },
  {
    id: 'pierazzo-2015',
    authors: 'Pierazzo, Elena',
    year: 2015,
    title: 'Digital Scholarly Editing: Theories, Models and Methods',
    publisher: 'Farnham, Ashgate',
    theme: 'Édition & Archives',
    abstract:
      'Ouvrage théorique et méthodologique majeur sur la modélisation des éditions savantes numériques, du fac-similé à la publication TEI.',
    iso690: 'PIERAZZO, Elena. Digital Scholarly Editing: Theories, Models and Methods. Farnham : Ashgate, 2015.',
    bibtex: `@book{pierazzo2015editing,\n  author = {Pierazzo, Elena},\n  title = {Digital Scholarly Editing: Theories, Models and Methods},\n  year = {2015},\n  publisher = {Ashgate}\n}`,
  },
  {
    id: 'burnard-2015',
    authors: 'Burnard, Lou',
    year: 2015,
    title: 'Qu’est-ce que la Text Encoding Initiative ? (trad. Marjorie Burghart)',
    publisher: 'Marseille, OpenEdition Press',
    theme: 'Édition & Archives',
    abstract:
      'Guide clair et rigoureux en français présentant la philosophie, la syntaxe et les choix de modélisation de la TEI P5 pour les chercheurs en SHS.',
    iso690: 'BURNARD, Lou. Qu’est-ce que la Text Encoding Initiative ? Traduit par Marjorie Burghart. Marseille : OpenEdition Press, 2015.',
    bibtex: `@book{burnard2015tei,\n  author = {Burnard, Lou},\n  translator = {Burghart, Marjorie},\n  title = {Qu'est-ce que la Text Encoding Initiative ?},\n  year = {2015},\n  publisher = {OpenEdition Press},\n  address = {Marseille}\n}`,
  },
  {
    "id": "wilkinson-fair-2016",
    "authors": "Wilkinson, Mark D. et al.",
    "year": 2016,
    "title": "The FAIR Guiding Principles for scientific data management and stewardship",
    "publisher": "Scientific Data, 3, 160018",
    "theme": "Méthodes",
    "abstract": "Texte fondateur des principes FAIR.",
    "iso690": "Wilkinson, Mark D. et al.. The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3, 160018, 2016. DOI : 10.1038/sdata.2016.18",
    "bibtex": "@article{wilkinson-fair-2016,\n author={Wilkinson, Mark D. et al.},\n title={The FAIR Guiding Principles for scientific data management and stewardship},\n year={2016},\n journal={Scientific Data, 3, 160018},\n doi={10.1038/sdata.2016.18}\n}"
  },
  {
    "id": "borgman-2007",
    "authors": "Borgman, Christine L.",
    "year": 2007,
    "title": "Scholarship in the Digital Age: Information, Infrastructure, and the Internet",
    "publisher": "MIT Press",
    "theme": "Fondements",
    "abstract": "Infrastructures et conditions de production du savoir numérique.",
    "iso690": "Borgman, Christine L.. Scholarship in the Digital Age: Information, Infrastructure, and the Internet. MIT Press, 2007.",
    "bibtex": "@book{borgman-2007,\n author={Borgman, Christine L.},\n title={Scholarship in the Digital Age: Information, Infrastructure, and the Internet},\n year={2007},\n publisher={MIT Press}\n}"
  },
  {
    "id": "schreibman-2004",
    "authors": "Schreibman, Susan ; Siemens, Ray ; Unsworth, John (dir.)",
    "year": 2004,
    "title": "A Companion to Digital Humanities",
    "publisher": "Blackwell",
    "theme": "Fondements",
    "abstract": "Panorama historique et méthodologique de la discipline.",
    "iso690": "Schreibman, Susan ; Siemens, Ray ; Unsworth, John (dir.). A Companion to Digital Humanities. Blackwell, 2004.",
    "bibtex": "@book{schreibman-2004,\n author={Schreibman, Susan and Siemens, Ray and Unsworth, John (dir.)},\n title={A Companion to Digital Humanities},\n year={2004},\n publisher={Blackwell}\n}"
  },
  {
    "id": "drucker-2014",
    "authors": "Drucker, Johanna",
    "year": 2014,
    "title": "Graphesis: Visual Forms of Knowledge Production",
    "publisher": "Harvard University Press",
    "theme": "Épistémologie",
    "abstract": "Critique des conventions de représentation visuelle.",
    "iso690": "Drucker, Johanna. Graphesis: Visual Forms of Knowledge Production. Harvard University Press, 2014.",
    "bibtex": "@book{drucker-2014,\n author={Drucker, Johanna},\n title={Graphesis: Visual Forms of Knowledge Production},\n year={2014},\n publisher={Harvard University Press}\n}"
  },
  {
    "id": "underwood-2019",
    "authors": "Underwood, Ted",
    "year": 2019,
    "title": "Distant Horizons: Digital Evidence and Literary Change",
    "publisher": "University of Chicago Press",
    "theme": "Méthodes",
    "abstract": "Analyse quantitative de transformations littéraires.",
    "iso690": "Underwood, Ted. Distant Horizons: Digital Evidence and Literary Change. University of Chicago Press, 2019.",
    "bibtex": "@book{underwood-2019,\n author={Underwood, Ted},\n title={Distant Horizons: Digital Evidence and Literary Change},\n year={2019},\n publisher={University of Chicago Press}\n}"
  },
  {
    "id": "jockers-2013",
    "authors": "Jockers, Matthew L.",
    "year": 2013,
    "title": "Macroanalysis: Digital Methods and Literary History",
    "publisher": "University of Illinois Press",
    "theme": "Méthodes",
    "abstract": "Historie littéraire computationnelle à grande échelle.",
    "iso690": "Jockers, Matthew L.. Macroanalysis: Digital Methods and Literary History. University of Illinois Press, 2013.",
    "bibtex": "@book{jockers-2013,\n author={Jockers, Matthew L.},\n title={Macroanalysis: Digital Methods and Literary History},\n year={2013},\n publisher={University of Illinois Press}\n}"
  },
  {
    "id": "risam-2018",
    "authors": "Risam, Roopika",
    "year": 2018,
    "title": "New Digital Worlds: Postcolonial Digital Humanities in Theory, Praxis, and Pedagogy",
    "publisher": "Northwestern University Press",
    "theme": "Épistémologie",
    "abstract": "Perspectives postcoloniales sur les pratiques numériques.",
    "iso690": "Risam, Roopika. New Digital Worlds: Postcolonial Digital Humanities in Theory, Praxis, and Pedagogy. Northwestern University Press, 2018.",
    "bibtex": "@book{risam-2018,\n author={Risam, Roopika},\n title={New Digital Worlds: Postcolonial Digital Humanities in Theory, Praxis, and Pedagogy},\n year={2018},\n publisher={Northwestern University Press}\n}"
  },
  {
    "id": "deegan-2012",
    "authors": "Deegan, Marilyn ; McCarty, Willard (dir.)",
    "year": 2012,
    "title": "Collaborative Research in the Digital Humanities",
    "publisher": "Ashgate",
    "theme": "Fondements",
    "abstract": "Collaboration et division du travail scientifique.",
    "iso690": "Deegan, Marilyn ; McCarty, Willard (dir.). Collaborative Research in the Digital Humanities. Ashgate, 2012.",
    "bibtex": "@book{deegan-2012,\n author={Deegan, Marilyn and McCarty, Willard (dir.)},\n title={Collaborative Research in the Digital Humanities},\n year={2012},\n publisher={Ashgate}\n}"
  },
];

export const ECOSYSTEM_ITEMS: EcosystemItem[] = [
  {
    id: 'revue-hn',
    name: 'Revue Humanités numériques',
    type: 'Revues',
    location: 'OpenEdition Journals (Humanistica)',
    accessNote: 'Accès ouvert diamant',
    description:
      'Revue scientifique francophone à comité de lecture publiée par l’association Humanistica, dédiée aux méthodes, retours d’expérience et enjeux critiques des HN.',
    url: 'https://journals.openedition.org/revuehn/',
  },
  {
    id: 'dhq',
    name: 'Digital Humanities Quarterly (DHQ)',
    type: 'Revues',
    location: 'ADHO (International)',
    accessNote: 'Accès ouvert · Multilingue',
    description:
      'Revue internationale pionnière publiant des articles de recherche, des études d’outils et des numéros thématiques sur l’ensemble des humanités numériques.',
    url: 'https://www.digitalhumanities.org/dhq/',
  },
  {
    id: 'programming-historian',
    name: 'Programming Historian en français',
    type: 'Revues',
    location: 'Éditorial international évalué par les pairs',
    accessNote: 'Tutoriels CC-BY',
    description:
      'Collection de leçons pratiques évaluées par les pairs (Python, R, QGIS, TEI, IIIF, Omeka) conçues spécifiquement pour les historiens et littéraires.',
    url: 'https://programminghistorian.org/fr/',
  },
  {
    id: 'enc-tnah',
    name: 'Master TNAH — Technologies numériques appliquées à l’histoire',
    type: 'Formations',
    location: 'École nationale des chartes (Paris)',
    accessNote: 'Master 2 · Bac+5',
    description:
      'Formation historique d’excellence en XML-TEI, bases de données, ingénierie documentaire, Web sémantique et gestion de corpus patrimoniaux.',
    url: 'https://www.chartes.psl.eu/fr/cursus/master-technologies-numeriques-appliquees-histoire',
  },
  {
    id: 'master-p8',
    name: 'Master Humanités numériques (Parcours Médiation & Ingénierie)',
    type: 'Formations',
    location: 'Université Paris 8',
    accessNote: 'Master 1 & 2',
    description:
      'Cursus pluridisciplinaire articulant culture numérique, architecture de l’information, édition électronique, archivage et création documentaire.',
    url: 'https://humanum-p8.fr/',
  },
  {
    id: 'master-lyon',
    name: 'Master Humanités numériques',
    type: 'Formations',
    location: 'ENS de Lyon / Université Lumière Lyon 2',
    accessNote: 'Master 1 & 2',
    description:
      'Formation adossée aux laboratoires lyonnais (ICAR, IHRIM) orientée vers la textométrie, l’édition critique numérique et la modélisation des données SHS.',
    url: 'https://www.ens-lyon.fr/',
  },
  {
    id: 'huma-num',
    name: 'IR* Huma-Num',
    type: 'Infrastructures',
    location: 'CNRS · Campus Condorcet (Aubervilliers)',
    accessNote: 'Infrastructure nationale',
    description:
      'Infrastructure de recherche étoile coordonnant services numériques (Nakala, Isidore, Sharedocs), grille de calcul et douze consortiums thématiques en SHS.',
    url: 'https://www.huma-num.fr/',
  },
  {
    id: 'dariah',
    name: 'DARIAH-EU',
    type: 'Infrastructures',
    location: 'Consortium européen (ERIC)',
    accessNote: 'Réseau européen',
    description:
      'Infrastructure européenne fédérant centres de compétences, groupes de travail et plateformes de formation (DARIAH-Campus) pour les arts et humanités.',
    url: 'https://www.dariah.eu/',
  },
  {
    id: 'odhn',
    name: 'Observatoire des humanités numériques (OdHN)',
    type: 'Infrastructures',
    location: 'ENS-PSL (Paris)',
    accessNote: 'Guichet & Guides',
    description:
      'Pôle d’accompagnement offrant guides méthodologiques, séminaires, tutoriels d’analyse de données et soutien aux projets numériques en SHS.',
    url: 'https://odhn.ens.psl.eu/',
  },
  {
    id: 'humanistica',
    name: 'Humanistica',
    type: 'Réseaux & Veille',
    location: 'Espace francophone',
    accessNote: 'Association & Colloque annuel',
    description:
      'Association francophone des humanités numériques animant le colloque annuel Humanistica, la liste dh-francophone et la revue éponyme.',
    url: 'https://www.humanisti.ca/',
  },
  {
    id: 'digit-hum',
    name: 'Initiative Digit_Hum',
    type: 'Réseaux & Veille',
    location: 'ENS / CNRS (Paris)',
    accessNote: 'Boîte à outils & Ateliers',
    description:
      'Initiative interdisciplinaire proposant des journées d’études annuelles, des fiches pratiques et une veille structurée sur les métiers des humanités numériques.',
    url: 'https://digithum.huma-num.fr/',
  },
  {
    id: 'calenda',
    name: 'Calenda — Calendrier des lettres et sciences humaines',
    type: 'Réseaux & Veille',
    location: 'OpenEdition',
    accessNote: 'Appels à communications & Colloques',
    description:
      'Agenda scientifique de référence recensant appels à communications, journées d’études, écoles d’été et offres de contrats doctoraux en SHS et HN.',
    url: 'https://calenda.org/',
  },
  {
    id: 'ccsd-hal',
    name: 'CCSD — Archive ouverte HAL, Sciencesconf & Episciences',
    type: 'Infrastructures',
    location: 'Villeurbanne (CNRS · INRIA · INRAE)',
    accessNote: 'Services nationaux de science ouverte',
    description:
      'Unité d’appui et de recherche opérant les services publics d’archive ouverte (HAL / HAL-SHS), de gestion de conférences scientifiques (Sciencesconf) et d’épi-revues diamant.',
    url: 'https://www.ccsd.cnrs.fr/',
  },
  {
    id: 'consortiums-hn',
    name: 'Consortiums Huma-Num (CAHIER, Ariane, 3DHN, MASA+)',
    type: 'Réseaux & Veille',
    location: 'Réseaux disciplinaires nationaux (CNRS)',
    accessNote: 'Guides de bonnes pratiques & Groupes de travail',
    description:
      'Réseau de consortiums thématiques produisant guides méthodologiques, référentiels et formations dédiées aux corpus d’auteurs, aux analyses textuelles, à la 3D et à l’archéologie.',
    url: 'https://www.huma-num.fr/les-consortiums-hn/',
  },
  {
    "id": "dariah-campus",
    "name": "DARIAH-Campus",
    "type": "Formations",
    "location": "Europe / en ligne",
    "accessNote": "Ressources en ligne",
    "description": "Cours, vidéos, exercices pour les compétences numériques en SHS.",
    "url": "https://campus.dariah.eu/resources"
  },
  {
    "id": "clarin",
    "name": "CLARIN ERIC",
    "type": "Infrastructures",
    "location": "Europe",
    "accessNote": "Selon service",
    "description": "Infrastructure pour les ressources et outils linguistiques.",
    "url": "https://www.clarin.eu/"
  },
  {
    "id": "adho",
    "name": "Alliance of Digital Humanities Organizations",
    "type": "Réseaux & Veille",
    "location": "International",
    "accessNote": "Site public",
    "description": "Coordination d’associations de la discipline.",
    "url": "https://adho.org/"
  },
  {
    "id": "eadh",
    "name": "European Association for Digital Humanities",
    "type": "Réseaux & Veille",
    "location": "Europe",
    "accessNote": "Site public",
    "description": "Communauté scientifique et méthodes numériques.",
    "url": "https://eadh.org/"
  },
  {
    "id": "dhsi",
    "name": "Digital Humanities Summer Institute",
    "type": "Formations",
    "location": "Canada",
    "accessNote": "Selon édition",
    "description": "École de formation aux pratiques numériques.",
    "url": "https://dhsi.org/"
  },
  {
    "id": "dh-benelux",
    "name": "DH Benelux Journal",
    "type": "Revues",
    "location": "Benelux",
    "accessNote": "Selon revue",
    "description": "Travaux sur les méthodes, infrastructures et résultats.",
    "url": "https://journal.dhbenelux.org/"
  },
  {
    "id": "journal-dh",
    "name": "Journal of Digital Humanities",
    "type": "Revues",
    "location": "International",
    "accessNote": "Archives en ligne",
    "description": "Archives de réflexion méthodologique sur les pratiques numériques.",
    "url": "https://journalofdigitalhumanities.org/"
  },
  {
    "id": "software-heritage",
    "name": "Software Heritage",
    "type": "Infrastructures",
    "location": "International",
    "accessNote": "Archive publique",
    "description": "Archivage et identification pérenne du code source public.",
    "url": "https://www.softwareheritage.org/"
  },
  {
    "id": "datacite",
    "name": "DataCite",
    "type": "Infrastructures",
    "location": "International",
    "accessNote": "Documentation publique",
    "description": "Identification et métadonnées des résultats de recherche.",
    "url": "https://datacite.org/"
  },
  {
    "id": "carpentries",
    "name": "The Carpentries",
    "type": "Formations",
    "location": "International",
    "accessNote": "Supports ouverts",
    "description": "Cours pratiques de programmation et gestion des données.",
    "url": "https://carpentries.org/"
  },
];
