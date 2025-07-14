// src/components/Register.jsx
import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import axios from 'axios'

function Register() {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		setError('')
		setSuccess(false)

		if (password !== confirmPassword) {
			setError('Las contraseñas no coinciden.')
			setLoading(false)
			return
		}
		try {
			console.log('Intentando registrar usuario:', {
				username,
				email,
				password,
			})

			const res = axios.post('http://127.0.0.1:8000/api/user/register/', {
				username,
				email,
				password,
			})

			if (res.status === 200 || res.status === 201) {
				alert('¡Registro exitoso! Ahora puedes iniciar sesión.')
				setSuccess(true)
				alert('¡Registro exitoso! Ahora puedes iniciar sesión.')
			}

			setUsername('')
			setEmail('')
			setPassword('')
			setConfirmPassword('')
		} catch (err) {
			setError(err.message || 'Error desconocido al registrar usuario.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='p-3'>
			<h3 className='text-center mb-4'>Registrarse</h3>
			{error && <Alert variant='danger'>{error}</Alert>}
			{success && (
				<Alert variant='success'>
					¡Registro exitoso! Por favor, inicia sesión.
				</Alert>
			)}
			<Form onSubmit={handleSubmit}>
				<Form.Group className='mb-3' controlId='formBasicUsernameRegister'>
					<Form.Label>Nombre de Usuario</Form.Label>
					<Form.Control
						type='text'
						placeholder='Introduce tu nombre de usuario'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicEmailRegister'>
					<Form.Label>Correo Electrónico</Form.Label>
					<Form.Control
						type='email'
						placeholder='Introduce tu correo'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicPasswordRegister'>
					<Form.Label>Contraseña</Form.Label>
					<Form.Control
						type='password'
						placeholder='Contraseña'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group
					className='mb-3'
					controlId='formBasicConfirmPasswordRegister'
				>
					<Form.Label>Confirmar Contraseña</Form.Label>
					<Form.Control
						type='password'
						placeholder='Confirma tu contraseña'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</Form.Group>

				<Button
					variant='success'
					type='submit'
					className='w-100'
					disabled={loading}
				>
					{loading ? 'Registrando...' : 'Registrarse'}
				</Button>
			</Form>
		</div>
	)
}

export default Register
