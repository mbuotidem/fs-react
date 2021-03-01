import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = ({ filter, handleFilter }) => {

  return (
    <>
      find countries: <input value={filter} onChange={handleFilter} />
    </>
  )
}



function App() {
  const [country, setCountry] = useState([])
  const [filter, setFilter] = useState('')


  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')

        setCountry(response.data)
      })
  }

  useEffect(hook, [])

  const countriesToShow = filter.length > 0 ? country.filter(x => x.name.toLowerCase().includes(filter.toLowerCase())) : []

  let result;

  if (countriesToShow.length > 10) {
    result = ["Too many matches, specify another filter"]
  }
  else if (countriesToShow.length === 1) {
    result = [""]
  }
  else if (countriesToShow.length < 10) {
    result = countriesToShow.map((country) => <p key={country.numericCode}>{country.name}</p>)
  }


  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <>
      <Filter filter={filter} handleFilter={handleFilter} />
      <div>{filter ? result : ""}</div>
      {countriesToShow.length === 1 ?
        <div>
          <h1>{countriesToShow[0].name}</h1>
          <p>
            capital {countriesToShow[0].capital} <br />
            population {countriesToShow[0].population} <br />
          </p>

          <h3>languages</h3>
          {countriesToShow[0].languages.map((language) => <li key={language.name}>{language.name}</li>)}<br />
          <img alt="country flag" style={{ height: "100px" }} src={countriesToShow[0].flag} />

        </div>
        : ""}
    </>

  );
}

export default App;
