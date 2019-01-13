import React from 'react'
import styles from './styles.module.css'
import { Clip } from '../../typings'
import { ClipForm, ClipList, VideoForm, VideoPlayer } from '../../components'

/**
 * This is my top App component
 */

interface AppState {
  videoUrl: string
  videoDuration: number
  submitSuccess: boolean
  currentClip: Clip
  isEditing: boolean
  editClip?: number
  playingClip: number
  clipList: Array<Clip>
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props)

    this.state = {
      videoUrl: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
      videoDuration: 10,
      submitSuccess: false,
      isEditing: false,
      currentClip: { name: '', timeRange: { min: 0, max: 5 } },
      playingClip: 0,
      clipList: []
    }

    this.handleChangeUrl = this.handleChangeUrl.bind(this)
    this.handleSubmitUrl = this.handleSubmitUrl.bind(this)
    this.handleLoadMetadata = this.handleLoadMetadata.bind(this)
    this.handleSetCurrentClip = this.handleSetCurrentClip.bind(this)
    this.handleDeleteClip = this.handleDeleteClip.bind(this)
    this.handleSetEdit = this.handleSetEdit.bind(this)
    this.handleEditClip = this.handleEditClip.bind(this)
    this.handleSetPlaying = this.handleSetPlaying.bind(this)

    {
      /** TODO: change methods for redux actions */
    }

    this.handleCreateClip = this.handleCreateClip.bind(this)
  }

  public handleLoadMetadata(videoRef: HTMLVideoElement | null) {
    if (videoRef) {
      this.setState({ videoDuration: videoRef.duration })
    }
  }

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

  public handleSetPlaying(id: number) {
    this.setState({
      playingClip: id
    })
  }

  public handleSetCurrentClip(clip: Clip) {
    // @ts-ignore
    const currentClip = Object.assign({}, this.state.currentClip, clip)
    this.setState({
      currentClip
    })
  }

  public handleSubmitUrl() {
    this.setState(
      {
        submitSuccess: true
      },
      () => {
        if (this.state.submitSuccess) {
          const defaultClip: Clip = { name: 'Default Video', timeRange: { min: 0, max: 0 } }
          const clips: Clip[] = [defaultClip]
          this.setState({
            clipList: clips
          })
        }
      }
    )
  }

  public render() {
    const { videoUrl, videoDuration, currentClip, clipList } = this.state
    //https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4
    return (
      <div className={styles.App}>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <VideoPlayer
              clips={this.state.clipList}
              videoUrl={videoUrl}
              playingClip={this.state.playingClip}
              validUrl={this.state.submitSuccess}
              onHandleLoadMetadata={this.handleLoadMetadata}
            />
            <ClipForm
              currentClip={this.state.currentClip}
              editClip={this.state.editClip}
              isEditing={this.state.isEditing}
              videoDuration={videoDuration}
              onHandleSetCurrentClip={this.handleSetCurrentClip}
              onHandleCreateClip={this.handleCreateClip}
              onHandleEditClip={this.handleEditClip}
            />
          </div>
          <div className={styles.container}>
            <VideoForm
              videoUrl={this.state.videoUrl}
              onHandleChangeUrl={this.handleChangeUrl}
              onHandleSubmitUrl={this.handleSubmitUrl}
            />
            {videoUrl ? (
              <ClipList
                video={videoUrl}
                clips={clipList}
                onHandleSetPlaying={this.handleSetPlaying}
                onHandleDeleteClip={this.handleDeleteClip}
                onHandleSetEdit={this.handleSetEdit}
              />
            ) : (
              <div>Please provide a url for Video</div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
