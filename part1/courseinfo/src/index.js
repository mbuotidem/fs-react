import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
      
    </div>
  )
}

// const Content = (props) => {
//   return (
//     <div>
//       <p>{props.part} {props.exercise}</p>
//     </div>
//   )
// }

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercise}</p>
    </div>
  )
}


const Content = (props) => {
  return (
    <div>
      <Part part = {props.parts[0]['name']} exercise = {props.parts[0]['exercises']}/>
      <Part part = {props.parts[1]['name']} exercise = {props.parts[1]['exercises']}/>
      <Part part = {props.parts[2]['name']} exercise = {props.parts[2]['exercises']}/>
    </div>
  )
}


const Total = (props) =>{
  console.log(props.parts)
  
  let exercises = props.parts.map(part => part.exercises)
  let total = exercises.reduce((a,b) => a + b, 0)
  

  return(
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}
const App = () => {
  // const course = 'Half Stack application development'
  // const parts = [
  //   {
  //     name: 'Fundamentals of React',
  //     exercises: 10
  //   },
  //   {
  //     name: 'Using props to pass data',
  //     exercises: 7
  //   },
  //   {
  //     name: 'State of a component',
  //     exercises: 14
  //   }
  // ]
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
}


// const Display = ({ counter }) => <div>{counter}</div>


// const Button = ({ onClick, text }) => (
//   <button onClick={onClick}>
//     {text}
//   </button>
// )

// const History = (props) => {
//   if (props.allClicks.length === 0) {
//     return (
//       <div>
//         the app is used by pressing the buttons
//       </div>
//     )
//   }

//   return (
//     <div>
//       button press history: {props.allClicks.join(' ')}
//     </div>
//   )
// }

// const App = () => {
//   const [left, setLeft] = useState(0)
//   const [right, setRight] = useState(0)
//   const [allClicks, setAll] = useState([])

//   const handleLeftClick = () => {
//     setAll(allClicks.concat('L'))
//     setLeft(left + 1)
//   }

//   const handleRightClick = () => {
//     setAll(allClicks.concat('R'))
//     setRight(right + 1)
//   }

//   return (
//     <div>
//       {left}
//       <Button onClick={handleLeftClick} text='left' />
//       <Button onClick={handleRightClick} text='right' />
//       {right}
//       <History allClicks={allClicks} />
//     </div>
//   )
// }

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)