export type ToolCategory =
  | 'Analyse textuelle'
  | 'Édition & HTR'
  | 'Réseaux & SIG'
  | 'Gestion & Données'
  | 'Services & Infrastructures';

export type LicenseType = 'Logiciel libre' | 'Institutionnel' | 'Freemium' | 'Gratuit propriétaire' | 'Commercial' | 'Recherche restreinte' | 'À vérifier';
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
    license: 'Commercial',
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
    license: 'Gratuit propriétaire',
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
    license: 'À vérifier',
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

  {"id":"camel-tools","name":"CAMeL Tools","url":"https://camel-tools.readthedocs.io/","maintainer":"NYU Abu Dhabi · CAMeL Lab","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","summary":"Analyse morphologique, désambiguïsation et reconnaissance d’entités arabes.","description":"Analyse morphologique, désambiguïsation et reconnaissance d’entités arabes. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Python","TXT"],"useCases":["Analyse morphologique, désambiguïsation et reconnaissance d’entités arabes."],"workflowSteps":["Comparer les variétés linguistiques","Installer les données du modèle","Évaluer les annotations sur une référence"],"citationBibtex":"@misc{camel-tools,\n title={CAMeL Tools},\n howpublished={https://camel-tools.readthedocs.io/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"stanza","name":"Stanza","url":"https://stanfordnlp.github.io/stanza/","maintainer":"Stanford NLP","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","summary":"Pipeline multilingue de tokenisation, analyse syntaxique et entités.","description":"Pipeline multilingue de tokenisation, analyse syntaxique et entités. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Python","CoNLL-U"],"useCases":["Pipeline multilingue de tokenisation, analyse syntaxique et entités."],"workflowSteps":["Choisir la langue et les processeurs","Contrôler la segmentation","Exporter les annotations"],"citationBibtex":"@misc{stanza,\n title={Stanza},\n howpublished={https://stanfordnlp.github.io/stanza/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"udpipe","name":"UDPipe","url":"https://ufal.mff.cuni.cz/udpipe","maintainer":"Charles University","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","summary":"Analyse morphosyntaxique fondée sur Universal Dependencies.","description":"Analyse morphosyntaxique fondée sur Universal Dependencies. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["CoNLL-U","TXT"],"useCases":["Analyse morphosyntaxique fondée sur Universal Dependencies."],"workflowSteps":["Choisir un modèle","Annoter un échantillon","Comparer avec la référence"],"citationBibtex":"@misc{udpipe,\n title={UDPipe},\n howpublished={https://ufal.mff.cuni.cz/udpipe},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"corenlp","name":"Stanford CoreNLP","url":"https://stanfordnlp.github.io/CoreNLP/","maintainer":"Stanford NLP","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","summary":"Analyse linguistique avec des pipelines Java et modèles par langue.","description":"Analyse linguistique avec des pipelines Java et modèles par langue. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["TXT","JSON","XML"],"useCases":["Analyse linguistique avec des pipelines Java et modèles par langue."],"workflowSteps":["Choisir les annotateurs","Tester la langue","Exporter les sorties"],"citationBibtex":"@misc{corenlp,\n title={Stanford CoreNLP},\n howpublished={https://stanfordnlp.github.io/CoreNLP/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"gensim","name":"Gensim","url":"https://radimrehurek.com/gensim/","maintainer":"Communauté Gensim","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","summary":"Modélisation thématique et représentations vectorielles de documents.","description":"Modélisation thématique et représentations vectorielles de documents. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Python","TXT"],"useCases":["Modélisation thématique et représentations vectorielles de documents."],"workflowSteps":["Préparer un dictionnaire","Tester les hyperparamètres","Interpréter les thèmes sur les sources"],"citationBibtex":"@misc{gensim,\n title={Gensim},\n howpublished={https://radimrehurek.com/gensim/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"bertopic","name":"BERTopic","url":"https://maartengr.github.io/BERTopic/","maintainer":"Maarten Grootendorst et contributeurs","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","summary":"Regroupement thématique fondé sur représentations vectorielles.","description":"Regroupement thématique fondé sur représentations vectorielles. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Python","TXT"],"useCases":["Regroupement thématique fondé sur représentations vectorielles."],"workflowSteps":["Choisir un modèle de langue","Inspecter groupes et documents","Tester la stabilité"],"citationBibtex":"@misc{bertopic,\n title={BERTopic},\n howpublished={https://maartengr.github.io/BERTopic/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"scikit-learn","name":"scikit-learn","url":"https://scikit-learn.org/","maintainer":"Communauté scikit-learn","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","summary":"Classification, regroupement et vectorisation des textes et tableaux.","description":"Classification, regroupement et vectorisation des textes et tableaux. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Python","CSV"],"useCases":["Classification, regroupement et vectorisation des textes et tableaux."],"workflowSteps":["Créer un jeu de test indépendant","Tester une référence simple","Rapporter les métriques"],"citationBibtex":"@misc{scikit-learn,\n title={scikit-learn},\n howpublished={https://scikit-learn.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"transformers","name":"Hugging Face Transformers","url":"https://huggingface.co/docs/transformers/","maintainer":"Hugging Face","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","summary":"Utiliser des modèles préentraînés pour des tâches de traitement du langage.","description":"Utiliser des modèles préentraînés pour des tâches de traitement du langage. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Python","TXT"],"useCases":["Utiliser des modèles préentraînés pour des tâches de traitement du langage."],"workflowSteps":["Lire la fiche du modèle","Vérifier licence et données","Évaluer sur corpus cible"],"citationBibtex":"@misc{transformers,\n title={Hugging Face Transformers},\n howpublished={https://huggingface.co/docs/transformers/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"sentence-transformers","name":"Sentence Transformers","url":"https://www.sbert.net/","maintainer":"Communauté Sentence Transformers","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","summary":"Représentations de phrases pour recherche et similarité sémantique.","description":"Représentations de phrases pour recherche et similarité sémantique. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Python","TXT"],"useCases":["Représentations de phrases pour recherche et similarité sémantique."],"workflowSteps":["Choisir un modèle adapté","Créer des requêtes test","Comparer à une recherche lexicale"],"citationBibtex":"@misc{sentence-transformers,\n title={Sentence Transformers},\n howpublished={https://www.sbert.net/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"regex","name":"regex (Python)","url":"https://pypi.org/project/regex/","maintainer":"Projet regex","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","summary":"Expressions régulières étendues, notamment propriétés Unicode.","description":"Expressions régulières étendues, notamment propriétés Unicode. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Python","TXT"],"useCases":["Expressions régulières étendues, notamment propriétés Unicode."],"workflowSteps":["Écrire des cas de test","Définir le motif","Vérifier faux positifs"],"citationBibtex":"@misc{regex,\n title={regex (Python)},\n howpublished={https://pypi.org/project/regex/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"qalsadi","name":"Qalsadi","url":"https://github.com/linuxscout/qalsadi","maintainer":"Taha Zerrouki et contributeurs","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","summary":"Analyse morphologique de l’arabe.","description":"Analyse morphologique de l’arabe. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Python","TXT"],"useCases":["Analyse morphologique de l’arabe."],"workflowSteps":["Préserver graphies originales","Comparer les analyses candidates","Relire les ambiguïtés"],"citationBibtex":"@misc{qalsadi,\n title={Qalsadi},\n howpublished={https://github.com/linuxscout/qalsadi},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"mishkal","name":"Mishkal","url":"https://github.com/linuxscout/mishkal","maintainer":"Taha Zerrouki et contributeurs","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","summary":"Vocalisation automatique de textes arabes.","description":"Vocalisation automatique de textes arabes. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Python","TXT"],"useCases":["Vocalisation automatique de textes arabes."],"workflowSteps":["Choisir un corpus","Vocaliser un échantillon","Comparer avec lecture experte"],"citationBibtex":"@misc{mishkal,\n title={Mishkal},\n howpublished={https://github.com/linuxscout/mishkal},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"pyarabic","name":"PyArabic","url":"https://pyarabic.readthedocs.io/","maintainer":"Taha Zerrouki et contributeurs","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","summary":"Fonctions de manipulation des caractères et textes arabes.","description":"Fonctions de manipulation des caractères et textes arabes. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Python","TXT"],"useCases":["Fonctions de manipulation des caractères et textes arabes."],"workflowSteps":["Identifier les conventions Unicode","Normaliser une copie","Contrôler les pertes"],"citationBibtex":"@misc{pyarabic,\n title={PyArabic},\n howpublished={https://pyarabic.readthedocs.io/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"flair","name":"Flair","url":"https://flairnlp.github.io/","maintainer":"Communauté Flair","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","summary":"Cadre Python pour étiquetage et classification de textes.","description":"Cadre Python pour étiquetage et classification de textes. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Python","CoNLL"],"useCases":["Cadre Python pour étiquetage et classification de textes."],"workflowSteps":["Sélectionner les modèles","Préparer des annotations","Mesurer les erreurs"],"citationBibtex":"@misc{flair,\n title={Flair},\n howpublished={https://flairnlp.github.io/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"mallet","name":"MALLET","url":"https://mimno.github.io/Mallet/","maintainer":"Projet MALLET","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","summary":"Analyse statistique de textes, dont modélisation thématique.","description":"Analyse statistique de textes, dont modélisation thématique. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["TXT","Java"],"useCases":["Analyse statistique de textes, dont modélisation thématique."],"workflowSteps":["Définir les documents","Tester nombre de thèmes et graines","Relire les documents représentatifs"],"citationBibtex":"@misc{mallet,\n title={MALLET},\n howpublished={https://mimno.github.io/Mallet/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"tidytext","name":"tidytext","url":"https://www.tidytextmining.com/","maintainer":"Julia Silge et David Robinson","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","summary":"Analyse de texte structurée sous R.","description":"Analyse de texte structurée sous R. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["R","CSV"],"useCases":["Analyse de texte structurée sous R."],"workflowSteps":["Mettre les textes en table","Compter et pondérer","Comparer les sous-corpus"],"citationBibtex":"@misc{tidytext,\n title={tidytext},\n howpublished={https://www.tidytextmining.com/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"ud","name":"Universal Dependencies","url":"https://universaldependencies.org/","maintainer":"Communauté UD","category":"Analyse textuelle","license":"Institutionnel","level":"Intermédiaire","summary":"Ressource de schémas et corpus annotés en syntaxe multilingue.","description":"Ressource de schémas et corpus annotés en syntaxe multilingue. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["CoNLL-U"],"useCases":["Ressource de schémas et corpus annotés en syntaxe multilingue."],"workflowSteps":["Choisir une langue","Lire les règles d’annotation","Contrôler les écarts"],"citationBibtex":"@misc{ud,\n title={Universal Dependencies},\n howpublished={https://universaldependencies.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"elan","name":"ELAN","url":"https://archive.mpi.nl/tla/elan","maintainer":"Max Planck Institute","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","summary":"Annotation temporelle de médias audio et vidéo.","description":"Annotation temporelle de médias audio et vidéo. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["EAF","WAV","MP4"],"useCases":["Annotation temporelle de médias audio et vidéo."],"workflowSteps":["Créer des niveaux","Synchroniser annotations et média","Exporter un tableau"],"citationBibtex":"@misc{elan,\n title={ELAN},\n howpublished={https://archive.mpi.nl/tla/elan},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"praat","name":"Praat","url":"https://www.fon.hum.uva.nl/praat/","maintainer":"Paul Boersma et David Weenink","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","summary":"Analyse phonétique et acoustique de la parole.","description":"Analyse phonétique et acoustique de la parole. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["WAV","TextGrid"],"useCases":["Analyse phonétique et acoustique de la parole."],"workflowSteps":["Charger un enregistrement","Segmenter","Vérifier les mesures"],"citationBibtex":"@misc{praat,\n title={Praat},\n howpublished={https://www.fon.hum.uva.nl/praat/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"whisper","name":"Whisper","url":"https://github.com/openai/whisper","maintainer":"OpenAI","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","summary":"Reconnaissance automatique de parole multilingue.","description":"Reconnaissance automatique de parole multilingue. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Audio","TXT","SRT"],"useCases":["Reconnaissance automatique de parole multilingue."],"workflowSteps":["Choisir un modèle","Transcrire sur un échantillon","Relire les noms et passages difficiles"],"citationBibtex":"@misc{whisper,\n title={Whisper},\n howpublished={https://github.com/openai/whisper},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"audacity","name":"Audacity","url":"https://www.audacityteam.org/","maintainer":"Communauté Audacity","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","summary":"Édition et préparation d’enregistrements audio.","description":"Édition et préparation d’enregistrements audio. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["WAV","FLAC","MP3"],"useCases":["Édition et préparation d’enregistrements audio."],"workflowSteps":["Conserver le fichier maître","Nettoyer une copie","Documenter les transformations"],"citationBibtex":"@misc{audacity,\n title={Audacity},\n howpublished={https://www.audacityteam.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"ocrmypdf","name":"OCRmyPDF","url":"https://ocrmypdf.readthedocs.io/","maintainer":"Projet OCRmyPDF","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","summary":"Ajouter une couche de texte OCR à des PDF numérisés.","description":"Ajouter une couche de texte OCR à des PDF numérisés. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["PDF","TXT"],"useCases":["Ajouter une couche de texte OCR à des PDF numérisés."],"workflowSteps":["Conserver le PDF original","Choisir langues et options","Contrôler texte et pages"],"citationBibtex":"@misc{ocrmypdf,\n title={OCRmyPDF},\n howpublished={https://ocrmypdf.readthedocs.io/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"scantailor","name":"ScanTailor Advanced","url":"https://github.com/4lex4/scantailor-advanced","maintainer":"Communauté ScanTailor","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","summary":"Prétraitement de pages numérisées avant OCR.","description":"Prétraitement de pages numérisées avant OCR. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["TIFF","PNG"],"useCases":["Prétraitement de pages numérisées avant OCR."],"workflowSteps":["Scinder les pages","Redresser","Contrôler marges et pertes"],"citationBibtex":"@misc{scantailor,\n title={ScanTailor Advanced},\n howpublished={https://github.com/4lex4/scantailor-advanced},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"label-studio","name":"Label Studio","url":"https://labelstud.io/","maintainer":"HumanSignal et communauté","category":"Édition & HTR","license":"Freemium","level":"Intermédiaire","summary":"Annotation de textes, images et autres données.","description":"Annotation de textes, images et autres données. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["JSON","CSV"],"useCases":["Annotation de textes, images et autres données."],"workflowSteps":["Définir les classes","Annoter un lot de référence","Exporter avec guide d’annotation"],"citationBibtex":"@misc{label-studio,\n title={Label Studio},\n howpublished={https://labelstud.io/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"cvat","name":"CVAT","url":"https://www.cvat.ai/","maintainer":"Communauté CVAT","category":"Édition & HTR","license":"Freemium","level":"Intermédiaire","summary":"Annotation d’images et vidéos, notamment régions et objets.","description":"Annotation d’images et vidéos, notamment régions et objets. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["COCO","XML","JSON"],"useCases":["Annotation d’images et vidéos, notamment régions et objets."],"workflowSteps":["Établir les classes","Annoter des images","Contrôler les coordonnées"],"citationBibtex":"@misc{cvat,\n title={CVAT},\n howpublished={https://www.cvat.ai/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"existdb","name":"eXist-db","url":"https://exist-db.org/","maintainer":"Communauté eXist-db","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","summary":"Base XML et langage XQuery pour éditions numériques.","description":"Base XML et langage XQuery pour éditions numériques. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["XML","XQuery"],"useCases":["Base XML et langage XQuery pour éditions numériques."],"workflowSteps":["Importer les documents","Écrire les requêtes","Tester l’indexation"],"citationBibtex":"@misc{existdb,\n title={eXist-db},\n howpublished={https://exist-db.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"basex","name":"BaseX","url":"https://basex.org/","maintainer":"BaseX et contributeurs","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","summary":"Base de données XML et traitement XQuery.","description":"Base de données XML et traitement XQuery. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["XML","XQuery"],"useCases":["Base de données XML et traitement XQuery."],"workflowSteps":["Créer une base","Tester les requêtes","Exporter les résultats"],"citationBibtex":"@misc{basex,\n title={BaseX},\n howpublished={https://basex.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"saxon","name":"Saxon","url":"https://www.saxonica.com/","maintainer":"Saxonica","category":"Édition & HTR","license":"Freemium","level":"Intermédiaire","summary":"Transformations XSLT et requêtes XPath/XQuery selon édition.","description":"Transformations XSLT et requêtes XPath/XQuery selon édition. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["XML","XSLT"],"useCases":["Transformations XSLT et requêtes XPath/XQuery selon édition."],"workflowSteps":["Écrire une feuille","Tester sur exemples","Contrôler les sorties"],"citationBibtex":"@misc{saxon,\n title={Saxon},\n howpublished={https://www.saxonica.com/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"pandoc","name":"Pandoc","url":"https://pandoc.org/","maintainer":"John MacFarlane et contributeurs","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","summary":"Conversion de documents scientifiques et formats de publication.","description":"Conversion de documents scientifiques et formats de publication. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Markdown","DOCX","HTML","LaTeX"],"useCases":["Conversion de documents scientifiques et formats de publication."],"workflowSteps":["Identifier le format source","Convertir","Contrôler notes et références"],"citationBibtex":"@misc{pandoc,\n title={Pandoc},\n howpublished={https://pandoc.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"quarto","name":"Quarto","url":"https://quarto.org/","maintainer":"Posit et contributeurs","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","summary":"Publication de documents scientifiques combinant code et texte.","description":"Publication de documents scientifiques combinant code et texte. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["QMD","HTML","PDF"],"useCases":["Publication de documents scientifiques combinant code et texte."],"workflowSteps":["Préparer le document","Exécuter le code","Archiver sources et résultat"],"citationBibtex":"@misc{quarto,\n title={Quarto},\n howpublished={https://quarto.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"manifold","name":"Manifold","url":"https://manifoldapp.org/","maintainer":"Projet Manifold","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","summary":"Édition numérique de monographies avec annotations et médias.","description":"Édition numérique de monographies avec annotations et médias. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["EPUB","HTML"],"useCases":["Édition numérique de monographies avec annotations et médias."],"workflowSteps":["Importer un manuscrit","Vérifier les médias","Publier avec droits explicites"],"citationBibtex":"@misc{manifold,\n title={Manifold},\n howpublished={https://manifoldapp.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"scalar","name":"Scalar","url":"https://scalar.usc.edu/","maintainer":"Alliance for Networking Visual Culture","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","summary":"Publication savante multimédia et non linéaire.","description":"Publication savante multimédia et non linéaire. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["HTML","images","vidéos"],"useCases":["Publication savante multimédia et non linéaire."],"workflowSteps":["Organiser les parcours","Ajouter des médias sourcés","Tester l’accessibilité"],"citationBibtex":"@misc{scalar,\n title={Scalar},\n howpublished={https://scalar.usc.edu/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"mukurtu","name":"Mukurtu CMS","url":"https://mukurtu.org/","maintainer":"Center for Digital Scholarship and Curation","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","summary":"Gestion de patrimoines numériques selon des protocoles culturels.","description":"Gestion de patrimoines numériques selon des protocoles culturels. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Métadonnées","médias"],"useCases":["Gestion de patrimoines numériques selon des protocoles culturels."],"workflowSteps":["Définir les protocoles avec les communautés","Importer","Vérifier les accès"],"citationBibtex":"@misc{mukurtu,\n title={Mukurtu CMS},\n howpublished={https://mukurtu.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"collectiveaccess","name":"CollectiveAccess","url":"https://collectiveaccess.org/","maintainer":"Whirl-i-Gig et communauté","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","summary":"Catalogage et gestion de collections muséales ou archivistiques.","description":"Catalogage et gestion de collections muséales ou archivistiques. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Métadonnées","CSV"],"useCases":["Catalogage et gestion de collections muséales ou archivistiques."],"workflowSteps":["Définir les champs","Importer les notices","Contrôler les relations"],"citationBibtex":"@misc{collectiveaccess,\n title={CollectiveAccess},\n howpublished={https://collectiveaccess.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"meshlab","name":"MeshLab","url":"https://www.meshlab.net/","maintainer":"ISTI-CNR et contributeurs","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","summary":"Traitement et nettoyage de maillages 3D.","description":"Traitement et nettoyage de maillages 3D. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["PLY","OBJ","STL"],"useCases":["Traitement et nettoyage de maillages 3D."],"workflowSteps":["Importer","Nettoyer une copie","Documenter les modifications"],"citationBibtex":"@misc{meshlab,\n title={MeshLab},\n howpublished={https://www.meshlab.net/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"cloudcompare","name":"CloudCompare","url":"https://www.cloudcompare.org/","maintainer":"Communauté CloudCompare","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","summary":"Analyse et traitement de nuages de points patrimoniaux.","description":"Analyse et traitement de nuages de points patrimoniaux. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["LAS","PLY","E57"],"useCases":["Analyse et traitement de nuages de points patrimoniaux."],"workflowSteps":["Importer","Aligner","Évaluer les écarts"],"citationBibtex":"@misc{cloudcompare,\n title={CloudCompare},\n howpublished={https://www.cloudcompare.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"iiif-cantaloupe","name":"Cantaloupe","url":"https://cantaloupe-project.github.io/","maintainer":"Projet Cantaloupe","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","summary":"Serveur d’images compatible IIIF Image API.","description":"Serveur d’images compatible IIIF Image API. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["JPEG","TIFF","IIIF"],"useCases":["Serveur d’images compatible IIIF Image API."],"workflowSteps":["Configurer une source d’images","Vérifier permissions","Tester les requêtes"],"citationBibtex":"@misc{iiif-cantaloupe,\n title={Cantaloupe},\n howpublished={https://cantaloupe-project.github.io/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"cytoscape","name":"Cytoscape","url":"https://cytoscape.org/","maintainer":"Consortium Cytoscape","category":"Réseaux & SIG","license":"Logiciel libre","level":"Intermédiaire","summary":"Visualisation et analyse de réseaux, adaptable aux données historiques.","description":"Visualisation et analyse de réseaux, adaptable aux données historiques. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["CSV","GraphML"],"useCases":["Visualisation et analyse de réseaux, adaptable aux données historiques."],"workflowSteps":["Préparer nœuds et liens","Choisir un agencement","Comparer métriques et sources"],"citationBibtex":"@misc{cytoscape,\n title={Cytoscape},\n howpublished={https://cytoscape.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"igraph","name":"igraph","url":"https://igraph.org/","maintainer":"Communauté igraph","category":"Réseaux & SIG","license":"Logiciel libre","level":"Intermédiaire","summary":"Bibliothèques d’analyse de réseaux en R et Python.","description":"Bibliothèques d’analyse de réseaux en R et Python. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["GraphML","CSV"],"useCases":["Bibliothèques d’analyse de réseaux en R et Python."],"workflowSteps":["Construire un graphe","Calculer des métriques","Tester effets des lacunes"],"citationBibtex":"@misc{igraph,\n title={igraph},\n howpublished={https://igraph.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"graphviz","name":"Graphviz","url":"https://graphviz.org/","maintainer":"Communauté Graphviz","category":"Réseaux & SIG","license":"Logiciel libre","level":"Intermédiaire","summary":"Représentation automatique de graphes à partir d’un langage de description.","description":"Représentation automatique de graphes à partir d’un langage de description. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["DOT","SVG","PNG"],"useCases":["Représentation automatique de graphes à partir d’un langage de description."],"workflowSteps":["Définir les relations","Choisir le moteur","Vérifier lisibilité"],"citationBibtex":"@misc{graphviz,\n title={Graphviz},\n howpublished={https://graphviz.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"sigma","name":"Sigma.js","url":"https://www.sigmajs.org/","maintainer":"Projet Sigma.js","category":"Réseaux & SIG","license":"Logiciel libre","level":"Intermédiaire","summary":"Visualisation interactive de graphes dans le navigateur.","description":"Visualisation interactive de graphes dans le navigateur. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["JavaScript","Graphology"],"useCases":["Visualisation interactive de graphes dans le navigateur."],"workflowSteps":["Construire les données","Choisir les styles","Tester l’interaction"],"citationBibtex":"@misc{sigma,\n title={Sigma.js},\n howpublished={https://www.sigmajs.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"grass","name":"GRASS GIS","url":"https://grass.osgeo.org/","maintainer":"OSGeo","category":"Réseaux & SIG","license":"Logiciel libre","level":"Intermédiaire","summary":"Analyse spatiale raster et vectorielle.","description":"Analyse spatiale raster et vectorielle. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["GeoTIFF","GeoPackage"],"useCases":["Analyse spatiale raster et vectorielle."],"workflowSteps":["Définir projection et emprise","Exécuter les traitements","Documenter les paramètres"],"citationBibtex":"@misc{grass,\n title={GRASS GIS},\n howpublished={https://grass.osgeo.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"gdal","name":"GDAL","url":"https://gdal.org/","maintainer":"OSGeo","category":"Réseaux & SIG","license":"Logiciel libre","level":"Intermédiaire","summary":"Conversion et traitement de données géospatiales.","description":"Conversion et traitement de données géospatiales. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["GeoTIFF","GeoJSON","GeoPackage"],"useCases":["Conversion et traitement de données géospatiales."],"workflowSteps":["Inspecter le système de coordonnées","Convertir","Vérifier géométries"],"citationBibtex":"@misc{gdal,\n title={GDAL},\n howpublished={https://gdal.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"geopandas","name":"GeoPandas","url":"https://geopandas.org/","maintainer":"Communauté GeoPandas","category":"Réseaux & SIG","license":"Logiciel libre","level":"Intermédiaire","summary":"Analyse de données géographiques structurées en Python.","description":"Analyse de données géographiques structurées en Python. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["GeoJSON","GeoPackage","Shapefile"],"useCases":["Analyse de données géographiques structurées en Python."],"workflowSteps":["Lire les couches","Harmoniser les projections","Exporter"],"citationBibtex":"@misc{geopandas,\n title={GeoPandas},\n howpublished={https://geopandas.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"postgis","name":"PostGIS","url":"https://postgis.net/","maintainer":"Communauté PostGIS","category":"Réseaux & SIG","license":"Logiciel libre","level":"Intermédiaire","summary":"Extension spatiale de PostgreSQL.","description":"Extension spatiale de PostgreSQL. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["SQL","geometries"],"useCases":["Extension spatiale de PostgreSQL."],"workflowSteps":["Importer les couches","Créer les index","Tester les requêtes spatiales"],"citationBibtex":"@misc{postgis,\n title={PostGIS},\n howpublished={https://postgis.net/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"openlayers","name":"OpenLayers","url":"https://openlayers.org/","maintainer":"Communauté OpenLayers","category":"Réseaux & SIG","license":"Logiciel libre","level":"Intermédiaire","summary":"Cartographie Web interactive à partir de couches multiples.","description":"Cartographie Web interactive à partir de couches multiples. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["GeoJSON","WMTS","WMS"],"useCases":["Cartographie Web interactive à partir de couches multiples."],"workflowSteps":["Préparer les couches","Configurer la carte","Indiquer les attributions"],"citationBibtex":"@misc{openlayers,\n title={OpenLayers},\n howpublished={https://openlayers.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"maplibre","name":"MapLibre GL JS","url":"https://maplibre.org/","maintainer":"MapLibre","category":"Réseaux & SIG","license":"Logiciel libre","level":"Intermédiaire","summary":"Cartographie Web vectorielle interactive.","description":"Cartographie Web vectorielle interactive. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["GeoJSON","Vector tiles"],"useCases":["Cartographie Web vectorielle interactive."],"workflowSteps":["Choisir les sources","Configurer le style","Vérifier licences et accessibilité"],"citationBibtex":"@misc{maplibre,\n title={MapLibre GL JS},\n howpublished={https://maplibre.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"keplergl","name":"kepler.gl","url":"https://kepler.gl/","maintainer":"Communauté kepler.gl","category":"Réseaux & SIG","license":"Logiciel libre","level":"Intermédiaire","summary":"Exploration visuelle de données géographiques tabulaires.","description":"Exploration visuelle de données géographiques tabulaires. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["CSV","GeoJSON"],"useCases":["Exploration visuelle de données géographiques tabulaires."],"workflowSteps":["Importer des points","Vérifier les coordonnées","Comparer les filtres"],"citationBibtex":"@misc{keplergl,\n title={kepler.gl},\n howpublished={https://kepler.gl/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"datashader","name":"Datashader","url":"https://datashader.org/","maintainer":"HoloViz","category":"Réseaux & SIG","license":"Logiciel libre","level":"Intermédiaire","summary":"Agrégation visuelle de grands ensembles de points.","description":"Agrégation visuelle de grands ensembles de points. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Python","tableaux"],"useCases":["Agrégation visuelle de grands ensembles de points."],"workflowSteps":["Définir les axes","Choisir agrégations","Contrôler les densités"],"citationBibtex":"@misc{datashader,\n title={Datashader},\n howpublished={https://datashader.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"r","name":"R","url":"https://www.r-project.org/","maintainer":"R Foundation","category":"Gestion & Données","license":"Logiciel libre","level":"Intermédiaire","summary":"Environnement d’analyse statistique et de visualisation.","description":"Environnement d’analyse statistique et de visualisation. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["R","CSV"],"useCases":["Environnement d’analyse statistique et de visualisation."],"workflowSteps":["Importer","Documenter les transformations","Archiver le script"],"citationBibtex":"@misc{r,\n title={R},\n howpublished={https://www.r-project.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"python","name":"Python","url":"https://www.python.org/","maintainer":"Python Software Foundation","category":"Gestion & Données","license":"Logiciel libre","level":"Intermédiaire","summary":"Langage de traitement de corpus et de données.","description":"Langage de traitement de corpus et de données. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Python","TXT","CSV"],"useCases":["Langage de traitement de corpus et de données."],"workflowSteps":["Définir les entrées","Écrire des tests","Figer les dépendances"],"citationBibtex":"@misc{python,\n title={Python},\n howpublished={https://www.python.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"duckdb","name":"DuckDB","url":"https://duckdb.org/","maintainer":"DuckDB Foundation","category":"Gestion & Données","license":"Logiciel libre","level":"Intermédiaire","summary":"Analyse SQL locale de fichiers et tables.","description":"Analyse SQL locale de fichiers et tables. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["CSV","Parquet","SQL"],"useCases":["Analyse SQL locale de fichiers et tables."],"workflowSteps":["Décrire le schéma","Exécuter les requêtes","Contrôler les agrégations"],"citationBibtex":"@misc{duckdb,\n title={DuckDB},\n howpublished={https://duckdb.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"sqlite","name":"SQLite","url":"https://www.sqlite.org/","maintainer":"Projet SQLite","category":"Gestion & Données","license":"Logiciel libre","level":"Intermédiaire","summary":"Base relationnelle embarquée pour données documentaires.","description":"Base relationnelle embarquée pour données documentaires. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["SQL","SQLite"],"useCases":["Base relationnelle embarquée pour données documentaires."],"workflowSteps":["Définir les tables","Créer des identifiants","Vérifier intégrité"],"citationBibtex":"@misc{sqlite,\n title={SQLite},\n howpublished={https://www.sqlite.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"postgresql","name":"PostgreSQL","url":"https://www.postgresql.org/","maintainer":"PostgreSQL Global Development Group","category":"Gestion & Données","license":"Logiciel libre","level":"Intermédiaire","summary":"Base de données relationnelle, recherche et gestion de données.","description":"Base de données relationnelle, recherche et gestion de données. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["SQL","CSV","JSON"],"useCases":["Base de données relationnelle, recherche et gestion de données."],"workflowSteps":["Modéliser","Importer et contrôler","Sauvegarder"],"citationBibtex":"@misc{postgresql,\n title={PostgreSQL},\n howpublished={https://www.postgresql.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"rdflib","name":"RDFLib","url":"https://rdflib.readthedocs.io/","maintainer":"Communauté RDFLib","category":"Gestion & Données","license":"Logiciel libre","level":"Intermédiaire","summary":"Manipulation de graphes RDF et requêtes SPARQL en Python.","description":"Manipulation de graphes RDF et requêtes SPARQL en Python. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Turtle","RDF/XML","JSON-LD"],"useCases":["Manipulation de graphes RDF et requêtes SPARQL en Python."],"workflowSteps":["Créer un graphe","Vérifier les URI","Exécuter les requêtes"],"citationBibtex":"@misc{rdflib,\n title={RDFLib},\n howpublished={https://rdflib.readthedocs.io/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"protege","name":"Protégé","url":"https://protege.stanford.edu/","maintainer":"Stanford Center for Biomedical Informatics Research","category":"Gestion & Données","license":"Logiciel libre","level":"Intermédiaire","summary":"Édition et inspection d’ontologies OWL.","description":"Édition et inspection d’ontologies OWL. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["OWL","RDF"],"useCases":["Édition et inspection d’ontologies OWL."],"workflowSteps":["Définir classes et propriétés","Tester la cohérence","Documenter les choix"],"citationBibtex":"@misc{protege,\n title={Protégé},\n howpublished={https://protege.stanford.edu/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"apache-jena","name":"Apache Jena","url":"https://jena.apache.org/","maintainer":"Apache Software Foundation","category":"Gestion & Données","license":"Logiciel libre","level":"Intermédiaire","summary":"Cadre de traitement et interrogation de données RDF.","description":"Cadre de traitement et interrogation de données RDF. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["RDF","SPARQL"],"useCases":["Cadre de traitement et interrogation de données RDF."],"workflowSteps":["Charger les graphes","Tester les requêtes","Vérifier les résultats"],"citationBibtex":"@misc{apache-jena,\n title={Apache Jena},\n howpublished={https://jena.apache.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"skosmos","name":"Skosmos","url":"https://skosmos.org/","maintainer":"National Library of Finland et contributeurs","category":"Gestion & Données","license":"Logiciel libre","level":"Intermédiaire","summary":"Publication et exploration de vocabulaires SKOS.","description":"Publication et exploration de vocabulaires SKOS. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["SKOS","RDF"],"useCases":["Publication et exploration de vocabulaires SKOS."],"workflowSteps":["Préparer le vocabulaire","Contrôler les libellés","Publier"],"citationBibtex":"@misc{skosmos,\n title={Skosmos},\n howpublished={https://skosmos.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"datasette","name":"Datasette","url":"https://datasette.io/","maintainer":"Simon Willison et contributeurs","category":"Gestion & Données","license":"Logiciel libre","level":"Intermédiaire","summary":"Publication et exploration de bases SQLite.","description":"Publication et exploration de bases SQLite. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["SQLite","JSON","CSV"],"useCases":["Publication et exploration de bases SQLite."],"workflowSteps":["Préparer les tables","Documenter les champs","Configurer les accès"],"citationBibtex":"@misc{datasette,\n title={Datasette},\n howpublished={https://datasette.io/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"frictionless","name":"Frictionless Framework","url":"https://framework.frictionlessdata.io/","maintainer":"Open Knowledge Foundation et contributeurs","category":"Gestion & Données","license":"Logiciel libre","level":"Intermédiaire","summary":"Validation des données tabulaires et description des paquets de données.","description":"Validation des données tabulaires et description des paquets de données. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["CSV","JSON"],"useCases":["Validation des données tabulaires et description des paquets de données."],"workflowSteps":["Définir le schéma","Valider les tables","Exporter la documentation"],"citationBibtex":"@misc{frictionless,\n title={Frictionless Framework},\n howpublished={https://framework.frictionlessdata.io/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"dvc","name":"DVC","url":"https://dvc.org/","maintainer":"Iterative et communauté","category":"Gestion & Données","license":"Logiciel libre","level":"Intermédiaire","summary":"Versionnage de données et chaînes de traitement.","description":"Versionnage de données et chaînes de traitement. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["CSV","fichiers","YAML"],"useCases":["Versionnage de données et chaînes de traitement."],"workflowSteps":["Définir les sorties","Versionner les étapes","Reproduire une exécution"],"citationBibtex":"@misc{dvc,\n title={DVC},\n howpublished={https://dvc.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"snakemake","name":"Snakemake","url":"https://snakemake.github.io/","maintainer":"Communauté Snakemake","category":"Gestion & Données","license":"Logiciel libre","level":"Intermédiaire","summary":"Automatisation reproductible de chaînes de traitement.","description":"Automatisation reproductible de chaînes de traitement. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Snakefile","Python"],"useCases":["Automatisation reproductible de chaînes de traitement."],"workflowSteps":["Définir entrées et sorties","Écrire les règles","Tester la reconstruction"],"citationBibtex":"@misc{snakemake,\n title={Snakemake},\n howpublished={https://snakemake.github.io/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"nextflow","name":"Nextflow","url":"https://www.nextflow.io/","maintainer":"Seqera et contributeurs","category":"Gestion & Données","license":"Logiciel libre","level":"Intermédiaire","summary":"Orchestration de pipelines de calcul.","description":"Orchestration de pipelines de calcul. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["DSL2","conteneurs"],"useCases":["Orchestration de pipelines de calcul."],"workflowSteps":["Définir les étapes","Isoler les environnements","Conserver les journaux"],"citationBibtex":"@misc{nextflow,\n title={Nextflow},\n howpublished={https://www.nextflow.io/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"orange","name":"Orange Data Mining","url":"https://orangedatamining.com/","maintainer":"University of Ljubljana et contributeurs","category":"Gestion & Données","license":"Logiciel libre","level":"Intermédiaire","summary":"Analyse de données par workflows visuels.","description":"Analyse de données par workflows visuels. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["CSV","tabulaires"],"useCases":["Analyse de données par workflows visuels."],"workflowSteps":["Importer des données","Construire un flux","Interpréter les résultats"],"citationBibtex":"@misc{orange,\n title={Orange Data Mining},\n howpublished={https://orangedatamining.com/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"ggplot2","name":"ggplot2","url":"https://ggplot2.tidyverse.org/","maintainer":"Communauté tidyverse","category":"Gestion & Données","license":"Logiciel libre","level":"Intermédiaire","summary":"Visualisation statistique déclarative sous R.","description":"Visualisation statistique déclarative sous R. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["R","CSV","SVG"],"useCases":["Visualisation statistique déclarative sous R."],"workflowSteps":["Définir les variables","Choisir une représentation","Vérifier légendes et échelles"],"citationBibtex":"@misc{ggplot2,\n title={ggplot2},\n howpublished={https://ggplot2.tidyverse.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"vega-lite","name":"Vega-Lite","url":"https://vega.github.io/vega-lite/","maintainer":"Communauté Vega","category":"Gestion & Données","license":"Logiciel libre","level":"Intermédiaire","summary":"Grammaire déclarative de visualisations interactives.","description":"Grammaire déclarative de visualisations interactives. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["JSON","CSV"],"useCases":["Grammaire déclarative de visualisations interactives."],"workflowSteps":["Définir les encodages","Tester les graphiques","Conserver la spécification"],"citationBibtex":"@misc{vega-lite,\n title={Vega-Lite},\n howpublished={https://vega.github.io/vega-lite/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"d3","name":"D3.js","url":"https://d3js.org/","maintainer":"Communauté D3","category":"Gestion & Données","license":"Logiciel libre","level":"Intermédiaire","summary":"Bibliothèque JavaScript de visualisation de données.","description":"Bibliothèque JavaScript de visualisation de données. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["JSON","CSV","SVG"],"useCases":["Bibliothèque JavaScript de visualisation de données."],"workflowSteps":["Préparer données","Définir échelles","Tester l’accessibilité"],"citationBibtex":"@misc{d3,\n title={D3.js},\n howpublished={https://d3js.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"matplotlib","name":"Matplotlib","url":"https://matplotlib.org/","maintainer":"Communauté Matplotlib","category":"Gestion & Données","license":"Logiciel libre","level":"Intermédiaire","summary":"Création de figures scientifiques en Python.","description":"Création de figures scientifiques en Python. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Python","SVG","PNG"],"useCases":["Création de figures scientifiques en Python."],"workflowSteps":["Choisir axes et unités","Créer une figure","Exporter avec paramètres"],"citationBibtex":"@misc{matplotlib,\n title={Matplotlib},\n howpublished={https://matplotlib.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"osf","name":"Open Science Framework","url":"https://osf.io/","maintainer":"Center for Open Science","category":"Services & Infrastructures","license":"Institutionnel","level":"Intermédiaire","summary":"Organisation et partage de projets et protocoles de recherche.","description":"Organisation et partage de projets et protocoles de recherche. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Documents","données"],"useCases":["Organisation et partage de projets et protocoles de recherche."],"workflowSteps":["Créer un projet","Définir confidentialité","Partager une version citée"],"citationBibtex":"@misc{osf,\n title={Open Science Framework},\n howpublished={https://osf.io/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"dataverse","name":"Dataverse","url":"https://dataverse.org/","maintainer":"Harvard IQSS et communauté","category":"Services & Infrastructures","license":"Logiciel libre","level":"Intermédiaire","summary":"Logiciel de dépôt et citation de données de recherche.","description":"Logiciel de dépôt et citation de données de recherche. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["CSV","fichiers","métadonnées"],"useCases":["Logiciel de dépôt et citation de données de recherche."],"workflowSteps":["Décrire le jeu","Attribuer une licence","Publier la version"],"citationBibtex":"@misc{dataverse,\n title={Dataverse},\n howpublished={https://dataverse.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"invenio","name":"InvenioRDM","url":"https://inveniordm.docs.cern.ch/","maintainer":"CERN et communauté","category":"Services & Infrastructures","license":"Logiciel libre","level":"Intermédiaire","summary":"Infrastructure logicielle de dépôt de résultats scientifiques.","description":"Infrastructure logicielle de dépôt de résultats scientifiques. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Métadonnées","fichiers"],"useCases":["Infrastructure logicielle de dépôt de résultats scientifiques."],"workflowSteps":["Configurer les collections","Décrire les ressources","Tester l’accès"],"citationBibtex":"@misc{invenio,\n title={InvenioRDM},\n howpublished={https://inveniordm.docs.cern.ch/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"dspace","name":"DSpace","url":"https://dspace.org/","maintainer":"Lyrasis et communauté","category":"Services & Infrastructures","license":"Logiciel libre","level":"Intermédiaire","summary":"Logiciel de dépôt institutionnel.","description":"Logiciel de dépôt institutionnel. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Dublin Core","fichiers"],"useCases":["Logiciel de dépôt institutionnel."],"workflowSteps":["Définir communautés","Importer notices","Paramétrer accès"],"citationBibtex":"@misc{dspace,\n title={DSpace},\n howpublished={https://dspace.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"ojs","name":"Open Journal Systems","url":"https://pkp.sfu.ca/software/ojs/","maintainer":"Public Knowledge Project","category":"Services & Infrastructures","license":"Logiciel libre","level":"Intermédiaire","summary":"Gestion éditoriale et publication de revues.","description":"Gestion éditoriale et publication de revues. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Articles","métadonnées"],"useCases":["Gestion éditoriale et publication de revues."],"workflowSteps":["Configurer les rôles","Documenter évaluation","Publier avec métadonnées"],"citationBibtex":"@misc{ojs,\n title={Open Journal Systems},\n howpublished={https://pkp.sfu.ca/software/ojs/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"omp","name":"Open Monograph Press","url":"https://pkp.sfu.ca/software/omp/","maintainer":"Public Knowledge Project","category":"Services & Infrastructures","license":"Logiciel libre","level":"Intermédiaire","summary":"Gestion et publication de monographies scientifiques.","description":"Gestion et publication de monographies scientifiques. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Livres","métadonnées"],"useCases":["Gestion et publication de monographies scientifiques."],"workflowSteps":["Définir le workflow","Contrôler les fichiers","Publier"],"citationBibtex":"@misc{omp,\n title={Open Monograph Press},\n howpublished={https://pkp.sfu.ca/software/omp/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"archivespace","name":"ArchivesSpace","url":"https://archivesspace.org/","maintainer":"Lyrasis et communauté","category":"Services & Infrastructures","license":"Logiciel libre","level":"Intermédiaire","summary":"Gestion et description archivistiques.","description":"Gestion et description archivistiques. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["EAD","notices"],"useCases":["Gestion et description archivistiques."],"workflowSteps":["Décrire niveaux de fonds","Contrôler autorités","Exporter"],"citationBibtex":"@misc{archivespace,\n title={ArchivesSpace},\n howpublished={https://archivesspace.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"atom-archives","name":"AtoM","url":"https://www.accesstomemory.org/","maintainer":"Artefactual et communauté","category":"Services & Infrastructures","license":"Logiciel libre","level":"Intermédiaire","summary":"Description archivistique et accès aux instruments de recherche.","description":"Description archivistique et accès aux instruments de recherche. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["EAD","CSV"],"useCases":["Description archivistique et accès aux instruments de recherche."],"workflowSteps":["Décrire la hiérarchie","Importer","Vérifier droits et accès"],"citationBibtex":"@misc{atom-archives,\n title={AtoM},\n howpublished={https://www.accesstomemory.org/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"github","name":"GitHub","url":"https://github.com/","maintainer":"GitHub","category":"Services & Infrastructures","license":"Freemium","level":"Intermédiaire","summary":"Hébergement de dépôts Git et collaboration scientifique.","description":"Hébergement de dépôts Git et collaboration scientifique. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Git","Markdown"],"useCases":["Hébergement de dépôts Git et collaboration scientifique."],"workflowSteps":["Créer un dépôt adapté","Contrôler droits","Créer une version publiée"],"citationBibtex":"@misc{github,\n title={GitHub},\n howpublished={https://github.com/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"gitlab","name":"GitLab","url":"https://about.gitlab.com/","maintainer":"GitLab et contributeurs","category":"Services & Infrastructures","license":"Freemium","level":"Intermédiaire","summary":"Gestion de dépôts Git et intégration continue.","description":"Gestion de dépôts Git et intégration continue. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Git","YAML"],"useCases":["Gestion de dépôts Git et intégration continue."],"workflowSteps":["Configurer dépôt","Définir pipeline","Préserver les versions"],"citationBibtex":"@misc{gitlab,\n title={GitLab},\n howpublished={https://about.gitlab.com/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"tapor","name":"TAPoR","url":"https://tapor.ca/","maintainer":"Projet TAPoR","category":"Services & Infrastructures","license":"Institutionnel","level":"Intermédiaire","summary":"Répertoire de découverte d’outils d’analyse textuelle.","description":"Répertoire de découverte d’outils d’analyse textuelle. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Notices","liens"],"useCases":["Répertoire de découverte d’outils d’analyse textuelle."],"workflowSteps":["Rechercher une tâche","Comparer notices","Vérifier le site officiel"],"citationBibtex":"@misc{tapor,\n title={TAPoR},\n howpublished={https://tapor.ca/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},
  {"id":"ssh-marketplace","name":"SSH Open Marketplace","url":"https://marketplace.sshopencloud.eu/","maintainer":"Communauté SSH Open Marketplace","category":"Services & Infrastructures","license":"Institutionnel","level":"Intermédiaire","summary":"Catalogue de ressources et workflows pour les SHS.","description":"Catalogue de ressources et workflows pour les SHS. Évaluer l’adéquation au corpus et documenter la version et les conditions d’utilisation. Les modèles, extensions et services hébergés peuvent avoir des conditions distinctes.","formats":["Notices","workflows"],"useCases":["Catalogue de ressources et workflows pour les SHS."],"workflowSteps":["Choisir une méthode","Explorer les outils liés","Vérifier documentation"],"citationBibtex":"@misc{ssh-marketplace,\n title={SSH Open Marketplace},\n howpublished={https://marketplace.sshopencloud.eu/},\n note={Documentation officielle ; préciser version et date de consultation}\n}"},

  {"id":"farasa","name":"Farasa","category":"Analyse textuelle","license":"Recherche restreinte","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Segmentation et analyse de l’arabe ; utilisation académique ou de recherche selon les conditions QCRI.","description":"Segmentation et analyse de l’arabe ; utilisation académique ou de recherche selon les conditions QCRI. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["TXT","Java","API"],"useCases":["Segmentation et analyse de l’arabe ; utilisation académique ou de recherche selon les conditions QCRI."],"workflowSteps":["Choisir le module","Vérifier les conditions de recherche","Évaluer les sorties sur un échantillon"],"url":"https://farasa.qcri.org/","citationBibtex":"@misc{farasa,\n title={Farasa},\n howpublished={https://farasa.qcri.org/}\n}"},
  {"id":"madamira","name":"MADAMIRA","category":"Analyse textuelle","license":"Recherche restreinte","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Analyse et désambiguïsation morphologique de l’arabe, notamment segmentation et étiquetage.","description":"Analyse et désambiguïsation morphologique de l’arabe, notamment segmentation et étiquetage. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["TXT","XML"],"useCases":["Analyse et désambiguïsation morphologique de l’arabe, notamment segmentation et étiquetage."],"workflowSteps":["Vérifier la disponibilité","Choisir la variété","Comparer annotations et référence"],"url":"https://camel.abudhabi.nyu.edu/madamira/","citationBibtex":"@misc{madamira,\n title={MADAMIRA},\n howpublished={https://camel.abudhabi.nyu.edu/madamira/}\n}"},
  {"id":"elixirfm","name":"ElixirFM","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Analyse morphologique fonctionnelle de l’arabe.","description":"Analyse morphologique fonctionnelle de l’arabe. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["TXT","Haskell"],"useCases":["Analyse morphologique fonctionnelle de l’arabe."],"workflowSteps":["Préparer le texte","Examiner les analyses candidates","Conserver les ambiguïtés"],"url":"https://github.com/otakar-smrz/elixir-fm","citationBibtex":"@misc{elixirfm,\n title={ElixirFM},\n howpublished={https://github.com/otakar-smrz/elixir-fm}\n}"},
  {"id":"adawat","name":"Adawat","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Ensemble d’utilitaires de traitement de l’arabe.","description":"Ensemble d’utilitaires de traitement de l’arabe. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["TXT","Python"],"useCases":["Ensemble d’utilitaires de traitement de l’arabe."],"workflowSteps":["Choisir une fonction","Traiter une copie","Contrôler les transformations"],"url":"https://github.com/linuxscout/adawat","citationBibtex":"@misc{adawat,\n title={Adawat},\n howpublished={https://github.com/linuxscout/adawat}\n}"},
  {"id":"arabert","name":"AraBERT","category":"Analyse textuelle","license":"À vérifier","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Famille de modèles de langue arabes pour des tâches de TAL.","description":"Famille de modèles de langue arabes pour des tâches de TAL. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["Python","TXT"],"useCases":["Famille de modèles de langue arabes pour des tâches de TAL."],"workflowSteps":["Choisir le checkpoint","Lire sa licence","Mesurer les erreurs selon la variété"],"url":"https://github.com/aub-mind/arabert","citationBibtex":"@misc{arabert,\n title={AraBERT},\n howpublished={https://github.com/aub-mind/arabert}\n}"},
  {"id":"marbert","name":"ARBERT / MARBERT","category":"Analyse textuelle","license":"À vérifier","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Modèles de langue pour l’arabe standard et les dialectes.","description":"Modèles de langue pour l’arabe standard et les dialectes. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["Python","TXT"],"useCases":["Modèles de langue pour l’arabe standard et les dialectes."],"workflowSteps":["Choisir un modèle","Tester plusieurs registres","Documenter les limites"],"url":"https://github.com/UBC-NLP/marbert","citationBibtex":"@misc{marbert,\n title={ARBERT / MARBERT},\n howpublished={https://github.com/UBC-NLP/marbert}\n}"},
  {"id":"trankit","name":"Trankit","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Pipeline linguistique multilingue fondé sur des modèles neuronaux.","description":"Pipeline linguistique multilingue fondé sur des modèles neuronaux. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["TXT","CoNLL-U"],"useCases":["Pipeline linguistique multilingue fondé sur des modèles neuronaux."],"workflowSteps":["Sélectionner langue","Annoter","Comparer avec une référence"],"url":"https://trankit.readthedocs.io/","citationBibtex":"@misc{trankit,\n title={Trankit},\n howpublished={https://trankit.readthedocs.io/}\n}"},
  {"id":"classla","name":"CLASSLA","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Pipeline TAL pour plusieurs langues slaves du Sud.","description":"Pipeline TAL pour plusieurs langues slaves du Sud. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["TXT","CoNLL-U"],"useCases":["Pipeline TAL pour plusieurs langues slaves du Sud."],"workflowSteps":["Choisir la langue et le modèle","Vérifier textes historiques","Exporter"],"url":"https://github.com/clarinsi/classla","citationBibtex":"@misc{classla,\n title={CLASSLA},\n howpublished={https://github.com/clarinsi/classla}\n}"},
  {"id":"freeling","name":"FreeLing","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Bibliothèque d’analyse linguistique multilingue.","description":"Bibliothèque d’analyse linguistique multilingue. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["TXT","XML"],"useCases":["Bibliothèque d’analyse linguistique multilingue."],"workflowSteps":["Choisir les modules","Tester les dictionnaires","Contrôler les analyses"],"url":"https://nlp.lsi.upc.edu/freeling/","citationBibtex":"@misc{freeling,\n title={FreeLing},\n howpublished={https://nlp.lsi.upc.edu/freeling/}\n}"},
  {"id":"treetagger","name":"TreeTagger","category":"Analyse textuelle","license":"Recherche restreinte","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Étiquetage morphosyntaxique et lemmatisation à partir de modèles linguistiques.","description":"Étiquetage morphosyntaxique et lemmatisation à partir de modèles linguistiques. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["TXT","TSV"],"useCases":["Étiquetage morphosyntaxique et lemmatisation à partir de modèles linguistiques."],"workflowSteps":["Choisir les paramètres","Préparer des tokens","Relire les étiquettes"],"url":"https://www.cis.uni-muenchen.de/~schmid/tools/TreeTagger/","citationBibtex":"@misc{treetagger,\n title={TreeTagger},\n howpublished={https://www.cis.uni-muenchen.de/~schmid/tools/TreeTagger/}\n}"},
  {"id":"corpus-workbench","name":"IMS Open Corpus Workbench","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Indexation de corpus annotés et interrogation par CQP.","description":"Indexation de corpus annotés et interrogation par CQP. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["TXT","CQP"],"useCases":["Indexation de corpus annotés et interrogation par CQP."],"workflowSteps":["Définir les attributs","Indexer le corpus","Tester les requêtes"],"url":"https://cwb.sourceforge.io/","citationBibtex":"@misc{corpus-workbench,\n title={IMS Open Corpus Workbench},\n howpublished={https://cwb.sourceforge.io/}\n}"},
  {"id":"no-sketch-engine","name":"NoSketch Engine","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Exploration de corpus annotés et concordances.","description":"Exploration de corpus annotés et concordances. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["TXT","vertical"],"useCases":["Exploration de corpus annotés et concordances."],"workflowSteps":["Préparer les attributs","Créer un index","Analyser les concordances"],"url":"https://nlp.fi.muni.cz/trac/noske","citationBibtex":"@misc{no-sketch-engine,\n title={NoSketch Engine},\n howpublished={https://nlp.fi.muni.cz/trac/noske}\n}"},
  {"id":"sketch-engine","name":"Sketch Engine","category":"Analyse textuelle","license":"Commercial","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Exploration de corpus, concordances et profils combinatoires.","description":"Exploration de corpus, concordances et profils combinatoires. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["TXT","corpus"],"useCases":["Exploration de corpus, concordances et profils combinatoires."],"workflowSteps":["Choisir un corpus","Analyser les usages","Vérifier les modalités d’export"],"url":"https://www.sketchengine.eu/","citationBibtex":"@misc{sketch-engine,\n title={Sketch Engine},\n howpublished={https://www.sketchengine.eu/}\n}"},
  {"id":"lancsbox","name":"LancsBox","category":"Analyse textuelle","license":"Gratuit propriétaire","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Exploration de corpus, fréquences, collocations et réseaux lexicaux.","description":"Exploration de corpus, fréquences, collocations et réseaux lexicaux. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["TXT"],"useCases":["Exploration de corpus, fréquences, collocations et réseaux lexicaux."],"workflowSteps":["Importer un corpus","Choisir les fenêtres","Examiner les contextes"],"url":"https://lancsbox.lancs.ac.uk/","citationBibtex":"@misc{lancsbox,\n title={LancsBox},\n howpublished={https://lancsbox.lancs.ac.uk/}\n}"},
  {"id":"wordsmith","name":"WordSmith Tools","category":"Analyse textuelle","license":"Commercial","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Suite de concordances, listes de mots et mots-clés.","description":"Suite de concordances, listes de mots et mots-clés. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["TXT"],"useCases":["Suite de concordances, listes de mots et mots-clés."],"workflowSteps":["Importer les textes","Définir le corpus de référence","Contrôler les contextes"],"url":"https://lexically.net/wordsmith/","citationBibtex":"@misc{wordsmith,\n title={WordSmith Tools},\n howpublished={https://lexically.net/wordsmith/}\n}"},
  {"id":"weka","name":"Weka","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Apprentissage automatique et expérimentation à partir de données tabulaires.","description":"Apprentissage automatique et expérimentation à partir de données tabulaires. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["ARFF","CSV"],"useCases":["Apprentissage automatique et expérimentation à partir de données tabulaires."],"workflowSteps":["Définir les variables","Séparer apprentissage et test","Comparer les métriques"],"url":"https://www.cs.waikato.ac.nz/ml/weka/","citationBibtex":"@misc{weka,\n title={Weka},\n howpublished={https://www.cs.waikato.ac.nz/ml/weka/}\n}"},
  {"id":"cltk","name":"Classical Language Toolkit","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Ressources et traitements pour les langues historiques.","description":"Ressources et traitements pour les langues historiques. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["Python","TXT"],"useCases":["Ressources et traitements pour les langues historiques."],"workflowSteps":["Vérifier les langues couvertes","Préparer le texte","Évaluer l’analyse"],"url":"https://cltk.org/","citationBibtex":"@misc{cltk,\n title={Classical Language Toolkit},\n howpublished={https://cltk.org/}\n}"},
  {"id":"beautifulsoup","name":"Beautiful Soup","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Extraction structurée de contenus HTML ou XML autorisés.","description":"Extraction structurée de contenus HTML ou XML autorisés. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["HTML","XML","Python"],"useCases":["Extraction structurée de contenus HTML ou XML autorisés."],"workflowSteps":["Vérifier les droits","Identifier la structure","Tester l’extraction"],"url":"https://www.crummy.com/software/BeautifulSoup/","citationBibtex":"@misc{beautifulsoup,\n title={Beautiful Soup},\n howpublished={https://www.crummy.com/software/BeautifulSoup/}\n}"},
  {"id":"spacy-llm","name":"spaCy-LLM","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Intégration de modèles de langue dans des tâches de pipeline NLP.","description":"Intégration de modèles de langue dans des tâches de pipeline NLP. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["Python","TXT"],"useCases":["Intégration de modèles de langue dans des tâches de pipeline NLP."],"workflowSteps":["Choisir un modèle","Définir les exemples","Mesurer les erreurs et les coûts"],"url":"https://github.com/explosion/spacy-llm","citationBibtex":"@misc{spacy-llm,\n title={spaCy-LLM},\n howpublished={https://github.com/explosion/spacy-llm}\n}"},
  {"id":"textacy","name":"textacy","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Fonctions d’analyse textuelle construites notamment sur spaCy.","description":"Fonctions d’analyse textuelle construites notamment sur spaCy. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["Python","TXT"],"useCases":["Fonctions d’analyse textuelle construites notamment sur spaCy."],"workflowSteps":["Préparer les documents","Choisir les statistiques","Comparer les versions"],"url":"https://textacy.readthedocs.io/","citationBibtex":"@misc{textacy,\n title={textacy},\n howpublished={https://textacy.readthedocs.io/}\n}"},
  {"id":"textblob","name":"TextBlob","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Interface Python pour plusieurs traitements textuels, notamment en anglais.","description":"Interface Python pour plusieurs traitements textuels, notamment en anglais. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["Python","TXT"],"useCases":["Interface Python pour plusieurs traitements textuels, notamment en anglais."],"workflowSteps":["Identifier la couverture linguistique","Tester sur des références","Éviter les généralisations"],"url":"https://textblob.readthedocs.io/","citationBibtex":"@misc{textblob,\n title={TextBlob},\n howpublished={https://textblob.readthedocs.io/}\n}"},
  {"id":"trafilatura","name":"Trafilatura","category":"Analyse textuelle","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Extraction de texte principal et métadonnées de pages Web.","description":"Extraction de texte principal et métadonnées de pages Web. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["HTML","TXT","JSON"],"useCases":["Extraction de texte principal et métadonnées de pages Web."],"workflowSteps":["Vérifier autorisation","Extraire","Comparer à la page originale"],"url":"https://trafilatura.readthedocs.io/","citationBibtex":"@misc{trafilatura,\n title={Trafilatura},\n howpublished={https://trafilatura.readthedocs.io/}\n}"},
  {"id":"fromthepage","name":"FromThePage","category":"Édition & HTR","license":"Freemium","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Transcription collaborative et annotation de documents patrimoniaux.","description":"Transcription collaborative et annotation de documents patrimoniaux. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["Images","TXT","TEI"],"useCases":["Transcription collaborative et annotation de documents patrimoniaux."],"workflowSteps":["Préparer un lot","Définir les conventions","Relire les transcriptions"],"url":"https://fromthepage.com/","citationBibtex":"@misc{fromthepage,\n title={FromThePage},\n howpublished={https://fromthepage.com/}\n}"},
  {"id":"zooniverse","name":"Zooniverse","category":"Édition & HTR","license":"Institutionnel","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Projets participatifs d’annotation ou de transcription de sources.","description":"Projets participatifs d’annotation ou de transcription de sources. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["Images","CSV"],"useCases":["Projets participatifs d’annotation ou de transcription de sources."],"workflowSteps":["Définir une tâche","Tester les consignes","Agréger et vérifier les contributions"],"url":"https://www.zooniverse.org/","citationBibtex":"@misc{zooniverse,\n title={Zooniverse},\n howpublished={https://www.zooniverse.org/}\n}"},
  {"id":"tei-roma","name":"Roma (TEI)","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Personnalisation de schémas TEI à partir de spécifications ODD.","description":"Personnalisation de schémas TEI à partir de spécifications ODD. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["ODD","Relax NG"],"useCases":["Personnalisation de schémas TEI à partir de spécifications ODD."],"workflowSteps":["Choisir les modules","Personnaliser","Valider sur des exemples"],"url":"https://tei-c.org/roma/","citationBibtex":"@misc{tei-roma,\n title={Roma (TEI)},\n howpublished={https://tei-c.org/roma/}\n}"},
  {"id":"xml-copy-editor","name":"XML Copy Editor","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Éditeur XML avec aides à la validation.","description":"Éditeur XML avec aides à la validation. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["XML","DTD","XSD"],"useCases":["Éditeur XML avec aides à la validation."],"workflowSteps":["Ouvrir un fichier","Choisir un schéma","Corriger les erreurs"],"url":"https://xml-copy-editor.sourceforge.io/","citationBibtex":"@misc{xml-copy-editor,\n title={XML Copy Editor},\n howpublished={https://xml-copy-editor.sourceforge.io/}\n}"},
  {"id":"xmllint","name":"xmllint","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Contrôle et manipulation de documents XML en ligne de commande.","description":"Contrôle et manipulation de documents XML en ligne de commande. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["XML","XSD","Relax NG"],"useCases":["Contrôle et manipulation de documents XML en ligne de commande."],"workflowSteps":["Choisir le schéma","Valider","Conserver le journal"],"url":"https://gnome.pages.gitlab.gnome.org/libxml2/","citationBibtex":"@misc{xmllint,\n title={xmllint},\n howpublished={https://gnome.pages.gitlab.gnome.org/libxml2/}\n}"},
  {"id":"jing","name":"Jing","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Validation de documents XML contre Relax NG.","description":"Validation de documents XML contre Relax NG. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["XML","RNG","RNC"],"useCases":["Validation de documents XML contre Relax NG."],"workflowSteps":["Choisir une version du schéma","Valider","Documenter les écarts"],"url":"https://relaxng.org/jclark/jing.html","citationBibtex":"@misc{jing,\n title={Jing},\n howpublished={https://relaxng.org/jclark/jing.html}\n}"},
  {"id":"xspec","name":"XSpec","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Tests automatisés de transformations XSLT, XQuery ou Schematron.","description":"Tests automatisés de transformations XSLT, XQuery ou Schematron. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["XML","XSLT","XSpec"],"useCases":["Tests automatisés de transformations XSLT, XQuery ou Schematron."],"workflowSteps":["Construire des exemples","Définir résultats attendus","Exécuter les tests"],"url":"https://xspec.io/","citationBibtex":"@misc{xspec,\n title={XSpec},\n howpublished={https://xspec.io/}\n}"},
  {"id":"cet-visual","name":"CETEIcean","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Affichage des documents TEI dans le navigateur.","description":"Affichage des documents TEI dans le navigateur. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["XML-TEI","HTML","CSS"],"useCases":["Affichage des documents TEI dans le navigateur."],"workflowSteps":["Préparer le TEI","Configurer les styles","Vérifier les éléments"],"url":"https://github.com/TEIC/CETEIcean","citationBibtex":"@misc{cet-visual,\n title={CETEIcean},\n howpublished={https://github.com/TEIC/CETEIcean}\n}"},
  {"id":"leaf-writer","name":"LEAF-Writer","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Édition XML et annotation sémantique en environnement Web.","description":"Édition XML et annotation sémantique en environnement Web. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["XML","TEI"],"useCases":["Édition XML et annotation sémantique en environnement Web."],"workflowSteps":["Choisir un schéma","Encoder","Exporter et valider"],"url":"https://leaf-writer.leaf-vre.org/","citationBibtex":"@misc{leaf-writer,\n title={LEAF-Writer},\n howpublished={https://leaf-writer.leaf-vre.org/}\n}"},
  {"id":"xml-calabash","name":"XML Calabash","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Exécution de chaînes de traitement XML XProc.","description":"Exécution de chaînes de traitement XML XProc. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["XML","XProc"],"useCases":["Exécution de chaînes de traitement XML XProc."],"workflowSteps":["Définir les étapes","Tester les transformations","Journaliser"],"url":"https://xmlcalabash.com/","citationBibtex":"@misc{xml-calabash,\n title={XML Calabash},\n howpublished={https://xmlcalabash.com/}\n}"},
  {"id":"gimp","name":"GIMP","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Traitement d’images documentaires et création d’illustrations.","description":"Traitement d’images documentaires et création d’illustrations. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["TIFF","PNG","XCF"],"useCases":["Traitement d’images documentaires et création d’illustrations."],"workflowSteps":["Conserver le master","Traiter une copie","Documenter les modifications"],"url":"https://www.gimp.org/","citationBibtex":"@misc{gimp,\n title={GIMP},\n howpublished={https://www.gimp.org/}\n}"},
  {"id":"imagemagick","name":"ImageMagick","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Conversion et traitement automatisé de lots d’images.","description":"Conversion et traitement automatisé de lots d’images. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["TIFF","PNG","JPEG"],"useCases":["Conversion et traitement automatisé de lots d’images."],"workflowSteps":["Tester sur quelques images","Appliquer les paramètres","Contrôler la qualité"],"url":"https://imagemagick.org/","citationBibtex":"@misc{imagemagick,\n title={ImageMagick},\n howpublished={https://imagemagick.org/}\n}"},
  {"id":"opencv","name":"OpenCV","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Vision par ordinateur et traitement d’images.","description":"Vision par ordinateur et traitement d’images. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["Python","C++","images"],"useCases":["Vision par ordinateur et traitement d’images."],"workflowSteps":["Définir la tâche","Tester les paramètres","Mesurer les erreurs"],"url":"https://opencv.org/","citationBibtex":"@misc{opencv,\n title={OpenCV},\n howpublished={https://opencv.org/}\n}"},
  {"id":"paddleocr","name":"PaddleOCR","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Reconnaissance et analyse de documents par modèles de vision.","description":"Reconnaissance et analyse de documents par modèles de vision. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["Images","JSON"],"useCases":["Reconnaissance et analyse de documents par modèles de vision."],"workflowSteps":["Sélectionner les modèles","Tester la langue","Relire le texte reconnu"],"url":"https://github.com/PaddlePaddle/PaddleOCR","citationBibtex":"@misc{paddleocr,\n title={PaddleOCR},\n howpublished={https://github.com/PaddlePaddle/PaddleOCR}\n}"},
  {"id":"easyocr","name":"EasyOCR","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Reconnaissance multilingue de texte dans des images.","description":"Reconnaissance multilingue de texte dans des images. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["Images","Python"],"useCases":["Reconnaissance multilingue de texte dans des images."],"workflowSteps":["Choisir les langues","Tester les zones","Mesurer les erreurs"],"url":"https://github.com/JaidedAI/EasyOCR","citationBibtex":"@misc{easyocr,\n title={EasyOCR},\n howpublished={https://github.com/JaidedAI/EasyOCR}\n}"},
  {"id":"ffmpeg","name":"FFmpeg","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Conversion, segmentation et extraction de médias audio et vidéo.","description":"Conversion, segmentation et extraction de médias audio et vidéo. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["WAV","MP4","FLAC"],"useCases":["Conversion, segmentation et extraction de médias audio et vidéo."],"workflowSteps":["Conserver l’original","Documenter codecs et paramètres","Contrôler sorties"],"url":"https://ffmpeg.org/","citationBibtex":"@misc{ffmpeg,\n title={FFmpeg},\n howpublished={https://ffmpeg.org/}\n}"},
  {"id":"reaper","name":"REAPER","category":"Édition & HTR","license":"Commercial","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Édition et traitement multipiste d’enregistrements.","description":"Édition et traitement multipiste d’enregistrements. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["WAV","FLAC","projets"],"useCases":["Édition et traitement multipiste d’enregistrements."],"workflowSteps":["Importer","Annoter les segments","Exporter une version documentée"],"url":"https://www.reaper.fm/","citationBibtex":"@misc{reaper,\n title={REAPER},\n howpublished={https://www.reaper.fm/}\n}"},
  {"id":"subtitle-edit","name":"Subtitle Edit","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Création et correction de sous-titres.","description":"Création et correction de sous-titres. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["SRT","VTT"],"useCases":["Création et correction de sous-titres."],"workflowSteps":["Importer vidéo","Synchroniser","Relire les sous-titres"],"url":"https://www.nikse.dk/subtitleedit","citationBibtex":"@misc{subtitle-edit,\n title={Subtitle Edit},\n howpublished={https://www.nikse.dk/subtitleedit}\n}"},
  {"id":"annotorious","name":"Annotorious","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Annotation Web de régions sur images.","description":"Annotation Web de régions sur images. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["Web Annotation","JSON"],"useCases":["Annotation Web de régions sur images."],"workflowSteps":["Définir les cibles","Créer des annotations","Exporter"],"url":"https://annotorious.dev/","citationBibtex":"@misc{annotorious,\n title={Annotorious},\n howpublished={https://annotorious.dev/}\n}"},
  {"id":"openseadragon","name":"OpenSeadragon","category":"Édition & HTR","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Visualiseur d’images haute résolution, notamment en contexte IIIF.","description":"Visualiseur d’images haute résolution, notamment en contexte IIIF. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["IIIF","DZI","JavaScript"],"useCases":["Visualiseur d’images haute résolution, notamment en contexte IIIF."],"workflowSteps":["Configurer la source","Tester zoom et navigation","Documenter l’origine"],"url":"https://openseadragon.github.io/","citationBibtex":"@misc{openseadragon,\n title={OpenSeadragon},\n howpublished={https://openseadragon.github.io/}\n}"},
  {"id":"historical-map","name":"Map Warper","category":"Réseaux & SIG","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Géoréférencement de cartes historiques via navigateur.","description":"Géoréférencement de cartes historiques via navigateur. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["Images","GeoTIFF"],"useCases":["Géoréférencement de cartes historiques via navigateur."],"workflowSteps":["Ajouter une carte autorisée","Placer points de contrôle","Évaluer l’erreur"],"url":"https://mapwarper.net/","citationBibtex":"@misc{historical-map,\n title={Map Warper},\n howpublished={https://mapwarper.net/}\n}"},
  {"id":"recogito-studio","name":"Recogito Studio","category":"Réseaux & SIG","license":"À vérifier","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Annotation collaborative de textes et d’images.","description":"Annotation collaborative de textes et d’images. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["Annotations","JSON"],"useCases":["Annotation collaborative de textes et d’images."],"workflowSteps":["Créer le projet","Définir les consignes","Comparer les annotations"],"url":"https://recogitostudio.org/","citationBibtex":"@misc{recogito-studio,\n title={Recogito Studio},\n howpublished={https://recogitostudio.org/}\n}"},
  {"id":"carto","name":"CARTO","category":"Réseaux & SIG","license":"Commercial","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Analyse et visualisation de données géospatiales via services cloud.","description":"Analyse et visualisation de données géospatiales via services cloud. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["SQL","GeoJSON"],"useCases":["Analyse et visualisation de données géospatiales via services cloud."],"workflowSteps":["Vérifier coût et confidentialité","Connecter les données","Documenter résultats"],"url":"https://carto.com/","citationBibtex":"@misc{carto,\n title={CARTO},\n howpublished={https://carto.com/}\n}"},
  {"id":"arcgis","name":"ArcGIS Pro","category":"Réseaux & SIG","license":"Commercial","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Système d’information géographique de bureau.","description":"Système d’information géographique de bureau. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["Geodatabase","Shapefile","GeoJSON"],"useCases":["Système d’information géographique de bureau."],"workflowSteps":["Importer les couches","Vérifier projection","Exécuter les analyses"],"url":"https://www.esri.com/en-us/arcgis/products/arcgis-pro/overview","citationBibtex":"@misc{arcgis,\n title={ArcGIS Pro},\n howpublished={https://www.esri.com/en-us/arcgis/products/arcgis-pro/overview}\n}"},
  {"id":"mapshaper","name":"Mapshaper","category":"Réseaux & SIG","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Simplification et conversion de géométries vectorielles.","description":"Simplification et conversion de géométries vectorielles. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["GeoJSON","TopoJSON","Shapefile"],"useCases":["Simplification et conversion de géométries vectorielles."],"workflowSteps":["Importer","Simplifier","Contrôler pertes et topologie"],"url":"https://mapshaper.org/","citationBibtex":"@misc{mapshaper,\n title={Mapshaper},\n howpublished={https://mapshaper.org/}\n}"},
  {"id":"geonames","name":"GeoNames","category":"Réseaux & SIG","license":"Freemium","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Référentiel géographique pour aligner des noms de lieux.","description":"Référentiel géographique pour aligner des noms de lieux. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["TSV","API"],"useCases":["Référentiel géographique pour aligner des noms de lieux."],"workflowSteps":["Rechercher un lieu","Comparer variantes","Conserver identifiants et incertitudes"],"url":"https://www.geonames.org/","citationBibtex":"@misc{geonames,\n title={GeoNames},\n howpublished={https://www.geonames.org/}\n}"},
  {"id":"pleiades","name":"Pleiades","category":"Réseaux & SIG","license":"Institutionnel","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Gazetteer des lieux du monde ancien.","description":"Gazetteer des lieux du monde ancien. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["RDF","CSV","JSON"],"useCases":["Gazetteer des lieux du monde ancien."],"workflowSteps":["Chercher les lieux","Vérifier sources et chronologie","Citer identifiants"],"url":"https://pleiades.stoa.org/","citationBibtex":"@misc{pleiades,\n title={Pleiades},\n howpublished={https://pleiades.stoa.org/}\n}"},
  {"id":"whg","name":"World Historical Gazetteer","category":"Réseaux & SIG","license":"Institutionnel","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Rapprochement et publication de données de lieux historiques.","description":"Rapprochement et publication de données de lieux historiques. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["Linked Places","CSV"],"useCases":["Rapprochement et publication de données de lieux historiques."],"workflowSteps":["Préparer noms et dates","Examiner les rapprochements","Exporter"],"url":"https://whgazetteer.org/","citationBibtex":"@misc{whg,\n title={World Historical Gazetteer},\n howpublished={https://whgazetteer.org/}\n}"},
  {"id":"graph-tool","name":"graph-tool","category":"Réseaux & SIG","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Analyse statistique de réseaux avec Python.","description":"Analyse statistique de réseaux avec Python. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["GraphML","Python"],"useCases":["Analyse statistique de réseaux avec Python."],"workflowSteps":["Construire le graphe","Choisir un modèle","Tester les hypothèses"],"url":"https://graph-tool.skewed.de/","citationBibtex":"@misc{graph-tool,\n title={graph-tool},\n howpublished={https://graph-tool.skewed.de/}\n}"},
  {"id":"gexf-js","name":"Cytoscape.js","category":"Réseaux & SIG","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Visualisation de réseaux interactifs sur le Web.","description":"Visualisation de réseaux interactifs sur le Web. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["JSON","JavaScript"],"useCases":["Visualisation de réseaux interactifs sur le Web."],"workflowSteps":["Définir les éléments","Configurer les styles","Vérifier lisibilité"],"url":"https://js.cytoscape.org/","citationBibtex":"@misc{gexf-js,\n title={Cytoscape.js},\n howpublished={https://js.cytoscape.org/}\n}"},
  {"id":"timelinejs","name":"TimelineJS","category":"Réseaux & SIG","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Création de chronologies narratives multimédias.","description":"Création de chronologies narratives multimédias. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["JSON","tableaux"],"useCases":["Création de chronologies narratives multimédias."],"workflowSteps":["Documenter les dates","Ajouter médias licites","Indiquer les incertitudes"],"url":"https://timeline.knightlab.com/","citationBibtex":"@misc{timelinejs,\n title={TimelineJS},\n howpublished={https://timeline.knightlab.com/}\n}"},
  {"id":"storymapjs","name":"StoryMapJS","category":"Réseaux & SIG","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Narration cartographique associant lieux et documents.","description":"Narration cartographique associant lieux et documents. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["JSON","images"],"useCases":["Narration cartographique associant lieux et documents."],"workflowSteps":["Choisir une séquence","Sourcer les lieux","Vérifier la carte"],"url":"https://storymap.knightlab.com/","citationBibtex":"@misc{storymapjs,\n title={StoryMapJS},\n howpublished={https://storymap.knightlab.com/}\n}"},
  {"id":"polars","name":"Polars","category":"Gestion & Données","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Traitement de données tabulaires en Python et Rust.","description":"Traitement de données tabulaires en Python et Rust. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["CSV","Parquet"],"useCases":["Traitement de données tabulaires en Python et Rust."],"workflowSteps":["Définir les types","Tester les transformations","Exporter"],"url":"https://pola.rs/","citationBibtex":"@misc{polars,\n title={Polars},\n howpublished={https://pola.rs/}\n}"},
  {"id":"numpy","name":"NumPy","category":"Gestion & Données","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Calcul numérique et tableaux multidimensionnels.","description":"Calcul numérique et tableaux multidimensionnels. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["Python","NPY"],"useCases":["Calcul numérique et tableaux multidimensionnels."],"workflowSteps":["Préparer les données","Vérifier les formes","Documenter les calculs"],"url":"https://numpy.org/","citationBibtex":"@misc{numpy,\n title={NumPy},\n howpublished={https://numpy.org/}\n}"},
  {"id":"scipy","name":"SciPy","category":"Gestion & Données","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Méthodes de calcul, optimisation et statistique.","description":"Méthodes de calcul, optimisation et statistique. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["Python","tableaux"],"useCases":["Méthodes de calcul, optimisation et statistique."],"workflowSteps":["Choisir une méthode","Tester les hypothèses","Rapporter les paramètres"],"url":"https://scipy.org/","citationBibtex":"@misc{scipy,\n title={SciPy},\n howpublished={https://scipy.org/}\n}"},
  {"id":"statsmodels","name":"statsmodels","category":"Gestion & Données","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Modélisation statistique et diagnostics en Python.","description":"Modélisation statistique et diagnostics en Python. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["Python","CSV"],"useCases":["Modélisation statistique et diagnostics en Python."],"workflowSteps":["Définir variables","Examiner hypothèses","Rapporter intervalles et limites"],"url":"https://www.statsmodels.org/","citationBibtex":"@misc{statsmodels,\n title={statsmodels},\n howpublished={https://www.statsmodels.org/}\n}"},
  {"id":"rstudio","name":"RStudio IDE","category":"Gestion & Données","license":"Freemium","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Environnement de développement pour analyses R.","description":"Environnement de développement pour analyses R. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["R","Rmd","QMD"],"useCases":["Environnement de développement pour analyses R."],"workflowSteps":["Créer un projet","Fixer les dépendances","Réexécuter les scripts"],"url":"https://posit.co/products/open-source/rstudio/","citationBibtex":"@misc{rstudio,\n title={RStudio IDE},\n howpublished={https://posit.co/products/open-source/rstudio/}\n}"},
  {"id":"jamovi","name":"jamovi","category":"Gestion & Données","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Analyse statistique à interface graphique.","description":"Analyse statistique à interface graphique. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["CSV","OMV"],"useCases":["Analyse statistique à interface graphique."],"workflowSteps":["Vérifier les variables","Choisir une analyse","Exporter les résultats"],"url":"https://www.jamovi.org/","citationBibtex":"@misc{jamovi,\n title={jamovi},\n howpublished={https://www.jamovi.org/}\n}"},
  {"id":"jasp","name":"JASP","category":"Gestion & Données","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Analyse statistique classique et bayésienne à interface graphique.","description":"Analyse statistique classique et bayésienne à interface graphique. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["CSV","JASP"],"useCases":["Analyse statistique classique et bayésienne à interface graphique."],"workflowSteps":["Importer","Choisir le modèle","Documenter les hypothèses"],"url":"https://jasp-stats.org/","citationBibtex":"@misc{jasp,\n title={JASP},\n howpublished={https://jasp-stats.org/}\n}"},
  {"id":"qualcoder","name":"QualCoder","category":"Gestion & Données","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Codage et analyse qualitative de textes et médias.","description":"Codage et analyse qualitative de textes et médias. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["TXT","projets","médias"],"useCases":["Codage et analyse qualitative de textes et médias."],"workflowSteps":["Élaborer le codebook","Coder un échantillon","Comparer les interprétations"],"url":"https://github.com/ccbogel/QualCoder","citationBibtex":"@misc{qualcoder,\n title={QualCoder},\n howpublished={https://github.com/ccbogel/QualCoder}\n}"},
  {"id":"taguette","name":"Taguette","category":"Gestion & Données","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Annotation qualitative et organisation d’extraits textuels.","description":"Annotation qualitative et organisation d’extraits textuels. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["TXT","HTML","PDF"],"useCases":["Annotation qualitative et organisation d’extraits textuels."],"workflowSteps":["Importer","Définir codes","Exporter extraits et catégories"],"url":"https://www.taguette.org/","citationBibtex":"@misc{taguette,\n title={Taguette},\n howpublished={https://www.taguette.org/}\n}"},
  {"id":"maxqda","name":"MAXQDA","category":"Gestion & Données","license":"Commercial","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Analyse qualitative et mixte de sources textuelles et audiovisuelles.","description":"Analyse qualitative et mixte de sources textuelles et audiovisuelles. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["Documents","médias","tableaux"],"useCases":["Analyse qualitative et mixte de sources textuelles et audiovisuelles."],"workflowSteps":["Définir les codes","Analyser les données","Documenter l’accord"],"url":"https://www.maxqda.com/","citationBibtex":"@misc{maxqda,\n title={MAXQDA},\n howpublished={https://www.maxqda.com/}\n}"},
  {"id":"atlas-ti","name":"ATLAS.ti","category":"Gestion & Données","license":"Commercial","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Analyse qualitative de documents et médias.","description":"Analyse qualitative de documents et médias. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["Documents","médias"],"useCases":["Analyse qualitative de documents et médias."],"workflowSteps":["Construire catégories","Coder","Exporter citations et relations"],"url":"https://atlasti.com/","citationBibtex":"@misc{atlas-ti,\n title={ATLAS.ti},\n howpublished={https://atlasti.com/}\n}"},
  {"id":"nvivo","name":"NVivo","category":"Gestion & Données","license":"Commercial","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Organisation et analyse qualitative de sources de recherche.","description":"Organisation et analyse qualitative de sources de recherche. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["Documents","médias"],"useCases":["Organisation et analyse qualitative de sources de recherche."],"workflowSteps":["Documenter le corpus","Coder","Interpréter les résultats"],"url":"https://lumivero.com/products/nvivo/","citationBibtex":"@misc{nvivo,\n title={NVivo},\n howpublished={https://lumivero.com/products/nvivo/}\n}"},
  {"id":"metabase","name":"Metabase","category":"Gestion & Données","license":"Freemium","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Exploration et tableaux de bord sur bases de données.","description":"Exploration et tableaux de bord sur bases de données. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["SQL","CSV"],"useCases":["Exploration et tableaux de bord sur bases de données."],"workflowSteps":["Connecter la base","Définir les agrégats","Vérifier accès et chiffres"],"url":"https://www.metabase.com/","citationBibtex":"@misc{metabase,\n title={Metabase},\n howpublished={https://www.metabase.com/}\n}"},
  {"id":"superset","name":"Apache Superset","category":"Gestion & Données","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Exploration et visualisation de données via tableaux de bord.","description":"Exploration et visualisation de données via tableaux de bord. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["SQL","CSV"],"useCases":["Exploration et visualisation de données via tableaux de bord."],"workflowSteps":["Configurer les connexions","Choisir les variables","Publier avec contrôle d’accès"],"url":"https://superset.apache.org/","citationBibtex":"@misc{superset,\n title={Apache Superset},\n howpublished={https://superset.apache.org/}\n}"},
  {"id":"plotly","name":"Plotly Python","category":"Gestion & Données","license":"Logiciel libre","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Graphiques interactifs et visualisations scientifiques.","description":"Graphiques interactifs et visualisations scientifiques. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["Python","HTML","JSON"],"useCases":["Graphiques interactifs et visualisations scientifiques."],"workflowSteps":["Choisir représentation","Vérifier les axes","Exporter"],"url":"https://plotly.com/python/","citationBibtex":"@misc{plotly,\n title={Plotly Python},\n howpublished={https://plotly.com/python/}\n}"},
  {"id":"observable","name":"Observable","category":"Gestion & Données","license":"Freemium","level":"Intermédiaire","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Développement de visualisations et documents interactifs.","description":"Développement de visualisations et documents interactifs. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["JavaScript","CSV"],"useCases":["Développement de visualisations et documents interactifs."],"workflowSteps":["Importer","Développer les cellules","Contrôler partage et données"],"url":"https://observablehq.com/","citationBibtex":"@misc{observable,\n title={Observable},\n howpublished={https://observablehq.com/}\n}"},
  {"id":"crossref","name":"Crossref","category":"Services & Infrastructures","license":"Institutionnel","level":"Initiation","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Découverte et consultation de métadonnées de publications par DOI.","description":"Découverte et consultation de métadonnées de publications par DOI. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["JSON","API"],"useCases":["Découverte et consultation de métadonnées de publications par DOI."],"workflowSteps":["Formuler des requêtes","Vérifier les identifiants","Conserver la provenance"],"url":"https://www.crossref.org/","citationBibtex":"@misc{crossref,\n title={Crossref},\n howpublished={https://www.crossref.org/}\n}"},
  {"id":"openalex","name":"OpenAlex","category":"Services & Infrastructures","license":"Freemium","level":"Initiation","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Index bibliographique ouvert des publications, auteurs et institutions.","description":"Index bibliographique ouvert des publications, auteurs et institutions. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["JSON","API"],"useCases":["Index bibliographique ouvert des publications, auteurs et institutions."],"workflowSteps":["Définir la requête","Contrôler couverture et homonymies","Exporter"],"url":"https://openalex.org/","citationBibtex":"@misc{openalex,\n title={OpenAlex},\n howpublished={https://openalex.org/}\n}"},
  {"id":"openaire","name":"OpenAIRE Explore","category":"Services & Infrastructures","license":"Institutionnel","level":"Initiation","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Recherche de publications, données, logiciels et projets.","description":"Recherche de publications, données, logiciels et projets. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["Métadonnées","API"],"useCases":["Recherche de publications, données, logiciels et projets."],"workflowSteps":["Rechercher","Vérifier les liens","Documenter les références"],"url":"https://explore.openaire.eu/","citationBibtex":"@misc{openaire,\n title={OpenAIRE Explore},\n howpublished={https://explore.openaire.eu/}\n}"},
  {"id":"orcid-service","name":"ORCID","category":"Services & Infrastructures","license":"Institutionnel","level":"Initiation","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Identifiants persistants pour les chercheurs et contributeurs.","description":"Identifiants persistants pour les chercheurs et contributeurs. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["Identifiants","API"],"useCases":["Identifiants persistants pour les chercheurs et contributeurs."],"workflowSteps":["Identifier les personnes","Contrôler les correspondances","Citer les identifiants"],"url":"https://orcid.org/","citationBibtex":"@misc{orcid-service,\n title={ORCID},\n howpublished={https://orcid.org/}\n}"},
  {"id":"ezid","name":"EZID","category":"Services & Infrastructures","license":"Commercial","level":"Initiation","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Service de gestion d’identifiants persistants pour ressources numériques.","description":"Service de gestion d’identifiants persistants pour ressources numériques. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["ARK","DOI"],"useCases":["Service de gestion d’identifiants persistants pour ressources numériques."],"workflowSteps":["Définir les ressources","Vérifier les modalités","Maintenir les métadonnées"],"url":"https://ezid.cdlib.org/","citationBibtex":"@misc{ezid,\n title={EZID},\n howpublished={https://ezid.cdlib.org/}\n}"},
  {"id":"archive-it","name":"Archive-It","category":"Services & Infrastructures","license":"Commercial","level":"Initiation","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Collecte et conservation de publications Web.","description":"Collecte et conservation de publications Web. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["WARC","notices"],"useCases":["Collecte et conservation de publications Web."],"workflowSteps":["Définir le périmètre","Vérifier les droits","Documenter la collecte"],"url":"https://archive-it.org/","citationBibtex":"@misc{archive-it,\n title={Archive-It},\n howpublished={https://archive-it.org/}\n}"},
  {"id":"webrecorder","name":"Webrecorder","category":"Services & Infrastructures","license":"Logiciel libre","level":"Initiation","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Outils de capture et relecture d’archives Web.","description":"Outils de capture et relecture d’archives Web. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["WARC","WACZ"],"useCases":["Outils de capture et relecture d’archives Web."],"workflowSteps":["Collecter des pages autorisées","Tester la relecture","Archiver la provenance"],"url":"https://webrecorder.net/","citationBibtex":"@misc{webrecorder,\n title={Webrecorder},\n howpublished={https://webrecorder.net/}\n}"},
  {"id":"waybackpy","name":"pywb","category":"Services & Infrastructures","license":"Logiciel libre","level":"Initiation","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Relecture et indexation d’archives Web.","description":"Relecture et indexation d’archives Web. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["WARC","CDX"],"useCases":["Relecture et indexation d’archives Web."],"workflowSteps":["Préparer les archives","Indexer","Vérifier les captures"],"url":"https://github.com/webrecorder/pywb","citationBibtex":"@misc{waybackpy,\n title={pywb},\n howpublished={https://github.com/webrecorder/pywb}\n}"},
  {"id":"archivematica","name":"Archivematica","category":"Services & Infrastructures","license":"Logiciel libre","level":"Initiation","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Chaînes de préservation numérique fondées sur des standards archivistiques.","description":"Chaînes de préservation numérique fondées sur des standards archivistiques. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["SIP","AIP","METS"],"useCases":["Chaînes de préservation numérique fondées sur des standards archivistiques."],"workflowSteps":["Préparer les paquets","Définir stratégies","Contrôler intégrité"],"url":"https://www.archivematica.org/","citationBibtex":"@misc{archivematica,\n title={Archivematica},\n howpublished={https://www.archivematica.org/}\n}"},
  {"id":"vera-pdf","name":"veraPDF","category":"Services & Infrastructures","license":"Logiciel libre","level":"Initiation","maintainer":"Voir l’éditeur ou l’équipe du projet sur le site officiel","summary":"Validation de conformité aux profils PDF/A.","description":"Validation de conformité aux profils PDF/A. Les capacités effectives et les modalités d’accès doivent être confirmées pour la version utilisée ; conserver la provenance et les paramètres.","formats":["PDF","rapports XML"],"useCases":["Validation de conformité aux profils PDF/A."],"workflowSteps":["Identifier le profil","Valider","Examiner les écarts"],"url":"https://verapdf.org/","citationBibtex":"@misc{vera-pdf,\n title={veraPDF},\n howpublished={https://verapdf.org/}\n}"},
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

  {"id":"arabic-papyrology","name":"Arabic Papyrology Database","institution":"Université de Zurich et partenaires","scope":"Documents arabes anciens","access":"Consultation en ligne","description":"Explorer textes documentaires arabes, métadonnées et attestations lexicales ; vérifier les références éditoriales.","apiOrStandard":"Recherche documentaire","url":"https://www.apd.gwi.uni-muenchen.de/"},
  {"id":"shamela","name":"Al-Maktaba al-Shamela","institution":"المكتبة الشاملة","scope":"Patrimoine textuel arabe","access":"Conditions selon fichiers","description":"Bibliothèque de textes arabes ; confronter transcriptions, éditions et pagination avant analyse scientifique.","apiOrStandard":"Textes et notices","url":"https://shamela.ws/"},
  {"id":"arabic-collections","name":"Arabic Collections Online","institution":"NYU Libraries et partenaires","scope":"Livres arabes numérisés","access":"Consultation ; conditions des objets","description":"Collection de livres arabes numérisés issus d’institutions partenaires ; relever les notices et contrôler OCR et droits.","apiOrStandard":"Images et notices","url":"https://dlib.nyu.edu/aco/"},
  {"id":"bibliotheca-arabica","name":"Bibliotheca Arabica","institution":"Saxon Academy of Sciences and Humanities","scope":"Histoire des traditions manuscrites arabes","access":"Selon ressource","description":"Projet consacré à la transmission de la littérature arabe et à l’histoire des manuscrits.","apiOrStandard":"Notices et ressources de recherche","url":"https://www.bibliotheca-arabica.de/"},
  {"id":"quranic-corpus","name":"Quranic Arabic Corpus","institution":"University of Leeds · projet Corpus","scope":"Arabe coranique","access":"Consultation en ligne","description":"Corpus annoté morphologiquement et syntaxiquement ; comparer conventions et analyses avec les sources savantes.","apiOrStandard":"Annotations linguistiques","url":"https://corpus.quran.com/"},
  {"id":"corpus-quran-tanzil","name":"Tanzil","institution":"Projet Tanzil","scope":"Texte coranique arabe","access":"Licence et règles de redistribution à vérifier","description":"Texte numérique avec conventions de graphie ; conserver la version, les identifiants des versets et les conditions de reproduction.","apiOrStandard":"TXT,XML selon export","url":"https://tanzil.net/"},
  {"id":"african-online","name":"African Journals Online","institution":"AJOL","scope":"Revues africaines","access":"Accès variable","description":"Plateforme de découverte de publications scientifiques africaines, dont SHS.","apiOrStandard":"Notices et articles","url":"https://www.ajol.info/"},
  {"id":"sudoc","name":"Sudoc","institution":"Abes","scope":"Catalogue universitaire français","access":"Notices en ligne","description":"Repérer éditions et thèses à partir de notices bibliographiques et d’identifiants.","apiOrStandard":"Notices et autorités","url":"https://www.sudoc.abes.fr/"},
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
