const express = require('express');
const app = express();
const User = require('./models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session')
mongoose.set('strictQuery', false);
// line of code for mongoose
main().catch(err => console.log(err));

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/loginDemo', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (e) {
        console.log('Error found: ', e)
    }
}

app.set('view engine', 'ejs');
app.set('views', 'views');

// this is for parsing the request body
app.use(express.urlencoded({extended: true}));
// this is for sessions
app.use(session({secret: 'notagoodsecret'}))

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login');
    } 
    next();
}
app.get('/', (req, res) => {
    res.send('Home')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
    const {password, username} = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({ username, password });
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/')
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login',  async (req, res) => {
    const { username, password} = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if  (foundUser) {
        req.session.user_id = foundUser._id;
        res.redirect('/secret')
    } else {
        res.redirect('/login')
    }
})

app.post('/logout', (req, res) => {
    req.session.user_id = null;
    // req.session.destroy();
    res.redirect('/login');
})

app.get('/secret',requireLogin, (req, res) => {
    // return would help in order for res.render and res.redirect
    // to happen at the same time
    // if (!req.session.user_id) {
    //     return res.redirect('/login');
    // }
    res.render('secret');
})

app.get('/topsecret', requireLogin, (req, res) => {
    res.send('TOP SECRET')
})

app.listen(8080, (req, res) => {
    console.log(`serving port ${8080}`)
})

// This course will help me in terms of designing and improving my visual creativity in terms of implementing that particular design in certain applications. Whether it would be on a website, application, and many more. This would help me realize the importance of balance, and design. I am previously a 3d artist and using that knowledge would help me increase the skill and fundamental knowledge that I have in terms of creating and designing a functioning product. Another fact would be the quality of the course that would help me realize the importance of having the foundations before implementing a certain design, asking questions about what, how, where, when, and who are these designs implemented for and what's the logic for these designs. And lastly, I would like to implement my learnings here in creating the ui and ux of websites that I will make in the near future. Thank you.
// I am a part-time student that wants to learn more about design. Currently wanting to learn this path so that I can learn things on my own. I am not financially supported and I am living on my own and that would be the main reason why I've applied for this aid. I am currently self-studying web development and I found that this is good material and it has the accreditation needed for the design. This will give me the knowledge that I need in designing websites, and applications and improve my eye for balance. Lastly, I wanted this financial aid so that I can have the confidence to study and learn once it gets approved, without worrying about the expenses that just might induce pressure that will result in me being stagnant and cannot retain knowledge as it is. I hope that this financial aid will be accepted so that I can pursue one vital part of my career.