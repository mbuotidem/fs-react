import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick} style={{ marginRight: "2px" }
    }> { props.name} </button >
  )
}

const Statistic = ({ text, value }) => {
  return (
    <>
      {text} {value} <br />
    </>
  )

}
const Statistics = ({ good, neutral, bad, all, avg, pos }) => {
  if (!good && !neutral && !bad) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <p>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={all} />
        <Statistic text="average" value={avg} />
        <Statistic text="positive" value={pos} />

      </p>
    </div>
  )

}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)
  const all = good + neutral + bad
  const avg = ((good + bad * -1) / (good + neutral + bad))
  const pos = good / (good + neutral + bad) * 100



  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" handleClick={increaseGood} />
      <Button name="neutral" handleClick={increaseNeutral} />
      <Button name="bad" handleClick={increaseBad} />
      <h1>statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad} all={all} avg={avg} pos={pos} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)