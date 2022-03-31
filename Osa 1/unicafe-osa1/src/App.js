import { useState } from 'react'

const Header = (props) => (<h1>{props.text}</h1>)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
        <StatisticLine text="Good" value={props.good} />
        <StatisticLine text="Neutral" value={props.neutral} />
        <StatisticLine text="Bad" value={props.bad} />
        <StatisticLine text="All" value={props.all} />
        <StatisticLine text="Average" value={props.average} />
        <StatisticLine text="Positive" value={props.positive} text2="%" />
    </table>
  )
}

const StatisticLine = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value} {props.text2}</td>
      </tr>
    </tbody>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
 
  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAverage(average + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    setAverage(average + 0)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAverage(average - 1)
  }
  let fixedAverage = 0
  if (all !== 0) {
    fixedAverage = average / all
  }
  let positive = 0
  if (all !== 0) {
    positive = (good / all) * 100
  }

  return (
    <div>
      <Header text="Give feedback" />
      <Button handleClick={handleGoodClick} text="Good" />
      <Button handleClick={handleNeutralClick} text="Neutral" />
      <Button handleClick={handleBadClick} text="Bad" />
      <Header text="Statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={fixedAverage} positive={positive} />
    </div>
  )
}

export default App