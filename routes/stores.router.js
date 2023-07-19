const express = require('express');
const router = express.Router();
const { Stores, Menus, Reviews } = require('../models');
// Stores에서 storeName, storeAddress, storeUrl, storeRating
// Menus에서 menuName, menuUrl
// Reviews에서 reviewContent, reviewUrl

// 가게 상세 페이지 조회 api
// 가게 이름, 가게 주소, 가게 사진, 메뉴 이름, 메뉴사진, 리뷰 조회
router.get('/stores/:storeId', async (req, res) => {
  const { storeId } = req.params;
  const getStore = await Stores.findOne({
    where: { storeId },
    attributes: ['storeName', 'storeAddress', 'storeUrl', 'storeRating'],
    include: [
      {
        models: Menus,
        attributes: ['menuName', 'menuUrl'],
      },
      {
        models: Reviews,
        attributes: ['reviewContent', 'reviewUrl'],
      },
    ],
  });
  res.status(200).json({ data: getStore });
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

module.exports = router;
