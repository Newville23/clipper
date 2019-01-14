import React, { ChangeEvent } from 'react'
import { connect } from 'react-redux'
import { createClip, updateClip, setCurrentClip, cancelEdit } from '../../actions/index'
import { AppState } from '../../typings/actions'
import { Clip } from '../../typings'
import InputRange, { InputRangeProps } from 'react-input-range'
import { formatClipTime } from '../../services/clips'
import styles from './styles.module.css'

interface ClipFormProps {
  editClip?: number | null
  isEditing: boolean
  currentClip: Clip
  videoDuration: number
  setCurrentClip: (clip: Clip) => void
  createClip: (clip: Clip) => void
  updateClip: (id: number, clip: Clip) => void
  cancelEdit: () => void
}

class ClipForm extends React.Component<ClipFormProps> {
  constructor(props: ClipFormProps) {
    super(props)
    {
      /*TODO: Assign the endTime as the video total duration*/
    }
    this.handleClipFormSubmit = this.handleClipFormSubmit.bind(this)
    this.handleCancelUpdate = this.handleCancelUpdate.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  public handleClipFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    {
      /* TODO: Should call the creatae clip action */
    }
    if (this.props.editClip && this.props.isEditing) {
      this.props.updateClip(this.props.editClip, this.props.currentClip)
    } else {
      this.props.createClip(this.props.currentClip)
    }
  }

  public handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.currentTarget
    this.props.setCurrentClip({ [target.name]: target.value })
  }

  public handleCancelUpdate() {
    this.props.cancelEdit()
  }

  public render() {
    const { isEditing, currentClip } = this.props
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
        <form>
          <InputRange
            formatLabel={value => formatClipTime(value)}
            maxValue={this.props.videoDuration}
            minValue={0}
            value={currentClip.timeRange}
            onChange={timeRange => this.props.setCurrentClip({ timeRange })}
            classNames={defaultClassNames}
          />
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={currentClip.name}
            onChange={e => this.handleOnChange(e)}
          />
          <div>Start time: {formatClipTime(currentClip.timeRange.min)}</div>
          <div>End time: {formatClipTime(currentClip.timeRange.max)}</div>

          <button onClick={this.handleClipFormSubmit} disabled={currentClip.name === ''}>
            {isEditing ? 'Update' : 'Clip'}
          </button>
          {isEditing && <button onClick={this.handleCancelUpdate}>Cancel</button>}
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  editClip: state.editClip,
  isEditing: state.isEditing,
  currentClip: state.currentClip,
  videoDuration: state.videoDuration
})

export default connect(
  mapStateToProps,
  { updateClip, createClip, setCurrentClip, cancelEdit }
)(ClipForm)
