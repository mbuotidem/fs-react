import React from 'react'

const Form = ({ addEntry, newName, newNumber, handleNameChange, handleNumberChange }) => {

    return (
        <form onSubmit={addEntry}>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )

}

export default Form