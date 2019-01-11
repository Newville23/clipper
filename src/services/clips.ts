/**
 *
 * @param value
 * @returns new Date
 * @description This format the start/end time to the way "00:00:00"
 */
export function formatClipTime(value: number) {
  return new Date(value * 1000).toISOString().substr(11, 8)
}
