const express = require('express'); 
const path = require('path');
const ejsMate = require('ejs-mate');
const ExpressError = require('./ExpressError');
const nodemailer = require('nodemailer');
const multer = require('multer');
const flash = require('connect-flash');
require('dotenv').config();
const monthNames = ['stycznia', 'lutego', 'marca','kwietnia', 'maja', 'czerwca', 'lipca','sierpnia', 'września', 'października','listopada', 'grudnia']; 

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASSWORD
//     }
//   });

const app = express();
const upload = multer({ dest: 'uploads/' });

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    res.render('home', { title: 'Alpha Tech - Gorzów Wielkopolski'})
});

app.post('/',
upload.single('fileToUpload'), 
async (req, res) => {
    const data = new Date();
    //show a message if the mail has been sent or notconst data = new Date();
    const day = data.getDate();
    const month = monthNames[data.getMonth()];
    const year = data.getFullYear();
    const hour = data.getHours();
    const minute = data.getMinutes();


    try {
        // Render the EJS template with data
        const { klient, msg, numer, mail } = req.body;

        // Create the transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const pelnaData = `wysłana ${day} ${month} ${year} o ${hour}:${minute}`;
        const mailSubject = `Nowa wiadomość ${klient} ${pelnaData}!`;

        const mailFrom = "Nowa wiadomość [Alpha Tech] <alpha.tech.firma@gmail.com>";
        const mailTo = "panzar@wp.pl";

        const mailText = `Nowa wiadomość wysłana przez stronę alphatech.com.pl; Data: ${day} ${month} ${year} o ${hour}:${minute}. Nadawca: ${klient}. Wiadomość: ${msg}. Numer do nadawcy: ${numer}; Adres email nadawcy: ${mail}`;
        let mailHtml = `
        <p style="font-size: 18px;><b>Nowa wiadomość wysłana przez stronę alphatech.com.pl!</b></p>
        <br>
        <p style="font-weight: lighter;">Wysłano przez ${klient} Kiedy: ${day} ${month} ${year} o ${hour}:${minute}.</p>
        <br>
        <p>"${msg}"</p>
        <br>
        <p><strong>Kontakt do nadawcy:</strong></p>
        <p>Numer telefonu: <i>${numer}</i></p>
        <p>Adres email: <i>${mail}</i></p>`;


            

            // Email data
        const mailOptions = {
            from: mailFrom,
            to: mailTo,
            subject: mailSubject,
            text: mailText,
            html: mailHtml
      };
  
      // Attach the file if it exists
      if (req.file) {
        mailOptions.attachments = [
          {
            filename: req.file.originalname,
            path: req.file.path
          }
        ];
      }
  
      // Send the email
      const info = await transporter.sendMail(mailOptions);
        

        console.log(info.messageId); // Random ID generated after successful send (optional)

        // Send a response to the client indicating success
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while sending the email');
    }
});
// app.get('/sendMessage', async (req, res) => {
//     res.redirect(`/`)
// });

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Ojej! Coś poszło nie tak!'
    res.status(statusCode).render('error', { err, title: 'Error'})
});


app.all('*', (req, res, next) => {
    next(new ExpressError('Nie możemy znaleźć takiej strony!', 404))
});

app.listen(3000, () => {
    console.log('Port 3000 - Alpha Tech')
});