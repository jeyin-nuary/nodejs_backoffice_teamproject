const express = require('express');
const router = express.Router();

const { Menus } = require('../models');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// 테스트
router.post('/menus', async (req, res) => {
  const { storeId, menuName, menuUrl, menuDescription, menuPrice } = req.body;
  await Menus.create({
    storeId,
    menuName,
    menuUrl,
    menuInfo : menuDescription,
    menuPrice,
  });
  res.json({ message: 'create' });
});

// 테스트
router.get('/menus', async (req, res) => {
  const menus = await Menus.findAll({});
  res.json({ data: menus });
});

router.get('/menus/:search', async(req,res)=> {
  const {search} = req.params;

  if(!search){
    return res.status(404).json({ "message": "입력을 다시 해주세요" });
  }
  
  const searchmenu = await Menus.findAll({where: {
          menuName: {
            [Op.like]: `%${search}%`
          }
        }
      }
    );
  if(Object.keys(searchmenu).length === 0){
    return res.status(404).json({ "message": "해당 검색어를 포함한 메뉴가 존재하지 않습니다." });
  }
  res.json({data: searchmenu})
})

module.exports = router;
