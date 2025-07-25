
function renderEntryList(){
  const ul=document.getElementById('logListWrapper');
  if(!ul) return;
  ul.innerHTML='';
  if(log.length===0){ul.innerHTML='<li style="color:#888;">No entries yet.</li>'; return;}
  // sort newest first
  const sorted=[...log].sort((a,b)=>new Date(b.date)-new Date(a.date));
  sorted.forEach(e=>{
    const li=document.createElement('li');
    li.style.background='#111';
    li.style.padding='8px 10px';
    li.style.margin='4px 0';
    li.style.borderRadius='8px';
    li.style.boxShadow='0 0 4px rgba(0,0,0,0.6)';
    li.textContent=`${e.date} — ${e.exercise}: ${e.sets}×${e.reps} @ ${e.w}kg`;
    ul.appendChild(li);
  });
}


// ---- V19 QoL ----
document.getElementById('todayBtn')?.addEventListener('click', ()=>{ document.getElementById('date').value = new Date().toISOString().split('T')[0]; });
document.getElementById('weight')?.addEventListener('keyup', e=>{ if(e.key==='Enter'){ addEntry(); }});
window.addEventListener('load', ()=>{ document.getElementById('exercise')?.focus(); });
function exportCSV(){
  if(log.length===0){alert('No entries to export.');return;}
  const header=['Date','Exercise','Sets','Reps','Weight'];
  const rows=log.map(e=>[e.date,e.exercise,e.sets,e.reps,e.w]);
  const csv=[header.join(','),...rows.map(r=>r.join(','))].join('\n');
  const blob=new Blob([csv],{type:'text/csv'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='workout_log.csv';a.click();URL.revokeObjectURL(a.href);
}

const EXERCISES = [
  "Barbell bench press",
  "Incline barbell bench press",
  "Dumbbell flat bench press",
  "Dumbbell incline bench press",
  "Close-grip bench press",
  "Barbell decline bench press",
  "Weighted dip (chest lean)",
  "Pec-deck machine fly",
  "Cable crossover (high-to-low)",
  "Cable crossover (low-to-high)",
  "Push-up",
  "Smith-machine flat press",
  "Smith-machine incline press",
  "Landmine press",
  "Dumbbell squeeze press",
  "Conventional deadlift",
  "Barbell bent-over row",
  "Pendlay row",
  "Chest-supported T-bar row",
  "One-arm dumbbell row",
  "Cable seated row",
  "Wide-grip pull-up",
  "Neutral-grip pull-up",
  "Lat pulldown (pronated)",
  "Lat pulldown (supinated)",
  "Meadows row",
  "Seal row",
  "Inverted row",
  "Straight-arm pulldown",
  "Reverse-fly machine",
  "Barbell overhead press",
  "Dumbbell seated overhead press",
  "Push-press",
  "Arnold press",
  "Landmine half-kneeling press",
  "Dumbbell lateral raise",
  "Cable lateral raise",
  "Machine lateral raise",
  "Dumbbell front raise",
  "Dumbbell rear-delt fly",
  "Cable rear-delt cross-over",
  "Face-pull",
  "Bradford press",
  "Y-raise",
  "Cuban rotation",
  "Standing barbell curl",
  "EZ-bar curl",
  "Dumbbell alternating curl",
  "Hammer curl",
  "Preacher curl",
  "Incline dumbbell curl",
  "Cable curl",
  "Cable rope hammer curl",
  "Reverse-grip EZ-bar curl",
  "Concentration curl",
  "Spider curl",
  "Bayesian curl",
  "Drag curl",
  "Zottman curl",
  "Chin-up",
  "Close-grip barbell bench press",
  "Weighted dip",
  "EZ-bar skullcrusher",
  "Dumbbell skullcrusher",
  "Overhead EZ-bar extension",
  "Overhead rope cable extension",
  "V-bar cable press-down",
  "Rope cable press-down",
  "Straight-bar cable press-down",
  "Dumbbell kick-back",
  "Smith-machine JM press",
  "Diamond push-up",
  "Landmine floor press",
  "Reverse-grip bench press",
  "Triceps dip machine",
  "Back squat",
  "Front squat",
  "Hack squat",
  "Bulgarian split-squat",
  "Leg press",
  "Walking lunge",
  "Smith-machine split squat",
  "Step-up",
  "Leg extension",
  "Romanian deadlift",
  "Stiff-leg deadlift",
  "Nordic curl",
  "Seated hamstring curl",
  "Glute-ham raise",
  "Hip thrust",
  "Standing calf raise",
  "Seated calf raise",
  "Donkey calf raise",
  "Leg-press calf press",
  "Smith-machine single-leg calf raise",
  "Weighted stair calf raise",
  "Hack-squat calf raise",
  "Farmer-carry on toes",
  "Tibialis anterior raise",
  "Jump-rope double-unders",
  "Pogo jumps",
  "Sled push on toes",
  "Seated single-leg calf raise",
  "In-place calf hops",
  "Smith-machine donkey raise",
  "Hanging leg raise",
  "Toes-to-bar",
  "Cable crunch",
  "Ab-wheel rollout",
  "Stability-ball rollout",
  "Weighted decline sit-up",
  "Russian twist",
  "Pallof press",
  "Dead-bug",
  "Plank",
  "Side-plank",
  "Stir-the-pot",
  "Barbell overhead carry",
  "Farmer\u2019s carry",
  "Dragon flag"
];

// --- type‑ahead suggestions ---
const exerciseInput = document.getElementById('exercise');
const suggestionsBox = document.getElementById('suggestions');

exerciseInput.addEventListener('input', () => {
  const q = exerciseInput.value.trim().toLowerCase();
  if (!q) { suggestionsBox.innerHTML=''; suggestionsBox.classList.add('hidden'); return; }
  const matches = EXERCISES.filter(e => e.toLowerCase().includes(q)).slice(0,12);
  suggestionsBox.innerHTML='';
  if (matches.length === 0) { suggestionsBox.classList.add('hidden'); return; }
  matches.forEach(m => {
    const div = document.createElement('div');
    div.textContent = m;
    suggestionsBox.appendChild(div);
  });
  suggestionsBox.classList.remove('hidden');
});

suggestionsBox.addEventListener('click', e => {
  if (e.target && e.target.nodeName === 'DIV') {
    exerciseInput.value = e.target.textContent;
    suggestionsBox.classList.add('hidden');
  }
});

document.addEventListener('click', e => {
  if (!document.querySelector('.search-wrapper').contains(e.target)) {
    suggestionsBox.classList.add('hidden');
  }
});


// Master exercise list (~105 popular movements)


// populate datalist
// main.js — Log Workout page
const today = new Date().toISOString().split('T')[0];
const dateInput = document.getElementById('date');
dateInput.value = today;


let log = JSON.parse(localStorage.getItem('weightliftingLog')) || [];

// hamburger
function toggleMenu() {
  const m = document.getElementById('menu');
  m.classList.toggle('hidden');
  if (!toggleMenu.bound) {
    document.querySelectorAll('#menu a').forEach(a=>a.addEventListener('click',()=>m.classList.add('hidden')));
    toggleMenu.bound=true;
  }
}


renderEntryList();
