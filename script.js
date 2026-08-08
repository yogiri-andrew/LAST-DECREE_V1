const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];

const decrees=[
 {id:"043",level:"CLASSIFIED",title:"Le silence n'est pas l'absence d'information.",text:"Observez avant d'agir. Comprenez avant de juger.",date:"08.08.2026"},
 {id:"042",level:"AGENT",title:"Directive de synchronisation",text:"Toutes les unités doivent vérifier leurs archives avant transmission.",date:"06.08.2026"},
 {id:"041",level:"PUBLIC",title:"Ouverture du réseau",text:"Le LAST DECREE accepte désormais de nouveaux observateurs.",date:"01.08.2026"},
 {id:"040",level:"OMEGA",title:"Protocole ZÉRO",text:"Dossier scellé. Autorisation supérieure requise.",date:"27.07.2026"}
];
const archives=[
 {id:"ARC-892",cat:"HISTORIQUE",title:"Origine du réseau",text:"Fragment concernant la première apparition du symbole LD."},
 {id:"ARC-771",cat:"OPÉRATION",title:"Opération NIGHTFALL",text:"Journal d'une mission classifiée récupéré partiellement."},
 {id:"ARC-614",cat:"ANOMALIE",title:"Signal inconnu",text:"Transmission de 17 secondes dont la source reste inconnue."},
 {id:"ARC-208",cat:"PERSONNEL",title:"Dossier des rangs",text:"Ancienne structure hiérarchique du réseau."}
];
const ranks=[
 ["XI","Observateur","Accès initial","Observe et rapporte les anomalies."],
 ["X","Archiviste","Accès archives","Classe et protège les informations."],
 ["IX","Veilleur","Accès surveillance","Surveille les activités du réseau."],
 ["VIII","Exécuteur","Accès opérationnel","Exécute les directives autorisées."],
 ["VII","Gardien","Accès sécurisé","Protège les membres et données sensibles."],
 ["VI","Émissaire","Accès diplomatique","Représente le réseau auprès des branches."],
 ["V","Ombre","Accès avancé","Opère avec une identité restreinte."],
 ["IV","Main du Décret","Accès supérieur","Interprète et applique les directives."],
 ["III","Héritier","Accès dirigeant","Participe aux décisions majeures."],
 ["II","Last Witness","Accès absolu","Détient les archives les plus sensibles."],
 ["I","Le Sans Nom","Accès inconnu","Identité et fonction non documentées."],
 ["LD","THE LAST DECREE","NIVEAU OMEGA","Autorité finale du système."]
];

function showPage(id){
  $$('.page').forEach(p=>p.classList.toggle('active',p.id===id));
  $$('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.page===id));
  window.scrollTo({top:0,behavior:"smooth"});
}
$$("[data-page]").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.page)));

function modal(kicker,title,body){
  $("#modalKicker").textContent=kicker; $("#modalTitle").textContent=title; $("#modalBody").innerHTML=body; $("#modal").classList.add("open");
}
$("#modalClose").onclick=()=>$("#modal").classList.remove("open");
$("#modal").addEventListener("click",e=>{if(e.target.id==="modal")$("#modal").classList.remove("open")});

function renderDecrees(){
 const q=($("#decreeSearch")?.value||"").toLowerCase(), f=$("#decreeFilter")?.value||"all";
 $("#decreeList").innerHTML=decrees.filter(d=>(f==="all"||d.level===f)&&(d.title+d.text+d.id).toLowerCase().includes(q)).map(d=>`
 <article class="data-card" data-decree="${d.id}"><span class="tag">DECREE // ${d.id} • ${d.level}</span><h3>${d.title}</h3><p>${d.text}</p><small>${d.date}</small></article>`).join("");
 $$("#decreeList .data-card").forEach(c=>c.onclick=()=>{let d=decrees.find(x=>x.id===c.dataset.decree);modal(`DECREE // ${d.id} • ${d.level}`,d.title,`<p>${d.text}</p><p><b>Date :</b> ${d.date}</p><p>Signature système : <span style="color:#ff1744">LAST DECREE CORE</span></p>`)});
}
function renderArchives(){
 const q=($("#archiveSearch")?.value||"").toLowerCase(), f=$("#archiveFilter")?.value||"all";
 $("#archiveList").innerHTML=archives.filter(a=>(f==="all"||a.cat===f)&&(a.title+a.text+a.id).toLowerCase().includes(q)).map(a=>`
 <article class="data-card" data-archive="${a.id}"><span class="tag">${a.id} • ${a.cat}</span><h3>${a.title}</h3><p>${a.text}</p><small>INTEGRITY: VERIFIED</small></article>`).join("");
 $$("#archiveList .data-card").forEach(c=>c.onclick=()=>{let a=archives.find(x=>x.id===c.dataset.archive);modal(a.id,a.title,`<p>${a.text}</p><p><b>Catégorie :</b> ${a.cat}</p><p>Hash : <span style="color:#52ff9a">7F-A9-CC-01</span></p>`)});
}
function renderRanks(){
 $("#rankList").innerHTML=ranks.map(r=>`<article class="rank" data-rank="${r[0]}"><div class="rank-num">${r[0]}</div><div><h3>${r[1]}</h3><p>${r[2]}</p></div></article>`).join("");
 $$("#rankList .rank").forEach(c=>c.onclick=()=>{let r=ranks.find(x=>x[0]===c.dataset.rank);modal(`RANG // ${r[0]}`,r[1],`<p><b>Niveau :</b> ${r[2]}</p><p>${r[3]}</p>`)});
}
function feed(){
 const items=[["▣","Décret 043 publié","Il y a 4 minutes"],["◈","Archive ARC-892 consultée","Il y a 18 minutes"],["♜","Agent X-17 connecté","Il y a 31 minutes"],["⚠","Anomalie détectée puis neutralisée","Il y a 52 minutes"]];
 $("#activityFeed").innerHTML=items.map(x=>`<div class="feed-item"><span class="feed-icon">${x[0]}</span><div><b>${x[1]}</b><small>${x[2]}</small></div></div>`).join("");
}
function counters(){
 $$("[data-count]").forEach(el=>{let n=+el.dataset.count, i=0, step=Math.max(1,Math.ceil(n/35));let t=setInterval(()=>{i=Math.min(n,i+step);el.textContent=i;if(i>=n)clearInterval(t)},30)});
}
function clock(){let d=new Date();$("#clock").textContent=d.toLocaleTimeString("fr-FR");$("#scanTime").textContent=d.toLocaleTimeString("fr-FR")}
setInterval(clock,1000);clock();

const commands={
 help:()=>`<span class="sys">COMMANDES :</span> help · status · decrees · archives · hierarchy · clear · whoami`,
 status:()=>`<span class="ok">SYSTEM ONLINE</span> // menace LOW // archives synchronisées // agents 127`,
 whoami:()=>`AUTHORIZATION: <span class="sys">AGENT</span> // ID: LD-ONLINE`,
 decrees:()=>`43 décrets indexés. Utilisez le menu DÉCRETS pour ouvrir les dossiers.`,
 archives:()=>`892 archives indexées. Intégrité : <span class="ok">VERIFIED</span>`,
 hierarchy:()=>`12 niveaux reconnus. Autorité actuelle : AGENT`,
 clear:()=>`__CLEAR__`
};
function terminalPrint(text){let out=$("#terminalOutput"); if(text==="__CLEAR__"){out.innerHTML="";return} out.innerHTML+=`<div>${text}</div>`;out.scrollTop=out.scrollHeight}
$("#terminalForm").addEventListener("submit",e=>{e.preventDefault();let v=$("#terminalInput").value.trim().toLowerCase();if(!v)return;terminalPrint(`<span style="color:#777">agent@last-decree:~$ ${v}</span>`);terminalPrint(commands[v]?commands[v]():`<span style="color:#ff5d79">ERREUR:</span> commande inconnue. Tapez <b>help</b>.`);$("#terminalInput").value=""});
terminalPrint(`<span class="sys">LAST DECREE TERMINAL v3.0</span>`);terminalPrint(`Connexion sécurisée établie.`);terminalPrint(`Tapez <b>help</b> pour afficher les commandes.`);

$("#recruitForm").addEventListener("submit",e=>{e.preventDefault();$("#recruitMessage").textContent="✓ CANDIDATURE CHIFFRÉE ET TRANSMISE AU CONSEIL.";toast("Transmission sécurisée.");e.target.reset()});
$("#emergencyBtn").onclick=()=>{modal("ALERTE SYSTÈME","Signal d'anomalie",`<p>Le canal d'alerte est prêt. Dans cette V3 statique, aucun message n'est envoyé à un serveur.</p><p style="color:#ff5d79">STATUS : LOCAL ONLY</p>`);toast("Canal d'alerte ouvert.")};
function toast(t){let x=$("#toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),2500)}

let canvas=$("#particles"),ctx=canvas.getContext("2d"),pts=[];
function resize(){canvas.width=innerWidth;canvas.height=innerHeight}addEventListener("resize",resize);resize();
for(let i=0;i<75;i++)pts.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,s:Math.random()*1.5+.3});
function draw(){ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle="rgba(255,23,68,.35)";pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>canvas.width)p.vx*=-1;if(p.y<0||p.y>canvas.height)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,p.s,0,Math.PI*2);ctx.fill()});requestAnimationFrame(draw)}draw();

$("#decreeSearch").oninput=renderDecrees;$("#decreeFilter").onchange=renderDecrees;$("#archiveSearch").oninput=renderArchives;$("#archiveFilter").onchange=renderArchives;
renderDecrees();renderArchives();renderRanks();feed();counters();

let progress=0;const boot=setInterval(()=>{progress+=Math.random()*13+5;progress=Math.min(progress,100);$("#bootBar").style.width=progress+"%";$("#bootText").textContent=progress<35?"CHARGEMENT DES MODULES...":progress<70?"SYNCHRONISATION DES ARCHIVES...":"VÉRIFICATION DE L'INTÉGRITÉ...";if(progress>=100){clearInterval(boot);setTimeout(()=>$("#bootScreen").classList.add("hide"),350)}},110);
