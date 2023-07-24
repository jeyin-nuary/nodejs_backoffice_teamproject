const express = require('express');
const router = express.Router();
const { Users, Menus, Orders } = require('../models');
const { Sequelize } = require('sequelize');
const middleware = require('../middlewares/auth-middleware');

// 마이페이지
router.get('/mypage/userinfo', middleware, async (req, res) => {
  const userData = res.locals.user;

  try {
    // 1. 유저의 정보를 가져와야함
    const user = await Users.findOne({
      attributes: [
        'nickname',
        'userPoints',
        'email',
        'userAddress',
        'role',
        [Sequelize.fn('left', Sequelize.col('createdAt'), 10), '가입날짜'],
      ],
      where: { userId: userData.userId },
    });

    // 2. 유저의 주문기록 가져오기
    const orderrecord = await Orders.findAll({
      attributes: [
        'orderId',
        'menuId',
        'deliveryReq',
        'orderQuantity',
        'totalPrice',
        'orderStatus',
        [Sequelize.fn('left', Sequelize.col('Orders.createdAt'), 10), 'date'],
      ],
      include: [
        {
          model: Menus,
          attributes: ['menuName', 'menuPrice'],
        },
      ],
    });

    // 주문 기록이 없는 경우 처리
    if (!orderrecord) {
      return res.status(400).json({ errorMesaage: '주문 기록이 없습니다.' });
    }

    // 결과 반환
    res.json({ user: user, 주문기록: orderrecord });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
