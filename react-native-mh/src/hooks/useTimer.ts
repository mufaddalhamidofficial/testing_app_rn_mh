import { useCallback, useEffect, useReducer } from "react"

export type TimerType = "DECREMENTAL" | "INCREMENTAL"

export type Status = "RUNNING" | "PAUSED" | "STOPPED"

export type Config = {
  autostart: boolean
  endTime: number | null
  initialStatus: Status
  initialTime: number
  interval: number
  onTimeOver?: () => void
  onTimeUpdate?: (time: number) => void
  step: number
  timerType: TimerType
}

export type ReturnValue = {
  advanceTime: (timeToAdd: number) => void
  pause: () => void
  reset: () => void
  start: () => void
  status: Status
  time: number
}

export interface State {
  status: Status
  time: number
  timerType: TimerType
}

export function createActionType<T extends string>(type: T): { type: T }

export function createActionType<T extends string, P extends unknown>(type: T, payload: P): { type: T; payload: P }

export function createActionType(type: string, payload?: unknown) {
  return { type, payload }
}

const ADVANCE_TIME = (timeToAdd: number) => createActionType("advanceTime", { timeToAdd })

const PAUSE = () => createActionType("pause")

const RESET = (initialTime: number) => createActionType("reset", { initialTime })

const SET = (newTime: number) => createActionType("set", { newTime })

const START = (initialTime: number) => createActionType("start", { initialTime })

const STOP = () => createActionType("stop")

export type TimerActionsType = ReturnType<
  typeof ADVANCE_TIME | typeof PAUSE | typeof RESET | typeof SET | typeof START | typeof STOP
>

function reducer(state: State, action: TimerActionsType): State {
  switch (action.type) {
    case "advanceTime": {
      const { timeToAdd } = action.payload

      return {
        ...state,
        time: state.timerType === "DECREMENTAL" ? state.time - timeToAdd : state.time + timeToAdd,
      }
    }
    case "pause": {
      return {
        ...state,
        status: "PAUSED",
      }
    }
    case "reset": {
      return {
        ...state,
        status: "STOPPED",
        time: action.payload.initialTime,
      }
    }
    case "set": {
      return {
        ...state,
        time: action.payload.newTime,
      }
    }
    case "start": {
      const { initialTime } = action.payload

      return {
        ...state,
        status: "RUNNING",
        time: state.status === "STOPPED" ? initialTime : state.time,
      }
    }
    case "stop": {
      return {
        ...state,
        status: "STOPPED",
      }
    }
    default:
      return state
  }
}

const useTimer = ({
  autostart = false,
  endTime,
  initialStatus = "STOPPED",
  initialTime = 0,
  interval = 1000,
  onTimeOver,
  onTimeUpdate,
  step = 1,
  timerType = "INCREMENTAL",
}: Partial<Config> = {}): ReturnValue => {
  const [state, dispatch] = useReducer(reducer, {
    status: initialStatus,
    time: initialTime,
    timerType,
  })

  const { status, time } = state

  const advanceTime = useCallback(timeToAdd => {
    dispatch({ type: "advanceTime", payload: { timeToAdd } })
  }, [])

  const pause = useCallback(() => {
    dispatch({ type: "pause" })
  }, [])

  const reset = useCallback(() => {
    dispatch({ type: "reset", payload: { initialTime } })
  }, [initialTime])

  const start = useCallback(() => {
    dispatch({ type: "start", payload: { initialTime } })
  }, [initialTime])

  useEffect(() => {
    if (autostart) {
      dispatch({ type: "start", payload: { initialTime } })
    }
  }, [autostart, initialTime])

  useEffect(() => {
    if (typeof onTimeUpdate === "function") {
      onTimeUpdate(time)
    }
  }, [time, onTimeUpdate])

  useEffect(() => {
    if (status !== "STOPPED" && time === endTime) {
      dispatch({ type: "stop" })

      if (typeof onTimeOver === "function") {
        onTimeOver()
      }
    }
  }, [endTime, onTimeOver, time, status])

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    if (status === "RUNNING") {
      intervalId = setInterval(() => {
        dispatch({
          type: "set",
          payload: {
            newTime: timerType === "DECREMENTAL" ? time - step : time + step,
          },
        })
      }, interval)
    } else if (intervalId) {
      clearInterval(intervalId)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [status, step, timerType, interval, time])

  return { advanceTime, pause, reset, start, status, time }
}

export default useTimer
