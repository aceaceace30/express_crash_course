const express = require('express')
const path = require('path')
const handlebars = require('express-handlebars')
const logger = require('./middleware/logger')
const userRoutes = require('./routes/api/users')
const users = require('./Members')

const app = express()

app.engine('handlebars', handlebars({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => res.render('index', {
    title: 'User App',
    users
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/users', userRoutes)

// sample middleware
// app.use(logger)

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

// set static folder
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}.`))