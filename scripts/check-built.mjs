import {readFile,access} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
const dist=fileURLToPath(new URL('../dist/',import.meta.url));
const base='https://hafsaaouifak.github.io/';
const home=await readFile(path.join(dist,'index.html'),'utf8');
const publications=await readFile(path.join(dist,'publications.html'),'utf8');
for(const [name,html,url] of [['home',home,base],['publications',publications,base+'publications.html']]){
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,`${name}: duplicate HTML IDs`);
 assert.equal((html.match(/rel="canonical"/g)||[]).length,1);assert(html.includes('rel="canonical" href="'+url+'"'));
 assert(html.includes('content="index, follow, max-image-preview:large"'));assert(!/noindex/i.test(html));
 assert.equal((html.match(/<h1\b/g)||[]).length,1,`${name}: one primary heading`);
 const match=html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);assert(match,`${name}: structured data missing`);
 const schema=JSON.parse(match[1]);assert.equal(schema['@context'],'https://schema.org');
 const person=schema['@graph'].find(item=>item['@type']==='Person');assert.equal(person.name,'Hafsaa Ouifak');assert(person.knowsAbout.includes('Physical AI'));assert.equal(person.sameAs.length,5);
 for(const match of html.matchAll(/(?:src|href)="([^"#][^"]*)"/g)){
  const target=match[1];if(/^(https?:|mailto:|data:)/.test(target)||target==='./')continue;
  await access(path.resolve(dist,target.split(/[?#]/)[0]||'.'));
 }
}
assert.equal((home.match(/class="project-card"/g)||[]).length,4,'Project descriptions must be in the initial HTML');
assert.equal((home.match(/class="paper-card"/g)||[]).length,6,'Selected papers must be in the initial HTML');
assert.equal((home.match(/class="moment-card /g)||[]).length,5,'Activity cards must be in the initial HTML');
assert.equal((publications.match(/<li id="paper-\d+">/g)||[]).length,14,'Full publication archive must be indexable');
assert(home.includes('href="publications.html"'),'The archive must be linked from the portfolio');
assert(home.includes('Why it matters:')&&home.includes('Physical AI'));
const robots=await readFile(path.join(dist,'robots.txt'),'utf8');assert(robots.includes('Sitemap: '+base+'sitemap.xml'));assert(!/Disallow:\s*\//i.test(robots));
const sitemap=await readFile(path.join(dist,'sitemap.xml'),'utf8');const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);assert.deepEqual(urls,[base,base+'publications.html']);
await access(path.join(dist,'assets/social-card.png'));
console.log('Passed: canonical URLs, indexable HTML without JavaScript, valid profile JSON-LD, 14-paper archive, crawl links, sitemap, robots.txt, and local resources.');
