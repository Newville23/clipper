import React, { ChangeEvent } from 'react'
import { Clip } from '../../typings'
import InputRange, { InputRangeProps } from 'react-input-range'
import { formatClipTime } from '../../services/clips'
import styles from './styles.module.css'

interface ClipFormProps {
  editClip?: number
  isEditing: boolean
  currentClip: Clip
  videoDuration: number
  onHandleSetCurrentClip: (clip: Clip) => void
  onHandleCreateClip: () => void
  onHandleEditClip: () => void
}

class ClipForm extends React.Component<ClipFormProps> {
  constructor(props: ClipFormProps) {
    super(props)
    {
      /*TODO: Assign the endTime as the video total duration*/
    }
    this.handleClipFormSubmit = this.handleClipFormSubmit.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  public handleClipFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    {
      /* TODO: Should call the creatae clip action */
    }
    if (this.props.editClip && this.props.isEditing) {
      this.props.onHandleEditClip()
    } else {
      this.props.onHandleCreateClip()
    }
  }

  public handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.currentTarget
    this.props.onHandleSetCurrentClip({ [target.name]: target.value })
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
        <form onSubmit={this.handleClipFormSubmit}>
          <InputRange
            formatLabel={value => formatClipTime(value)}
            maxValue={this.props.videoDuration}
            minValue={0}
            value={currentClip.timeRange}
            onChange={timeRange => this.props.onHandleSetCurrentClip({ timeRange })}
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

          <button type="submit" disabled={currentClip.name === ''}>
            {isEditing ? 'Update' : 'Clip'}
          </button>
        </form>
      </div>
    )
  }
}

export default ClipForm
