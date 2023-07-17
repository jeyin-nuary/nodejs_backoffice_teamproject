const express = require('express');
const router = express.Router();

const { Menus } = require('../models');

// 테스트
router.post('/menus', async (req, res) => {
  const { storeId, menuName, menuUrl, menuDescription, menuPrice } = req.body;
  await Menus.create({
    storeId,
    menuName,
    menuUrl,
    menuDescription,
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
