import React from 'react'
import styles from './styles.module.css'

//this imports are related with the ClipForm Component
import InputRange, { InputRangeProps } from 'react-input-range'

interface Clip {
  name: string
  startTime: number
  endTime?: number
  tags?: Array<string>
}

/**
 * This is my top App component
 */

interface AppState {
  videoUrl: string
  videoDuration: number
  submitSuccess: boolean
  currentClip: Clip
  clipList: Array<Clip>
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props)

    this.state = {
      videoUrl: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
      videoDuration: 10,
      submitSuccess: false,
      currentClip: { name: 'Default Video', startTime: 0, endTime: 0 },
      clipList: []
    }

    this.handleChangeUrl = this.handleChangeUrl.bind(this)
    this.handleSubmitUrl = this.handleSubmitUrl.bind(this)
    this.handleLoadMetadata = this.handleLoadMetadata.bind(this)
  }

  public handleLoadMetadata(videoRef: HTMLVideoElement | null) {
    if (videoRef) {
      this.setState({ videoDuration: videoRef.duration })
    }
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
          const clips: Clip[] = [defaultClip]
          console.log(clips)
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
              videoUrl={videoUrl}
              currentClip={currentClip}
              validUrl={this.state.submitSuccess}
              onHandleLoadMetadata={this.handleLoadMetadata}
            />
            <ClipForm videoDuration={videoDuration} />
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

/**
 * This is my child ClipForm component
 */

interface ClipFormProps {
  videoDuration: number
  name?: string
  startTime?: number
  endTime?: number
  tags?: Array<string>
}

interface TimeValue {
  min: number
  max: number
}

{
  /*TODO: Improve the optional type for timeValue*/
}
interface ClipFormState {
  name: string
  timeValue: TimeValue | any
}

class ClipForm extends React.Component<ClipFormProps, ClipFormState> {
  constructor(props: ClipFormProps) {
    super(props)
    {
      /*TODO: Assign the endTime as the video total duration*/
    }
    this.state = {
      name: '',
      timeValue: { min: 0, max: 5 }
    }

    this.handleClipFormSubmit = this.handleClipFormSubmit.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.timeFormating = this.timeFormating.bind(this)
  }

  public handleClipFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    {
      /* TODO: Should call the creatae clip action */
    }
    console.log('submitting clip')
  }

  public handleOnChange(name: string) {
    this.setState({ name })
  }

  public timeFormating(value: number) {
    return new Date(value * 1000).toISOString().substr(11, 8)
  }

  public render() {
    const defaultClassNames = {
      activeTrack: styles['track-active'],
      disabledInputRange: styles['disabled'],
      inputRange: styles['range'],
      labelContainer: styles['label-container'],
      maxLabel: styles['label-max'],
      minLabel: styles['label-min'],
      slider: styles['slider'],
      sliderContainer: styles['slider-container'],
      track: styles['track'],
      valueLabel: styles['label-value']
    }

    return (
      <div>
        <form onSubmit={this.handleClipFormSubmit}>
          <InputRange
            formatLabel={value => this.timeFormating(value)}
            maxValue={this.props.videoDuration}
            minValue={0}
            value={this.state.timeValue}
            onChange={timeValue => this.setState({ timeValue })}
            classNames={defaultClassNames}
          />
          <input
            type="text"
            placeholder="Name"
            value={this.state.name}
            onChange={e => this.handleOnChange(e.target.value)}
          />
          <div>Start time: {this.timeFormating(this.state.timeValue.min)}</div>
          <div>End time: {this.timeFormating(this.state.timeValue.max)}</div>
          <button type="submit">Clip</button>
        </form>
      </div>
    )
  }
}

/**
 * This is my child VideoForm component
 */

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

  public render() {
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

/**
 * This is my child VideoPlayer component
 */

interface VideoPlayerProps {
  videoUrl: string
  currentClip: Clip
  validUrl: boolean
  onHandleLoadMetadata: (videoRef: HTMLVideoElement | null) => void
}

class VideoPlayer extends React.Component<VideoPlayerProps> {
  private videoRef = React.createRef<HTMLVideoElement>()

  render() {
    const { videoUrl, currentClip, validUrl, onHandleLoadMetadata } = this.props

    const startTime = currentClip.startTime
    const endTime = currentClip.endTime

    return (
      <div>
        {validUrl ? (
          <video
            ref={this.videoRef}
            src={`${videoUrl}#t=${startTime},${endTime}`}
            onLoadedMetadata={() => onHandleLoadMetadata(this.videoRef.current)}
            controls
            width="600"
          />
        ) : (
          <p>Please enter a valid Url</p>
        )}
      </div>
    )
  }
}

/**
 * This is my child ClipList component
 */

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
