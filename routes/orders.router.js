const express = require('express');
const router = express.Router();

const { Menus, Orders, OrderMenus } = require('../models');

// 사장 주문페이지 조회 API
router.get('/stores/:storeId/orders', async (req, res) => {
  try {
    const { storeId } = req.params;
    const data = await Orders.findAll({
      where: { storeId },
      attributes: ['orderId', 'storeId', 'userId', 'userAddress', 'deliveryReq'],
      include: [
        {
          model: OrderMenus,
          attributes: ['orderMenuId', 'menuId', 'orderId', 'orderQuantity', 'totalPrice'],
          include: [
            {
              model: Menus,
              attributes: ['menuName', 'menuUrl'],
            },
          ],
        },
      ],
    });

    const editData = data.map(item => {
      const orderMenus = item.OrderMenus.map(orderMenu => ({
        orderMenuId: orderMenu.orderMenuId,
        menuId: orderMenu.menuId,
        orderId: orderMenu.orderId,
        orderQuantity: orderMenu.orderQuantity,
        totalPrice: orderMenu.totalPrice,
        menuName: orderMenu.Menu.menuName,
        menuUrl: orderMenu.Menu.menuUrl,
      }));

      return {
        orderId: item.orderId,
        storeId: item.storeId,
        userId: item.userId,
        userAddress: item.userAddress,
        deliveryReq: item.deliveryReq,
        orderMenus,
      };
    });

    res.json({ data: editData });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
