import { jwtDecode } from 'jwt-decode'

export const decodeToken = (token) => jwtDecode(token)

export const isTokenExpired = (token) => {
	const decodedToken = decodeToken(token)
	const currentTime = Date.now() / 1000
	return decodedToken.exp < currentTime
}
