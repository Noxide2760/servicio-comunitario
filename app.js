const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();


//Routes
const adminRouter = require('./src/routes/AdminRoute');



app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.use('/api', adminRouter);







app.listen(3000, () => console.log("listening on port 3000"));