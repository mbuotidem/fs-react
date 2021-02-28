import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const numbersToShow = filter ? persons.filter(x => x.name.toLowerCase().includes(filter.toLowerCase())) : persons

  const addEntry = (event) => {
    event.preventDefault()
    const newEntry = { name: newName, number: newNumber }

    if (persons.find(x => x.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(newEntry))
    }

  };


  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }


  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilter={handleFilter} />

      <h3>Add a new Entry</h3>


      <PersonForm addEntry={addEntry} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />


      <h2>Numbers</h2>
      {/* {numbersToShow.map((x) => <p key={x.name}>{x.name} {x.number}</p>)} */}
      <Persons numbersToShow={numbersToShow} />
    </div>

  )
}

export default App