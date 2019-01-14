import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../../typings/actions'
//import styles from './styles.module.css'
import { setVideoUrl } from '../../actions'

interface VideoFormProps {
  videoUrl: string
  setVideoUrl: (value: string) => void
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
            onChange={e => this.props.setVideoUrl(e.target.value)}
            type="text"
          />
          <button type="submit">Next</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  videoUrl: state.videoUrl
})

export default connect(
  mapStateToProps,
  { setVideoUrl }
)(VideoForm)
