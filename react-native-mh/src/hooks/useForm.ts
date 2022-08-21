import React, { useState, useEffect, useMemo, useCallback, useReducer, AriaAttributes } from "react"

enum ValidationTypes {
  Required,
  MaxLength,
  MinLength,
  MinWords,
  MaxWords,
  NumbersOnly,
  LettersOnly,
  Email,
  NoNumbers,
  Regex,
}

interface ValidationItem {
  type: ValidationTypes
  length?: number
  customMessage?: string
  regex?: RegExp
}

interface DataItem {
  intialValue: string | boolean | any
  validations: Array<ValidationItem>
}

type Key = string

interface ReducerItem {
  value: string | boolean | any
  error?: string | null
  key: Key
}

type ReducerState = Array<ReducerItem>

enum ActionTypes {
  CHANGE_TEXT,
  RESET,
  VALIDATE,
  REPLACE_DATA,
}

interface Action {
  type: ActionTypes
  payload?: any
  key?: Key
}

const reducer = (data: Map<Key, DataItem>) => (state: ReducerState, action: Action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_TEXT:
      return state.map(v =>
        v.key == action.key
          ? {
              value: action.payload,
              error: data.get(v.key)?.validations
                ? validate(data.get(v.key)?.validations as Array<ValidationItem>, action.payload)
                : null,
              key: v.key,
            }
          : v,
      )
    case ActionTypes.RESET:
      return Object.entries(data).map(([k, e]) => ({ value: e.intialValue, error: null, key: k }))
    case ActionTypes.VALIDATE:
      return state.map(v => ({
        ...v,
        error: data.get(v.key)?.validations
          ? validate(data.get(v.key)?.validations as Array<ValidationItem>, action.payload)
          : null,
      }))
    case ActionTypes.REPLACE_DATA:
      return Object.entries(action.payload as Map<Key, DataItem>).map(([k, e]) => ({
        value: e.intialValue,
        error: null,
        key: k,
      }))
    default:
      return state
  }
}

export default function useForm(data: Map<Key, DataItem>) {
  const [state, dispatch] = useReducer(
    reducer(data),
    Object.entries(data).map(([k, e]) => ({ value: e.intialValue, error: null, key: k })),
  )
  const onChangeText = useCallback(
    (value: string | boolean | any, key: string) => {
      dispatch({
        key: key,
        type: ActionTypes.CHANGE_TEXT,
        payload: value,
      })
    },
    [dispatch],
  )
  const validate = useCallback(() => {
    dispatch({
      type: ActionTypes.VALIDATE,
    })
  }, [dispatch])
  const reset = useCallback(() => {
    dispatch({
      type: ActionTypes.RESET,
    })
  }, [dispatch])
  const replaceData = useCallback(
    (data: Map<Key, DataItem>) => {
      dispatch({
        type: ActionTypes.REPLACE_DATA,
        payload: data,
      })
    },
    [dispatch],
  )
  const fields: Map<keyof typeof data, FieldItem> = useMemo(() => {
    const retObj: Map<keyof typeof data, FieldItem> = new Map()
    for (let i = 0; i < state.length; i++) {
      const e = state[i]
      retObj.set(e.key as keyof typeof data, {
        error: e.error,
        onChangeText: (value: string) => onChangeText(value, e.key),
        value: e.value,
        key: e.key,
      })
    }

    return retObj
  }, [state])

  return { fields, validate, reset, replaceData }
}

interface FieldItem {
  onChangeText: (value: string | boolean | any) => void
  value: string | boolean | any
  error: string | null | undefined
  key: Key
}

function validate(types: Array<ValidationItem>, value: string | boolean | any): string | null {
  return "Hello"
}
