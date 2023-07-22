const express = require('express');
const router = express.Router();
const { Reviews, Stores, Orders } = require('../models');
const { Op } = require('sequelize');
const authMiddleware = require('../middlewares/auth-middleware');

// 리뷰 작성 API
router.post('/stores/:storeId/reviews', async (req, res) => {
  try {
    const { storeId } = req.params;
    const userId = 1; // 로그인 기능이 구현되지 않아 하드코딩
    const { reviewContent, reviewUrl, reviewRating } = req.body;

    const storeExists = await Stores.findOne({ where: { storeId } });
    const orderExists = await Orders.findOne({ where: { [Op.and]: [{ storeId }, { userId }] } });

    if (!storeExists) {
      return res.status(400).json({ errorMessage: '해당 가게가 존재하지 않습니다.' });
    }
    if (!orderExists) {
      return res.status(400).json({ errorMessage: '주문 후 리뷰를 작성해주세요.' });
    }
    if (!reviewContent || !reviewRating) {
      return res.status(400).json({ errorMessage: '내용과 별점을 입력해주세요.' });
    }
    if (5 < reviewRating) {
      return res.status(400).json({ errorMessage: '별점은 최대 5점까지 가능합니다.' });
    }

    const data = await Reviews.create({
      userId: 1,
      storeId,
      reviewContent,
      reviewUrl,
      reviewRating,
    });
    res.status(200).json({ message: '리뷰 작성에 성공했습니다.', data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: '리뷰 작성에 실패했습니다.' });
  }
});

// 리뷰 수정 API
router.patch('/stores/:storeId/reviews/:reviewId', async (req, res) => {
  try {
    const { storeId, reviewId } = req.params;
    const userId = 1; // 로그인 기능이 구현되지 않아 하드코딩
    const { reviewContent, reviewUrl, reviewRating } = req.body;

    const storeExists = await Stores.findOne({ where: { storeId } });
    const reviewExists = await Reviews.findOne({ where: { reviewId } });

    if (!storeExists) {
      return res.status(400).json({ errorMessage: '해당 가게가 존재하지 않습니다.' });
    }
    if (!reviewExists) {
      return res.status(400).json({ errorMessage: '해당 리뷰가 존재하지 않습니다.' });
    }
    if (userId !== reviewExists.userId) {
      return res.status(400).json({ errorMessage: '본인이 작성한 리뷰만 수정가능합니다.' });
    }

    if (reviewContent) await Reviews.update({ reviewContent }, { where: { reviewId } });
    if (reviewUrl) await Reviews.update({ reviewUrl }, { where: { reviewId } });
    if (reviewRating) await Reviews.update({ reviewRating }, { where: { reviewId } });

    res.status(200).json({ message: '리뷰 수정에 성공했습니다.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: '리뷰 수정에 실패했습니다.' });
  }
});

// 리뷰 삭제 API
router.delete('/stores/:storeId/reviews/:reviewId', async (req, res) => {
  try {
    const { storeId, reviewId } = req.params;
    const userId = 1; // 로그인 기능이 구현되지 않아 하드코딩

    const storeExists = await Stores.findOne({ where: { storeId } });
    const reviewExists = await Reviews.findOne({ where: { reviewId } });

    if (!storeExists) {
      return res.status(400).json({ errorMessage: '해당 가게가 존재하지 않습니다.' });
    }
    if (!reviewExists) {
      return res.status(400).json({ errorMessage: '해당 리뷰가 존재하지 않습니다.' });
    }
    if (userId !== reviewExists.userId) {
      return res.status(400).json({ errorMessage: '본인이 작성한 리뷰만 삭제가능합니다.' });
    }

    await Reviews.destroy({
      where: {
        [Op.and]: [{ storeId }, { reviewId }],
      },
    });

    res.status(200).json({ message: '리뷰 삭제에 성공했습니다.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: '리뷰 삭제에 실패했습니다.' });
  }
});

module.exports = router;
