// DOM elements
const valueEl = document.getElementById('value')
const otherVal = document.getElementById('otherValue')
const plusBtn = document.getElementById('plus')
const minusBtn = document.getElementById('minus')
const plusFiveBtn = document.getElementById('plusFive')
const minusFiveBtn = document.getElementById('minusFive')
const customBtn = document.getElementById('custom')
const ifOdd = document.getElementById('ifOdd')
const asyncBtn = document.getElementById('async')

// initial state value
const initialState = {
    value: 0,
  otherVal: ''
    
}

// reducer
const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'counter/incremented':
            return { value: state.value + 1 }
        case 'counter/decremented':
            return { value: state.value - 1 }
        case 'counter/custom':
            return {value: state.value + action.payload}
        default:
        return state
    }
}

// action object definitions
const addAction = {
  type: 'counter/incremented'
}

const subAction = {
  type: 'counter/decremented'
}

// generating the store
let store = Redux.createStore(counterReducer)

// defining render
const render = () => {
    const state = store.getState()
    otherVal.textContent = state.otherVal
    valueEl.innerHTML = state.value.toString()
}

// establishing dispatch functions
const addOne = () => {
    store.dispatch({type: 'counter/incremented'})
}

const subOne = () => {
    store.dispatch({type: 'counter/decremented'})
}

const addFive = () => {
    store.dispatch({type: 'counter/custom', payload: 5})
}

const subFive = () => {
    store.dispatch({type: 'counter/custom', payload: -5})
}

const customAction = () => {
    let payload = Number(document.getElementById('userInput').value)
    store.dispatch({
        type: 'counter/custom',
        payload: payload
    })
}

const asyncAction = () => {
    setTimeout(() => {
        store.dispatch({type: 'counter/incremented'})
    }, 1000)
}

const ifOddAction = () => {
    if(store.getState().value % 2 !== 0) {
        store.dispatch({type: 'counter/incremented'})
    }
}

// event listeners
minusBtn.addEventListener('click', subOne)
plusBtn.addEventListener('click', addOne)
plusFiveBtn.addEventListener('click', addFive)
minusFiveBtn.addEventListener('click', subFive)
customBtn.addEventListener('click', customAction)
asyncBtn.addEventListener('click', asyncAction)
ifOdd.addEventListener('click', ifOddAction)

// initial render
render()

// subscribe reruns render on dispatch
store.subscribe(render)