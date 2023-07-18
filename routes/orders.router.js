const express = require('express');
const router = express.Router();

const { Orders } = require('../models/');

// 테스트
router.post('/orders', async (req, res) => {
  const { storeId, userId } = req.body;
  await Orders.create({
    storeId,
    userId,
  });
  res.json({ messasge: 'create' });
});

module.exports = router;
