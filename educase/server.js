const express=require('express');
const bodyParser=require('body-parser');
const school_routes=require('./routes/schools');

const app=express();
const port=process.env.PORT||3000;
app.use(bodyParser.json());
app.use('/',school_routes);
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});
