const express = require('express'); 
const path = require('path');
const ejsMate = require('ejs-mate');
const ExpressError = require('./ExpressError');
const nodemailer = require('nodemailer');
require('dotenv').config();
const monthNames = ['stycznia', 'lutego', 'marca','kwietnia', 'maja', 'czerwca', 'lipca','sierpnia', 'września', 'października','listopada', 'grudnia']; 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    res.render('home', { title: 'Alpha Tech - Gorzów Wielkopolski'})
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Nie możemy znaleźć takiej strony!', 404))
});


app.post('/sendMessage', async (req, res) => {

    //show a message if the mail has been sent or notconst data = new Date();
    const day = data.getDate();
    const month = monthNames[data.getMonth()];
    const year = data.getFullYear();
    const hour = data.getHours();
    const minute = data.getMinutes();
    const pelnaData = `${day}, ${month} ${year} o ${hour}:${minute}`;
    const mail = req.body.mail;
    if (!mail.klient) {
        const klient = "";
    } else {
        const klient = `od ${mail.klient}`;
    }
    const mailTitle = `Nowa wiadomość ${klient} wysłana ${pelnaData}!`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'kontakt@alphatech.com.pl',
        subject: mailTitle,
        text: 'Check out these attachments!',
        html: `<h1>${mailTitle}</h1>
        <p></p>`,
        attachments: [
          {
            filename: 'document.pdf',
            path: '/path/to/document.pdf',
          }
        ],
      };

    main().catch(console.error);
    res.render('/', { pelnaData, title: 'Alpha Tech - Gorzów Wielkopolski'})
});

// app.get('/sendMessage', async (req, res) => {
//     res.redirect(`/`)
// });

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Ojej! Coś poszło nie tak!'
    res.status(statusCode).render('error', { err, title: 'Error'})
});

app.listen(3000, () => {
    console.log('Port 3000 - Alpha Tech')
});