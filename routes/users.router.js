const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

// 회원가입 api
router.post('/signup', async (req, res) => {
  try {
    const { email, password, confirmPassword, nickname, points, userAddress } = req.body;
    // 중복되는 이메일 찾기
    const overlappedEmail = await Users.findOne({ where: { email } });

    // 중복되는 닉네임 찾기
    const overlappedNickname = await Users.findOne({where: {nickname}});
    
    if (overlappedNickname) {
      return res.status()
    }
  } catch (error) {}
});

module.exports = router;
