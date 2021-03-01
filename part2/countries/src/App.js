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
  const api_key = process.env.REACT_APP_API_KEY
  const [country, setCountry] = useState([])
  const [filter, setFilter] = useState('')
  const [temp, setTemp] = useState(
    {
      temperature: "",
      weather_icons: ["./logo.svg"],
      wind_dir: "",
      wind_speed: ""
    })


  const hook = () => {
    //console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        //console.log('promise fulfilled')

        setCountry(response.data)
      })
  }

  useEffect(hook, [])

  const countriesToShow = filter.length > 0 ? country.filter(x => x.name.toLowerCase().includes(filter.toLowerCase())) : []

  const hideDiv = (e) => {
    const capital = e.target.nextElementSibling.childNodes[1].innerText.split(" ")[1]

    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then(response => {
        console.log('promise fulfilled')
        setTemp(response.data.current)
        const status = e.target.nextElementSibling.style.display;
        status === "none" ? e.target.nextElementSibling.style.display = "block" : e.target.nextElementSibling.style.display = "none"
      })

    // let p = document.createElement("p")
    // p.append(temp)
    // console.log("this is temp", temp)
    // e.target.nextElementSibling.append(p)


  }

  let result;

  if (countriesToShow.length > 10) {
    result = ["Too many matches, specify another filter"]
  }
  // else if (countriesToShow.length === 1) {
  //   result = [""]
  // }


  else if (countriesToShow.length < 10) {
    //console.log(countriesToShow)
    // countriesToShow.forEach(element => {

    //   element.temperature =
    //     axios
    //       .get(`http://api.weatherstack.com/current?access_key=0375463369f2c62497132eddfedde3d7&query=${element.capital}`)
    //       .then(response => {
    //         console.log('promise fulfilled')
    //         console.log(response.data.current.temperature)
    //         setTemp(response.data.current.temperature)
    //       })


    // });
    result = countriesToShow.map((country) =>
      <div key={country.numericCode}>
        <div>
          <p>{country.name}</p>
          <button onClick={hideDiv} style={{ marginLeft: "2px" }}>show</button>
          <div style={{ display: "none" }}>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>Spoken languages</h3>
            {country.languages.map((language) =>
              <div key={language.name} >
                <li>{language.name}</li>
                <br />

              </div>)}
            <img alt="country flag" style={{ height: "100px" }} src={country.flag} />
            <div>
              <h3>Weather in {country.capital}</h3>
              <p><strong>temperature: </strong>{temp.temperature} Celsuis</p>
              <img alt="weather icon" src={temp.weather_icons[0]} />
              <p><strong>wind: </strong>{temp.wind_speed} mph direction {temp.wind_dir}</p>
            </div>
          </div>
        </div>
      </div >)
  }



  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <>
      <Filter filter={filter} handleFilter={handleFilter} />
      <div>{filter ? result : ""}</div>
      {/* <div>{filter ? result : ""}</div>
      {countriesToShow.length === 1 ?
        <div>
          <h1>{countriesToShow[0].name}</h1>
          <p>
            capital {countriesToShow[0].capital} <br />
            population {countriesToShow[0].population} <br />
          </p>

          <h3>languages</h3>
          {countriesToShow.languages.map((language) =>
            <>
              <li key={language.name}>{language.name}</li>
              <br />
              <img alt="country flag" style={{ height: "100px" }} src={countriesToShow.flag} />
            </>

          )}


        </div>
        : ""} */}
    </>

  );
}

export default App;



  // <p>{
  //   axios
  //     .get(`http://api.weatherstack.com/current?access_key=0375463369f2c62497132eddfedde3d7&query=${country.capital}`)
  //     .then(response => {
  //       console.log('promise fulfilled')
  //       return response.data.current.temperature
  //     })}
  // </p>