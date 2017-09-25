
## redux-rollbar-log-middleware

Middleware that helps log and captureEvent to Rollbar from the sagas and the simple async redux actions

### Usage

```
const middleware = rollbarLogMiddleware(rollbar)
```

### createLogAction

```
import { createLogAction } from 'redux-rollbar-log-middleware'

export const asyncAction = () => dispatch => {

  dispatch(createLogAction({
    type: 'debug',
    message: 'some log message'
    body: {
      number: 1233
    }
  }))
}

```
#### Action properties

| Name | Type | Default | Description |
| -    | -    | -       | -           |
| type | `string` | `debug` | Rollbar log type. "critical", "error", "warning", "info" or "debug" |
| message | `string` | - | Log message |
| body | `object` | - | Log body |


### captureEvent


```
import { createCaptureAction } from 'redux-rollbar-log-middleware'

export const asyncAction = () => dispatch => {

  dispatch(createCaptureAction({
    type: 'debug',
    body: {
      number: 1233
    }
  }))
}

```
#### Action properties

| Name | Type | Default | Description |
| -    | -    | -       | -           |
| type | `string` | `debug` | Rollbar capture event type. "critical", "error", "warning", "info" or "debug" |
| body | `object` | - | Capture event body |

## Example

```
import { createStore, applyMiddleware } from 'redux'
import rollbarLogMiddleware from 'redux-rollbar-log-middleware'

import Rollbar from 'rollbar' // server usage. for client use the instruction https://rollbar.com/docs/notifier/rollbar.js/#umd--browserify--requirejs--webpack

const rollbar = new Rollbar({ /* ... some config */ })

const middleware = [
  rollbarLogMiddleware(rollbar)
];

export const store = createStore(
  appReducers,
  composeWithDevTools(
    applyMiddleware(...middleware),
  )
)
```

You can find more usecases in the tests.
