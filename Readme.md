
## Redux Rollbar Log Middleware

Middleware that helps log and captureEvent to Rollbar from the redux actions

## Requirements

We've tested it on [Rollbar.js v2.2.8](https://github.com/rollbar/rollbar.js/releases/tag/v2.2.8), but it can work with any Rollbar.js version, that contains the Telemetry.

### Installation

```
npm install redux-rollbar-log-middleware --save
# or
yarn install redux-rollbar-log-middleware --save
```

### Usage

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


You can find more usecases in the [tests](./src/index.spec.js).


### License

MIT
