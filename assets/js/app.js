const D=document,H=D.documentElement,R=H.dataset.root,PAGE=H.dataset.page;
const DEV=['localhost','127.0.0.1'].includes(location.hostname)&&location.search.includes('sample');
const ls=(k,v)=>{try{return v===undefined?localStorage.getItem(k):localStorage.setItem(k,v)}catch{return null}};
let lang=ls('lang')||'en',site,P,S,I,api=null;const C={};
// Data layer: the only place that knows where content lives. Set site.json "apiBase" to move to an API/CMS.
const get=n=>C[n]??=fetch(api?`${api}/${n}`:`${R}data/${DEV&&/^(certificates|projects)$/.test(n)?'samples/':''}${n}.json`).then(r=>r.ok?r.json():null).catch(()=>null);
const t=v=>v&&typeof v==='object'?v[lang]??v.en??'':v??'';
const ui=k=>I?.[lang]?.[k]??I?.en?.[k]??k.replace(/([A-Z])/g,' $1').replace(/^./,c=>c.toUpperCase());
const safe=u=>/^(https?:|mailto:|tel:|\/|\.|\?|#)/i.test(u)?u:'#';
const h=(tag,a={},...k)=>{const e=D.createElement(tag);for(const[n,v]of Object.entries(a)){if(v==null||v===false)continue;if(n==='class')e.className=v;else if(n.startsWith('on'))e.addEventListener(n.slice(2),v);else e.setAttribute(n,n==='href'?safe(v):v===true?'':v)}e.append(...k.flat(9).filter(c=>c!=null&&c!==false));return e};
const ext=(u,c,...k)=>h('a',{href:u,class:c,target:'_blank',rel:'noopener noreferrer'},...k);
const path=p=>R+(p==='home'?'':p+'/');
const asset=p=>/^https:/.test(p)?p:R+p;
const ph=alt=>h('div',{class:'ph',role:'img','aria-label':alt},ui('imgMissing'));
const img=(p,alt,a={})=>p?h('img',{src:asset(p),alt,loading:'lazy',decoding:'async',...a,onerror(){this.replaceWith(ph(alt))}}):ph(alt);
const io='IntersectionObserver'in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08}):null;
const rv=e=>{e.classList.add('rv');io?io.observe(e):e.classList.add('in');return e};
const sec=(title,body,cls='')=>rv(h('section',{class:'sec '+cls},h('div',{class:'wrap'},title&&h('h2',{},title),body)));
const head=x=>h('section',{class:'phead'},h('div',{class:'wrap'},h('h1',{},x)));
const empty=m=>h('p',{class:'empty'},m);
const btn=(href,txt,p)=>h('a',{class:'btn'+(p?' p':''),href},txt);
const chips=a=>h('ul',{class:'tags'},a.map(x=>h('li',{class:'tag'},t(x))));
const logo=()=>h('div',{class:'plate'},img('assets/branding/logo-900.webp',t(P.professionalName)+' logo',{width:900,height:600}));
const socials=()=>h('ul',{class:'soc'},S.filter(s=>s.featured).map(s=>h('li',{},ext(s.url,null,h('span',{class:'sr'},s.platform),h('span',{class:'mono','aria-hidden':'true'},s.icon)))));
const copy=(txt,label)=>{const b=h('button',{class:'btn sm','aria-label':`${ui('copy')} ${label}`,onclick:async()=>{try{await navigator.clipboard.writeText(txt);b.textContent=ui('copied');D.getElementById('st').textContent=ui('copied')}catch{b.textContent='!'}setTimeout(()=>{b.textContent=ui('copy');D.getElementById('st').textContent=''},1600)}},ui('copy'));return b};
const NAV=['home','information','portfolio','certifications','social','contact'];
const header=()=>h('div',{class:'wrap bar'},h('a',{class:'brand',href:path('home')},t(P.professionalName)),
 h('nav',{'aria-label':'Main'},NAV.map(p=>h('a',{href:path(p),'aria-current':p===PAGE?'page':null},ui(p)))),
 h('button',{id:'lt',class:'btn sm',lang:lang==='en'?'ar':'en',onclick:async()=>{lang=lang==='en'?'ar':'en';ls('lang',lang);await render();D.getElementById('lt')?.focus()}},lang==='en'?'العربية':'English'));
const footer=()=>h('div',{class:'wrap foot'},logo(),h('div',{},h('strong',{},t(P.professionalName)),h('p',{class:'mut small'},t(P.bio.short)),h('p',{class:'mut small'},`© ${new Date().getFullYear()} ${t(P.name)}. ${ui('rights')}.`)),
 h('nav',{'aria-label':'Footer'},NAV.map(p=>h('a',{href:path(p)},ui(p)))),h('div',{},socials(),h('p',{class:'small'},h('a',{href:'mailto:'+P.contact.professional.email},P.contact.professional.email))));
const cta=()=>sec(ui('ctaTitle'),h('div',{class:'cta'},btn(path('contact'),ui('contactCta'),1),btn(path('social'),ui('social'))),'center');
const grid=a=>h('div',{class:'grid'},a);
const svGrid=sv=>grid(sv.map(s=>h('article',{class:'card'},h('h3',{},t(s.title)),h('p',{class:'mut'},t(s.text)))));
const skGrid=sk=>grid(sk.map(g=>h('div',{class:'card'},h('h3',{},t(g.group)),chips(g.items))));
const tl=a=>h('ol',{class:'tl'},a.map(x=>h('li',{},h('b',{},t(x.title)),' ',h('span',{class:'mut'},t(x.period)),h('p',{},t(x.text)))));
const paged=(a,card,el,n=24)=>{const go=()=>el.replaceChildren(...a.slice(0,n).map(card),...(a.length>n?[h('button',{class:'btn more',onclick:()=>{n+=24;go()}},ui('more'))]:[]));go()};
const pcard=p=>h('a',{class:'card',href:`${path('portfolio')}?p=${encodeURIComponent(p.slug)}`},img(p.thumbnail,t(p.title)),h('h3',{},t(p.title)),h('p',{class:'mut'},t(p.shortDescription)),p.technologies?.length?chips(p.technologies.slice(0,4)):null);

async function home(){
 const [pr,sv,sk]=await Promise.all([get('projects'),get('services'),get('skills')]),feat=(pr||[]).filter(p=>p.featured),tg=P.tagline[lang]||P.tagline.en;
 return[h('section',{class:'hero'},h('div',{class:'wrap'},
  h('div',{},h('p',{class:'gold'},t(P.bio.short)),h('h1',{},tg[0],h('br'),tg[1]),h('p',{class:'lead'},t(P.bio.medium)),
   h('div',{class:'cta'},btn(path('contact'),ui('contactCta'),1),btn(path('portfolio'),ui('portfolio'))),socials()),
  h('div',{class:'portrait'},img('assets/profile/profile-800.webp',t(P.professionalName),{loading:'eager',fetchpriority:'high',width:800,height:800}),chips(['p1','p2','p3'].map(ui))))),
 sec(ui('who'),h('div',{class:'two'},h('p',{class:'big'},t(P.bio.long)),logo())),
 sec(ui('do'),svGrid(sv||[]),'paper'),
 sec(ui('build'),feat.length?grid(feat.map(pcard)):empty(ui('soon'))),
 sec(ui('learn'),skGrid(sk||[]),'paper'),
 sec(ui('going'),h('div',{},h('p',{class:'big'},t(P.journeyStatement)),h('div',{class:'cta mt'},btn(path('information'),ui('information')),btn(path('social'),ui('social')))))]}

async function information(){
 const [sv,sk]=await Promise.all([get('services'),get('skills')]);
 return[head(ui('information')),sec(ui('about'),h('p',{class:'big'},t(P.bio.long))),sec(ui('skills'),skGrid(sk||[]),'paper'),sec(ui('services'),svGrid(sv||[])),
  P.journey?.length?sec(ui('journey'),tl(P.journey)):null,P.experience?.length?sec(ui('experience'),tl(P.experience)):null]}

const CS=['problem','research','strategy','planning','execution','technology','result','lessons'];
function detail(p){
 const f=(k,v)=>!v||(Array.isArray(v)&&!v.length)?null:h('section',{class:'fld'},h('h3',{},ui(k)),Array.isArray(v)?(typeof v[0]==='object'&&v[0].url?h('ul',{},v.map(l=>h('li',{},ext(l.url,null,t(l.label||l.url))))):h('ul',{},v.map(x=>h('li',{},t(x))))):h('p',{},t(v)));
 return h('article',{},img(p.thumbnail,t(p.title),{loading:'eager'}),h('p',{class:'mut'},[p.role,p.year,p.client].filter(Boolean).join(' · ')),
  f('overview',p.fullDescription),f('technologies',p.technologies),f('tools',p.tools),f('challenges',p.challenges),f('solution',p.solution),f('results',p.results),f('lessonsLearned',p.lessonsLearned),
  ...CS.map(k=>f(k,p.caseStudy?.[k])),f('links',p.links),(p.gallery||[]).length?h('div',{class:'grid fld'},p.gallery.map(g=>img(g,t(p.title)))):null)}

async function portfolio(){
 const all=(await get('projects'))||[],slug=new URLSearchParams(location.search).get('p');
 if(slug){const p=all.find(x=>x.slug===slug);if(p)D.title=`${t(p.title)} - ${t(P.professionalName)}`;return[head(p?t(p.title):ui('notFound')),sec(null,h('div',{},p?detail(p):empty(ui('notFound')),h('p',{class:'mt'},btn(path('portfolio'),ui('back')))))]}
 const cats=[...new Set(all.map(p=>p.category).filter(Boolean))],g=grid([]),sel=h('select',{'aria-label':ui('category'),onchange:()=>draw()},h('option',{value:''},ui('all')),cats.map(c=>h('option',{value:c},c)));
 const draw=()=>paged(all.filter(p=>!sel.value||p.category===sel.value),pcard,g);draw();
 return[head(ui('portfolio')),sec(null,all.length?h('div',{},cats.length>1?h('div',{class:'tools'},sel):null,g):empty(ui('soon')))]}

async function certifications(){
 const all=(await get('certificates'))||[],st={q:'',cat:'',sort:'featured'};
 const d=(x,y)=>String(y.date||'').localeCompare(String(x.date||'')),srt={featured:(x,y)=>(!!y.featured-!!x.featured)||d(x,y),new:d,old:(x,y)=>d(y,x),title:(x,y)=>t(x.title).localeCompare(t(y.title))};
 const g=grid([]),n=h('p',{class:'mut small','aria-live':'polite'}),dlg=h('dialog',{'aria-label':ui('certifications')});
 dlg.addEventListener('click',e=>e.target===dlg&&dlg.close());
 const open=c=>{dlg.replaceChildren(h('button',{class:'btn sm',onclick:()=>dlg.close()},ui('close')),img(c.image,t(c.title),{loading:'eager'}),h('h2',{},t(c.title)),
  h('dl',{},[['issuer',c.issuer],['date',c.date],['category',c.category],['credentialId',c.credentialId]].filter(x=>x[1]).flatMap(([k,v])=>[h('dt',{},ui(k)),h('dd',{},v)])),
  c.description?h('p',{},t(c.description)):null,c.skills?.length?chips(c.skills):null,
  h('div',{class:'cta mt'},c.credentialUrl?ext(c.credentialUrl,'btn p',ui('verify')):null,c.image?ext(asset(c.image),'btn',ui('fullView')):null));dlg.showModal()};
 const draw=()=>{const q=st.q.toLowerCase(),a=all.filter(c=>(!st.cat||c.category===st.cat)&&(!q||[c.title,c.issuer,c.category,c.credentialId,...(c.skills||[])].map(t).join(' ').toLowerCase().includes(q))).sort(srt[st.sort]);
  n.textContent=all.length?`${a.length} / ${all.length}`:'';
  a.length?paged(a,c=>h('button',{class:'card',onclick:()=>open(c)},img(c.image,t(c.title)),c.featured?h('span',{class:'badge'},ui('featured')):null,h('h3',{},t(c.title)),h('p',{class:'mut small'},[c.issuer,c.date].filter(Boolean).join(' · '))),g):g.replaceChildren(empty(all.length?ui('noResults'):ui('emptyCerts')))};
 const cats=[...new Set(all.map(c=>c.category).filter(Boolean))];
 const bar=h('div',{class:'tools'},h('input',{type:'search','aria-label':ui('search'),placeholder:ui('search'),oninput:e=>{st.q=e.target.value;draw()}}),
  h('select',{'aria-label':ui('category'),onchange:e=>{st.cat=e.target.value;draw()}},h('option',{value:''},ui('all')),cats.map(c=>h('option',{value:c},c))),
  h('select',{'aria-label':ui('sortBy'),onchange:e=>{st.sort=e.target.value;draw()}},[['featured','featured'],['new','newest'],['old','oldest'],['title','title']].map(([v,k])=>h('option',{value:v},ui(k)))));
 draw();return[head(ui('certifications')),sec(null,h('div',{},all.length?bar:null,n,g)),dlg]}

async function social(){
 const order=['Professional','Personal','Technical','Content','Communication'],g={};S.forEach(s=>(g[s.type==='personal'?'Personal':s.category]??=[]).push(s));
 return[head(ui('social')),...[...order,...Object.keys(g).filter(k=>!order.includes(k))].filter(k=>g[k]).map(k=>sec(ui(k.toLowerCase()),grid(g[k].map(s=>ext(s.url,'card soc-card',h('span',{class:'mono','aria-hidden':'true'},s.icon),h('strong',{},s.platform),h('span',{class:'mut'},s.username),s.description?h('span',{class:'small'},t(s.description)):null))),k==='Personal'?'paper':''))]}

async function contact(){
 const c=P.contact,row=(l,v,href)=>h('li',{class:'row'},h('span',{class:'lab'},ui(l)),h('a',{href},v),copy(v,ui(l)));
 const blk=(title,o,cls)=>h('div',{class:'card '+cls},h('h2',{class:'h3'},title),h('ul',{class:'rows'},row('email',o.email,'mailto:'+o.email),row('phone',o.phone,'tel:'+o.whatsapp.replace(/\s/g,'')),row('whatsapp',o.whatsapp,o.whatsappUrl),o.telegram?row('telegram',o.telegram,'https://t.me/'+o.telegram.slice(1)):null));
 return[head(ui('contact')),sec(null,h('div',{class:'two'},blk(ui('professional'),c.professional,'pro'),blk(ui('personal'),c.personal,'pers'))),sec(ui('social'),h('div',{},socials(),h('p',{class:'mt'},btn(path('social'),ui('social')))))]}

const pages={home,information,portfolio,certifications,social,contact};
async function render(){
 H.lang=lang;H.dir=lang==='ar'?'rtl':'ltr';const $=i=>D.getElementById(i);
 $('hdr').replaceChildren(header());
 try{$('main').replaceChildren(...(await pages[PAGE]()).filter(Boolean),...(PAGE==='contact'?[]:[cta()]))}catch{$('main').replaceChildren(empty(ui('loadErr')))}
 $('ftr').replaceChildren(footer())}
(async()=>{try{
 site=await fetch(R+'data/site.json').then(r=>r.json());api=site.apiBase;
 [P,S,I]=await Promise.all(['profile','social-links','i18n'].map(n=>get(n)));S??=[];if(!P)throw 0;
 if(!site.languages.includes(lang))lang=site.defaultLang;await render();
 if(!matchMedia('(prefers-reduced-motion:reduce)').matches){let r=0;addEventListener('pointermove',e=>{if(r)return;r=requestAnimationFrame(()=>{H.style.setProperty('--mx',e.clientX+'px');H.style.setProperty('--my',e.clientY+'px');r=0})},{passive:true})}
}catch{D.getElementById('main').textContent='Content failed to load. Refresh the page to try again.'}})();
