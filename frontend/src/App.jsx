// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
	Button,
	Alert,
	Container,
	Row,
	Col,
	Navbar,
	Nav,
} from 'react-bootstrap'

import AuthTabs from './pages/AuthTabs'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import { ACCESS_TOKEN, tabsPlaceholdersEnum } from './constants'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function Logout() {
	localStorage.clear()
	return <Navigate to='/login/' />
}

function RegisterAndLogout() {
	localStorage.clear()
	return <AuthTabs placeHolder={tabsPlaceholdersEnum.REGISTER} />
}

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
				/>
				<Route path='/login' element={<AuthTabs />} />
				<Route path='/register' element={<RegisterAndLogout />} />
				<Route path='/logout' element={<Logout />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</Router>
	)
}

export default App
