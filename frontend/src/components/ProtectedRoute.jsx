import { Navigate, useNavigate } from 'react-router-dom'
import api from '../interceptors/api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'

import { useState, useEffect, useCallback } from 'react'
import { isTokenExpired } from '../helpers/tokenHelper'

const ProtectedRoute = ({ children }) => {
	const [isAuthorized, setIsAuthorized] = useState(null)
	const navigate = useNavigate()

	const refresToken = useCallback(async () => {
		const refreshToken = localStorage.getItem(REFRESH_TOKEN)
		try {
			const res = await api.post('/token/refresh/', {
				refresh: refreshToken,
			})
			if (res.status === 200) {
				localStorage.setItem(ACCESS_TOKEN, res.data.access)
				setIsAuthorized(true)
			} else {
				setIsAuthorized(false)
			}
		} catch (error) {
			console.log(error)
			setIsAuthorized(false)
		}
	}, [])

	const auth = useCallback(async () => {
		const token = localStorage.getItem(ACCESS_TOKEN)
		if (!token) {
			setIsAuthorized(false)
			return
		}

		if (isTokenExpired(token)) {
			await refresToken()
		} else {
			setIsAuthorized(true)
		}
	}, [refresToken])

	useEffect(() => {
		auth().catch((error) => {
			console.log(error)
			setIsAuthorized(false)
		})
	}, [auth])

	if (isAuthorized === null) return '...Loading'

	return isAuthorized ? children : navigate('/login/')
}

export default ProtectedRoute
