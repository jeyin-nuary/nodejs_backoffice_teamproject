const express = require('express');
const router = express.Router();

module.exports = router;
const express = require('express');
const router = express.Router();
const { Orders, Menus } = require('../models');

// (사장) 주문 상세 페이지 주문 목록 조회 API
router.get('/stores/:storeId/orders', async (req, res) => {
  const { storeId } = req.params;
  const getStore = await Orders.findOne({
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
});

module.exports = router;
