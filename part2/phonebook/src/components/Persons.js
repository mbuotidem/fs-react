import React from 'react'


const Persons = ({ numbersToShow, deletePerson }) => {

    return (
        <>
            { numbersToShow.map((x, i) =>
                <div key={i}>
                    <p>{x.name} {x.number} <button onClick={() => deletePerson(x.id)}>Delete</button></p>

                </div>
            )}
        </>
    )

}
export default Persons