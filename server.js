const express = require('express');
const mongoose = require('mongoose')

const Address = require('./model/model');

const bodyParser = require('body-parser');

//Initialize express app
const app = express();

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

//Initialize the server
app.listen(3000, () => {
    console.log('server listening on port: 3000');
});

//Connecting to DB
mongoose.connect('mongodb+srv://ancp:ancp123@cluster0.vthun.mongodb.net/<dbname>?retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log('Connected to db');
}).catch((error) => {
    console.log('error');
})


//Adding a user to AddressBook

app.post('/', (req, res) => {
    name = req.body.name,
    email = req.body.email,
    phone = req.body.phone,
    place = req.body.place

    let newAddress = new Address({
        name: name,
        email: email,
        phone: phone,
        place: place
    })

    mewAddress.save().then((address) => {
        res.send(address)
    }).catch((error) => {
        console.log(error);
    })

});

//Reading a User from AddressBook

app.get('/:id', (req, res) => {
    Address.findById(req.params.id, (err, user) => {
        res.send(user)
    })
})

//Updating the User

app.post('/update/:id', (req, res) => {
    let address = {};
    if(req.body.name) address.name = req.body.name
    if(req.body.email) address.name = req.body.email
    if(req.body.phone) address.name = req.body.phone
    if(req.body.place) address.name = req.body.place

    address = {$set: address };

    Address.update({_id: req.params.id}, address).then(() =>{
        res.send(address);
    }).catch((err) => {
        console.log(error);
    })
})

//Deleting the user from AddressBook

app.delete('/delete/:id', (req, res) => {
    Address.remove({_id:req.params.id}).then(() => {
     res.send('user deleted')
    }).catch((err) => {
     console.log(error)
    })
   })