const express = require('express'); 
const path = require('path');
const ejsMate = require('ejs-mate');
const ExpressError = require('./ExpressError');

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    res.render('home', { title: 'Home'})
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Nie możemy znaleźć takiej strony!', 404))
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Ojej! Coś poszło nie tak!'
    res.status(statusCode).render('error', { err, title: 'Error'})
});

app.listen(3000, () => {
    console.log('Port 3000 - Bez tytułu')
});