import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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