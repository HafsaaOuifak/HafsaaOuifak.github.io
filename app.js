'use strict';
const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

// Navigation works without scripting on desktop; mobile adds an accessible disclosure.
const menu=$('.menu-toggle'), mobileNav=$('#mobile-nav');
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');mobileNav.hidden=true;}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');mobileNav.hidden=!open;});
$$('a',mobileNav).forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobileNav.hidden){closeMenu();menu.focus();}});
document.addEventListener('click',event=>{if(!mobileNav.hidden&&!event.target.closest('.site-header'))closeMenu();});
window.matchMedia('(min-width:761px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
function scrollProgress(){const height=document.documentElement.scrollHeight-innerHeight;$('.scroll-progress').style.width=`${height>0?scrollY/height*100:0}%`;}
addEventListener('scroll',scrollProgress,{passive:true});addEventListener('resize',scrollProgress);$('#year').textContent=new Date().getFullYear();

// Selected research; the project notes dialog returns focus to its opener.
const projectsGrid=$('#projects-grid');
projectsGrid.innerHTML=portfolio.projects.map((project,index)=>`<article class="project-card" data-category="${project.category}"><div class="project-visual"><span class="visual-caption">${project.diagram}</span><span class="visual-index">0${index+1}</span>${projectIllustration(project.visual)}</div><div class="project-body"><span class="project-meta">${project.label}</span><h3>${project.title}</h3><p>${project.description}</p><div class="project-bottom"><span>${project.place}</span><button class="project-open" data-project="${project.id}" aria-label="Explore project: ${project.title}">Explore project</button></div></div></article>`).join('');
$$('[data-project-filter]').forEach(button=>button.addEventListener('click',()=>{const category=button.dataset.projectFilter;$$('[data-project-filter]').forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});$$('.project-card').forEach(card=>{card.hidden=category!=='all'&&card.dataset.category!==category;});const count=$$('.project-card:not([hidden])').length;$('#project-announcement').textContent=`${count} research ${count===1?'project':'projects'} shown.`;scrollProgress();}));
const dialog=$('#project-dialog');let dialogOpener=null;
projectsGrid.addEventListener('click',event=>{const button=event.target.closest('[data-project]');if(!button)return;const project=portfolio.projects.find(item=>item.id===button.dataset.project);if(!project)return;dialogOpener=button;$('#dialog-content').innerHTML=`<p class="dialog-meta">${project.label}</p><h2 id="dialog-title">${project.title}</h2><p>${project.detail}</p><h3>What I’m working on</h3><ul>${project.points.map(point=>`<li>${point}</li>`).join('')}</ul><div class="dialog-links">${project.links.map(([text,url])=>`<a class="text-link" href="${url}" target="_blank" rel="noopener noreferrer">${text}<span aria-hidden="true">↗</span></a>`).join('')}</div>`;dialog.showModal();document.body.classList.add('no-scroll');});
$('#close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{const r=dialog.getBoundingClientRect();if(event.target===dialog&&(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom))dialog.close();});
dialog.addEventListener('close',()=>{document.body.classList.remove('no-scroll');dialogOpener?.focus();});

// A transparent toy model: independent piecewise-linear memberships, not a classifier.
function fuzzyMemberships(temperature){const clamp=value=>Math.max(0,Math.min(1,value));return {warm:clamp((35-temperature)/15),hot:clamp((temperature-25)/15),veryhot:clamp((temperature-35)/10)};}
function updateTemperature(){const value=Number($('#temperature').value),memberships=fuzzyMemberships(value);$('#temperature-value').value=value;$('#temperature').setAttribute('aria-valuetext',`${value} degrees Celsius`);const x=30+(value-20)/25*390;$('#temperature-line').setAttribute('d',`M${x} 15V135`);for(const [name,amount] of Object.entries(memberships)){$(`#${name}-value`).value=`${Math.round(amount*100)}%`;$(`#${name}-bar`).style.width=`${amount*100}%`;$(`#${name}-point`).setAttribute('cx',x);$(`#${name}-point`).setAttribute('cy',130-amount*110);}$('#temperature-word').textContent=value<26?'A little warmth.':value<35?'Somewhere in between.':value<40?'Getting hotter.':'Definitely heating up.';}
$('#temperature').addEventListener('input',updateTemperature);updateTemperature();

let publicationFilter='all',showAllPapers=false;
function renderPublications(){const query=$('#publication-search').value.trim().toLowerCase();const matches=portfolio.publications.filter(paper=>(publicationFilter==='all'||paper.type===publicationFilter)&&`${paper.title} ${paper.venue} ${paper.year}`.toLowerCase().includes(query));const limited=!showAllPapers&&publicationFilter==='all'&&!query;const visible=limited?matches.slice(0,6):matches;$('#publications-list').innerHTML=visible.length?visible.map(paper=>`<article class="publication-row"><span class="pub-year">${paper.year}</span><div>${paper.url?`<a class="pub-title" href="${paper.url}" target="_blank" rel="noopener noreferrer">${escapeHTML(paper.title)}</a>`:`<h3 class="pub-title">${escapeHTML(paper.title)}</h3>`}<p class="pub-venue">${escapeHTML(paper.venue)}</p></div><span class="pub-badge ${paper.type==='review'?'review':''}">${paper.type==='review'?'Under review':paper.type==='conference'?'Conference':'Published'}</span>${paper.url?`<a class="pub-arrow" href="${paper.url}" target="_blank" rel="noopener noreferrer" aria-label="Read ${escapeHTML(paper.title)}">↗</a>`:'<span></span>'}</article>`).join(''):'<p class="empty-state">No papers match that search. Try a topic, journal, or year.</p>';$('#publication-count').textContent=`${visible.length} of ${matches.length} ${matches.length===1?'paper':'papers'}${query?' matching your search':''} · Statuses from the October 2026 CV.`;$('#show-publications').hidden=publicationFilter!=='all'||!!query||matches.length<=6;$('#show-publications').innerHTML=showAllPapers?'Show selected papers <span aria-hidden="true">−</span>':'Show all papers <span aria-hidden="true">+</span>';$('#show-publications').setAttribute('aria-expanded',String(showAllPapers));scrollProgress();}
$$('[data-pub-filter]').forEach(button=>button.addEventListener('click',()=>{publicationFilter=button.dataset.pubFilter;$$('[data-pub-filter]').forEach(item=>{item.classList.toggle('active',item===button);item.setAttribute('aria-pressed',String(item===button));});renderPublications();}));
$('#publication-search').addEventListener('input',renderPublications);$('#show-publications').addEventListener('click',()=>{showAllPapers=!showAllPapers;renderPublications();if(!showAllPapers)$('#publications').scrollIntoView({block:'start'});});renderPublications();
function renderJourney(type){$('#timeline').innerHTML=portfolio.journey[type].map(item=>`<article class="timeline-item"><p class="timeline-date">${item.date}</p><h3>${item.title}</h3><p class="timeline-place">${item.place}</p><p>${item.text}</p></article>`).join('');scrollProgress();}
$$('[data-journey]').forEach(button=>button.addEventListener('click',()=>{$$('[data-journey]').forEach(item=>{item.classList.toggle('active',item===button);item.setAttribute('aria-pressed',String(item===button));});renderJourney(button.dataset.journey);}));renderJourney('research');
$('#copy-email').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('hafsaaouifak@gmail.com');$('#copy-email').textContent='Copied ✓';$('#copy-status').textContent='Email address copied.';setTimeout(()=>{$('#copy-email').textContent='Copy email';},2500);}catch{$('#copy-status').textContent='Copy is unavailable here. Select the email address above to copy it.';$('#copy-email').textContent='Select the address to copy';}});

// Canvas sculpture: a rotating, connected sphere, with restrained pointer response.
(() => {
  const canvas=$('#network'),ctx=canvas.getContext('2d');if(!ctx)return;
  const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)'),toggle=$('#motion-toggle');
  let paused=reducedMotion.matches,frame=0,visible=true,raf=0,lastTime=0,width=0,height=0;
  let pointer={x:0,y:0},angle=0;const nodes=[],links=[];
  for(let i=0;i<210;i++){const y=1-(i/209)*2;const radius=Math.sqrt(1-y*y);const theta=i*Math.PI*(3-Math.sqrt(5));nodes.push({x:Math.cos(theta)*radius,y,z:Math.sin(theta)*radius});}
  for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){const a=nodes[i],b=nodes[j];const distance=Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z);if(distance<.34)links.push([i,j]);}
  function size(){const r=canvas.getBoundingClientRect();width=r.width;height=r.height;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);draw(0);}
  function project(node){const a=angle+pointer.x*.22;let x=node.x*Math.cos(a)+node.z*Math.sin(a),z=-node.x*Math.sin(a)+node.z*Math.cos(a);const tilt=-.17+pointer.y*.16;const y=node.y*Math.cos(tilt)-z*Math.sin(tilt);z=node.y*Math.sin(tilt)+z*Math.cos(tilt);const scale=Math.min(width*.34,height*.39);const perspective=3/(3-z*.45);return{x:width*.51+x*scale*perspective,y:height*.47+y*scale*perspective,z};}
  function draw(time){ctx.clearRect(0,0,width,height);const points=nodes.map(project);ctx.lineWidth=.65;for(const [a,b] of links){const p=points[a],q=points[b],depth=(p.z+q.z+2)/4;ctx.strokeStyle=`rgba(179,214,152,${.04+depth*.24})`;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}
    for(let i=0;i<points.length;i++){const p=points[i],depth=(p.z+1)/2;const pulse=paused?0:(Math.sin(time*.0018+i*.65)+1)/2;ctx.fillStyle=`rgba(${i%13===0?'231,191,145':'195,231,178'},${.17+depth*.72})`;ctx.beginPath();ctx.arc(p.x,p.y,.8+depth*1.45+(i%13===0?pulse*.8:0),0,Math.PI*2);ctx.fill();if(i%37===0&&depth>.5){ctx.strokeStyle='rgba(195,231,178,.2)';ctx.beginPath();ctx.arc(p.x,p.y,6+depth*3,0,Math.PI*2);ctx.stroke();}}
  }
  function tick(time){raf=0;if(paused||!visible||document.hidden)return;if(time-lastTime>30){angle+=.0028;draw(time);lastTime=time;frame++;}raf=requestAnimationFrame(tick);}
  function sync(){cancelAnimationFrame(raf);raf=0;toggle.setAttribute('aria-pressed',String(paused));toggle.setAttribute('aria-label',paused?'Play animation':'Pause animation');toggle.textContent=paused?'▷':'Ⅱ';if(!paused&&visible&&!document.hidden)raf=requestAnimationFrame(tick);else draw(0);}
  toggle.addEventListener('click',()=>{paused=!paused;sync();});
  reducedMotion.addEventListener('change',event=>{paused=event.matches;sync();});
  canvas.addEventListener('pointermove',event=>{if(reducedMotion.matches||paused)return;const r=canvas.getBoundingClientRect();pointer={x:(event.clientX-r.left)/r.width-.5,y:(event.clientY-r.top)/r.height-.5};});
  canvas.addEventListener('pointerleave',()=>{pointer={x:0,y:0};});
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.03}).observe(canvas);
  new ResizeObserver(size).observe(canvas);document.addEventListener('visibilitychange',sync);size();sync();
})();
