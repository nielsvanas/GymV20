// prLog.js — show PR records
function toggleMenu(){ document.getElementById('menu').classList.toggle('hidden'); }

function renderPRs(){
  const list=document.getElementById('prList');
  const prs = JSON.parse(localStorage.getItem('prLog')) || [];
  if(prs.length===0){list.innerHTML='<li>No PRs recorded yet.</li>';return;}
  // group by lift and find max weight & last date
  const best = {};
  prs.forEach(r=>{
    if(!best[r.lift] || r.weight > best[r.lift].weight){
      best[r.lift] = {weight:r.weight, date:r.date};
    }
  });
  list.innerHTML='';
  ['Bench Press','Squat','Deadlift'].forEach(lift=>{
    const li=document.createElement('li');
    if(best[lift]){
      li.innerHTML=`<strong>${lift}:</strong> ${best[lift].weight} kg (set on ${best[lift].date})`;
    }else{
      li.innerHTML=`<strong>${lift}:</strong> —`;
    }
    list.appendChild(li);
  });
}
renderPRs();
