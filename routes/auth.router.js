const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const jwt = require('jsonwebtoken');
// const { Op } = require('sequelize');
const middleware = require('../middlewares/auth-middleware');
const bcrypt = require('bcrypt');
const emailRouter = require('./email.router');

// 회원가입 페이지 띄우기
router.get('/signup', async (req, res) => {
  res.render('signup');
});

// 회원가입 api
router.post('/signup', async (req, res) => {
  try {
    const { email, password, confirmPassword, nickname, userAddress, verifiedEmail } = req.body;

    // 이메일 또는 닉네임 값이 비었을 때
    if (!email || !nickname) {
      return res.status(400).json({ message: '이메일 또는 닉네임을 입력해주세요.' });
    }

    // 비밀번호 또는 주소 값이 비었을 때
    if (!password || !userAddress) {
      return res.status(400).json({ message: '비밀번호 또는 주소를 입력해주세요.' });
    }

    // 닉네임 유효성
    if (password.includes(nickname) || nickname.includes(password)) {
      return res.status(400).json({ message: '닉네임이 패스워드에 포함될 수 없습니다.' });
    }

    // 비밀번호 유효성
    if (password !== confirmPassword) {
      return res.status(400).json({ message: '패스워드와 패스워드 확인값이 일치하지 않습니다.' });
    }

    const passwordRegex = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,20}$/;

    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .json({ message: '비밀번호는 5글자 이상 20글자 이하이며 특수문자를 포함해야 합니다.' });
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({
      email,
      password: hashedPassword,
      nickname,
      userAddress,
    });

    res.status(201).json({ message: '회원가입이 완료되었습니다.', newUser });
  } catch (error) {
    console.error('Error sign up:', error);
    return res.status(500).json({ message: '회원가입에 실패했습니다.' });
  }
});

module.exports = router;
