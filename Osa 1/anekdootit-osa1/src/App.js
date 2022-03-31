import { useState } from 'react'

const Header = (props) => (
  <h1>{props.text}</h1>
)

const Anecdote = (props) => (
  <div>
    <p>{props.anecdote}</p>
    <p>Has {props.votes} votes</p>
  </div>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const [points, setPoints] = useState([0,0,0,0,0,0,0])
  const [selected, setSelected] = useState(0)
  const [mostVotedAnecdote, setMostVotedAnecdote] = useState(0)
  const [mostVoteAmount, setMostVoteAmount] = useState(0)

  const nextAnecdote = () => {
    let randomNumber = Math.floor((Math.random() * 7) + 0)
    setSelected(randomNumber)
  }

  const voteAnecdote = () => {
    let copy = points.slice()
    let nextValue = copy[selected] + 1
    let stop = selected + 1
    let value = selected
    copy.fill(nextValue, value, stop)
    setPoints(copy)
    mostVotes(copy)
  }

  const mostVotes = (copy) => {
    let mostPoints = Math.max(...copy)
    let index = copy.indexOf(mostPoints)
    setMostVotedAnecdote(index)
    setMostVoteAmount(mostPoints)
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />
      <Button handleClick={voteAnecdote} text="Vote" />
      <Button handleClick={nextAnecdote} text="Next anecdote" />
      <Header text="Anecdote with the most votes" />
      <Anecdote anecdote={anecdotes[mostVotedAnecdote]} votes={mostVoteAmount} />
    </div>
  )
}

export default App