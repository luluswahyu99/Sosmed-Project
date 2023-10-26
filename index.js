const express = require('express')
const router = require('./routes')
const app = express()
const session = require('express-session')
const port = 3000
const multer = require('multer')
const path = require('path')

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

app.use('/home/', express.static(path.join(__dirname, 'images')))
app.use('/profile/:username/', express.static(path.join(__dirname, 'images')))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    sameSite: true
   }
}))
app.use(router)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})