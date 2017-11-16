import { createActions, debugLog } from '../../util'

export default debugLog('setting actions', createActions({
  tabSize: 'tabSize',
  autoComplete: 'autoComplete',
  softTabs: 'softTabs',
  theme: 'theme',
  lineWrap: 'lineWrap',
  linter: 'linter'
}))
