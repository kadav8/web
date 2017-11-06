import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors';
import router from './endpoints'

let app = express();
let port = 3000;

app.use(cors())
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, console.log('Example app listening on port ' + port));

app.get('/', (req, res) =>
    res.send('Dummy backend service')
);

app.use('/api', router);
