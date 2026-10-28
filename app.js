'use strict';
const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];

// Navigation works without scripting on desktop; mobile adds an accessible disclosure.
const menu=$('.menu-toggle'), mobileNav=$('#mobile-nav');
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');mobileNav.hidden=true;}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');mobileNav.hidden=!open;});
$$('a',mobileNav).forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobileNav.hidden){closeMenu();menu.focus();}});
document.addEventListener('click',event=>{if(!mobileNav.hidden&&!event.target.closest('.site-header'))closeMenu();});
window.matchMedia('(min-width:761px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
function scrollProgress(){const height=document.documentElement.scrollHeight-innerHeight;$('.scroll-progress').style.width=`${height>0?scrollY/height*100:0}%`;const links=$$('.desktop-nav a');let active=null;for(const link of links){if($(link.getAttribute('href')).getBoundingClientRect().top<=170)active=link;}for(const link of links){link.classList.toggle('active',link===active);if(link===active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');}}
addEventListener('scroll',scrollProgress,{passive:true});addEventListener('resize',scrollProgress);$('#year').textContent=new Date().getFullYear();

// Selected research; the project notes dialog returns focus to its opener.
const projectsGrid=$('#projects-grid');
projectsGrid.innerHTML=portfolio.projects.map(renderProjectCard).join('');
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


let publicationFilter='all',publicationTopic='all',showAllPapers=false;
function setPublicationType(type){publicationFilter=type;$$('[data-pub-filter]').forEach(item=>{const active=item.dataset.pubFilter===type;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});}
function setPublicationTopic(topic){publicationTopic=topic;$$('[data-pub-topic]').forEach(item=>{const active=item.dataset.pubTopic===topic;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});}
function renderPublications(){
 const query=$('#publication-search').value.trim().toLowerCase();
 const matches=portfolio.publications.filter(paper=>(publicationFilter==='all'||paper.type===publicationFilter)&&(publicationTopic==='all'||paper.topics.includes(publicationTopic))&&`${paper.title} ${paper.venue} ${paper.year} ${paper.focus} ${paper.topics.map(topic=>topicNames[topic]).join(' ')}`.toLowerCase().includes(query));
 const order=$('#publication-sort').value;
 matches.sort((a,b)=>order==='title'?a.title.localeCompare(b.title):order==='oldest'?a.year-b.year:b.year-a.year);
 const limited=!showAllPapers&&publicationFilter==='all'&&publicationTopic==='all'&&!query;
 const visible=limited?matches.slice(0,6):matches;
 $('#publications-list').innerHTML=visible.length?visible.map(renderPaperCard).join(''):'<div class="empty-state"><p>No papers match this combination. Try another topic or search.</p><button class="spotlight-action" data-reset-library>Reset the library ↗</button></div>';
 $('#publication-count').textContent=`Showing ${visible.length} of ${matches.length} ${matches.length===1?'paper':'papers'}${query?' matching “'+$('#publication-search').value.trim()+'”':''}${publicationTopic!=='all'?' · '+topicNames[publicationTopic]:''}`;
 $('#show-publications').hidden=publicationFilter!=='all'||publicationTopic!=='all'||!!query||matches.length<=6;
 $('#show-publications').innerHTML=showAllPapers?'Show featured selection <span aria-hidden="true">−</span>':'Explore the full library <span aria-hidden="true">+</span>';
 $('#show-publications').setAttribute('aria-expanded',String(showAllPapers));scrollProgress();
}
$$('[data-pub-filter]').forEach(button=>button.addEventListener('click',()=>{setPublicationType(button.dataset.pubFilter);renderPublications();}));
$$('[data-pub-topic]').forEach(button=>{const count=portfolio.publications.filter(paper=>button.dataset.pubTopic==='all'||paper.topics.includes(button.dataset.pubTopic)).length;$('b',button).textContent=count;button.addEventListener('click',()=>{setPublicationTopic(button.dataset.pubTopic);renderPublications();});});
$('#publication-search').addEventListener('input',renderPublications);$('#publication-sort').addEventListener('change',renderPublications);
$('#show-publications').addEventListener('click',()=>{showAllPapers=!showAllPapers;renderPublications();if(!showAllPapers)$('.library-layout').scrollIntoView({block:'start'});});renderPublications();
const paperDialog=$('#paper-dialog');let paperOpener=null;
function openPaper(id,opener){const paper=portfolio.publications.find(item=>item.id===id);if(!paper)return;paperOpener=opener;$('#paper-content').innerHTML=`<p class="dialog-meta">${paper.year} / ${paper.type==='review'?'MANUSCRIPT UNDER REVIEW':paper.type==='conference'?'CONFERENCE CONTRIBUTION':'PUBLISHED JOURNAL ARTICLE'}</p><h2 id="paper-title">${escapeHTML(paper.title)}</h2><div class="paper-topics">${paper.topics.map(topic=>`<span>${topicNames[topic]}</span>`).join('')}</div><h3>The research thread</h3><p>${escapeHTML(paper.focus)}</p><p class="paper-modal-venue">${escapeHTML(paper.venue)}</p>${!paper.url?'<p class="paper-modal-status">'+(paper.type==='review'?'Under review — no published article link is available.':'Presented — publication is pending.')+'</p>':''}<div class="dialog-links">${paper.url?`<a class="button primary" href="${paper.url}" target="_blank" rel="noopener noreferrer">Read the paper ↗</a>`:'<a class="text-link" href="https://www.researchgate.net/profile/Hafsaa-Ouifak-2" target="_blank" rel="noopener noreferrer">Visit my ResearchGate <span>↗</span></a>'}<button class="copy-reference" data-copy-reference="${paper.id}">Copy reference</button></div><p id="reference-status" aria-live="polite"></p>`;paperDialog.showModal();document.body.classList.add('no-scroll');}
$('#publications').addEventListener('click',event=>{const button=event.target.closest('[data-paper]');if(button)openPaper(button.dataset.paper,button);if(event.target.closest('[data-reset-library]')){setPublicationType('all');setPublicationTopic('all');$('#publication-search').value='';renderPublications();$('#publication-search').focus();}});
$('#close-paper').addEventListener('click',()=>paperDialog.close());
paperDialog.addEventListener('close',()=>{document.body.classList.remove('no-scroll');paperOpener?.focus();});
paperDialog.addEventListener('click',async event=>{const button=event.target.closest('[data-copy-reference]');if(!button)return;const paper=portfolio.publications.find(item=>item.id===button.dataset.copyReference);try{await navigator.clipboard.writeText(`${paper.title} (${paper.year}). ${paper.venue}.${paper.url?' '+paper.url:''}`);$('#reference-status').textContent='Reference copied to your clipboard.';button.textContent='Copied ✓';}catch{$('#reference-status').textContent='Clipboard unavailable. You can select and copy the paper information above.';}});
// Manual featured-paper carousel; reading is never interrupted by automatic rotation.
const spotlightPapers=[portfolio.publications[2],portfolio.publications[0],portfolio.publications[1]];
let spotlightIndex=0;
function renderSpotlight(){const paper=spotlightPapers[spotlightIndex],visual=spotlightIndex===1?'vessel':'rules';$('#spotlight-art').innerHTML=projectIllustration(visual).replaceAll('grid-'+visual,'spotlight-grid-'+visual).replaceAll('fade-'+visual,'spotlight-fade-'+visual);$('#spotlight-copy').innerHTML=renderSpotlightContent(paper);$('#spotlight-index').textContent=`0${spotlightIndex+1} / 03`;}
$('#spotlight-prev').addEventListener('click',()=>{spotlightIndex=(spotlightIndex+2)%3;renderSpotlight();});$('#spotlight-next').addEventListener('click',()=>{spotlightIndex=(spotlightIndex+1)%3;renderSpotlight();});renderSpotlight();
// Photo moments link to their original public posts, with a keyboard-accessible viewer.
$('#moments-grid').innerHTML=portfolio.moments.map(renderMomentCard).join('');
$$('[data-moment-filter]').forEach(button=>button.addEventListener('click',()=>{$$('[data-moment-filter]').forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});$$('.moment-card').forEach(card=>card.hidden=button.dataset.momentFilter!=='all'&&card.dataset.category!==button.dataset.momentFilter);$('#moment-announcement').textContent=`${$$('.moment-card:not([hidden])').length} activities shown.`;scrollProgress();}));
const momentDialog=$('#moment-dialog');let activeMoment=null,momentPhotoIndex=0,momentOpener=null;
function renderMomentPhoto(){const [file,alt]=activeMoment.photos[momentPhotoIndex];$('#moment-photo').src='assets/'+file;$('#moment-photo').alt=alt;$('#moment-prev').hidden=$('#moment-next').hidden=activeMoment.photos.length<2;$('#moment-caption').innerHTML=`<h2 id="moment-title">${activeMoment.title}</h2><p>${activeMoment.description}</p><div class="lightbox-footer"><small>${momentPhotoIndex+1} / ${activeMoment.photos.length} · ${activeMoment.credit}</small><a class="text-link" href="${activeMoment.url}" target="_blank" rel="noopener noreferrer">Original LinkedIn post <span aria-hidden="true">↗</span></a></div>`;}
$('#moments-grid').addEventListener('click',event=>{const button=event.target.closest('[data-open-moment]');if(!button)return;activeMoment=portfolio.moments.find(item=>item.id===button.dataset.openMoment);momentPhotoIndex=0;momentOpener=button;renderMomentPhoto();momentDialog.showModal();document.body.classList.add('no-scroll');});
function changeMomentPhoto(direction){momentPhotoIndex=(momentPhotoIndex+direction+activeMoment.photos.length)%activeMoment.photos.length;renderMomentPhoto();}
$('#moment-prev').addEventListener('click',()=>changeMomentPhoto(-1));$('#moment-next').addEventListener('click',()=>changeMomentPhoto(1));$('#close-moment').addEventListener('click',()=>momentDialog.close());
momentDialog.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();changeMomentPhoto(1);}if(event.key==='ArrowLeft'){event.preventDefault();changeMomentPhoto(-1);}});
momentDialog.addEventListener('close',()=>{document.body.classList.remove('no-scroll');momentOpener?.focus();});
for(const overlay of [paperDialog,momentDialog])overlay.addEventListener('click',event=>{const r=overlay.getBoundingClientRect();if(event.target===overlay&&(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom))overlay.close();});
function renderJourney(type){$('#timeline').innerHTML=portfolio.journey[type].map(renderTimelineItem).join('');scrollProgress();}
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
  function draw(time){ctx.clearRect(0,0,width,height);const points=nodes.map(project);ctx.lineWidth=.65;for(const [a,b] of links){const p=points[a],q=points[b],depth=(p.z+q.z+2)/4;ctx.strokeStyle=`rgba(${a%3===0?'173,156,255':'100,223,240'},${.08+depth*.35})`;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}
    for(let i=0;i<points.length;i++){const p=points[i],depth=(p.z+1)/2;const pulse=paused?0:(Math.sin(time*.0018+i*.65)+1)/2;ctx.fillStyle=`rgba(${i%13===0?'255,173,150':i%3===0?'173,156,255':'100,223,240'},${.17+depth*.72})`;ctx.beginPath();ctx.arc(p.x,p.y,.8+depth*1.45+(i%13===0?pulse*.8:0),0,Math.PI*2);ctx.fill();if(i%37===0&&depth>.5){ctx.strokeStyle='rgba(100,223,240,.3)';ctx.beginPath();ctx.arc(p.x,p.y,6+depth*3,0,Math.PI*2);ctx.stroke();}}
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
