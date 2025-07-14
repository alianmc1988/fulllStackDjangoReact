// src/components/Login.jsx
import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import api from '../interceptors/api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import { useNavigate } from 'react-router-dom'

function Login() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		setError('')
		try {
			console.log('Intentando iniciar sesión con:', { username, password })
			const res = await api.post('/api/token/', {
				username,
				password,
			})
			if (res.status === 200) {
				localStorage.setItem(ACCESS_TOKEN, res.data.access)
				localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
				alert('¡Inicio de sesión exitoso!')
				navigate('/')
			} else {
				alert('¡Inicio de sesión fallido!')
			}
			setUsername('')
			setPassword('')
		} catch (err) {
			setError(err.message || 'Error desconocido al iniciar sesión.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='p-3'>
			<h3 className='text-center mb-4'>Iniciar Sesión</h3>
			{error && <Alert variant='danger'>{error}</Alert>}
			<Form onSubmit={handleSubmit}>
				<Form.Group className='mb-3' controlId='formBasicEmailLogin'>
					<Form.Label>Usuario</Form.Label>
					<Form.Control
						type='username'
						placeholder='Introduce tu usuario'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicPasswordLogin'>
					<Form.Label>Contraseña</Form.Label>
					<Form.Control
						type='password'
						placeholder='Introduce tu Contraseña'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicCheckboxLogin'>
					<Form.Check type='checkbox' label='Recordarme' />
				</Form.Group>

				<Button
					variant='primary'
					type='submit'
					className='w-100'
					disabled={loading}
				>
					{loading ? 'Iniciando...' : 'Iniciar Sesión'}
				</Button>
			</Form>
		</div>
	)
}

export default Login
