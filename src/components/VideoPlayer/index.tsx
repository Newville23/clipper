import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../../typings/actions'
import { Clip } from '../../typings'
import styles from './styles.module.css'

interface VideoPlayerProps {
  clips: Array<Clip>
  videoUrl: string
  playingClip: number
  validUrl: boolean
  onHandleLoadMetadata: (videoRef: HTMLVideoElement | null) => void
}

class VideoPlayer extends React.Component<VideoPlayerProps> {
  private videoRef = React.createRef<HTMLVideoElement>()

  render() {
    const { videoUrl, clips, playingClip, validUrl, onHandleLoadMetadata } = this.props

    const clip = clips.filter((item, idx) => idx === playingClip)[0]

    return (
      <div className={styles.videoContainer}>
        {validUrl && clip ? (
          <>
            <div className={styles.videoTitle}>{clip.name}</div>
            <video
              ref={this.videoRef}
              src={`${videoUrl}#t=${clip.timeRange.min},${clip.timeRange.max}`}
              onLoadedMetadata={() => onHandleLoadMetadata(this.videoRef.current)}
              controls
              height="400"
              width="600"
              autoPlay
            />
          </>
        ) : (
          <video controls width="600" height="400" />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  clips: state.clipList,
  videoUrl: state.videoUrl,
  playingClip: state.playingClip,
  validUrl: state.validUrl
})

export default connect(
  mapStateToProps,
  {}
)(VideoPlayer)
