// body.js — body metrics + hamburger
const today = new Date().toISOString().split('T')[0];
const dateInput  = document.getElementById('date');
dateInput.value = today;

let metrics = JSON.parse(localStorage.getItem('bodyMetricsLog')) || [];

function toggleMenu(){
  const m=document.getElementById('menu');
  m.classList.toggle('hidden');
  if(!toggleMenu.bound){
    document.querySelectorAll('#menu a').forEach(a=>a.addEventListener('click',()=>m.classList.add('hidden')));
    toggleMenu.bound=true;
  }
}

function renderMetrics(){
  const ul=document.getElementById('metricsLog'); ul.innerHTML='';
  if(metrics.length===0){ul.innerHTML='<li>No metrics yet.</li>'; return;}
  const grouped={};
  metrics.forEach(m=>(grouped[m.date]=grouped[m.date]||[]).push(m));
  Object.keys(grouped).sort((a,b)=>new Date(b)-new Date(a)).forEach(date=>{
    const h=document.createElement('li'); h.innerHTML=`<strong>🗓 ${date}</strong>`; ul.appendChild(h);
    grouped[date].forEach(m=>{
      const li=document.createElement('li');
      li.textContent=`- ${m.weight} kg @ ${m.bodyFat}% body fat`;
      ul.appendChild(li);
    });
  });
}

function addMetric(){
  const date=dateInput.value||today,
        weight=parseFloat(document.getElementById('bodyWeight').value),
        fat=parseFloat(document.getElementById('bodyFat').value);
  if(isNaN(weight)||weight<=0||isNaN(fat)||fat<0||fat>100){alert('Please enter valid weight and body‑fat values.');return;}
  metrics.push({date,weight,bodyFat:fat});
  localStorage.setItem('bodyMetricsLog',JSON.stringify(metrics));
  renderMetrics();
  dateInput.value=today;
  document.getElementById('bodyWeight').value='';
  document.getElementById('bodyFat').value='';
}

renderMetrics();
