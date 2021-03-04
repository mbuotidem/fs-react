const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(cors())

app.use(express.json())

app.use(morgan('tiny'))

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :response-time ms :body'));

let persons = [

    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }

]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><br />
    ${Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)

    } else {
        response.status(404).end()
    }

})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    persons = persons.filter(p => p.id != id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {

    body = request.body
    if (!body.name && !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const id = Math.floor(Math.random() * 1e6)
    const person = { name: body.name, number: body.number, id: id }

    const alreadyExists = persons.find(p => p.name === person.name)

    if (alreadyExists) {
        return response.status(400).json({
            error: 'name must be unique'

        })
    }

    persons = persons.concat(person)

    response.json(person)

})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

