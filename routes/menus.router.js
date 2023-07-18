const express = require('express');
const router = express.Router();

const { Menus } = require('../models');

// 테스트
router.post('/menus', async (req, res) => {
  const { menuName, menuUrl, menuInfo, menuPrice } = req.body;
  await Menus.create({
    storeId: 1,
    menuName,
    menuUrl,
    menuInfo,
    menuPrice,
  });
  res.json({ message: 'create' });
});

// 테스트
router.get('/menus', async (req, res) => {
  const menus = await Menus.findAll({});
  res.json({ data: menus });
});

module.exports = router;
