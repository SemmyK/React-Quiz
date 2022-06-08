import React from 'react'

//components
import { Container, Button, Row, Col } from 'react-bootstrap'

export default function GameStart({ handleDifficulty }) {
	return (
		<Container className='game'>
			<Row>
				<Row>
					<Col className='title '>Quizzicle</Col>
				</Row>

				<Row id='difficulty'>
					<h5 id='text'>Choose difficulty</h5>
					<Row className='btns'>
						<Col>
							<Button
								className='btn-difficulty'
								onClick={handleDifficulty}
								variant='info'>
								Easy
							</Button>
						</Col>
						<Col>
							<Button
								className='btn-difficulty'
								onClick={handleDifficulty}
								variant='info'>
								Medium
							</Button>
						</Col>
						<Col>
							<Button
								className='btn-difficulty'
								onClick={handleDifficulty}
								variant='info'>
								Hard
							</Button>
						</Col>
					</Row>
				</Row>
			</Row>
		</Container>
	)
}
