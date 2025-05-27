const express=require('express');
const router=express.Router();
const db=require('../database/db');

const get_distance=require('../utils/distance');
const { error } = require('console');

router.post('/add_school',(req,res)=>{
    const {name,address,latitude,longitude}=req.body;
    if(!name||!address || isNaN(latitude) || isNaN(longitude))
    {
        return res.status(400).json({message:'Invalid input data'});
    }
    const sql='INSERT INTO schools(name,address,latitude,longitude) VALUES (?,?,?,?)';
    db.query(sql,[name,address,latitude,longitude],(err,result)=>{
        if(err) return res.status(500).json({message:'DB ERROR',error:err});
        res.json({message:'School added successfully',school_id:result.insertId});
    });
});

router.get('/list_schools',(req,res)=>{
    const user_latitude=parseFloat(req.query.latitude);
    const user_longitude=parseFloat(req.query.longitude);
    if(isNaN(user_latitude)||isNaN(user_longitude))
    {
        return res.status(400).json({message:'Invalid coordinates'});
    }
    db.query('SELECT * from schools',(err,results)=>{
        if(err) return res.status(500).json({message:'DB Error',error:err});
        const schools_with_distance=results.map(school=>({
            ...school,
            distance:get_distance(user_latitude,user_longitude,school.latitude,school.longitude)
        }));
        schools_with_distance.sort((a,b)=>a.distance-b.distance);
        res.json(schools_with_distance);
    });
});
module.exports=router;