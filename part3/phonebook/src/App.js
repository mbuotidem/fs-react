import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
//import axios from 'axios'
import personsService from './services/persons'
import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  const hook = () => {
    personsService.getAll().then(
      response => {
        setPersons(response)
      }
    )
  }
  useEffect(hook, [])

  const numbersToShow = filter ? persons.filter(x => x.name.toLowerCase().includes(filter.toLowerCase())) : persons

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  const addPerson = (event) => {
    event.preventDefault()
    const newEntry = { name: newName, number: newNumber }
    const entryExists = persons.find(x => x.name === newName)

    if (entryExists) {
      if (window.confirm(`${entryExists.name} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedEntry = { ...entryExists, number: newEntry.number }
        personsService.update(entryExists.id, updatedEntry)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== entryExists.id ? person : returnedPerson))
            createNotification(`Updated ${returnedPerson.name}`, "success")
          })
          .catch(error => {
            createNotification(`${error.response.data.error}`, "error")
            //setPersons(persons.filter(p => p.id !== entryExists.id))
          })

      }
    }
    else {
      personsService
        .create(newEntry)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          createNotification(`Updated ${returnedPerson.name}`, "success")


        })
        .catch(error => {
          createNotification(`${error.response.data.error}`, "error")
        })
    }
    setNewName('')
    setNewNumber('')

  };

  const deletePerson = (id) => {
    const entry = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${entry.name}?`)) {
      personsService
        .deleteEntry(id)
        .then(result => {
          setPersons(persons.filter(p => p.id !== id))
          createNotification(`${entry.name} deleted`, "success")

        })
        .catch(error => {
          createNotification(`There was an error deleting ${entry.name}`, "error")

        })
    }
  }


  const createNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)

  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification} />

      <Filter filter={filter} handleFilter={handleFilter} />

      <h3>Add a new Entry</h3>

      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>

      <Persons numbersToShow={numbersToShow} deletePerson={deletePerson} />
    </div>

  )
}

export default App