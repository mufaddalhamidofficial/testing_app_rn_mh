import { Moment } from "moment"

export function showToast(msg: String, type?: String, otherProps?: Object): void

export function randomDate(start: Moment, end: Moment): Moment
export function randomColor(): String

export function sleep(ms: Number): Promise<void>
