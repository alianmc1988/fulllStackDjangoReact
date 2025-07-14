// src/components/AuthTabs.jsx
import React, { useState } from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import Login from '../components/Login' // Asegúrate de crear este archivo
import Register from '../components/Register' // Asegúrate de crear este archivo
import { tabsPlaceholdersEnum } from '../constants'
import { useNavigate } from 'react-router-dom'

function AuthTabs({ placeHolder = tabsPlaceholdersEnum.LOGIN }) {
	const [key, setKey] = useState(placeHolder) // Estado para controlar qué pestaña está activa
	const navigate = useNavigate()

	return (
		<Container
			className='my-5 p-4 border rounded shadow-sm'
			style={{ maxWidth: '500px' }}
		>
			<h2 className='text-center mb-4'>Bienvenido</h2>
			<Tabs
				id='auth-tabs'
				activeKey={key}
				onSelect={(k) => {
					setKey(k)
					navigate(`/${k}`)
				}}
				className='mb-3 justify-content-center'
			>
				<Tab eventKey='login' title='Iniciar Sesión'>
					<Login />
				</Tab>
				<Tab eventKey='register' title='Registrarse'>
					<Register />
				</Tab>
			</Tabs>
		</Container>
	)
}

export default AuthTabs
