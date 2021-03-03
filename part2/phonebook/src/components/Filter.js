import React from 'react'


const Filter = ({ filter, handleFilter }) => {
    return (
        <>
            filter: <input value={filter} onChange={handleFilter} />
        </>
    )
}

export default Filter