import {rm,mkdir,copyFile,cp,readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
const root=fileURLToPath(new URL('../',import.meta.url));
const dist=path.join(root,'dist');
const base='https://hafsaaouifak.github.io/';
const context=vm.createContext({});
vm.runInContext(await readFile(path.join(root,'content.js'),'utf8')+'\n'+await readFile(path.join(root,'render.js'),'utf8')+`\nglobalThis.rendered={
 projects:portfolio.projects.map(renderProjectCard).join(''),
 papers:[...portfolio.publications].sort((a,b)=>b.year-a.year).slice(0,6).map(renderPaperCard).join(''),
 moments:portfolio.moments.map(renderMomentCard).join(''),
 timeline:portfolio.journey.research.map(renderTimelineItem).join(''),
 spotlight:renderSpotlightContent(portfolio.publications[2]),
 spotlightArt:projectIllustration('rules').replaceAll('grid-rules','spotlight-grid-rules').replaceAll('fade-rules','spotlight-fade-rules'),
 data:portfolio,topicNames,escapeHTML
};`,context);
const {rendered}=context;
const data=JSON.parse(JSON.stringify(rendered.data));
const escape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const person={
 '@type':'Person','@id':base+'#hafsaa-ouifak',name:'Hafsaa Ouifak',givenName:'Hafsaa',familyName:'Ouifak',url:base,
 image:{'@type':'ImageObject',url:base+'assets/award-2.jpg',width:1024,height:1536},
 description:'AI researcher and Ph.D. candidate working in explainable AI, Physical AI, neuro-fuzzy systems, digital twins, and trustworthy autonomous systems.',
 jobTitle:'AI Researcher and Ph.D. Candidate',
 affiliation:[{'@type':'Organization',name:'Mohammed VI Polytechnic University',url:'https://www.um6p.ma/'},{'@type':'Organization',name:'University of Texas Rio Grande Valley',url:'https://www.utrgv.edu/'}],
 knowsAbout:['Physical AI','Explainable Artificial Intelligence','Neuro-Fuzzy Systems','Physics-Informed Machine Learning','Digital Twins','Battery Management','Autonomous Systems'],
 sameAs:['https://www.linkedin.com/in/hafsaa-ouifak/','https://github.com/HafsaaOuifak','https://scholar.google.com/citations?user=mIfDvBIAAAAJ','https://www.researchgate.net/profile/Hafsaa-Ouifak-2','https://www.scopus.com/authid/detail.uri?authorId=57261386500']
};
const website={'@type':'WebSite','@id':base+'#website',url:base,name:'Hafsaa Ouifak',alternateName:'Hafsaa Ouifak Portfolio',inLanguage:'en',publisher:{'@id':person['@id']}};
const jsonLd=graph=>'<script type="application/ld+json">'+JSON.stringify({'@context':'https://schema.org','@graph':graph}).replaceAll('<','\\u003c')+'</script>';
let html=await readFile(path.join(root,'index.html'),'utf8');
function fill(id,content){const pattern=new RegExp('(<div\\b[^>]*\\bid="'+id+'"[^>]*>)(</div>)');if(!pattern.test(html))throw new Error('Missing prerender target '+id);html=html.replace(pattern,(_,open,close)=>open+content+close);}
for(const [id,content] of Object.entries({'projects-grid':rendered.projects,'publications-list':rendered.papers,'moments-grid':rendered.moments,'timeline':rendered.timeline,'spotlight-copy':rendered.spotlight,'spotlight-art':rendered.spotlightArt}))fill(id,content);
html=html.replace('<!-- structured-data -->',jsonLd([website,person,{'@type':'ProfilePage','@id':base+'#profile',url:base,name:'Hafsaa Ouifak | Explainable & Physical AI Researcher',description:'The personal research portfolio of Hafsaa Ouifak.',inLanguage:'en',isPartOf:{'@id':website['@id']},mainEntity:{'@id':person['@id']}}]));
html=html.replace('<p id="publication-count" class="result-count" aria-live="polite"></p>','<p id="publication-count" class="result-count" aria-live="polite">Showing 6 of 14 papers</p>');
// Each static preview is exactly the content visitors see before interacting.
for(const topic of ['explainable','energy','autonomy']){const count=data.publications.filter(p=>p.topics.includes(topic)).length;const pattern=new RegExp('(data-pub-topic="'+topic+'"[^>]*>[\\s\\S]*?<b>)(</b>)');html=html.replace(pattern,(_,a,b)=>a+count+b);}
await rm(dist,{recursive:true,force:true});await mkdir(dist,{recursive:true});
for(const file of ['styles.css','content.js','render.js','app.js','.nojekyll','robots.txt'])await copyFile(path.join(root,file),path.join(dist,file));
await cp(path.join(root,'assets'),path.join(dist,'assets'),{recursive:true});
const cssHash=createHash('sha256').update(await readFile(path.join(root,'styles.css'))).digest('hex').slice(0,10);
for(const file of ['styles.css','content.js','render.js','app.js']){const hash=createHash('sha256').update(await readFile(path.join(root,file))).digest('hex').slice(0,10);html=html.replaceAll('"'+file+'"','"'+file+'?v='+hash+'"');}
await writeFile(path.join(dist,'index.html'),html);
const paperItems=data.publications.map((paper,index)=>({'@type':'ListItem',position:index+1,item:{'@type':'ScholarlyArticle','@id':base+'publications.html#'+paper.id,name:paper.title,url:paper.url||base+'publications.html#'+paper.id,author:{'@id':person['@id']},description:paper.focus}}));
const archiveGraph=[website,person,{'@type':'CollectionPage','@id':base+'publications.html#collection',url:base+'publications.html',name:'Hafsaa Ouifak — Research Publications',inLanguage:'en',isPartOf:{'@id':website['@id']},author:{'@id':person['@id']},mainEntity:{'@type':'ItemList',name:'Research publications and manuscripts',numberOfItems:data.publications.length,itemListElement:paperItems}}];
const sections=[['published','Journal articles'],['conference','Conference contributions'],['review','Manuscripts under review']].map(([type,title])=>{
 const papers=data.publications.filter(p=>p.type===type).sort((a,b)=>b.year-a.year);
 return '<section class="archive-section" aria-labelledby="'+type+'-heading"><h2 id="'+type+'-heading">'+title+' <span>'+papers.length+'</span></h2><ol class="archive-records">'+papers.map(p=>'<li id="'+p.id+'"><span class="archive-year">'+p.year+'</span><div><h3>'+(p.url?'<a href="'+escape(p.url)+'" target="_blank" rel="noopener noreferrer">'+escape(p.title)+' ↗</a>':escape(p.title))+'</h3><p class="archive-venue">'+escape(p.venue)+'</p><p>'+escape(p.focus)+'</p><div class="paper-topics">'+p.topics.map(t=>'<span>'+escape(rendered.topicNames[t])+'</span>').join('')+'</div></div></li>').join('')+'</ol></section>';
}).join('');
const archive=`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#080f23"><title>Hafsaa Ouifak — Research Publications</title><meta name="description" content="Browse Hafsaa Ouifak’s journal articles, conference contributions, and research manuscripts on explainable AI, neuro-fuzzy systems, batteries, and autonomy."><meta name="author" content="Hafsaa Ouifak"><meta name="robots" content="index, follow, max-image-preview:large"><link rel="canonical" href="${base}publications.html"><meta property="og:title" content="Hafsaa Ouifak — Research Publications"><meta property="og:description" content="Journal articles, conference contributions, and research manuscripts."><meta property="og:type" content="website"><meta property="og:site_name" content="Hafsaa Ouifak"><meta property="og:url" content="${base}publications.html"><meta property="og:image" content="${base}assets/social-card.png"><meta property="og:image:alt" content="Hafsaa Ouifak — Explainable AI and Physical AI researcher"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${base}assets/social-card.png"><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="styles.css?v=${cssHash}">${jsonLd(archiveGraph)}</head><body class="archive-page"><a class="skip" href="#main">Skip to content</a><header class="header-shell"><div class="site-header section-wrap"><a class="brand" href="./" aria-label="Hafsaa Ouifak, portfolio home"><span class="brand-icon">ho<span>✳</span></span><span class="brand-name">Hafsaa Ouifak<small>RESEARCHER & BUILDER</small></span></a><a class="text-link" href="./#publications">Back to the portfolio <span aria-hidden="true">↗</span></a><a class="nav-contact" href="mailto:hafsaaouifak@gmail.com">Contact me ↗</a></div></header><main id="main" class="section-wrap archive-main"><div class="archive-intro"><p class="eyebrow">HAFSAA OUIFAK / RESEARCH PUBLICATIONS</p><h1>A library of<br><em>research & ideas.</em></h1><p>My journal articles, conference contributions, and manuscripts explore explainable AI, neuro-fuzzy systems, digital twins, and autonomous systems. My recent research direction also includes Physical AI.</p><div class="archive-profile-links"><a href="${person.sameAs[2]}" target="_blank" rel="noopener noreferrer">Google Scholar ↗</a><a href="${person.sameAs[3]}" target="_blank" rel="noopener noreferrer">ResearchGate ↗</a><a href="${person.sameAs[4]}" target="_blank" rel="noopener noreferrer">Scopus ↗</a></div></div>${sections}<a class="button outline" href="./#publications">Explore the interactive library <span aria-hidden="true">↗</span></a></main><footer class="site-footer section-wrap"><span>Hafsaa Ouifak</span><a href="./">Portfolio home ↗</a></footer></body></html>`;
await writeFile(path.join(dist,'publications.html'),archive);
await writeFile(path.join(dist,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>'+base+'</loc></url><url><loc>'+base+'publications.html</loc></url></urlset>\n');
console.log('Built portfolio with static research content, profile structured data, publication archive, robots.txt, and sitemap.xml.');
