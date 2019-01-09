import React from 'react'
import styles from './styles.module.css'

interface Clip {
  name: string
  startTime: number
  endTime?: number
  tags?: Array<string>
}

interface AppState {
  videoUrl: string
  submitSuccess: boolean
  currentClip: Clip
  clipList: Array<Clip>
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props)

    this.state = {
      videoUrl: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
      submitSuccess: false,
      currentClip: { name: 'Default Video', startTime: 0, endTime: 0 },
      clipList: []
    }

    this.handleChangeUrl = this.handleChangeUrl.bind(this)
    this.handleSubmitUrl = this.handleSubmitUrl.bind(this)
  }

  public handleChangeUrl(value: string) {
    this.setState({ videoUrl: value })
  }

  public handleSubmitUrl() {
    this.setState(
      {
        submitSuccess: true
      },
      () => {
        if (this.state.submitSuccess) {
          const defaultClip: Clip = { name: 'Default Video', startTime: 0 }
          const clips: Clip[] = [...this.state.clipList, defaultClip]
          this.setState({
            clipList: clips
          })
        }
      }
    )
  }

  public render() {
    const { videoUrl, currentClip, clipList } = this.state
    //https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4
    return (
      <div className={styles.App}>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <VideoPlayer
              videoUrl={videoUrl}
              currentClip={currentClip}
              validUrl={this.state.submitSuccess}
            />
          </div>
          <div className={styles.container}>
            <VideoForm
              videoUrl={this.state.videoUrl}
              onHandleChangeUrl={this.handleChangeUrl}
              onHandleSubmitUrl={this.handleSubmitUrl}
            />
            {videoUrl ? (
              <ClipList video={videoUrl} clips={clipList} />
            ) : (
              <div>Please provide a url for Video</div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

interface VideoFormProps {
  videoUrl: string
  onHandleChangeUrl: (value: string) => void
  onHandleSubmitUrl: () => void
}

class VideoForm extends React.Component<VideoFormProps> {
  constructor(props: VideoFormProps) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    this.props.onHandleSubmitUrl()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.props.videoUrl}
            onChange={e => this.props.onHandleChangeUrl(e.target.value)}
            type="text"
          />
          <button type="submit">Next</button>
        </form>
      </div>
    )
  }
}

interface VideoPlayerProps {
  videoUrl: string
  currentClip: Clip
  validUrl: boolean
}

class VideoPlayer extends React.Component<VideoPlayerProps> {
  render() {
    const { videoUrl, currentClip, validUrl } = this.props

    const startTime = currentClip.startTime
    const endTime = currentClip.endTime

    return (
      <div>
        {validUrl ? (
          <video width="600" controls>
            <source src={`${videoUrl}#t=${startTime},${endTime}`} />
          </video>
        ) : (
          <p>Please enter a valid Url</p>
        )}
      </div>
    )
  }
}

interface ClipListProps {
  video: string
  clips: Array<Clip>
}

class ClipList extends React.Component<ClipListProps> {
  render() {
    const { video, clips } = this.props
    return (
      <div>
        {clips.map(clip => {
          const start = clip.startTime.toString()
          const end = clip.endTime ? clip.endTime.toString() : ''
          return (
            <div className={styles.clip} key={clip.name}>
              <video no-controls="true" width="170" height="96">
                <source src={`${video}#t=${start},${end}`} type="video/mp4" />
              </video>
              <div className={styles.clipName}>{clip.name}</div>
              <div className={styles.clipTime}>{`Start: ${start}`}</div>
              {clip.endTime && <div className={styles.clipTime}>{`End: ${clip.endTime}`}</div>}
            </div>
          )
        })}
      </div>
    )
  }
}

export default App
