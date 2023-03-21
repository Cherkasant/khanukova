import './App.css'
import Router from './Pages/Router'
import { store } from './Redux/store'
import { Provider } from 'react-redux'

function App() {
	return (
		<div className='App'>
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
