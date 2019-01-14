import {
  SET_PLAYING_CLIP,
  SET_CURRENT_CLIP,
  SET_EDIT_CLIP,
  SET_VIDEO_URL,
  SetActionTypes,
  AppState
} from '../typings/actions'
import initialState from './initialState'

export default function setreducer(state: AppState = initialState, action: SetActionTypes) {
  switch (action.type) {
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
        editClip: action.editClip
      }

    case SET_VIDEO_URL:
      return {
        ...state,
        videoUrl: action.videoUrl
      }
    default:
      return state
  }
}
