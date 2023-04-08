const config = require('./core/config');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get('/ping', (req, res) => {
    res.send('pong!');
});

app.use((req, res) => {
    res.status(404).json({
        error: {
            message: 'NotFound',
            status: 404,
        }
    });
});

app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    
    //TODO: handle custom error
    res.status(err.status || 500);
    res.send('Internal Server Error');
});

const initApplication = () => app.listen(config.server.port, config.server.ip, () => {
    console.log('Listening on', `http://${config.server.ip}:${config.server.port}`);
  }).on('error', (error) => {
    console.log('Error happened:', error);
});

initApplication();