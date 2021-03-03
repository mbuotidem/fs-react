import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import personsService from './services/persons'
import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [notificationClass, setNotificationClass] = useState('success')


  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
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
            createSuccessMessage(returnedPerson.name, "success", "update")
          })
          .catch(error => {
            createSuccessMessage(false, "error", "update")
            setPersons(persons.filter(p => p.id !== entryExists.id))
          })

      }
    }
    else {
      personsService
        .create(newEntry)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          createSuccessMessage(returnedPerson.name, "success")

        })
        .catch(error => {
          createSuccessMessage(false, "error", "create")
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
          createSuccessMessage(entry.name, "deleted")
        })
        .catch(error => {
          createSuccessMessage(entry.name, "error", "delete")
        })
    }
  }

  const createSuccessMessage = (person, status, command) => {
    if (status === "success") {
      setNotificationClass("success")

      if (command === "update") {
        setSuccessMessage(`Updated ${person}`)
      }
      else {
        setSuccessMessage(`Added ${person}`)
      }
    }
    else if (status === "error") {
      setNotificationClass("error")

      if (command === "update") {
        setSuccessMessage('There was an issue updating your phonebook entry')
      }
      if (command === "delete") {
        setSuccessMessage(`Information of ${person} has already been removed fom server"`)
      }
      if (command === "create") {
        setSuccessMessage("There was an issue creating your phonebook entry")

      }

    }
    else if (status === "deleted") {
      setNotificationClass("success")
      setSuccessMessage(`${person} was removed from server`)
    }

    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)

  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={successMessage} notificationClass={notificationClass} />

      <Filter filter={filter} handleFilter={handleFilter} />

      <h3>Add a new Entry</h3>

      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>

      <Persons numbersToShow={numbersToShow} deletePerson={deletePerson} />
    </div>

  )
}

export default App