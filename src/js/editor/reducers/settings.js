import { createReducer } from '../../util'

const defaultState = {
  tabSize: 2,
  autoComplete: true,
  softTabs: true,
  theme: 'github',
  lineWrap: false,
  linter: true,
  specialThing: 1
}

export default createReducer(defaultState)
