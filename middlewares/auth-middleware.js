const express = require('express');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');
let { refreshToken, accessToken } = require('../routes/auth.router');

require('dotenv').config();

module.exports = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  // accessToken과 refreshToken 인증 토큰이 없을 경우
  if (!accessToken || !refreshToken) {
    return res.status(401).json({ message: '로그인 후 이용가능한 기능입니다.' });
  }

  try {
    const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_KEY);
    // 추출한 사용자 id를 사용하여 데이터베이스에서 사용자를 조회합니다.
    const thisUser = await Users.findOne({
      where: { userId: decodedAccessToken.userId },
    });
    // 조회된 사용자 정보를 응답 로컬 변수에 저장합니다.
    res.locals.user = thisUser;
    // 다음 미들웨어로 넘어갑니다.
    next();
  } catch (error) {
    // 에러 메시지를 응답으로 보내고, 상태 코드 401(Unauthorized)를 설정합니다.
    res.status(401).json({ errorMessage: '로그인 후 이용 가능한 기능입니다.' });
  }
};

// 1: Access Token과 Refresh Token 모두 만료된 경우
try {
  jwt.verify(refreshToken, process.env.REFRESH_KEY);
} catch (error) {
  if (error.name === 'TokenExpiredError') {
    const decodedRefreshToken = jwt.decode(refreshToken);
    const userId = decodedRefreshToken.userId;

    const newAccessToken = generateAccessToken(userId);
    const newRefreshToken = generateRefreshToken(userId);

    return res
      .cookie('accessToken', newAccessToken, { httpOnly: true })
      .cookie('refreshToken', newRefreshToken, { httpOnly: true })
      .json({
        userId,
        newAccessToken,
        message: 'ACCESS TOKEN과 REFRESH TOKEN이 갱신되었습니다.',
      });
  }
}
// 2: Access Token은 만료됐지만 Refresh Token은 유효한 경우
try {
  jwt.verify(req.cookies.accessToken, process.env.ACCESS_KEY);
} catch (error) {
  if (error.name === 'TokenExpiredError') {
    const decodedRefreshToken = jwt.decode(refreshToken);
    const userId = decodedRefreshToken.userId;

    const newAccessToken = generateAccessToken(userId);

    return res.cookie('accessToken', newAccessToken, { httpOnly: true }).json({
      userId,
      newAccessToken,
      message: 'ACCESS TOKEN이 갱신되었습니다.',
    });
  }
}

// 3: Access Token과 Refresh Token 모두 유효한 경우
if (refreshToken) {
  const decodedAccessToken = jwt.decode(req.cookies.accessToken);
  const userId = decodedAccessToken.userId;
  // console.log('ACCESS TOKEN과 REFRESH TOKEN이 모두 유효합니다.');

  res.status(201).json({
    userId,
    accessToken,
    message: 'ACCESS TOKEN과 REFRESH TOKEN이 모두 유효합니다.',
  });
}
// } catch (error) {
// console.log(error);
// res.status(500).json({ message: '로그인 오류가 발생했습니다.' });
// }
// });

module.exports;
