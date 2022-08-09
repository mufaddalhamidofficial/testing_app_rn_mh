import { LOGIN, LOGOUT } from "../actionTypes"

const initialState = {}

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return { ...state, ...payload }
    case LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default authReducer
