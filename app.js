const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();


//Routes
const adminRouter = require('./src/routes/AdminRoute');
const studentRouter = require('./src/routes/StudentRoute');



app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.use('/api', adminRouter);
app.use('/api', studentRouter);







app.listen(3000, () => console.log("listening on port 3000"));