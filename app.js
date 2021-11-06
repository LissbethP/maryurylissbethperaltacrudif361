import './loadEnv.js'
import express from 'express'
import router from './routes/routes.js'
import session from "express-session"
import cookieParser from "cookie-parser"

const PORT = 8000
const app = express()
const oneDay = 24 * 60 * 60 * 1000
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: oneDay }
}))
app.use(cookieParser())
app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

app.use('/', router)
