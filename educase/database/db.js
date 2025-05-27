const mysql=require('mysql2');

const connection=mysql.createConnection({
    host:'sql12.freesqldatabase.com',
    user:'sql12781456',
    password:'UsXRgwjwTh',
    database:'sql12781456'
});

connection.connect(err=>{
    if(err) throw err;
    console.log("connected to mysql");
});

module.exports=connection;
