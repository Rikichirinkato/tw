const express = require('express');
const twit = require('twit');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const t = new twit({
    consumer_key: 'S53SmoU3HvtuY4LyTqoyVkGBz', 
    consumer_secret: 'TDMBgJtoweT5tAi6oRwFIhsuGFVZyJ3QE2l0EYKvdDDHY6j8Mi', 
    app_only_auth: true  
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join('/index.css')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/timeline?:id', (req, res) => {
    t.get('statuses/user_timeline', {
        user_id: req.query.id
    }, (err, tweets, response) => {
        if(err) {
            console.error(err)
        }
        res.send(tweets)
    })
})

app.listen(8080, () => {
    console.log('server running')
})