import { Clip } from './index'

export interface AppState {
  videoUrl: string
  videoDuration: number
  validUrl: boolean
  currentClip: Clip
  isEditing: boolean
  editClip?: number | null
  playingClip: number
  clipList: Array<Clip>
}

// Describing the different ACTION NAMES

export const CREATE_CLIP = 'CREATE_CLIP'
export const UPDATE_CLIP = 'UPDATE_CLIP'
export const DELETE_CLIP = 'DELETE_CLIP'

export const SET_PLAYING_CLIP = 'SET_PLAYING_CLIP'
export const SET_CURRENT_CLIP = 'SET_CURRENT_CLIP'
export const SET_EDIT_CLIP = 'SET_EDIT_CLIP'
export const SET_VIDEO_URL = 'SET_VIDEO_URL'
export const SET_VIDEO_DURATION = 'SET_VIDEO_DURATION'
export const SET_VALID_URL = 'SET_VALID_URL'
export const CANCEL_EDIT = 'CANCEL_EDIT'

interface CreateClipAction {
  type: typeof CREATE_CLIP
  payload: Clip
}

interface UpdateClipAction {
  type: typeof UPDATE_CLIP
  id: number
  payload: Clip
}

interface DeleteClipAction {
  type: typeof DELETE_CLIP
  id: number
}

interface SetPlayingAction {
  type: typeof SET_PLAYING_CLIP
  playingClip: number
}

interface SetCurrentAction {
  type: typeof SET_CURRENT_CLIP
  clip: Clip
}

interface SetEditAction {
  type: typeof SET_EDIT_CLIP
  editClip: number
}

interface SetUrlAction {
  type: typeof SET_VIDEO_URL
  videoUrl: string
}

interface SetDurationAction {
  type: typeof SET_VIDEO_DURATION
  videoDuration: number
}

interface setValidUrl {
  type: typeof SET_VALID_URL
  validUrl: boolean
}

interface cancelEdit {
  type: typeof CANCEL_EDIT
}

export type ClipActionTypes = CreateClipAction | UpdateClipAction | DeleteClipAction | cancelEdit
export type SetActionTypes =
  | SetPlayingAction
  | SetCurrentAction
  | SetEditAction
  | SetUrlAction
  | SetDurationAction
  | setValidUrl
