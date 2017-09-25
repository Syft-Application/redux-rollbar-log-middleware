export const ROLLBAR_LOG_TYPE = '@rollbarLogMiddleware/LOG'
export const ROLLBAR_CAPTURE_TYPE = '@rollbarLogMiddleware/CAPTURE'

export const createLogAction = payload => ({
  type: ROLLBAR_LOG_TYPE,
  payload: payload,
})

export const createCaptureAction = payload => ({
  type: ROLLBAR_CAPTURE_TYPE,
  payload: payload,
})

export default (rollbar) => store => next => action => {
  if (action.type === ROLLBAR_LOG_TYPE) {
    const { type = 'debug', message, body } = action.payload || {}

    if (rollbar[type]) rollbar[type](message, body)
    else console.warn('Unknown rollbar log type:: ' + type)
  }
  else if (action.type === ROLLBAR_CAPTURE_TYPE) {
    const { type = 'debug', body } = action.payload || {}
    rollbar.captureEvent(body, type)
  }
  else {
    return next(action)
  }
}
