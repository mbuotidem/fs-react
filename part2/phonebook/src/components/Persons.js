import React from 'react'


const Persons = ({ numbersToShow }) => {

    return (
        <>
            { numbersToShow.map((x) => <p key={x.name}>{x.name} {x.number}</p>)}
        </>
    )

}
export default Persons