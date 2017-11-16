export const debugLog = (/* label, value */ ...args) => {
  if (args.length === 1) {
    console.warn('debugLog should be called with two arguments')
    console.log(args[0])
  } else {
    console.log(args[0] + ':', args[1])
  }
}

// Map over an object, transform the vaules, and return an object with the
// original keys and new values
export const mapEntries = (callback, obj) =>
  Object.entries(obj)
    .reduce((newObj, [key, value]) => {
      newObj[key] = callback(key, value)
      return newObj
    }, {})

/**
 * Shortcut to create Redux actions
 * @param {Object<string, string|Array<string>} actionDescriptions - Describes the actions
 * @example
 * createActions({
 *  action1: 'stuff',
 *  action2: ['things', 'andStuff']
 * })
 * // => {
 *  types: {
 *    action1: 'action1',
 *    action2: 'action2'
 *  },
 *  actions: {
 *    action1: stuff => ({type: 'action1', stuff}),
 *    action2: (things, andStuff) => ({type: 'action2', things, andStuff})
 *  }
 * }
 */
export const createActions = actionDescriptions => ({
  types: mapEntries(name => name, actionDescriptions),
  actions: mapEntries(
    (name, expectedArgs) => (...args) =>
      [].concat(expectedArgs)
        .reduce((action, argName, index) => {
          action[argName] = args[index]
          return action
        }, {type: name})
    , actionDescriptions)
})

export const createReducer = (defaultState, reducerDescription = {}) =>
  (state = defaultState, action) =>
    Object.assign({}, state,
      defaultState.hasOwnProperty(action.type) // If the type's value is in the defaultState
        ? { [action.type]: action[action.type] }
        : reducerDescription[action.type]
          ? reducerDescription[action.type](action, state) // if we can't infer the key in the state, call the function for this key
          : debugLog('Unsure how to handle action: ' + action.type, state)
    )
