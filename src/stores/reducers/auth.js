import * as _act from '../../constants/actionType'
import { updateObject } from '../../utils/utility'

const initialState = {
  loading: false,
  checked: false,
  userId: false,
  token: false,
  refreshToken: null,
  expiresIn: '',
  error: null,
  redirectPath: '/'
}

const authStart = state => {
  return updateObject(state, {loading: true})
}

const authLogout = state => {
  return updateObject(state, {...initialState, checked: true})
}

const authSuccess = (state, payload) => {
  return updateObject(state, {
    loading: false,
    checked: true,
    token: payload.token,
    userId: payload.user_id,
    consumerId: payload.consumer_id,
    refreshToken: payload.refresh_token,
    expiresIn: payload.expiration_time,
    error: null
  })
}

const authFail = (state, error) => {
  if (error === undefined || error.response === undefined) {
    return updateObject(state, {loading: false, error: 'Error connection aborted', checked: true})
  }
  return updateObject(state, {loading: false, error: error.response.data.error, checked: true})
}

const setRedirectPath = (state, pathname) => {
  return updateObject(state, {redirectPath: pathname})
}

const authenticationReducer = (state = initialState, action) => {

  switch (action.type) {
    case _act.AUTH_START: return authStart(state)
    case _act.AUTH_SUCCESS: return authSuccess(state, action.payload)
    case _act.AUTH_FAIL: return authFail(state, action.error)
    case _act.AUTH_LOGOUT: return authLogout(state)
    case _act.SET_REDIRECT_AUTH_PATH: return setRedirectPath(state, action.pathname)
    default: return state
  }

}

export default authenticationReducer