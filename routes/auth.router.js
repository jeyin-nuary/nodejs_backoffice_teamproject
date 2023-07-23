const express = require('express');
const router = express.Router();
const { Users, AuthMails } = require('../models');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

require('dotenv').config();

// 이메일 인증 메일 전송
router.post('/signUp/confirm', async (req, res) => {
  const { email } = await req.body;

  try {
    if (!email) {
      // 이건 정규표현식 사용해서 나중에 고치시고
      return res.status(400).json({ errorMessage: '이메일을 입력해주세요' });
    }

    // 중복되는 이메일 찾기
    const overlappedEmail = await Users.findOne({ where: { email } });
    if (overlappedEmail) {
      return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
    }

    // 이메일 인증 번호 생 성
    const AuthCode = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');

    // 생성한 이메일 인증 번호 저장
    await AuthMails.create({
      email,
      authCode: AuthCode,
    });

    // 이메일 인증: 메일 전송
    const transporter = nodemailer.createTransport({
      service: 'gmail',

      auth: {
        user: process.env.admin_email, // 발송자 이메일
        pass: process.env.admin_password, // 발송자 비밀번호
      },
    });

    const main = async () => {
      await transporter.sendMail({
        from: 'NODEKING',
        to: email,
        subject: 'NODEKING 배달서비스 회원가입 이메일 인증',
        html: `<h1>인증번호를 입력해 주세요.</h1><br><br>${AuthCode}`,
      });
    };

    main();
    res.status(201).json({ message: '인증번호가 전송되었습니다.' });
  } catch (error) {
    console.log(error);
  }
});

// 회원가입 api
router.post('/signup', async (req, res) => {
  try {
    const { email, password, confirmPassword, nickname, userAddress, AuthCode } = req.body;

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

    // 이메일 인증을 하지 않았을 경우
    const isEmailValid = await AuthMails.findOne({
      where: { email },
      limit: 1,
      order: [['createdAt', 'DESC']],
    });
    if (!isEmailValid) {
      return res.status(400).json({ message: '이메일을 인증해 주세요.' });
    }

    // 이메일 인증 번호가 틀린 경우
    const isEmailValidAuthCode = isEmailValid.authCode == AuthCode;
    if (!isEmailValidAuthCode) {
      return res.status(405).json({ message: '인증번호가 일치하지 않습니다. 다시 확인해 주세요.' });
    }

    // 이메일 인증 시간이 초과된 경우
    const isEmailValidExpiryTime = dayjs().diff(new Date(isEmailValid.createdAt), 'm') >= 30;
    if (isEmailValidExpiryTime) {
      return res
        .status(405)
        .json({ message: '이메일 인증 시간이 초과되었습니다. 이메일 인증을 재시도 해주세요.' });
    }

    const newUser = await Users.create({
      email,
      password: hashedPassword,
      nickname,
      userAddress,
    });

    res.status(201).json({
      message: '회원가입이 완료되었습니다. 가입 축하 1,000,000 포인트 지급되었습니다.',
      newUser,
    });
  } catch (error) {
    console.error('Error sign up:', error);
    return res.status(500).json({ message: '회원가입에 실패했습니다.' });
  }
});

// -----------------------------------------------------------------

// 액세스 토큰 발급 (깡통)
const generateAccessToken = userId => {
  return jwt.sign({ userId }, process.env.ACCESS_KEY, {
    expiresIn: '1h',
  });
};

// 리프레시 토큰 발급
const generateRefreshToken = userId => {
  return jwt.sign({ userId }, process.env.REFRESH_KEY, {
    expiresIn: '7d',
  });
};

// 로그인 api
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { refreshToken, accessToken } = req.cookies;
    console.log(email, password);

    const user = await Users.findOne({ where: { email } });
    const userId = user.userId;

    // 회원 유효성
    if (!user) {
      return res.status(401).json({ message: '회원이 존재하지 않습니다.' });
    }

    // 비밀번호 유효성
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(401).json({ message: '잘못된 비밀번호입니다.' });
    }

    // 처음 로그인
    if (!refreshToken || !accessToken) {
      const newAccessToken = generateAccessToken(userId);
      const newRefreshToken = generateRefreshToken(userId);

      return res
        .cookie('accessToken', newAccessToken, { httpOnly: true })
        .cookie('refreshToken', newRefreshToken, { httpOnly: true })
        .json({ userId, newAccessToken, message: '로그인 되었습니다.' });
    }

    //     // 1: Access Token과 Refresh Token 모두 만료된 경우
    //     try {
    //       jwt.verify(refreshToken, process.env.REFRESH_KEY);
    //     } catch (error) {
    //       if (error.name === 'TokenExpiredError') {
    //         const decodedRefreshToken = jwt.decode(refreshToken);
    //         const userId = decodedRefreshToken.userId;

    //         const newAccessToken = generateAccessToken(userId);
    //         const newRefreshToken = generateRefreshToken(userId);

    //         return res
    //           .cookie('accessToken', newAccessToken, { httpOnly: true })
    //           .cookie('refreshToken', newRefreshToken, { httpOnly: true })
    //           .json({
    //             userId,
    //             newAccessToken,
    //             message: 'ACCESS TOKEN과 REFRESH TOKEN이 갱신되었습니다.',
    //           });
    //       }
    //     }
    //     // 2: Access Token은 만료됐지만 Refresh Token은 유효한 경우
    //     try {
    //       jwt.verify(req.cookies.accessToken, process.env.ACCESS_KEY);
    //     } catch (error) {
    //       if (error.name === 'TokenExpiredError') {
    //         const decodedRefreshToken = jwt.decode(refreshToken);
    //         const userId = decodedRefreshToken.userId;

    //         const newAccessToken = generateAccessToken(userId);

    //         return res.cookie('accessToken', newAccessToken, { httpOnly: true }).json({
    //           userId,
    //           newAccessToken,
    //           message: 'ACCESS TOKEN이 갱신되었습니다.',
    //         });
    //       }
    //     }

    //     // 3: Access Token과 Refresh Token 모두 유효한 경우
    //     if (refreshToken) {
    //       const decodedAccessToken = jwt.decode(req.cookies.accessToken);
    //       const userId = decodedAccessToken.userId;
    //       console.log('ACCESS TOKEN과 REFRESH TOKEN이 모두 유효합니다.');

    //       res.status(201).json({
    //         userId,
    //         accessToken,
    //         message: 'ACCESS TOKEN과 REFRESH TOKEN이 모두 유효합니다.',
    //       });
    //     }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: '로그인 오류가 발생했습니다.' });
  }
});

// 로그아웃
router.post('/logout', (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: '로그아웃 되었습니다.' });
});

module.exports = router;
