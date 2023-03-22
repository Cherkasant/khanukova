import './App.css'
import { Provider } from 'react-redux'

import Router from './Pages/Router'
import { store } from './Redux/store'

function App() {
  return (
    <div className="App">
      <Router />
    </div>
  )
}

const AppWithStore = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default AppWithStore
