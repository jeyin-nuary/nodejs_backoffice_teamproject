const express = require('express');
const router = express.Router();
const { Stores } = require('../models');
const { Sequelize } = require('sequelize');
// 가게 목록 페이지 (API 명세없음)
router.get('/storelists', async (req, res) => {
  try {
    const storeList = await Stores.findAll({
      attributes: [
        'storeId',
        'storeName',
        'storeAddress',
        'storeUrl',
        'storeRating',
        'createdAt',
        'updatedAt',
        [Sequelize.fn('COUNT', Sequelize.col('Stores.storeRating')), 'starRating'],
      ],
      order: [['createdAt', 'DESC']],
      group: ['Stores.storeId'],
    });
    if (!storeList)
      return res.status(400).json({ errorMessage: '가게 목록을 불러오지 못했습니다.' });
    return res.status(200).json({ data: storeList });
  } catch (err) {
    console.log(err.message);
  }
});
module.exports = router;
