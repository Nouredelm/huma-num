import Parser from 'rss-parser';
const sources=[{id:'calenda',label:'Calenda',url:'https://calenda.org/feed.php?cat=298'},{id:'dhnow',label:'DHNow',url:'https://digitalhumanitiesnow.org/feed'}];
const parser=new Parser({timeout:6000});
function clean(v){return String(v||'').replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim().slice(0,400);}
function safe(v){try{const url=new URL(v);return ['https:','http:'].includes(url.protocol)?url.href:null;}catch{return null;}}
export default async function handler(req,res){
 if(req.method!=='GET'){res.setHeader('Allow','GET');return res.status(405).json({error:'Method not allowed'});}
 const settled=await Promise.all(sources.map(async s=>{try{const response=await fetch(s.url,{signal:AbortSignal.timeout(6500),headers:{'User-Agent':'HumaNum RSS reader','Accept':'application/rss+xml, application/atom+xml, application/xml, text/xml'}});if(!response.ok)throw Error('HTTP');const xml=await response.text();if(xml.length>1500000||/<!DOCTYPE|<!ENTITY/i.test(xml))throw Error('Invalid feed');const feed=await parser.parseString(xml);const items=feed.items.slice(0,30).flatMap(item=>{const url=safe(item.link);const title=clean(item.title);const value=Date.parse(item.isoDate||item.pubDate||'');return url&&title?[{title,url,date:Number.isFinite(value)?new Date(value).toISOString():null,source:s.label,sourceId:s.id}]:[];});return {id:s.id,ok:true,items};}catch{return {id:s.id,ok:false,items:[]};}}));
 const items=settled.flatMap(s=>s.items).sort((a,b)=>(b.date||'').localeCompare(a.date||''));
 res.setHeader('Cache-Control','public, s-maxage=900, stale-while-revalidate=3600');
 return res.status(200).json({items,sources:settled.map(s=>({id:s.id,ok:s.ok,count:s.items.length})),fetchedAt:new Date().toISOString()});
}
