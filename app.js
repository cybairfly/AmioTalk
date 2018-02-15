// const api = require('./~callback/api');
const api = require('./~promise/api');
// const api = require('./api');
const msg = require('./msg');

const express = require('express');
const parser = require('body-parser');
const app = express();

app.use(parser.json());

require('dotenv').config();

app.post('/webhook/amio', (req, res) => {

  console.log(`post webhook called`);
  let channel = req.body.data.channel.id;
  let contact = req.body.data.contact.id;
  let message = req.body.data.content.payload;

  api.getContact(channel, contact)
  .then(contact => api.getFullName(contact))
  .then(name => {
    let message = msg.Message(channel, contact);
    message.payload = `${name}: ${message}`;
    return message;
  })
  .then(message => api.postMessages(channel, message))
  .catch(e => console.log(e));
  // let channel = req.body.data.channel.id;
  // let message = `${getFullName}: ${req.body.data.content.payload}`;
  // postMessages(channel, message);
  // let body = req.body;
  //
  //     if (webhook_event.message) {
  //       api.handleMessage(sender_psid, webhook_event.message);
  //     } else if (webhook_event.postback) {
  //       api.handlePostback(sender_psid, webhook_event.postback);
  //     }
  //
  //   // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  // } else {
  //   // Returns a '404 Not Found' if event is not from a page subscription
  //   res.sendStatus(404);
  // }

});

app.get('/', (req, res) => {
      res.status(200).send('Up and down and... running.');
});

                                                                  //Multisender
/*
let counter = 0;

function tick() {
  if (counter < 10) {
    api.postMessage(contact, message)
    .then(data => {
        console.log(counter);
        console.log(data.data);
        setTimeout(tick, 1000);
        counter++;
    })
    .catch((e) => console.log(e));
  }
}

tick();
*/

const port = process.env.PORT || 80;
app.listen(port);
