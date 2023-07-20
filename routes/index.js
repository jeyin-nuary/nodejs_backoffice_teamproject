const express = require('express');
const router = express.Router();

// adminOrderPage.html 경로
router.get('/stores/:storeId/orders', (req, res) => {
  const { storeId } = req.params;
  res.redirect(`/adminOrderPage.html?storeId=${storeId}`);
});

module.exports = router;
