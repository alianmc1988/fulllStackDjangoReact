import React from 'react'

const LoadingSpinner = ({ message = 'Cargando...', size = 'md' }) => {
	return (
		<div
			className='d-flex flex-column align-items-center justify-content-center'
			style={{ minHeight: '200px' }}
		>
			<Spinner
				animation='border'
				role='status'
				variant='primary'
				size={size === 'sm' ? 'sm' : undefined}
			>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
			<div className='mt-2 text-muted'>{message}</div>
		</div>
	)
}

export default LoadingSpinner
