const express = require('express');
const router = express.Router();

const { Menus, Orders } = require('../models');

// (사장) 주문 상세 페이지 주문 목록 조회 API
router.get('/stores/:storeId/orders', async (req, res) => {
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
router.patch('/orders/:orderId/approve', async (req, res) => {
  const { orderId } = req.params;
  const { newStatus } = req.body;

  try {
    const order = await Orders.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: '주문을 찾을 수 없습니다.' });
    }

    await order.update({ orderStatus: newStatus });

    res.status(200).json({ message: `주문 상태가 ${newStatus}로 변경되었습니다.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '내부 서버 오류입니다.' });
  }
});

module.exports = router;
