import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addEntry = (event) => {
    event.preventDefault()
    const name = { name: newName }
    console.log(persons.indexOf(newName))

    if (persons.find(x => x.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(name))
    }

  };

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addEntry}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((x) => <p key={x.name}>{x.name}</p>)}
    </div>
  )
}

export default App