//style
import './App.css'
//hooks
import { useState } from 'react'

//components
import { Container, Row, Col, Button } from 'react-bootstrap'
import GameStart from './components/GameStart'
import Game from './components/Game'

function App() {
	const [showQuestions, setShowQuestions] = useState(false)
	const [difficulty, setDifficulty] = useState('medium')
	const [url, setUrl] = useState('')

	//function to get url and to show questions
	const handleStart = difficulty => {
		setUrl(
			`https://opentdb.com/api.php?amount=5&difficulty=${difficulty}&type=multiple`
		)
		setShowQuestions(true)
	}
	//function to choose and set difficulty
	const handleDifficulty = e => {
		setDifficulty(e.target.innerText.toLowerCase())
	}

	return (
		<Container fluid className='App'>
			{!showQuestions && (
				<Container fluid className='start-page'>
					<GameStart handleDifficulty={handleDifficulty} />
					<Row className='justify-content-center game-start'>
						<Col className='start-game'>
							<Button
								className='start-game-btn'
								onClick={() => handleStart(difficulty)}>
								Start quiz
							</Button>
						</Col>
					</Row>
				</Container>
			)}
			{showQuestions && (
				<Container fluid className='game-page'>
					<Row>
						<Col className='title '>Quizzicle</Col>
					</Row>
					<Game url={url} />
				</Container>
			)}
		</Container>
	)
}

export default App
