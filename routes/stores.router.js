const express = require('express');
const router = express.Router();
const { Stores, Menus, Reviews } = require('../models');

// 가게 상세 페이지 조회 api
router.get('/stores/:storeId', async (req, res) => {
  try {
    const { storeId } = req.params;
    const getStore = await Stores.findOne({
      where: { storeId },
      attributes: ['storeName', 'storeAddress', 'storeUrl', 'storeRating'],
      include: [
        {
          model: Menus,
          attributes: ['menuName', 'menuImg', 'menuPrice'],
        },
        {
          model: Reviews,
          attributes: ['reviewContent', 'reviewUrl'],
        },
      ],
    });
    res.status(200).json(getStore);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errorMessage: '스토어 조회에 실패했습니다.' });
  }
});

module.exports = router;
