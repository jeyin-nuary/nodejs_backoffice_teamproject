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

// 주문 요청 API
router.post('/stores/:storeId/menus/:menuId/order', authMiddlware, async (req, res) => {
  const { userId } = res.locals.user;
  const { storeId, menuId } = req.params;
  const { orderQuantity, deliveryReq, orderStatus } = req.body;

  const ts = await sequelize.transaction();
  try {
    const store = await Stores.findOne({ where: { storeId } });
    if (!store) {
      return res.status(400).json({ message: '가게가 존재하지 않습니다.' });
    }
    const menu = await Menus.findOne({ where: { menuId } });
    if (!menu) {
      return res.status(400).json({ message: '메뉴가 존재하지 않습니다.' });
    }
    const user = await Users.findOne({ where: { userId } });
    let totalPrice = 0;
    totalPrice += menu.menuPrice * orderQuantity;

    if (user.userPoints < totalPrice) {
      return res.status(400).json({ message: '잔액이 부족합니다.' });
    }

    user.userPoints -= totalPrice;
    await user.save({ transaction: ts });

    const storeOwner = await Users.findOne({ where: { userId: store.userId } });
    storeOwner.userPoints += totalPrice;
    await storeOwner.save({ transaction: ts });

    store.storeSales += totalPrice;
    await store.save({ transaction: ts });

    await Orders.create(
      {
        userId,
        storeId,
        menuId,
        deliveryReq,
        userAddress: user.userAddress,
        orderQuantity,
        totalPrice,
        orderStatus,
      },
      { transaction: ts }
    );

    await ts.commit();

    await res.status(200).json({ message: '주문이 성공적으로 완료되었습니다.' });
  } catch (err) {
    console.error(err);
    await ts.rollback();
    res.status(400).json({ message: '예기치 않은 오류로 주문이 실패하였습니다.' });
  }
});
// 주문 보기 API
router.get('/stores/:storeId/order', authMiddlware, async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { storeId } = req.params;

    const getorder = await Orders.findAll({
      where: { storeId, userId },
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

// 주문 삭제 API
router.delete('/stores/:storeId/menus/:menuId/order/:orderId', authMiddlware, async (req, res) => {
  const { userId } = res.locals.user;
  const { orderId, storeId } = req.params;
  const ts = await sequelize.transaction();

  const order = await Orders.findOne({ where: { orderId } });
  if (!order) {
    return res.status(400).json({ message: '존재하지 않는 주문입니다.' });
  }
  if (order) {
    if (userId !== order.userId) {
      return res.status(400).json({ message: '관리자???가 아닙니다.' });
    } else {
      try {
        const user = await Users.findOne({ where: { userId } });
        user.userPoints += order.totalPrice;
        await user.save({ transaction: ts });

        const store = await Stores.findOne({ where: { storeId } });
        const storeOwner = await Users.findOne({ where: { userId: store.userId } });
        storeOwner.userPoints -= order.totalPrice;
        await storeOwner.save({ transaction: ts });

        store.storeSales -= order.totalPrice;
        await store.save({ transaction: ts });

        await Orders.destroy({ where: { orderId } }, { transaction: ts });

        ts.commit();
        res.status(201).json({ message: '주문이 정상적으로 삭제되었습니다.' });
      } catch (err) {
        ts.rollback();
        res.status(400).json({ message: '예기치 않은 오류로 주문 취소가 실패하였습니다.' });
      }
    }
  }
});
module.exports = router;
