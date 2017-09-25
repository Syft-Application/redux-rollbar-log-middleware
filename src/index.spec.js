
import middleware, { createLogAction, createCaptureAction } from './index'

describe('redux-rollbar-log-middleware', () => {
  let rollbarMock
  let store
  let next

  const dispatch = action => middleware(rollbarMock)(store)(next)(action)

  beforeEach(() => {
    rollbarMock = {
      debug: jest.fn(),
      info: jest.fn(),
      captureEvent: jest.fn(),
    }
    store = {}
    next = jest.fn()
  })

  it('should ignore the action that dont have the right type', () => {
    const action = { type: 'SOME_ACTION' }
    dispatch(action)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBe(action)
    expect(rollbarMock.debug.mock.calls.length).toBe(0)
  })

  describe('createLogAction', () => {
    it('should invoke the rollbar log when receive the right action', () => {
      const logPayload = {
        type: 'info',
        message: 'test',
        body: { a: 'test' }
      }
      const action = createLogAction(logPayload)

      dispatch(action)
      expect(next.mock.calls.length).toBe(0)
      expect(rollbarMock.info.mock.calls.length).toBe(1)
      expect(rollbarMock.info.mock.calls[0]).toEqual([logPayload.message, logPayload.body])
    })
  })
  describe('createCaptureAction', () => {
    it('should invoke the rollbar captureEvent when receive the right action', () => {
      const capturePayload = {
        type: 'info',
        body: { a: 'test' }
      }
      const action = createCaptureAction(capturePayload)

      dispatch(action)
      expect(next.mock.calls.length).toBe(0)
      expect(rollbarMock.captureEvent.mock.calls.length).toBe(1)
      expect(rollbarMock.captureEvent.mock.calls[0]).toEqual([capturePayload.body, capturePayload.type])
    })
  })
})
