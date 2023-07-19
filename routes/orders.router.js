const express = require('express');
const router = express.Router();

const { Menus, Orders } = require('../models');

// (사장) 주문 상세 페이지 주문 목록 조회 API
// 메뉴사진, 메뉴이름, 유저주소, 배달요청사항, 메뉴가격
router.get('/stores/:storeId/orders', async (req, res) => {
  const { storeId } = req.params;

  const getorder = await Orders.findAll({
    where: { storeId },
    include: [
      {
        model: Menus,
        attributes: ['menuName', 'menuImg', 'menuPrice'],
      },
    ],
  });
  res.status(200).json(getorder);
});

// // 오더 등록 테스트 api
// router.post('/orders', async (req, res) => {
//   const order = await Orders.create({
//     storeId: 1,
//     userId: 1,
//     menuId: 2,
//     deliveryReq: '문 앞에 놓아주세요',
//     userAddress: '경기도 길바닥',
//     orderQuantity: 1,
//     totalPrice: 15000,
//     orderStatus: '주문 등록',
//   });
//   res.json(order);
// });

module.exports = router;
