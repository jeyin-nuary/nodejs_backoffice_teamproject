const express = require('express');
const router = express.Router();

// store.html 경로
router.get('/stores/:storeId', (req, res) => {
  const { storeId } = req.params;
  res.redirect(`/store.html?storeId=${storeId}`);
});

// adminOrderPage.html 경로
router.get('/stores/:storeId/orders', (req, res) => {
  const { storeId } = req.params;
  res.redirect(`/adminOrderPage.html?storeId=${storeId}`);
});

// review.html 경로
router.get('/stores/:storeId/reviews', (req, res) => {
  const { storeId } = req.params;
  res.redirect(`/review.html?storeId=${storeId}`);
});
// rivewEdit.html 경로
router.get('/stores/:storeId/reviews/:reviewId', (req, res) => {
  const { storeId, reviewId } = req.params;
  res.redirect(`/reviewEdit.html?storeId=${storeId}&reviewId=${reviewId}`);
});

module.exports = router;
