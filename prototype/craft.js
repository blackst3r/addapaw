const control = document.querySelector('.control');
const input = document.getElementById('finish-split');
const stage = document.getElementById('comparison-stage');

function showFinishSplit() {
  stage.style.setProperty('--split', input.value + '%');
  input.setAttribute('aria-valuetext', input.value + '% flat effect');
}

input.addEventListener('input', showFinishSplit);
showFinishSplit();
control.hidden = false;

function setSplitFromPointer(event) {
  const bounds = stage.getBoundingClientRect();
  const percent = (event.clientX - bounds.left) * 100 / bounds.width;
  input.value = Math.round(Math.min(100, Math.max(0, percent)));
  showFinishSplit();
}

stage.classList.add('is-interactive');
stage.addEventListener('pointerdown', event => {
  if (!event.isPrimary || event.button !== 0) return;
  stage.setPointerCapture(event.pointerId);
  input.focus({ preventScroll: true });
  setSplitFromPointer(event);
});
stage.addEventListener('pointermove', event => {
  if (stage.hasPointerCapture(event.pointerId)) setSplitFromPointer(event);
});
stage.addEventListener('dragstart', event => event.preventDefault());
