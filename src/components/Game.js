import { nanoid } from 'nanoid'
//hooks
import React, { useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
//components
import SingleQuestion from './SingleQuestion'
import { Col, Container, Row, Button, Spinner } from 'react-bootstrap'
import Confetti from 'react-confetti'

export default function Game({ url }) {
	const { data, isPending, error } = useFetch(url)
	const [quizArr, setQuizArr] = useState([])
	const [total, setTotal] = useState(0)
	const [correct, setCorrect] = useState(0)
	const [newGame, setNewGame] = useState(false)

	//function to create arr of possible answers
	const handleAnswerArr = object => {
		let arr = []
		let num = Math.floor(Math.random() * 4)
		object.incorrect_answers.map(ans => {
			arr.push({
				value: ans,
				isClicked: false,
				isCorrect: false,
				id: nanoid(),
			})
		})
		arr.splice(num, 0, {
			value: object.correct_answer,
			isClicked: false,
			isCorrect: true,
			id: nanoid(),
		})

		return arr
	}
	//setting up each question as object
	useEffect(() => {
		data && setTotal(data.results.length)
		data &&
			data.results.map(obj => {
				setQuizArr(prevArr => [
					...prevArr,
					{
						question: obj.question,
						correctAnswer: obj.correct_answer,
						id: nanoid(),
						answers: handleAnswerArr(obj),
					},
				])
			})
	}, [data])

	//checking answers and displaying correct answers
	const checkAnswers = () => {
		let correctArr = document.querySelectorAll('.btn-success')
		setCorrect(correctArr.length)
		setNewGame(true)
		quizArr.map(item =>
			item.answers.map(a => {
				if (a.isCorrect) {
					let option = a.value
					let allBtns = document.querySelectorAll('.btn')
					allBtns.forEach(b => {
						if (b.innerText === option) {
							b.classList.add('btn-success')
						}
					})
				}
			})
		)
	}

	//starting quiz again
	const playAgain = () => {
		setNewGame(false)
		window.location.reload()
	}

	return (
		<Container className='mainContainer'>
			{error && <Row>{error.message}</Row>}
			{isPending && (
				<Row className='loading'>
					<Col>
						<Spinner
							as='span'
							animation='grow'
							size='lg'
							role='status'
							aria-hidden='true'
							variant='primary'
							className='spinner'
						/>
					</Col>
					<Col>Loading...</Col>
				</Row>
			)}

			{quizArr &&
				quizArr.map(question => (
					<SingleQuestion key={question.id} question={question} />
				))}
			{!isPending && (
				<Row className='results'>
					<Col>
						You scored {correct}/{total} answers
					</Col>
					<Col>
						{!newGame ? (
							<Button className='btn-info' onClick={checkAnswers}>
								Check answers
							</Button>
						) : (
							<Button className='btn-info' onClick={playAgain}>
								Play again
							</Button>
						)}
					</Col>
				</Row>
			)}
			{correct === 5 && <Confetti></Confetti>}
		</Container>
	)
}
