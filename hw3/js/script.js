const form = document.getElementById('searchForm');
const queryInput = document.getElementById('query');
const queryFeedback = document.getElementById('queryFeedback');
const resultsEl = document.getElementById('results');
const statusEl = document.getElementById('status');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');

form.addEventListener('submit', handleSearch);
clearBtn.addEventListener('click', clearResults);

function setLoading(isLoading) {
  if (isLoading) {
    statusEl.innerHTML = `<div class="alert alert-info">Loading results…</div>`;
    searchBtn.disabled = true;
  } else {
    statusEl.innerHTML = '';
    searchBtn.disabled = false;
  }
}

function validateQuery(q) {
  if (!q) {
    queryFeedback.textContent = 'Please enter an anime title.';
    queryInput.classList.add('is-invalid');
    return false;
  }
  if (q.length < 3) {
    queryFeedback.textContent = 'Please enter at least 3 characters.';
    queryInput.classList.add('is-invalid');
    return false;
  }
  queryInput.classList.remove('is-invalid');
  return true;
}

async function handleSearch(event) {
  event.preventDefault();
  const q = queryInput.value.trim();

  if (!validateQuery(q)) return;

  resultsEl.innerHTML = '';
  setLoading(true);

  // Jikan search endpoint (no API key required)
  const url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(q)}&limit=10`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();

    if (!json.data || json.data.length === 0) {
      statusEl.innerHTML = `<div class="alert alert-warning">No results found for "<strong>${escapeHtml(q)}</strong>".</div>`;
      setLoading(false);
      return;
    }

    renderResults(json.data);
  } catch (err) {
    console.error(err);
    statusEl.innerHTML = `<div class="alert alert-danger">An error occurred: ${escapeHtml(err.message)}</div>`;
  } finally {
    setLoading(false);
  }
}

function renderResults(items) {
  resultsEl.innerHTML = '';

  items.forEach(item => {
    const title = item.title || 'Untitled';
    const url = item.url || '#';
    const image = (item.images && item.images.jpg && item.images.jpg.image_url) || '';
    const synopsis = item.synopsis || 'No synopsis available.';
    const score = item.score !== null && item.score !== undefined ? item.score : 'N/A';
    const episodes = item.episodes !== null && item.episodes !== undefined ? item.episodes : 'N/A';
    const type = item.type || 'N/A';
    const status = item.status || 'N/A';
    const genres = (item.genres || []).map(g => g.name);

    const col = document.createElement('div');
    col.className = 'col-sm-12 col-md-6 col-lg-4';

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        ${image ? `<img src="${escapeHtml(image)}" class="card-img-top" alt="${escapeHtml(title)}">` : ''}
        <div class="card-body d-flex flex-column">
          <h5 class="card-title"><a href="${escapeHtml(url)}" target="_blank" rel="noopener">${escapeHtml(title)}</a></h5>
          <p class="card-text text-muted small mb-2"><strong>Type:</strong> ${escapeHtml(type)} &nbsp; <strong>Episodes:</strong> ${escapeHtml(String(episodes))}</p>
          <p class="card-text" style="flex:1">${escapeHtml(truncate(synopsis, 300))}</p>
          <div class="mb-2">${renderGenreBadges(genres)}</div>
          <div class="d-flex justify-content-between align-items-center">
            <span class="badge bg-success">Score: ${escapeHtml(String(score))}</span>
            <span class="text-muted small">${escapeHtml(status)}</span>
          </div>
        </div>
      </div>
    `;

    resultsEl.appendChild(col);
  });
}

function renderGenreBadges(genres) {
  if (!genres || genres.length === 0) return '';
  return genres.map(g => `<span class="badge bg-secondary me-1">${escapeHtml(g)}</span>`).join(' ');
}

function truncate(text, max) {
  if (!text) return '';
  return text.length > max ? text.slice(0, max).trim() + '…' : text;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function clearResults() {
  queryInput.value = '';
  resultsEl.innerHTML = '';
  statusEl.innerHTML = '';
  queryInput.classList.remove('is-invalid');
}
