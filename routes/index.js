const express = require('express');
const router = express.Router();

// main.html 경로
router.get('/main', (req, res) => {
  res.redirect(`/main.html`);
});

// order_Page.html 경로
router.get('/orderpage/:storeId', (req, res) => {
  const { storeId } = req.params;
  res.redirect(`/order_Page.html?storeId=${storeId}`);
});

// my.html 경로
router.get('/mypage', (req, res) => {
  res.redirect(`/mypage.html`);
});

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

// storeRegister.html 경로
router.get('/storeRegister', (req, res) => {
  res.redirect(`/storeRegister.html`);
});

// storeList.html 경로
router.get('/storeList', (req, res) => {
  res.redirect(`/storeList.html`);
});

// signUp.html 경로
router.get('/signUp', (req, res) => {
  res.redirect('/signUp.html');
});

// login.html 경로
router.get('/login', (req, res) => {
  res.redirect('/login.html');
});

module.exports = router;
