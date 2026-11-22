import {Home, Compass, Wrench, Database, FileCode, BookOpen, Library, Network, Shapes, Brain, GraduationCap, Globe, FlaskConical, Share2, Search, FolderOpen, BookMarked, PlayCircle, Rss, Columns3, ClipboardList, Unlock, Languages, ChartNoAxesCombined, BookOpenText} from 'lucide-react';
import {GENERATED_IMAGES} from './humnumData';
export const PAGES = [
  {id:'accueil', href:'/', title:'Accueil', label:'Accueil', icon:Home, description:'Portail des humanités numériques', image:GENERATED_IMAGES.heroArchive},
  {id:'decouvrir',href:'/decouvrir',title:'Découvrir les humanités numériques',label:'Découvrir',icon:BookOpenText,description:'Une introduction au domaine, à son histoire, à ses méthodes et à ses enjeux critiques.',image:GENERATED_IMAGES.editorialPrinting},
  {id:'panorama',href:'/panorama',title:'Panorama & méthodes',label:'Panorama',icon:Compass,description:"Explorer les étapes du cycle de recherche, les méthodes et les repères historiques.",image:GENERATED_IMAGES.spatialAtlas},
  {id:'outils',href:'/outils',title:'Outils',label:'Outils',icon:Wrench,description:"Choisir les logiciels et services adaptés à vos corpus et questions de recherche.",image:null},
  {id:'corpus',href:'/corpus',title:'Corpus',label:'Corpus',icon:Database,description:"Découvrir les bibliothèques numériques, les archives et les collections ouvertes.",image:GENERATED_IMAGES.corpusDigitization},
  {id:'standards',href:'/standards',title:'Standards',label:'Standards',icon:FileCode,description:"Comprendre les formats, protocoles et principes qui rendent les données interopérables.",image:GENERATED_IMAGES.editorialPrinting},
  {id:'glossaire',href:'/glossaire',title:'Glossaire',label:'Glossaire',icon:BookOpen,description:"Maîtriser le vocabulaire critique des humanités numériques et ses notions clés.",image:null},
  {id:'bibliographie',href:'/bibliographie',title:'Bibliographie',label:'Bibliographie',icon:Library,description:"Consulter les ouvrages de référence, les citations et les exports bibliographiques.",image:GENERATED_IMAGES.heroArchive},
  {id:'ecosysteme',href:'/ecosysteme',title:'Écosystème',label:'Écosystème',icon:Network,description:"Identifier les revues, formations, infrastructures et réseaux de la communauté scientifique.",image:null},
  {id:'disciplines',href:'/disciplines',title:"Disciplines",label:"Disciplines",icon:Shapes,description:"Explorer les champs disciplinaires, leurs questions, méthodes et livrables.",image:null},
  {id:'ia',href:'/ia',title:"IA & humanités",label:"IA & SHS",icon:Brain,description:"Comprendre, expérimenter et évaluer l’intelligence artificielle au service des SHS.",image:null},
  {id:'formations',href:'/formations',title:"Formations",label:"Formations",icon:GraduationCap,description:"Des parcours progressifs pour passer des premières notions à un projet reproductible.",image:null},
  {id:'mondes',href:'/mondes',title:"Mondes & patrimoines",label:"Mondes",icon:Globe,description:"Ressources du Maroc, du Maghreb, de l’Afrique et du monde arabe, dans une perspective internationale.",image:GENERATED_IMAGES.corpusDigitization},
  {id:'laboratoire',href:'/laboratoire',title:"Laboratoire interactif",label:'Laboratoire',icon:FlaskConical,description:"Analyser des textes, explorer fréquences et concordances, examiner des documents XML-TEI dans votre navigateur.",image:null},
  {id:'cartographie',href:'/cartographie',title:"Cartographie des connaissances",label:'Cartographie',icon:Share2,description:"Explorer les relations entre disciplines, méthodes, outils, concepts et standards.",image:null},
  {id:'recherche',href:'/recherche',title:"Recherche transversale",label:'Recherche',icon:Search,description:"Retrouver une ressource, une notion, un outil ou une fiche dans tout le portail.",image:null},
  {id:'cas',href:'/cas',title:"Études de cas",label:"Études de cas",icon:FolderOpen,description:"Découvrir des projets scientifiques réels et reproduire des démarches à petite échelle.",image:null},
  {id:'bibliotheque',href:'/bibliotheque',title:"Bibliothèque numérique",label:"Bibliothèque numérique",icon:BookMarked,description:"Lire des ouvrages, articles et guides scientifiques en ligne.",image:null},
  {id:'mediatheque',href:'/mediatheque',title:"Médiathèque",label:"Médiathèque",icon:PlayCircle,description:"Conférences, vidéos et formations audiovisuelles pour approfondir les méthodes.",image:null},
  {id:'veille',href:'/veille',title:"Veille scientifique",label:"Veille scientifique",icon:Rss,description:"Suivre les publications, appels et événements à partir de sources institutionnelles.",image:null},
  {id:'comparateur',href:'/comparateur',title:"Comparateur d’outils",label:"Comparateur d’outils",icon:Columns3,description:"Comparer les logiciels du répertoire selon les usages, formats, licences et niveaux.",image:null},
  {id:'chercheur',href:'/chercheur',title:"Espace chercheur",label:"Espace chercheur",icon:ClipboardList,description:"Élaborer un protocole scientifique, documenter ses données et exporter une fiche de projet.",image:null},
  {id:'science-ouverte',href:'/science-ouverte',title:"Science ouverte",label:"Science ouverte",icon:Unlock,description:"Droits, éthique, gestion des données, reproductibilité et diffusion scientifique.",image:null},
  {id:'arabes',href:'/arabes',title:"Humanités numériques arabes",label:"Humanités numériques arabes",icon:Languages,description:"Explorer les corpus, outils et méthodes pour les textes arabes, le Maghreb et les écritures historiques.",image:null},
  {id:'ateliers',href:'/ateliers',title:"Laboratoire avancé",label:"Laboratoire avancé",icon:ChartNoAxesCombined,description:"Comparer deux corpus, calculer les cooccurrences, construire un réseau et inspecter des métadonnées.",image:null},
] as const;
export type PageId = typeof PAGES[number]['id'];
export function currentPage() {
 const path = window.location.pathname.replace(/\/$/, '').replace(/\.html$/, '').replace(/^\//,'');
 return PAGES.find(page=>page.id===path) ?? PAGES[0];
}
