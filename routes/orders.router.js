const express = require('express');
const router = express.Router();

const { Orders, OrderMenus, Stores } = require('../models/');

// 테스트
router.post('/orders', async (req, res) => {
  await Orders.create({
    storeId: 1,
    userId: 1,
    deliveryReq: '문앞이요',
    userAddress: '경기도 101호',
  });
  res.json({ messasge: 'create' });
});
router.get('/orders', async (req, res) => {
  const data = await Orders.findAll({});
  res.json({ message: data });
});

// 테스트
router.post('/orders/orderMenu', async (req, res) => {
  await OrderMenus.create({
    menuId: 1,
    orderId: 1,
    orderQuantity: 1,
    totalPrice: 15000,
  });
  res.json({ messasge: 'create' });
});
router.get('/orders/orderMenu', async (req, res) => {
  try {
    const data = await OrderMenus.findAll({});

    res.json({ message: data });
  } catch (error) {
    console.log(error);
  }
});

// 상점등록 테스트
// 테스트
router.post('/stores', async (req, res) => {
  await Stores.create({
    storeId: 1,
    userId: 1,
    storeName: '상점',
    storeAddress: '길바닥',
    storeRating: 0,
  });
  res.json({ messasge: 'create' });
});
module.exports = router;
