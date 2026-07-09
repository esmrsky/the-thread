/* ================= icon set — map-legend stroke style ================= */
const _ic = (inner) =>
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + '</svg>';

const ICONS = {
  cross: _ic('<path d="M12 3.5v17M6.5 9h11"/>'),
  thread: _ic('<path d="M2 18c4.5 0 3.5-9 7.5-9s2.5 8 7 8" stroke-dasharray="3 2.4"/><path d="M18.5 4.5v6M15.8 7h5.4"/>'),
  lamb: _ic('<path d="M12 3.5C15 7.5 18 10.4 18 13.2a6 6 0 1 1-12 0C6 10.4 9 7.5 12 3.5z"/>'),
  bread: _ic('<path d="M4.5 13.5a7.5 5.8 0 0 1 15 0V17H4.5z"/><path d="M9 10.2v2.4M12 9.6v3M15 10.2v2.4"/>'),
  water: _ic('<path d="M3 9c1.5-1.6 3.5-1.6 5 0s3.5 1.6 5 0 3.5-1.6 5 0 2 .8 3 .4M3 15c1.5-1.6 3.5-1.6 5 0s3.5 1.6 5 0 3.5-1.6 5 0 2 .8 3 .4"/>'),
  light: _ic('<circle cx="12" cy="12" r="3.6"/><path d="M12 3v2.4M12 18.6V21M3 12h2.4M18.6 12H21M5.6 5.6l1.7 1.7M16.7 16.7l1.7 1.7M18.4 5.6l-1.7 1.7M7.3 16.7l-1.7 1.7"/>'),
  shepherd: _ic('<path d="M9.5 21V7.5a4 4 0 0 1 8 0v1.3"/><path d="M6 21h7"/>'),
  king: _ic('<path d="M4.5 18.5 3.5 9.5l4.9 3.3L12 6.4l3.6 6.4 4.9-3.3-1 9z"/>'),
  temple: _ic('<path d="M12 4.5 3 19.5h18z"/><path d="M12 12.5 8.5 19.5h7z"/>'),
  trinity: _ic('<circle cx="12" cy="6.2" r="3.2"/><circle cx="6.8" cy="15.2" r="3.2"/><circle cx="17.2" cy="15.2" r="3.2"/><path d="M10.4 8.9 8.4 12.5M13.6 8.9l2 3.6M10 15.2h4"/>'),
  rest: _ic('<path d="M20 13.8A8.3 8.3 0 1 1 10.2 4a6.8 6.8 0 0 0 9.8 9.8z"/>'),
  covenant: _ic('<path d="M3.5 16.5a8.5 8.5 0 0 1 17 0M7.5 16.5a4.5 4.5 0 0 1 9 0"/><path d="M2.5 19.5h3.2M18.3 19.5h3.2"/>'),
  bride: _ic('<circle cx="9.2" cy="13.6" r="5"/><circle cx="14.8" cy="10.4" r="5"/>'),
  exile: _ic('<path d="M17.5 20.5V10a4.75 4.75 0 0 0-9.5 0v2.4"/><path d="M4.8 9.6 8 13l3.2-3.4"/>'),
  name: _ic('<path d="M12 3.5c.8 2.8-3.2 4.6-3.2 8.2a3.9 3.9 0 0 0 7.8 0c0-1.7-.9-2.9-1.8-4-.9-1.2-1.9-2.4-2.8-4.2z"/>'),
  pyramid: _ic('<path d="M12 5 21 19H3z"/><path d="M12 5 9.4 19"/>'),
  dune: _ic('<circle cx="17.5" cy="6.5" r="2.5"/><path d="M2.5 18.5C5.5 13 9 13 11.5 17.2M8.5 18.5C11 14 15 14 21.5 18.5"/>'),
  grapes: _ic('<path d="M12 9.6c-.4-2.6 1-4.6 3.6-5.6.4 2.6-1 4.6-3.6 5.6z"/><path d="M12 9.6C10.5 8 9 7.5 7.5 7.6"/><circle cx="12" cy="11.6" r="2"/><circle cx="8.7" cy="15" r="2"/><circle cx="15.3" cy="15" r="2"/><circle cx="12" cy="18.4" r="2"/>'),
  key: _ic('<circle cx="7.2" cy="12" r="3.7"/><path d="M10.9 12H21M17.3 12v3M20.5 12v2.3"/>'),
  scroll: _ic('<rect x="5.5" y="3.5" width="13" height="17" rx="2"/><path d="M9 8.5h6M9 12h6M9 15.5h4"/>'),
  calendar: _ic('<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/><circle cx="12" cy="15" r="1.4"/>'),
  gate: _ic('<path d="M5.5 20.5V10a6.5 6.5 0 0 1 13 0v10.5"/><path d="M3 20.5h18"/>'),
  walk: _ic('<path d="M4 20.5C4 15.5 20 16.5 20 11 20 7.5 14 6.5 10.5 8.4" stroke-dasharray="3.2 2.6"/><path d="M10.5 8.4V3.8M10.5 3.8h4.2l-1.3 1.6 1.3 1.6h-4.2"/>'),
  fork: _ic('<path d="M12 21v-5.5"/><path d="M12 15.5c0-4-6-3.5-6-8V3.8M12 15.5c0-4 6-3.5 6-8V3.8"/><path d="M4.2 5.6 6 3.6l1.8 2M16.2 5.6 18 3.6l1.8 2"/>'),
  brain: _ic('<path d="M11.8 3.6a3.3 3.3 0 0 0-3.3 3.3A3.6 3.6 0 0 0 5 10.4a3.6 3.6 0 0 0 .6 5.9A3.4 3.4 0 0 0 9 20.4h2.8V3.6z"/><path d="M12.2 3.6a3.3 3.3 0 0 1 3.3 3.3 3.6 3.6 0 0 1 3.5 3.5 3.6 3.6 0 0 1-.6 5.9 3.4 3.4 0 0 1-3.4 4.1h-2.8V3.6z"/>'),
  book: _ic('<path d="M12 6.2C10 4.4 7 4.1 4 4.6V19c3-.5 6-.2 8 1.6 2-1.8 5-2.1 8-1.6V4.6c-3-.5-6-.2-8 1.6z"/><path d="M12 6.2v14.4"/>'),
  compass: _ic('<circle cx="12" cy="12" r="8.5"/><path d="M15 9 13.2 13.2 9 15l1.8-4.2z"/>'),
  heart: _ic('<path d="M12 20C6 15.5 3.5 12.4 3.5 9.3a4.3 4.3 0 0 1 8.5-1 4.3 4.3 0 0 1 8.5 1c0 3.1-2.5 6.2-8.5 10.7z"/>'),
  music: _ic('<path d="M9.2 17.9V6.8l9-1.8v10.6"/><circle cx="7" cy="17.9" r="2.2"/><circle cx="16" cy="15.6" r="2.2"/>'),
  wind: _ic('<path d="M3.5 8.3h8.6a2.3 2.3 0 1 0-2.3-2.3M3.5 12.2h13.6a2.5 2.5 0 1 1-2.5 2.5M3.5 16.2h6.2"/>'),
  ear: _ic('<path d="M6.5 8.7a5.5 5.5 0 0 1 11 0c0 3-2 3.8-3 5.6-.8 1.4-.6 3.4-2.6 3.4a2.6 2.6 0 0 1-2.5-1.9"/><path d="M10 8.7a2.6 2.6 0 0 1 5.2 0c0 1.6-1 2.3-1.7 3.2"/>'),
  linkout: _ic('<path d="M14 4.5h5.5V10M19.5 4.5 11 13"/><path d="M9 6.5H6.5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V15"/>'),
  chevron: _ic('<path d="m9.2 5.8 6.3 6.2-6.3 6.2"/>'),
  mountain: _ic('<path d="m3 19.5 6-10.5 3.6 6 2.4-3.5 6 8z"/>'),
  star: _ic('<path d="m12 4 2.2 4.7 5.2.7-3.8 3.6.9 5.1L12 15.7l-4.5 2.4.9-5.1-3.8-3.6 5.2-.7z"/>'),
  search: _ic('<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/>')
};

function icon(name) { return ICONS[name] || ICONS.cross; }
