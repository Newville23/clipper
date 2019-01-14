import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../../typings/actions'
import { Clip } from '../../typings'
import { formatClipTime } from '../../services/clips'
import { setEditClip, deleteClip } from '../../actions'
import styles from './styles.module.css'

interface ClipListProps {
  video: string
  clips: Array<Clip>
  onHandleSetPlaying: (id: number) => void
  deleteClip: (id: number) => void
  setEditClip: (id: number) => void
}

class ClipList extends React.Component<ClipListProps> {
  constructor(props: ClipListProps) {
    super(props)

    this.handleEditClip = this.handleEditClip.bind(this)
    this.handleDeleteClip = this.handleDeleteClip.bind(this)
    this.handlePlayClip = this.handlePlayClip.bind(this)
  }

  public handleEditClip(id: number) {
    this.props.setEditClip(id)
  }

  public handleDeleteClip(id: number) {
    this.props.deleteClip(id)
  }

  public handlePlayClip(id: number) {
    this.props.onHandleSetPlaying(id)
  }

  public render() {
    const { video, clips } = this.props
    return (
      <div className={styles.clipListContainer}>
        <div className={styles.listHeader}>My clip List</div>
        <div className={styles.list}>
          {clips.map((clip, idx) => {
            const start = clip.timeRange.min.toString()
            const end = clip.timeRange.max ? clip.timeRange.max.toString() : ''
            return (
              <div className={styles.clip} key={idx}>
                <div className={styles.videoThumbnail} onClick={() => this.handlePlayClip(idx)}>
                  <video no-controls="true" width="170" height="96">
                    <source src={`${video}#t=${start},${end}`} type="video/mp4" />
                  </video>
                </div>
                <div className={styles.videoBody}>
                  <div className={styles.clipName}>
                    {clip.name && clip.name.length > 30
                      ? clip.name.substr(0, 29) + '...'
                      : clip.name}
                  </div>
                  {idx !== 0 && (
                    <>
                      <div className={styles.clipTime}>{`Start: ${formatClipTime(
                        clip.timeRange.min
                      )}`}</div>
                      <div className={styles.clipTime}>{`End: ${formatClipTime(
                        clip.timeRange.max
                      )}`}</div>
                      <div className={styles.buttons}>
                        <button className={styles.normal} onClick={() => this.handleEditClip(idx)}>
                          Edit
                        </button>
                        <button
                          className={styles.normal}
                          onClick={() => this.handleDeleteClip(idx)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  video: state.videoUrl,
  clips: state.clipList
})

export default connect(
  mapStateToProps,
  { setEditClip, deleteClip }
)(ClipList)
