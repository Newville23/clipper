import React from 'react'
import { connect } from 'react-redux'
import { Clip } from '../../typings'
import { AppState } from '../../typings/actions'
import { ClipForm, ClipList, VideoForm, VideoPlayer } from '../../components'
import { setVideoDuration, setPlayingClip, setValidUrl } from '../../actions'
import styles from './styles.module.css'

interface AppProps {
  videoUrl: string
  videoDuration: number
  validUrl: boolean
  currentClip: Clip
  isEditing: boolean
  editClip?: number | null
  playingClip: number
  clipList: Array<Clip>
  setVideoDuration: (videoDuration: number) => void
  setValidUrl: (value: boolean) => void
  setPlayingClip: (value: number) => void
}

class App extends React.Component<AppProps> {
  videoRef?: HTMLVideoElement | null
  constructor(props: AppProps) {
    super(props)
    this.videoRef
    this.handleLoadMetadata = this.handleLoadMetadata.bind(this)
    this.handleSubmitUrl = this.handleSubmitUrl.bind(this)
    this.handleSetPlaying = this.handleSetPlaying.bind(this)
  }

  public handleLoadMetadata(videoRef: HTMLVideoElement | null) {
    if (videoRef) {
      this.videoRef = videoRef
      this.props.setVideoDuration(videoRef.duration)
    }
  }

  public handleSubmitUrl() {
    this.props.setValidUrl(true)
  }

  public handleSetPlaying(id: number) {
    this.props.setPlayingClip(id)
    if (this.videoRef) {
      this.videoRef.load()
      this.videoRef.play()
    }
  }

  public render() {
    return (
      <div className={styles.App}>
        <h1 className={styles.appHeader}>Clipper</h1>
        <div className={styles.wrapper}>
          <VideoForm onHandleSubmitUrl={this.handleSubmitUrl} />
          <div className={styles.appBody}>
            <div className={styles.container}>
              <VideoPlayer onHandleLoadMetadata={this.handleLoadMetadata} />
              <ClipForm />
            </div>
            <div className={styles.container}>
              {this.props.videoUrl && this.props.validUrl && (
                <ClipList onHandleSetPlaying={this.handleSetPlaying} />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  videoUrl: state.videoUrl,
  videoDuration: state.videoDuration,
  validUrl: state.validUrl,
  currentClip: state.currentClip,
  isEditing: state.isEditing,
  editClip: state.editClip,
  playingClip: state.playingClip,
  clipList: state.clipList
})

export default connect(
  mapStateToProps,
  { setVideoDuration, setPlayingClip, setValidUrl }
)(App)
