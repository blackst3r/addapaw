const form = document.getElementById('library-filters');
const search = document.getElementById('style-search');
const theme = document.getElementById('style-theme');
const grid = document.getElementById('library-grid');
const total = document.getElementById('style-count');
const empty = document.getElementById('library-empty');
const memorialLink = document.getElementById('memory-link');
const themes = new Map(Array.from(theme.options, option => [option.value, option.text]));
const styles = globalThis.portraitStyles;

function createCard(style) {
  const card = document.createElement('a');
  card.className = 'library-card';
  const destination = new URLSearchParams({ intent: 'free', style: style.id });
  if (style.theme === 'memory') destination.set('for', 'memory');
  card.href = 'studio.html?' + destination;
  card.dataset.entry = 'catalog';
  const art = document.createElement('div');
  art.className = 'library-art';
  const image = document.createElement('img');
  image.alt = '';
  image.loading = 'lazy';
  image.decoding = 'async';
  image.addEventListener('error', () => {
    image.remove();
    art.textContent = 'Image unavailable';
  }, { once: true });
  image.src = style.image;
  art.append(image);

  const collection = document.createElement('small');
  collection.textContent = themes.get(style.theme);
  const name = document.createElement('h2');
  name.textContent = style.name.split(' · ').pop();
  const body = document.createElement('div');
  body.className = 'library-card-copy';
  body.append(collection, name);
  card.append(art, body);
  return card;
}

function render() {
  const query = search.value.trim().toLowerCase();
  const matches = styles.filter(style =>
    (!theme.value || style.theme === theme.value) &&
    (style.name + ' ' + themes.get(style.theme)).toLowerCase().includes(query)
  );
  const cards = document.createDocumentFragment();
  for (const style of matches) cards.append(createCard(style));
  grid.replaceChildren(cards);
  total.textContent = matches.length + (matches.length === 1 ? ' style' : ' styles');
  empty.hidden = matches.length !== 0;
  memorialLink.hidden = theme.value === 'memory';
}

function restoreFilters() {
  const params = new URL(location.href).searchParams;
  search.value = params.get('q') || '';
  const collection = params.get('series');
  theme.value = themes.has(collection) ? collection : '';
  render();
}

function updateFilters() {
  const url = new URL(location.href);
  const q = search.value.trim();
  if (q) url.searchParams.set('q', q);
  else url.searchParams.delete('q');
  if (theme.value) url.searchParams.set('series', theme.value);
  else url.searchParams.delete('series');
  history.replaceState(null, '', url);
  render();
}

search.addEventListener('input', updateFilters);
theme.addEventListener('change', updateFilters);
form.addEventListener('submit', event => {
  event.preventDefault();
  updateFilters();
});
window.addEventListener('popstate', restoreFilters);
restoreFilters();
