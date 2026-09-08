const fs=require('fs');const {JSDOM}=require('jsdom');
const azi=new Date().toISOString().slice(0,10);
const d=new JSDOM(fs.readFileSync('/home/claude/ias/index.html','utf8'),{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x/',beforeParse(w){
 w.localStorage.setItem('ias:app-data',JSON.stringify({students:[{id:'s1',name:'Test Elev',lastName:'Test',firstName:'Elev',includedHours:8,weeklyLimit:5,payments:[]}],sessions:[{id:'x1',studentId:'s1',date:azi,startMin:600,duration:90,status:'scheduled',type:'included',location:'Gara'}],settings:{workDays:[0,1,2,3,4,5,6],startMin:480,endMin:1200,sessionMin:90,stepMin:30,currency:'lei',locations:[{id:'l1',name:'Gara'}]}}));
 w.localStorage.setItem('ias:licenta',JSON.stringify({cod:'IAS9F3K7QX2',stare:'ok',rol:'proprietar',pana:'2099-12-31',verificatLa:azi,drepturi:['*']}));
 w.localStorage.setItem('ias:backup',azi);
 w.ResizeObserver=function(){this.observe=()=>{};this.disconnect=()=>{};};
}});
const doc=()=>d.window.document;
const clic=(el)=>el&&el.dispatchEvent(new d.window.MouseEvent('click',{bubbles:true}));
const foi=()=>[...doc().querySelectorAll('.sheet-anim')];
setTimeout(()=>{
 [...doc().querySelectorAll('.ecran-peste')].forEach(f=>clic([...f.querySelectorAll('button')].find(b=>/Am înțeles|Închide/.test(b.textContent))));
 setTimeout(()=>{
  clic([...doc().querySelectorAll('nav button')].find(x=>/Calendar/.test(x.textContent)));
  setTimeout(()=>{
   clic([...doc().querySelectorAll('button')].find(x=>/Test Elev/.test(x.textContent)));
   setTimeout(()=>{
    const f=foi().pop();
    clic(f.querySelector('button[aria-label=\"Închide\"]'));
    setTimeout(()=>{
     const t=doc().body.textContent;
     console.log('  fără nicio schimbare:', /Ai modificări nesalvate/.test(t)?'✕ tot întreabă':'✓ se închide direct');
     // acum schimbăm ceva și verificăm că întreabă
     clic([...doc().querySelectorAll('button')].find(x=>/Test Elev/.test(x.textContent)));
     setTimeout(()=>{
      const g=foi().pop();
      const alt=[...g.querySelectorAll('button')].find(x=>/^Așteaptă$/.test(x.textContent.trim()));
      clic(alt);
      setTimeout(()=>{
       clic(foi().pop().querySelector('button[aria-label=\"Închide\"]'));
       setTimeout(()=>{
        console.log('  după ce schimbi statusul:', /Ai modificări nesalvate/.test(doc().body.textContent)?'✓ întreabă':'✕ nu întreabă');
        process.exit(0);
       },500);
      },400);
     },900);
    },700);
   },900);
  },800);
 },500);
},3000);
