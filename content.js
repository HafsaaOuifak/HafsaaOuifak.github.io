/* Editable portfolio content. Claims and publication statuses follow the October 2026 CV.
   Public source links and asset credits are documented in SOURCES.md. */
const portfolio = {
  projects: [
    {id:'neurofuzzy', category:'explainable', label:'EXPLAINABLE AI · DOCTORAL RESEARCH', title:'Opening up the black box.', description:'Neuro-fuzzy models that bring predictive performance and human-readable rules into the same conversation.', place:'UM6P · Ph.D. research', visual:'rules', diagram:'NEURO-FUZZY REASONING',
      detail:'My doctoral research investigates the performance–interpretability trade-off in neuro-fuzzy systems, from individual classifiers to ensembles. The aim is to make model behavior easier to inspect, explain, and evaluate.',
      points:['Evaluating Mamdani and Takagi–Sugeno–Kang systems on medical and engineering data.','Developing rule aggregation and rule-merging approaches for coherent ensemble explanations.','Connecting interpretability with physical consistency in battery state-of-health estimation.'],
      links:[['Explore the code','https://github.com/HafsaaOuifak/Self-Organized-Fuzzy-Neural-Networks-SOFNN-'],['Read the paper','https://doi.org/10.1016/j.sciaf.2023.e01610']]},
    {id:'maritime',category:'physical',label:'PHYSICS-INFORMED AI · AUTONOMOUS SYSTEMS',title:'Intelligence on the water.',description:'Explainable battery models, digital twins, and decision support for an AI-driven autonomous water drone.',place:'UTRGV · Visiting research',visual:'vessel',diagram:'BATTERY ↔ DIGITAL TWIN ↔ MISSION',
      detail:'At the Institute for Advanced Manufacturing at UTRGV, I contribute to an AI-driven water drone for mission-critical operations. My work connects battery state estimation, real-time digital twins, and explainable prediction.',
      points:['Developing a digital twin for real-time monitoring and simulation.','Designing explainable and physics-informed battery management models.','Presented research on AI-enabled battery management and maritime mission decision support at Resilience Week 2026; publication pending in the supplied CV.'],
      links:[['Battery digital twin paper','https://doi.org/10.1016/j.rser.2025.116347'],['View research profile','https://scholar.google.com/citations?user=mIfDvBIAAAAJ']]},
    {id:'sustainability',category:'sustainability',label:'APPLIED MACHINE LEARNING · COLLABORATIONS',title:'Better models. Smaller footprints.',description:'Applying machine learning to wastewater treatment, crop prediction, and more sustainable industrial decisions.',place:'UM6P · Collaborative research',visual:'landscape',diagram:'DATA → INSIGHT → SUSTAINABILITY',
      detail:'These collaborative projects bring machine learning into environmental and industrial settings where useful predictions can support better use of resources.',
      points:['Modeling, predicting, and optimizing wastewater treatment with the International Water Research Institute at UM6P.','Developing multimodal models for crop yield prediction and tailored fertilizer recommendations.','Building mining analytics frameworks for predictive maintenance and operational optimization with Cadi Ayyad University.'],
      links:[['Explore my research','https://scholar.google.com/citations?user=mIfDvBIAAAAJ']]},
    {id:'forecasting',category:'explainable',label:'OPEN SOURCE · TIME SERIES & OPTIMIZATION',title:'Patterns hiding in plain sight.',description:'Experiments in stock-market forecasting, genetic optimization, and the interconnected structure of economic data.',place:'ENSIAS · Research & code',visual:'forecast',diagram:'TIME SERIES / PATTERNS / POSSIBILITIES',
      detail:'My earlier research explored forecasting the Moroccan stock market during the COVID-19 pandemic, using time-series GANs and machine learning. My public repositories also include genetic optimization with neural networks and graph-based analysis of Moroccan input–output tables.',
      points:['Research internship at ENSIAS on Moroccan banking data and market dynamics.','Open-source experiments combining neural networks and genetic optimization.','Graph analysis of economic relationships and disruption propagation.'],
      links:[['Forecasting code','https://github.com/HafsaaOuifak/Stock-market-forecasting'],['Economic graph analysis','https://github.com/HafsaaOuifak/Moroccan-IO-table-analysis-Graphs-']]}
  ],
  publications: [
    {year:2026,title:'Digital twin for battery energy storage systems',venue:'Renewable and Sustainable Energy Reviews · with A. Bendaouia, F. Wang & J. Li',type:'published',url:'https://doi.org/10.1016/j.rser.2025.116347'},
    {year:2026,title:'SimBAC-NFS: Similarity-Based Aggregation and Calibration of Neuro-Fuzzy Systems',venue:'Applied Computational Intelligence and Soft Computing · with A. Idri',type:'published',url:'https://doi.org/10.1155/acis/3194148'},
    {year:2025,title:'A Comprehensive Review of Fuzzy Logic based Interpretability and Explainability of Machine Learning Techniques Across Domains',venue:'Neurocomputing · with A. Idri',type:'published',url:'https://doi.org/10.1016/j.neucom.2025.130602'},
    {year:2024,title:'Homogenous Ensembles of Neuro-Fuzzy Classifiers using Hyperparameter Tuning for Medical Data',venue:'International Journal of Uncertainty, Fuzziness and Knowledge-Based Systems',type:'published',url:'https://doi.org/10.1142/S0218488524500119'},
    {year:2023,title:'Application of neuro-fuzzy ensembles across domains: A systematic review of the two last decades (2000–2022)',venue:'Engineering Applications of Artificial Intelligence · with A. Idri',type:'published',url:'https://doi.org/10.1016/j.engappai.2023.106582'},
    {year:2023,title:'On the performance and interpretability of Mamdani and Takagi-Sugeno-Kang based neuro-fuzzy systems for medical diagnosis',venue:'Scientific African · with A. Idri',type:'published',url:'https://doi.org/10.1016/j.sciaf.2023.e01610'},
    {year:2026,title:'Interpretable Bagging of Adaptive Neuro-Fuzzy Inference Systems: A Rule-Merging Approach',venue:'Submitted to Machine Learning · with A. Idri',type:'review'},
    {year:2026,title:'Path Planning Algorithms for Autonomous Mobile Robots',venue:'Submitted to Engineering Applications of Artificial Intelligence',type:'review'},
    {year:2026,title:'Toward AI-Enabled Battery Management and Mission Decision Support for Autonomous Maritime Defense Systems',venue:'Resilience Week 2026 · presented; publication pending',type:'conference'},
    {year:2026,title:'Physics-Informed Models for Battery State-of-Health Estimation: Performance-Interpretability Trade-offs',venue:'International Conference on Applied Intelligence (ICAI 2026) · presented; publication pending',type:'conference'},
    {year:2024,title:'Insights into the potential of fuzzy systems for medical AI interpretability',venue:'16th International Conference on Knowledge Discovery and Information Retrieval',type:'conference',url:'https://www.scitepress.org/Papers/2024/130729/130729.pdf'},
    {year:2022,title:'Neuro-fuzzy ensembles: A systematic mapping study',venue:'IEEE/ACS AICCSA · with A. Idri',type:'conference',url:'https://doi.org/10.1109/AICCSA56895.2022.10017811'},
    {year:2022,title:'Performance-Interpretability Tradeoff of Mamdani Neuro-Fuzzy Classifiers for Medical Data',venue:'World Conference on Information Systems and Technologies',type:'conference',url:'https://doi.org/10.1007/978-3-031-04826-5_46'},
    {year:2021,title:'Hierarchical decomposition by means of fuzzy simplicial complexes',venue:'International Conference on Intelligent and Fuzzy Systems (INFUS)',type:'conference',url:'https://doi.org/10.1007/978-3-030-85626-7_26'}
  ],
  journey: {
    research:[
      {date:'FEB — NOV 2026',title:'Visiting Research Scholar',place:'UTRGV · Institute for Advanced Manufacturing, Texas',text:'Bringing explainable AI into autonomous water drones, battery management, and digital twins. Mentoring students and supporting research events.'},
      {date:'2022 — 2025 · PART-TIME',title:'Teaching Assistant',place:'Mohammed VI Polytechnic University, Morocco',text:'Hands-on Python and machine learning workshops, project supervision, and mentoring across university institutes and schools.'},
      {date:'2020',title:'Research Intern',place:'ENSIAS, Rabat',text:'Time-series GANs and machine learning for Moroccan stock-market forecasting during the COVID-19 pandemic.'},
      {date:'2018',title:'Conversational AI Intern',place:'WebPick, Marrakech',text:'Natural-language interaction with a connected skyfarm: translating plant data into understandable needs.'}
    ],
    education:[
      {date:'2022 — DEC 2026 · EXPECTED',title:'Ph.D. in Artificial Intelligence',place:'Mohammed VI Polytechnic University, Ben Guerir',text:'Performance, Interpretability, and Physical Consistency in Neuro-Fuzzy Systems for Trustworthy AI.'},
      {date:'2018 — 2020',title:'M.Sc. in Data Science & Big Data',place:'ENSIAS, Rabat',text:'Excellence Award · top graduate student. The 2020 class was celebrated at the award ceremony in February 2023.'},
      {date:'2014 — 2018',title:'B.Sc. in Mathematics & Computer Science',place:'Cadi Ayyad University · FSSM, Marrakech',text:'Excellence Award · top three graduate student.'}
    ]
  }
};


// Concise reading guides describe each paper's subject, not unreported findings.
const publicationNotes = [
  ['energy', 'Digital twins connect models, monitoring, and the behavior of battery energy storage systems.'],
  ['explainable', 'Similarity-based aggregation and calibration in neuro-fuzzy systems, with interpretability at the center.'],
  ['explainable', 'A cross-domain review of the role of fuzzy logic in machine-learning interpretability and explainability.'],
  ['explainable', 'Hyperparameter tuning and homogeneous ensembles of neuro-fuzzy classifiers for medical data.'],
  ['explainable', 'A systematic review of two decades of neuro-fuzzy ensemble applications across research domains.'],
  ['explainable', 'Examines predictive performance and interpretability in Mamdani and Takagi–Sugeno–Kang models for medical diagnosis.'],
  ['explainable', 'A rule-merging approach to interpretable bagging of adaptive neuro-fuzzy inference systems. This manuscript is under review.'],
  ['autonomy', 'A collaborative manuscript on path-planning algorithms for autonomous mobile robots. This manuscript is under review.'],
  ['energy,autonomy', 'Presented work connecting battery intelligence with mission decision support for autonomous maritime systems. Publication pending.'],
  ['energy,explainable', 'Presented work on the performance–interpretability trade-off in physics-informed battery state-of-health models. Publication pending.'],
  ['explainable', 'Investigates the potential of fuzzy systems for making medical artificial intelligence easier to interpret.'],
  ['explainable', 'A systematic mapping study of neuro-fuzzy ensembles and their research landscape.'],
  ['explainable', 'Studies the balance between predictive performance and interpretability in Mamdani neuro-fuzzy medical classifiers.'],
  ['explainable', 'Hierarchical decomposition using fuzzy simplicial complexes, at the intersection of fuzzy modeling and structure.']
];
portfolio.publications.forEach((paper,index)=>{paper.id='paper-'+index;paper.topics=publicationNotes[index][0].split(',');paper.focus=publicationNotes[index][1];});
portfolio.moments = [
  {id:'cleantech',category:'community',tag:'COMMUNITY · STARTGATE, UM6P',title:'More women. More climate solutions.',description:'Connecting with the Women in Cleantech community at ClimateLaunchpad Morocco.',credit:'Event photos shared by Ron Bloemers / ClimateLaunchpad Morocco.',url:'https://www.linkedin.com/posts/ronbloemers_cleantech-sustainability-cleantech-activity-7210739390480822273-nUpM',photos:[['cleantech-3.jpg','A discussion at the Women in Cleantech expert meeting at STARTGATE UM6P'],['cleantech-4.jpg','Participants gathered at the Women in Cleantech event']]},
  {id:'milestone',category:'milestones',tag:'MILESTONE · ENSIAS, RABAT',title:'A milestone worth celebrating.',description:'The ENSIAS excellence award for the top graduate of the 2020 Data Science and Big Data master’s class. Celebrated in 2023.',credit:'Photos from my LinkedIn award-ceremony post.',url:'https://www.linkedin.com/posts/hafsaa-ouifak_award-ceremony-ensias-activity-7034468508444827648-q3Zz',photos:[['award-2.jpg','Hafsaa at the ENSIAS excellence award ceremony'],['award.jpg','ENSIAS graduates and faculty celebrating at the award ceremony']]},
  {id:'culture',category:'ideas',tag:'CURIOSITY · COME TO MY HOME',title:'Art, astronomy, and shared curiosity.',description:'A meeting of science, culture, and ideas at the 24th Come to My Home event at UM6P.',credit:'Photos from my LinkedIn post about the event.',url:'https://www.linkedin.com/posts/hafsaa-ouifak_cometomyhome-um6p-art-activity-6981269418089586688-SkWP',photos:[['culture-3.jpg','Participants seated in a circle during a Come to My Home cultural event at UM6P'],['culture-4.jpg','A shared discussion at the Come to My Home event'],['culture-2.jpg','A science presentation at the Come to My Home event']]},
  {id:'outreach',category:'community',tag:'OUTREACH · UTRGV',title:'A little racing. A lot of data science.',description:'Brainstorming an interactive race dashboard with Kristen Hallas for Florence Nightingale Day at UTRGV.',credit:'Video preview and activity account shared by Kristen Hallas on LinkedIn.',url:'https://www.linkedin.com/posts/kristenhallas_presidentialaichallenge-ai-womeninstem-activity-7450946838397890560-NqOu',photos:[['outreach.jpg','Video preview showing toy cars on a track during the UTRGV data-science outreach activity']]},
  {id:'fuzzy-post',category:'ideas',tag:'RESEARCH, EXPLAINED SIMPLY',title:'Everyday questions. Fuzzy answers.',description:'Why the words we use for heat and pain can help us talk about interpretable artificial intelligence.',credit:'Illustration from my LinkedIn fuzzy-logic post.',url:'https://www.linkedin.com/posts/hafsaa-ouifak_xai-fuzzylogic-neurofuzzy-activity-7341503973217992704-J0lH',photos:[['xai.jpg','Illustration comparing subjective descriptions of temperature and pain']]}
];

function projectIllustration(type) {
  const grid = '<defs><pattern id="grid-'+type+'" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="#809776" stroke-opacity=".1" stroke-width=".6"/></pattern><linearGradient id="fade-'+type+'" x2="1" y2="1"><stop stop-color="#2c402b"/><stop offset="1" stop-color="#152218"/></linearGradient></defs><rect width="580" height="255" fill="url(#fade-'+type+')"/><rect width="580" height="255" fill="url(#grid-'+type+')"/>';
  let art='';
  if(type==='rules') {
    art='<g fill="none" stroke="#c3e7bc" stroke-opacity=".25">';
    for(let i=0;i<3;i++)for(let j=0;j<5;j++)art+=`<path d="M100 ${84+i*48}C180 ${84+i*48} 175 ${54+j*37} 253 ${54+j*37}"/>`;
    for(let j=0;j<5;j++)for(let k=0;k<2;k++)art+=`<path d="M273 ${54+j*37}C365 ${54+j*37} 360 ${105+k*55} 440 ${105+k*55}"/>`;
    art+='</g><g fill="#21371f" stroke="#c3e7bc" stroke-width="1.3">';
    for(let i=0;i<3;i++)art+=`<circle cx="100" cy="${84+i*48}" r="9" stroke="#64dff0"/>`;
    for(let j=0;j<5;j++)art+=`<rect x="253" y="${44+j*37}" width="20" height="20" rx="4" stroke="#ad9cff"/>`;
    for(let k=0;k<2;k++)art+=`<circle cx="440" cy="${105+k*55}" r="10" stroke="#ffad96"/>`;
    art+='</g><circle cx="100" cy="132" r="4" fill="#c3e7bc"/><circle cx="440" cy="105" r="4" fill="#c3e7bc"/><g fill="#98ae8b" font-family="monospace" font-size="9"><text x="74" y="221">INPUTS</text><text x="236" y="20" opacity="0">RULES</text><text x="242" y="245">IF → THEN</text><text x="414" y="205">OUTPUTS</text></g><path d="M253 128h20M263 118v20" stroke="#c3e7bc"/>';
  } else if(type==='vessel') {
    art='<g fill="none" stroke="#a9ceaf" stroke-opacity=".15"><ellipse cx="290" cy="178" rx="215" ry="37"/><ellipse cx="290" cy="178" rx="175" ry="27"/><ellipse cx="290" cy="178" rx="135" ry="17"/></g><g fill="#213a30" stroke="#accdb5" stroke-width="1.2"><path d="M150 145l98-46 188 45-91 57z"/><path d="M150 145l13 23 177 47 5-14z" fill="#172b24"/><path d="M345 201l91-57-12 27-84 44z" fill="#28483a"/><path d="M222 125l51-24 87 23-51 27z" fill="#375343"/><path d="M250 99v-32l50 13v33z"/><path d="M250 67l23-12 50 13-23 12z"/><path d="M300 80l23-12v32l-23 13z" fill="#294337"/></g><path d="M286 60V34M276 39h20" stroke="#c3e7bc" stroke-width="1.5"/><g fill="none" stroke="#c3e7bc" stroke-opacity=".6" stroke-dasharray="3 5"><path d="M323 90l59-39h88"/><path d="M266 142l-65 47h-81"/></g><g font-family="monospace" font-size="9" fill="#b3c9a7"><text x="388" y="44">DIGITAL TWIN</text><text x="92" y="207">BATTERY STATE</text></g><circle cx="323" cy="90" r="3" fill="#c3e7bc"/><circle cx="266" cy="142" r="3" fill="#c3e7bc"/>';
  } else if(type==='landscape') {
    art='<g fill="none" stroke="#9ab98a" stroke-width="1" stroke-opacity=".7">';
    for(let i=0;i<13;i++){let y=70+i*12;art+=`<path d="M-10 ${y} C90 ${y-70} 145 ${y+75} 245 ${y+10}S400 ${y-40} 590 ${y+15}"/>`;}
    art+='</g><g stroke="#c3e7bc" fill="#1b2f1c"><circle cx="143" cy="125" r="5"/><circle cx="328" cy="106" r="5"/><circle cx="423" cy="177" r="5"/></g><g fill="none" stroke="#c3e7bc" stroke-dasharray="2 5" stroke-opacity=".5"><path d="M143 125l185-19 95 71"/></g><g font-family="monospace" font-size="9" fill="#d3dfca"><text x="114" y="111">WATER</text><text x="304" y="91">CROPS</text><text x="400" y="202">INDUSTRY</text></g>';
  } else {
    art='<g stroke="#c3e7bc" stroke-opacity=".35" stroke-width="1">';
    const values=[78,66,94,102,80,72,97,112,96,135,122,142,129,154,137,162,149,171];
    values.forEach((v,i)=>{let x=60+i*27,y=245-v;art+=`<path d="M${x} ${y-17}v45"/><rect x="${x-4}" y="${y}" width="8" height="19" fill="${i%3?'#6b8f64':'#b3cda1'}" stroke="none"/>`;});
    art+='</g><path d="M50 190C95 199 120 151 165 160S230 172 270 132S330 145 373 104S438 107 510 65" stroke="#c3e7bc" stroke-width="2" fill="none"/><path d="M373 104Q440 100 515 48M373 104Q440 130 515 105" stroke="#c3e7bc" stroke-opacity=".3" stroke-dasharray="3 5" fill="none"/><g font-family="monospace" font-size="9" fill="#9ab28b"><text x="50" y="233">OBSERVATIONS</text><text x="423" y="233">POSSIBLE FUTURES</text></g>';
  }
  let svg = `<svg viewBox="0 0 580 255" aria-hidden="true" preserveAspectRatio="xMidYMid slice">${grid}${art}</svg>`;
  const accent={rules:'#64dff0',vessel:'#64dff0',landscape:'#ffac8d',forecast:'#ad9cff'}[type];
  const palette={'#c3e7bc':accent,'#2c402b':'#172b50','#152218':'#0b1832','#809776':'#739cdb','#21371f':'#152843','#98ae8b':'#a6bddf','#213a30':'#183963','#accdb5':'#8bafff','#172b24':'#11294b','#28483a':'#28588b','#375343':'#7665b8','#294337':'#254677','#b3c9a7':'#bed4ed','#9ab98a':'#67dacd','#1b2f1c':'#27304e','#d3dfca':'#d5e9ff','#6b8f64':'#4d9de0','#b3cda1':'#ffad96','#9ab28b':'#adc0df'};
  for(const [before,after] of Object.entries(palette))svg=svg.replaceAll(before,after);
  return svg;
}
