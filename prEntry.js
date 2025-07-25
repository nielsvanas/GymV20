// prEntry.js — add personal record
const today = new Date().toISOString().split('T')[0];
document.getElementById('date').value = today;

function toggleMenu(){
  const m=document.getElementById('menu');
  m.classList.toggle('hidden');
}

function addPR(){
  const date = document.getElementById('date').value;
  const lift = document.getElementById('lift').value;
  const weight = parseFloat(document.getElementById('weight').value);
  if(isNaN(weight)||weight<=0){alert('Enter a valid weight');return;}
  let prs = JSON.parse(localStorage.getItem('prLog')) || [];
  prs.push({date,lift,weight});
  localStorage.setItem('prLog', JSON.stringify(prs));
  document.getElementById('weight').value='';
  alert('PR saved!');
}
