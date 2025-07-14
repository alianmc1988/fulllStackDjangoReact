import { Container, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
	const navigate = useNavigate()

	return (
		<Container
			className='text-center d-flex flex-column justify-content-center align-items-center'
			style={{ minHeight: '80vh' }}
		>
			<Row>
				<Col>
					<h1 className='display-1 text-primary'>404</h1>
					<p className='lead'>Página no encontrada</p>
					<p>
						Lo sentimos, la página que estás buscando no existe o fue movida.
					</p>
					<Button variant='primary' onClick={() => navigate('/')}>
						Volver al inicio
					</Button>
				</Col>
			</Row>
		</Container>
	)
}

export default NotFound
