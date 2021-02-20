import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])

  const incrementVote = () => {
    const copy = [...points]

    copy[selected] += 1

    setPoints(copy)

  }

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const pickRandom = () => {
    let newIndex = selected
    while (newIndex == selected) {
      newIndex = getRandomInt(6)

    }
    setSelected(newIndex)

  }

  let mostVotes = points.indexOf(Math.max(...points))


  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        {props.anecdotes[selected]} <br />
        has {points[selected]} votes
      </div>
      <button onClick={incrementVote} style={{ margin: "4px" }}>vote</button>
      <button onClick={pickRandom}>next anecdote</button>
      <div>
        <h1>Anecdote with the most votes</h1>
        {props.anecdotes[mostVotes]}


      </div>

    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)