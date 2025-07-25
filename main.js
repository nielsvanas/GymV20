// ---------- data ----------
const log = JSON.parse(localStorage.getItem('weightliftingLog')) || [];
const today = new Date().toISOString().split('T')[0];

// ---------- helpers ----------
function saveLog() {
  localStorage.setItem('weightliftingLog', JSON.stringify(log));
}

function renderEntryList() {
  const ul = document.getElementById('logListWrapper');
  if (!ul) return;
  ul.innerHTML = '';
  if (log.length === 0) {
    ul.innerHTML = '<li style="color:#888;">No entries yet.</li>';
    return;
  }
  [...log]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .forEach(e => {
      const li = document.createElement('li');
      li.style.cssText =
        'background:#111;padding:8px 10px;margin:4px 0;border-radius:8px;box-shadow:0 0 4px rgba(0,0,0,0.6)';
      li.textContent = `${e.date} — ${e.exercise}: ${e.sets}×${e.reps} @ ${e.w} kg`;
      ul.appendChild(li);
    });
}

// ---------- add entry ----------
function addEntry() {
  const date = document.getElementById('date').value || today;
  const exercise = document.getElementById('exercise').value.trim();
  const sets = parseInt(document.getElementById('sets').value, 10);
  const reps = parseInt(document.getElementById('reps').value, 10);
  const w = parseFloat(document.getElementById('weight').value);

  if (!exercise || isNaN(sets) || sets <= 0 || isNaN(reps) || reps <= 0 || isNaN(w) || w < 0) {
    alert('Please fill out all fields correctly.');
    return;
  }

  log.push({ date, exercise, sets, reps, w });
  saveLog();
  renderEntryList();
  alert('Entry added!');
  if (navigator.vibrate) navigator.vibrate(10);

  // reset
  document.getElementById('exercise').value = '';
  document.getElementById('sets').value = '';
  document.getElementById('reps').value = '';
  document.getElementById('weight').value = '';
  document.getElementById('exercise').focus();
}

// ---------- quick-win UI ----------
document.getElementById('todayBtn')?.addEventListener('click', () => {
  document.getElementById('date').value = today;
});

document.getElementById('weight')?.addEventListener('keyup', e => {
  if (e.key === 'Enter') addEntry();
});

window.addEventListener('load', () => {
  document.getElementById('exercise')?.focus();
  renderEntryList();
});

// ---------- CSV export ----------
function exportCSV() {
  if (log.length === 0) {
    alert('No entries to export.');
    return;
  }
  const header = ['Date', 'Exercise', 'Sets', 'Reps', 'Weight'];
  const rows = log.map(e => [e.date, e.exercise, e.sets, e.reps, e.w]);
  const csv = [header.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'workout_log.csv';
  a.click();
  URL.revokeObjectURL(a.href);
}

// ---------- hamburger ----------
function toggleMenu() {
  document.getElementById('menu')?.classList.toggle('hidden');
}
