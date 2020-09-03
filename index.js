const getEl = selector => document.querySelector(selector)

const counterEl = getEl('.counter')
const incBtn = getEl('.inc')
const decBtn = getEl('.dec')

incBtn.addEventListener('click', () => {
  store.dispatch({ type: 'INC' })
})

decBtn.addEventListener('click', () => {
  store.dispatch({ type: 'DEC' })
})

const initialState = {
  counter: 0
}

const store = createStore(rootReducer)

const render = () => {
  const state = store.getState()
  const { counter } = state
  counterEl.innerHTML = counter
}

store.subscribe(render)

store.dispatch({ type: 'INIT' })

function createStore(rootReducer, initialState) {
  let state = rootReducer(initialState, { type: '' })
  const subscribers = []

  return {
    dispatch(action) {
      state = rootReducer(state, action)
      subscribers.forEach(sub => sub())
    },

    subscribe(sub) {
      subscribers.push(sub)
    },

    getState() {
      return state
    }
  }
}

function rootReducer(state = initialState, { type }) {
  switch (type) {
    case 'INC':
      return {
        ...state,
        counter: state.counter + 1
      }

    case 'DEC':
      return {
        ...state,
        counter: state.counter - 1
      }

    default:
      return state
  }
}
