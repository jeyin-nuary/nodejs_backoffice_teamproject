const express = require('express');
const router = express.Router();

// adminOrderPage.html 경로
router.get('/stores/:storeId/orders', (req, res) => {
  const { storeId } = req.params;
  res.redirect(`/adminOrderPage.html?storeId=${storeId}`);
});

// signUp.html 경로
router.get('/signUp', (req, res) => {
  res.redirect('/signUp.html');
});

// login.html 경로
router.get('/login', (req, res) => {
  res.redirect('/login.html');
});

// // logout.html 경로
// router.get('/logout', (req, res) => {
//   res.redirect('/logout.html');
// });

module.exports = router;
