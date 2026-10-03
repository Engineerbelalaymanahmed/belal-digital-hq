// Content + hygiene checks. Run from repo root: node scripts/validate.mjs
import {readFileSync,readdirSync,existsSync,statSync} from 'fs';import {join} from 'path';
const J=f=>JSON.parse(readFileSync(f,'utf8')),bad=[],ck=(c,m)=>c||bad.push(m);
const sets=[['certificates',['id','title']],['projects',['id','title','slug']],['social-links',['id','platform','url','category','type','icon']]];
for(const[n,req]of sets){const a=J(`data/${n}.json`),ids=new Set();
 a.forEach((x,i)=>{req.forEach(k=>ck(x[k],`${n}[${i}] missing ${k}`));ck(!ids.has(x.id),`${n}: duplicate id ${x.id}`);ids.add(x.id);
  for(const k of['image','thumbnail'])if(x[k]&&!/^https:/.test(x[k]))ck(existsSync(x[k]),`${n}[${i}] ${k} not found: ${x[k]}`);
  if(x.url)ck(/^https:\/\//.test(x.url),`${n}[${i}] url must be https`)});
 if(n==='projects')ck(new Set(a.map(p=>p.slug)).size===a.length,'projects: duplicate slug')}
const walk=d=>readdirSync(d).flatMap(f=>{const p=join(d,f);return f==='.git'?[]:statSync(p).isDirectory()?walk(p):[p]});
for(const f of walk('.').filter(f=>/\.(html|json|js|css)$/.test(f)&&!/^(scripts|docs)/.test(f))){const s=readFileSync(f,'utf8');
 if(/noya\.et\.team/i.test(s))bad.push(`legacy email in ${f}`);
 if(!f.includes('samples')&&/CONTENT_PENDING|PLACEHOLDER|TODO/.test(s))bad.push(`placeholder token in ${f}`)}
console.log(bad.length?bad.join('\n'):'validate: OK');process.exit(bad.length?1:0);
