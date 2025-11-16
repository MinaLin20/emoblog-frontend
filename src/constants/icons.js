// Optional external icon base, e.g.
// VITE_ICON_BASE_URL=https://example.com/icon
const ICON_BASE = import.meta?.env?.VITE_ICON_BASE_URL

// Local static icons (default)
import alarmLocal from '../../icon/alarm.png'
import likeOutlineLocal from '../../icon/likeOutline.png'
import likeFilledLocal from '../../icon/likeFilled.png'
import commentLocal from '../../icon/comment.png'
import editLocal from '../../icon/edit.png'
import deleteLocal from '../../icon/delete.png'
import sendLocal from '../../icon/send.png'

function base(path) {
  const b = ICON_BASE?.replace(/\/$/, '')
  return `${b}/${path}`
}

export const ICONS = ICON_BASE
  ? {
      alarm: base('alarm.png'),
      likeOutline: base('likeOutline.png'),
      likeFilled: base('likeFilled.png'),
      comment: base('comment.png'),
      edit: base('edit.png'),
      delete: base('delete.png'),
      send: base('send.png'),
    }
  : {
      alarm: alarmLocal,
      likeOutline: likeOutlineLocal,
      likeFilled: likeFilledLocal,
      comment: commentLocal,
      edit: editLocal,
      delete: deleteLocal,
      send: sendLocal,
    }
