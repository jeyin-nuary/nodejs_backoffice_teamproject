const express = require('express');
const router = express.Router();
const { Stores, Menus, Reviews, Users } = require('../models');

// 가게 상세 페이지 조회 api
router.get('/stores/:storeId', async (req, res) => {
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
});

// 스토어 등록 test
router.post('/stores', async (req, res) => {
  const store = await Stores.create({
    userId: 1,
    storeName: 'BHC강남점',
    storeAddress: '강남',
    storeUrl: 'img.jpg',
    storeRating: 10,
  });
  res.json({ data: store });
});

// user 등록 test
router.post('/users', async (req, res) => {
  const user = await Users.create({
    userId: 1,
    email: 'test1@naver.com',
    password: '1111',
    role: 1,
    nickname: 'testNickname',
    userPoints: 1000000,
    userAddress: '경기도 길바닥',
  });
  res.json({ data: user });
});

module.exports = router;
