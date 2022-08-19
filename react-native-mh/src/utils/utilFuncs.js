import moment from "moment"
import Toast from "react-native-toast-message"

export const showToast = (msg, type = "success", otherProps = {}) => Toast.show({ text1: msg, type, ...otherProps })

export function randomDate(start, end) {
  return moment(start.valueOf() + Math.random() * (end.valueOf() - start.valueOf()))
}
export function randomColor() {
  var colorInt = Math.floor(Math.random() * 16777215)
  var color = "#"

  color += colorInt.toString(16).padStart(6, "0")

  return color
}

export const sleep = ms => new Promise(r => setTimeout(r, ms))
