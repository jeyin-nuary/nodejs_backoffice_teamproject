const express = require('express');
const router = express.Router();
const authMiddlware = require('../middlewares/auth-middleware');
const { Menus, Orders } = require('../models');

// (사장) 주문 상세 페이지 주문 목록 조회 API
router.get('/stores/:storeId/orders', authMiddlware, async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: '주문 목록 조회에 실패했습니다.' });
  }
});

// 오더 상태 변경 API
router.patch('/orders/:orderId/change', authMiddlware, async (req, res) => {
  const { orderId } = req.params;
  const { orderStatus } = req.body;

  try {
    const order = await Orders.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ errorMessage: '주문을 찾을 수 없습니다.' });
    }

    await order.update({ orderStatus });

    res.status(200).json({ message: `주문 상태가 ${orderStatus}로 변경되었습니다.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: '오더 상태 변경에 에러가 생겼습니다.' });
  }
});

module.exports = router;
