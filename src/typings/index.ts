export interface Clip {
  name?: string
  timeRange?: TimeValue | any
  tags?: Array<string>
}

interface TimeValue {
  min: number
  max: number
}
