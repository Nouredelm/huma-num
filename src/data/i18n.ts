import {useState,useEffect} from 'react';
import {PAGES,type PageId} from './pages';
export type Lang='fr'|'en'|'ar';
const data={
  "accueil": {
    "en": {
      "title": "Home",
      "description": "Digital humanities portal"
    },
    "ar": {
      "title": "الرئيسية",
      "description": "بوابة الإنسانيات الرقمية"
    }
  },
  "decouvrir": {
    "en": {"title": "Discover digital humanities", "description": "An introduction to the field, its history, methods and critical questions."},
    "ar": {"title": "مدخل إلى الإنسانيات الرقمية", "description": "مقدمة إلى المجال وتاريخه ومناهجه وأسئلته النقدية."}
  },
  "panorama": {
    "en": {
      "title": "Overview & methods",
      "description": "Explore the research cycle, methods and historical milestones."
    },
    "ar": {
      "title": "نظرة عامة ومناهج",
      "description": "استكشف مراحل البحث ومناهجه ومحطاته التاريخية."
    }
  },
  "outils": {
    "en": {
      "title": "Tools",
      "description": "Find software and services suited to your research."
    },
    "ar": {
      "title": "الأدوات",
      "description": "اختر البرمجيات والخدمات المناسبة لبحثك."
    }
  },
  "corpus": {
    "en": {
      "title": "Corpora",
      "description": "Discover digital libraries, archives and collections."
    },
    "ar": {
      "title": "المدونات والمجموعات",
      "description": "اكتشف المكتبات الرقمية والأرشيفات والمجموعات."
    }
  },
  "standards": {
    "en": {
      "title": "Standards",
      "description": "Understand interoperable data formats and protocols."
    },
    "ar": {
      "title": "المعايير",
      "description": "تعرّف على صيغ البيانات والبروتوكولات القابلة للتشغيل البيني."
    }
  },
  "glossaire": {
    "en": {
      "title": "Glossary",
      "description": "Learn essential digital humanities terminology."
    },
    "ar": {
      "title": "المعجم",
      "description": "تعرّف على المصطلحات الأساسية للإنسانيات الرقمية."
    }
  },
  "bibliographie": {
    "en": {
      "title": "Bibliography",
      "description": "Find references and export citations."
    },
    "ar": {
      "title": "الببليوغرافيا",
      "description": "اعثر على المراجع وصدّر الاستشهادات."
    }
  },
  "ecosysteme": {
    "en": {
      "title": "Ecosystem",
      "description": "Discover journals, training, infrastructures and networks."
    },
    "ar": {
      "title": "المنظومة العلمية",
      "description": "اكتشف المجلات والتكوينات والبنى التحتية والشبكات العلمية."
    }
  },
  "disciplines": {
    "en": {
      "title": "Disciplines",
      "description": "Explore disciplines, research questions and approaches."
    },
    "ar": {
      "title": "التخصصات",
      "description": "استكشف التخصصات وأسئلة البحث والمناهج."
    }
  },
  "ia": {
    "en": {
      "title": "AI & humanities",
      "description": "Understand and critically evaluate AI in humanities research."
    },
    "ar": {
      "title": "الذكاء الاصطناعي والإنسانيات",
      "description": "افهم استخدام الذكاء الاصطناعي في البحث الإنساني وقيّمه نقدياً."
    }
  },
  "formations": {
    "en": {
      "title": "Learning",
      "description": "Follow progressive learning pathways."
    },
    "ar": {
      "title": "التكوين",
      "description": "اتبع مسارات تعلم متدرجة."
    }
  },
  "mondes": {
    "en": {
      "title": "Worlds & heritage",
      "description": "Explore Morocco, the Maghreb, Africa and the Arab world."
    },
    "ar": {
      "title": "العوالم والتراث",
      "description": "استكشف المغرب والمغرب الكبير وإفريقيا والعالم العربي."
    }
  },
  "laboratoire": {
    "en": {
      "title": "Interactive laboratory",
      "description": "Explore texts, frequencies, concordances and XML-TEI."
    },
    "ar": {
      "title": "المختبر التفاعلي",
      "description": "حلّل النصوص والتكرارات والسياقات وملفات XML-TEI."
    }
  },
  "cartographie": {
    "en": {
      "title": "Knowledge map",
      "description": "Explore links between methods, concepts, tools and standards."
    },
    "ar": {
      "title": "خريطة المعارف",
      "description": "استكشف الروابط بين المناهج والمفاهيم والأدوات والمعايير."
    }
  },
  "recherche": {
    "en": {
      "title": "Search",
      "description": "Search the entire portal."
    },
    "ar": {
      "title": "البحث",
      "description": "ابحث في جميع موارد البوابة."
    }
  },
  "cas": {
    "en": {
      "title": "Case studies",
      "description": "Discover research projects and educational exercises."
    },
    "ar": {
      "title": "دراسات الحالة",
      "description": "اكتشف مشاريع بحثية وتمارين تربوية."
    }
  },
  "bibliotheque": {
    "en": {
      "title": "Digital library",
      "description": "Read books, articles and scholarly guides."
    },
    "ar": {
      "title": "المكتبة الرقمية",
      "description": "اطّلع على الكتب والمقالات والأدلة العلمية."
    }
  },
  "mediatheque": {
    "en": {
      "title": "Media library",
      "description": "Explore talks, videos and learning materials."
    },
    "ar": {
      "title": "المكتبة السمعية البصرية",
      "description": "استكشف المحاضرات والفيديوهات والمواد التعليمية."
    }
  },
  "veille": {
    "en": {
      "title": "Research updates",
      "description": "Follow scholarly publications, calls and events."
    },
    "ar": {
      "title": "الرصد العلمي",
      "description": "تابع المنشورات والدعوات والفعاليات العلمية."
    }
  },
  "comparateur": {
    "en": {
      "title": "Tool comparison",
      "description": "Compare software by uses, formats and access terms."
    },
    "ar": {
      "title": "مقارنة الأدوات",
      "description": "قارن البرمجيات حسب الاستخدام والصيغ وشروط الوصول."
    }
  },
  "chercheur": {
    "en": {
      "title": "Research workspace",
      "description": "Design a research protocol and export a project brief."
    },
    "ar": {
      "title": "فضاء الباحث",
      "description": "صمّم بروتوكولاً بحثياً وصدّر بطاقة مشروع."
    }
  },
  "science-ouverte": {
    "en": {
      "title": "Open science",
      "description": "Explore rights, ethics and research data management."
    },
    "ar": {
      "title": "العلم المفتوح",
      "description": "استكشف الحقوق والأخلاقيات وإدارة بيانات البحث."
    }
  },
  "arabes": {
    "en": {
      "title": "Arabic digital humanities",
      "description": "Discover Arabic corpora, tools and methods."
    },
    "ar": {
      "title": "الإنسانيات الرقمية العربية",
      "description": "اكتشف المدونات العربية والأدوات والمناهج."
    }
  },
  "ateliers": {
    "en": {
      "title": "Advanced laboratory",
      "description": "Compare corpora and examine networks and metadata."
    },
    "ar": {
      "title": "المختبر المتقدم",
      "description": "قارن المدونات وحلّل الشبكات والبيانات الوصفية."
    }
  }
} as const;
export function localPage(id:PageId,lang:Lang){const p=PAGES.find(x=>x.id===id)!;return lang==='fr'?{title:p.title,description:p.description}:data[id][lang];}
export function getLang():Lang{try{const v=localStorage.getItem('humanum-lang-v1');return v==='en'||v==='ar'?v:'fr';}catch{return 'fr';}}
export function useLang(){const [lang,setLang]=useState<Lang>(getLang);useEffect(()=>{const sync=()=>setLang(getLang());window.addEventListener('humanum-language',sync);return()=>window.removeEventListener('humanum-language',sync);},[]);return lang;}
export function switchLang(lang:Lang){try{localStorage.setItem('humanum-lang-v1',lang);}catch{}window.dispatchEvent(new Event('humanum-language'));}
export const words={
 fr:{subtitle:'Portail des humanités numériques',explore:'Explorer le portail',search:'Rechercher',selection:'Ma sélection',current:'Page actuelle',groups:['Comprendre & apprendre','Explorer & expérimenter','Se documenter & échanger'],intro:'Explorer les humanités numériques',choose:'Choisissez une rubrique du portail.',note:'',home:'Accueil',theme:'Changer de thème'},
 en:{subtitle:'Digital humanities portal',explore:'Explore portal',search:'Search',selection:'My selection',current:'Current page',groups:['Understand & learn','Explore & experiment','Read & connect'],intro:'Explore digital humanities',choose:'Choose a section of the portal.',note:'Navigation and section introductions are available in English. Detailed resources are primarily in French; translation is ongoing.',home:'Home',theme:'Toggle theme'},
 ar:{subtitle:'بوابة الإنسانيات الرقمية',explore:'استكشف البوابة',search:'البحث',selection:'مختاراتي',current:'الصفحة الحالية',groups:['الفهم والتعلّم','الاستكشاف والتجريب','التوثيق والتواصل'],intro:'استكشف الإنسانيات الرقمية',choose:'اختر قسماً من البوابة.',note:'التنقل وتقديم الأقسام متاحان بالعربية. معظم الموارد التفصيلية بالفرنسية، والترجمة قيد التطوير.',home:'الرئيسية',theme:'تغيير المظهر'}
} as const;
