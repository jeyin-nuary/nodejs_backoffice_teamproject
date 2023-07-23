const express = require('express');
const router = express.Router();

const {Users} = require("../models");

router.post('/users', async (req, res) => {
    const { email, password, nickname, userAddress } = req.body;
    await Users.create({
        email, password, nickname, userAddress
    });
    res.json({ message: 'create' });
  });


router.get('/users', async (req, res) => {
    const menus = await Menus.findAll({});
    res.json({ data: menus });
  });
  
  router.get('/users/:userId', async(req,res)=> {
    const {userId} = req.params;
  
    if(!userId){
      return res.status(404).json({ "message": "입력을 다시 해주세요" });
    }
    
    const userfind = await userId.findOne({where: userId});
    if(Object.keys(userfind).length === 0){
      return res.status(404).json({ "message": "로그인 해주세요" });
    }
    res.json({data: searchmenu})
  })

module.exports = router;
