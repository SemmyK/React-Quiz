import React from 'react'
//components
import { Container, Row, Col, Button } from 'react-bootstrap'

export default function SingleQuestion({ question }) {
	//showing clicked options and disabling all others
	const handleClick = (e, answer) => {
		if (answer.isCorrect) {
			e.target.classList.remove('btn-primary')
			e.target.classList.add('btn-success')
		} else {
			e.target.classList.remove('btn-primary')
			e.target.classList.add('btn-danger')
		}
		let elem = e.target.parentNode.parentNode
		let btns = elem.querySelectorAll('.btn-primary')
		btns.forEach(item => (item.disabled = true))
	}

	return (
		<Container className='question-box'>
			<Row className='question'>
				{question.question
					.replaceAll('&quot;', '"')
					.replaceAll('&#039;', "'")
					.replaceAll('&uuml;', 'ü')
					.replaceAll('&rsquo;', '’')
					.replaceAll('&amp;', '&')}
			</Row>
			<Row className='answer-box'>
				{question &&
					question.answers.map(answer => (
						<Col key={answer.id} className='answer'>
							<Button
								className='buttons'
								onClick={e => {
									handleClick(e, answer)
								}}>
								{answer.value
									.replaceAll('&quot;', '"')
									.replaceAll('&#039;', "'")
									.replaceAll('&uuml;', 'ü')
									.replaceAll('&rsquo;', '’')
									.replaceAll('&amp;', '&')}
							</Button>
						</Col>
					))}
			</Row>
		</Container>
	)
}
