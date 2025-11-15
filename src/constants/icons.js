// Optional external icon base, e.g.
// VITE_ICON_BASE_URL=https://raw.githubusercontent.com/<user>/<repo>/<branch>/icon
const ICON_BASE = import.meta?.env?.VITE_ICON_BASE_URL

// Default to your GitHub icons if no env provided
const GH_BASE = 'https://raw.githubusercontent.com/lrnbrad/emoblog-backend/main/icon'

function base(path) {
  const b = (ICON_BASE || GH_BASE).replace(/\/$/, '')
  return `${b}/${path}`
}

export const ICONS = {
  alarm: base('alarm.png'),
  likeOutline: base('likeOutline.png'),
  likeFilled: base('likeFilled.png'),
  comment: base('comment.png'),
  edit: base('edit.png'),
  delete: base('delete.png'),
}
