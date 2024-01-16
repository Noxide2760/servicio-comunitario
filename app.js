const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();


//Routes
const adminRouter = require('./src/routes/AdminRoute');
const studentRouter = require('./src/routes/StudentRoute');
const housingRouter = require('./src/routes/HousingRoute');


app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.use('/api', adminRouter);
app.use('/api', studentRouter);
app.use('/api', housingRouter);


app.listen(3000, () => console.log("listening on port 3000"));