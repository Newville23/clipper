import {
  CREATE_CLIP,
  UPDATE_CLIP,
  DELETE_CLIP,
  SET_PLAYING_CLIP,
  SET_CURRENT_CLIP,
  SET_EDIT_CLIP,
  SET_VIDEO_URL,
  SET_VIDEO_DURATION,
  SetActionTypes,
  ClipActionTypes,
  AppState,
  SET_VALID_URL,
  CANCEL_EDIT
} from '../typings/actions'
import initialState from './initialState'

export default function clipreducer(
  state: AppState = initialState,
  action: ClipActionTypes | SetActionTypes
) {
  switch (action.type) {
    case CREATE_CLIP:
      return {
        ...state,
        clipList: [...state.clipList, action.payload],
        currentClip: { name: '', timeRange: { min: 0, max: 5 } }
      }

    case UPDATE_CLIP:
      return {
        ...state,
        clipList: state.clipList.map((item, idx) => {
          if (idx === state.editClip) {
            //@ts-ignore
            return Object.assign({}, item, state.currentClip)
          }
          return item
        }),
        isEditing: false,
        editClip: null,
        currentClip: { name: '', timeRange: { min: 0, max: 5 } }
      }

    case CANCEL_EDIT:
      return {
        ...state,
        currentClip: { name: '', timeRange: { min: 0, max: 5 } },
        isEditing: false,
        editClip: null
      }

    case DELETE_CLIP:
      return {
        ...state,
        clipList: [...state.clipList.slice(0, action.id), ...state.clipList.slice(action.id + 1)]
      }

    case SET_PLAYING_CLIP:
      return {
        ...state,
        playingClip: action.playingClip
      }

    case SET_CURRENT_CLIP:
      return {
        ...state,
        //@ts-ignore
        currentClip: Object.assign({}, state.currentClip, action.clip)
      }

    case SET_EDIT_CLIP:
      return {
        ...state,
        editClip: action.editClip,
        isEditing: true,
        //@ts-ignore
        currentClip: Object.assign({}, state.clipList[action.editClip])
      }

    case SET_VIDEO_URL:
      return {
        ...state,
        videoUrl: action.videoUrl
      }

    case SET_VALID_URL:
      return {
        ...state,
        validUrl: action.validUrl
      }

    case SET_VIDEO_DURATION:
      return {
        ...state,
        videoDuration: action.videoDuration
      }
    default:
      return state
  }
}
