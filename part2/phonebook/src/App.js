import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import personsService from './services/persons'


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

    const entryExists = persons.find(x => x.name === newName)

    if (entryExists) {
      //alert(`${newName} is already added to phonebook`)

      if (window.confirm(`${entryExists.name} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedEntry = { ...entryExists, number: newEntry.number }
        personsService.update(entryExists.id, updatedEntry)
          .then(returnedEntry => {
            setPersons(persons.map(person => person.id !== entryExists.id ? person : returnedEntry))
          })
          .catch(error => {
            alert(
              'There was an issue updating your phonebook entry'
            )
            setPersons(persons.filter(p => p.id !== entryExists.id))
          })

      }
    }
    else {
      setPersons(persons.concat(newEntry))

      personsService
        .create(newEntry)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })

      // axios.post(baseUrl, newEntry)
      //   .then(response =>
      //     console.log(response.data)

      //   )

    }
    setNewName('')
    setNewNumber('')

  };

  const deletePerson = (id) => {
    console.log(id)
    const entry = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${entry.name}?`)) {
      personsService
        .deleteEntry(id)
        .then(result => {
          console.log(result)
          setPersons(persons.filter(p => p.id !== id))
        })

    }



  }

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
      <Persons numbersToShow={numbersToShow} deletePerson={deletePerson} />
    </div>

  )
}

export default App