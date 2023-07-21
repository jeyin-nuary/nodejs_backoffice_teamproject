const jwt = require('jsonwebtoken');
// const { EmailAuth } = require('../public');
const { Users } = require('../models');

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

module.exports;
