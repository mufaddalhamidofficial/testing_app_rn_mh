import React, { useState, useEffect, useMemo, useCallback, useReducer, AriaAttributes } from "react"
import useTheme from "./useTheme"

export enum ValidationTypes {
  Required,
  MaxLength,
  MinLength,
  MinWords,
  MaxWords,
  NumbersOnly,
  LettersOnly,
  Email,
  Regex,
  EqualTo,
}

export interface ValidationItem {
  type: ValidationTypes
  length?: number
  customMessage?: string
  value?: RegExp | string | boolean | any
}

export interface DataItem {
  intialValue: string | boolean | any
  validations: Array<ValidationItem>
  displayName?: string
  heading?: string
  placeholder?: string
}

export type Key = string

export interface ReducerItem {
  value: string | boolean | any
  error?: string | null
  key: Key
}

export type ReducerState = Array<ReducerItem>

export enum ActionTypes {
  CHANGE_TEXT,
  RESET,
  VALIDATE,
  REPLACE_DATA,
}

export interface Action {
  type: ActionTypes
  payload?: any
  key?: Key
  callback?: (validated?: boolean) => void
}

const reducer = (data: { [key: Key]: DataItem }) => (state: ReducerState, action: Action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_TEXT:
      return state.map(v =>
        v.key == action.key
          ? {
              value: action.payload,
              error: data[v.key]?.validations
                ? validate(data[v.key]?.validations as Array<ValidationItem>, action.payload)?.replace(
                    "$displayName",
                    data[v.key].displayName ?? "",
                  )
                : null,
              key: v.key,
            }
          : v,
      )
    case ActionTypes.RESET:
      return Object.entries(data).map(([k, e]) => ({ value: e.intialValue, error: null, key: k }))
    case ActionTypes.VALIDATE:
      const newState = state.map(v => ({
        ...v,
        value: typeof v.value == "string" ? v.value.trim() : v.value,
        error: data[v.key]?.validations
          ? validate(data[v.key]?.validations as Array<ValidationItem>, v.value)?.replace(
              "$displayName",
              data[v.key].displayName ?? "",
            )
          : null,
      }))
      action.callback?.(state.reduce((a, b) => a && !b.error, true))
      return newState
    case ActionTypes.REPLACE_DATA:
      return Object.entries(action.payload as { [key: Key]: DataItem }).map(([k, e]) => ({
        value: e.intialValue,
        error: null,
        key: k,
      }))
    default:
      return state
  }
}

export default function useForm(data: { [key: Key]: DataItem }) {
  const {
    theme: {
      textInputStyles: { defaultHeading },
    },
  } = useTheme()
  const [state, dispatch] = useReducer(
    reducer(data),
    Object.entries(data).map(([k, e]) => ({ value: e.intialValue, error: null, key: k })),
  )
  const onChangeText = useCallback(
    (value: string | boolean | any, key: string) => {
      dispatch({ key: key, type: ActionTypes.CHANGE_TEXT, payload: value })
    },
    [dispatch],
  )
  const validate = useCallback(async () => {
    return await new Promise((res, rej) => dispatch({ type: ActionTypes.VALIDATE, callback: res }))
  }, [dispatch])
  const reset = useCallback(() => {
    dispatch({ type: ActionTypes.RESET })
  }, [dispatch])
  const replaceData = useCallback(
    (data: { [key: Key]: DataItem }) => {
      dispatch({ type: ActionTypes.REPLACE_DATA, payload: data })
    },
    [dispatch],
  )
  const fields: { [key: keyof typeof data]: FieldItem } = useMemo(() => {
    const retObj: { [key: keyof typeof data]: FieldItem } = {}
    for (let i = 0; i < state.length; i++) {
      const e = state[i]
      retObj[e.key as keyof typeof data] = {
        error: e.error,
        onChangeText: (value: string) => onChangeText(value, e.key),
        value: e.value,
        key: e.key,
        heading: data[e.key]?.heading || defaultHeading == "heading" ? data[e.key].displayName : undefined,
        placeholder: data[e.key]?.placeholder || defaultHeading == "placeholder" ? data[e.key].displayName : undefined,
      }
    }

    return retObj
  }, [state, defaultHeading])

  return { fields, validate, reset, replaceData }
}

export interface FieldItem {
  onChangeText: (value: string | boolean | any) => void
  value: string | boolean | any
  error: string | null | undefined
  key: Key
  heading?: string
  placeholder?: string
}

function validate(types: Array<ValidationItem>, value: string | boolean | any): string | null {
  for (let i = 0; i < types.length; i++) {
    const type = types[i]
    switch (type.type) {
      case ValidationTypes.Required:
        if (value == "" || value == null || value == undefined) {
          return type.customMessage || "$displayName is Required!"
        }
        break
      case ValidationTypes.MinLength:
        if (value.length < (type.length ?? 0)) {
          return type.customMessage || "$displayName should be greater than " + type.length + " characters!"
        }
        break
      case ValidationTypes.MaxLength:
        if (value.length > (type.length ?? 0)) {
          return type.customMessage || "$displayName should be less than " + type.length + " characters!"
        }
        break
      case ValidationTypes.MinWords:
        if (typeof value == "string" && value.trim().split(" ").length < (type.length ?? 0)) {
          return type.customMessage || "$displayName should be less than " + type.length + " words!"
        }
        break
      case ValidationTypes.MaxWords:
        if (typeof value == "string" && value.trim().split(" ").length > (type.length ?? 0)) {
          return type.customMessage || "$displayName should be more than " + type.length + " words!"
        }
        break
      case ValidationTypes.NumbersOnly:
        const nums = /^[0-9]+$/
        if (typeof value == "string" && !nums.test(value)) {
          return type.customMessage || "$displayName should contain only numbers!"
        }
        break
      case ValidationTypes.LettersOnly:
        const letters = /^[a-zA-Z\s]+$/
        if (typeof value == "string" && !letters.test(value)) {
          return type.customMessage || "$displayName should contain only letters!"
        }
        break
      case ValidationTypes.Email:
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          return type.customMessage || "$displayName is not a valid email"
        }
        break
      case ValidationTypes.Regex:
        if (typeof type.value == "object" && !type.value.test(value)) {
          return type.customMessage || null
        }
        break
      case ValidationTypes.EqualTo:
        if (type.value != value) {
          return type.customMessage || "$displayName is not equal to " + type.value
        }
        break

      default:
        break
    }
  }
  return null
}
