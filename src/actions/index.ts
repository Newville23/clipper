import { Clip } from '../typings/index'
import {
  CREATE_CLIP,
  UPDATE_CLIP,
  DELETE_CLIP,
  SET_PLAYING_CLIP,
  SET_CURRENT_CLIP,
  SET_EDIT_CLIP,
  SET_VIDEO_URL,
  SET_VIDEO_DURATION,
  SET_VALID_URL,
  CANCEL_EDIT
} from '../typings/actions'

export function createClip(newClip: Clip) {
  return {
    type: CREATE_CLIP,
    payload: newClip
  }
}

export function updateClip(id: number, clip: Clip) {
  return {
    type: UPDATE_CLIP,
    id,
    payload: clip
  }
}

export function deleteClip(id: number) {
  return {
    type: DELETE_CLIP,
    id
  }
}

export function setPlayingClip(id: number) {
  return {
    type: SET_PLAYING_CLIP,
    playingClip: id
  }
}

export function setCurrentClip(clip: Clip) {
  return {
    type: SET_CURRENT_CLIP,
    clip
  }
}

export function setEditClip(id: number) {
  return {
    type: SET_EDIT_CLIP,
    editClip: id
  }
}

export function cancelEdit() {
  return {
    type: CANCEL_EDIT
  }
}

export function setVideoUrl(videoUrl: string) {
  return {
    type: SET_VIDEO_URL,
    videoUrl
  }
}

export function setVideoDuration(videoDuration: number) {
  return {
    type: SET_VIDEO_DURATION,
    videoDuration
  }
}

export function setValidUrl(validUrl: boolean) {
  return {
    type: SET_VALID_URL,
    validUrl
  }
}
