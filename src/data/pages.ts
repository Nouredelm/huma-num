import {Home, Compass, Wrench, Database, FileCode, BookOpen, Library, Network, Shapes, Brain, GraduationCap, Globe} from 'lucide-react';
import {GENERATED_IMAGES} from './humnumData';
export const PAGES = [
  {id:'accueil', href:'/', title:'Accueil', label:'Accueil', icon:Home, description:'Portail des humanités numériques', image:GENERATED_IMAGES.heroArchive},
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
] as const;
export type PageId = typeof PAGES[number]['id'];
export function currentPage() {
 const path = window.location.pathname.replace(/\/$/, '').replace(/\.html$/, '').replace(/^\//,'');
 return PAGES.find(page=>page.id===path) ?? PAGES[0];
}
