import React from 'react'
import { connect } from 'react-redux'
import { Clip } from '../../typings'
import { AppState } from '../../typings/actions'
import { ClipForm, ClipList, VideoForm, VideoPlayer } from '../../components'
import { setVideoDuration, setPlayingClip, setValidUrl } from '../../actions'
import styles from './styles.module.css'
import clipreducer from '../../reducers/clips'

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
    /*     this.handleChangeUrl = this.handleChangeUrl.bind(this)
 
   
    this.handleSetCurrentClip = this.handleSetCurrentClip.bind(this)
    this.handleDeleteClip = this.handleDeleteClip.bind(this)
    this.handleSetEdit = this.handleSetEdit.bind(this)
    this.handleEditClip = this.handleEditClip.bind(this)



    this.handleCreateClip = this.handleCreateClip.bind(this) */
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
  /*  

  public handleChangeUrl(value: string) {
    this.setState({ videoUrl: value })
  }

  public handleCreateClip() {
    this.setState({
      clipList: [...this.state.clipList, this.state.currentClip],
      currentClip: { name: '', timeRange: { min: 0, max: 5 } }
    })
  }

  public handleEditClip() {
    const clipList = this.state.clipList.map((item, idx) => {
      if (idx === this.state.editClip) {
        //@ts-ignore
        return Object.assign({}, item, this.state.currentClip)
      }
      return item
    })

    this.setState({
      clipList,
      isEditing: false,
      currentClip: { name: '', timeRange: { min: 0, max: 5 } }
    })
  }

  public handleSetEdit(id: number) {
    //@ts-ignore
    const currentClip = Object.assign({}, this.state.clipList[id])
    this.setState({
      editClip: id,
      currentClip,
      isEditing: true
    })
  }

  public handleDeleteClip(id: number) {
    this.setState({
      clipList: [...this.state.clipList.slice(0, id), ...this.state.clipList.slice(id + 1)]
    })
  }



  public handleSetCurrentClip(clip: Clip) {
    // @ts-ignore
    const currentClip = Object.assign({}, this.state.currentClip, clip)
    this.setState({
      currentClip
    })
  }

  */

  public render() {
    //https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4
    return (
      <div className={styles.App}>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <VideoPlayer onHandleLoadMetadata={this.handleLoadMetadata} />
            <ClipForm />
          </div>
          <div className={styles.container}>
            <VideoForm onHandleSubmitUrl={this.handleSubmitUrl} />
            {this.props.videoUrl && this.props.validUrl ? (
              <ClipList onHandleSetPlaying={this.handleSetPlaying} />
            ) : (
              <div>Please provide a url for Video</div>
            )}
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
