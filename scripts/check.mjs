import {readFile,access} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=fileURLToPath(new URL('../',import.meta.url));
const html=await readFile(path.join(root,'index.html'),'utf8');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
assert.equal(ids.length,new Set(ids).size,'HTML IDs must be unique');
for(const match of html.matchAll(/(?:src|href)="([^"#][^"]*)"/g))if(!/^(https?:|mailto:|data:)/.test(match[1])&&match[1]!=='publications.html')await access(path.join(root,match[1]));
for(const match of html.matchAll(/href="#([^"]+)"/g))assert(ids.includes(match[1]),`Missing anchor ${match[1]}`);
const context=vm.createContext({});vm.runInContext(await readFile(path.join(root,'content.js'),'utf8')+'\nglobalThis.data=portfolio;',context);
assert.equal(context.data.projects.length,4);assert.equal(context.data.publications.length,14);
for(const paper of context.data.publications){assert(['published','review','conference'].includes(paper.type));if(paper.type==='review')assert(!paper.url,'Under-review papers must not invent published links');}
console.log('Passed: scripts parse, local assets exist, anchors and IDs are valid, and publication statuses are consistent.');
