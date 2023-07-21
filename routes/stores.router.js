const express = require('express');
const router = express.Router();
const { Stores, Menus, Reviews, Users } = require('../models');
const { Sequelize } = require('sequelize');
const middleware = require('../middlewares/auth-middleware');

// 가게 상세 페이지 조회 api
router.get('/stores/:storeId', async (req, res) => {
  try {
    const { storeId } = req.params;
    const getStore = await Stores.findOne({
      where: { storeId },
      attributes: ['storeName', 'storeAddress', 'storeUrl', 'storeRating'],
      include: [
        {
          model: Menus,
          attributes: ['menuName', 'menuImg', 'menuPrice'],
        },
        {
          model: Reviews,
          attributes: ['reviewContent', 'reviewUrl'],
        },
        {
          model: Users,
          attributes: ['role'],
        },
      ],
    });
    res.status(200).json(getStore);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errorMessage: '스토어 조회에 실패했습니다.' });
  }
});

// 가게 목록 페이지 (API 명세없음)
router.get('/storelists', async (req, res) => {
  try {
    // findAll을 통해 DB에서 attributes로 가져올것들을 정함
    const storeList = await Stores.findAll({
      attributes: [
        'storeId',
        'storeName',
        'storeAddress',
        'storeUrl',
        'storeRating',
        'createdAt',
        'updatedAt',
        // sequelize 문법으로 COUNT를 이용해 starRating 이라는 임시 이름으로 갯수를 계산하여 추가함
        [Sequelize.fn('COUNT', Sequelize.col('Stores.storeRating')), 'starRating'],
      ],
      // JOIN : 조회를 할대 Users의 role 컬럼 추가
      include: [
        {
          model: Users,
          attributes: ['role'],
        },
      ],
      // order : createdAt 별로 내림차순, group: 'Stores.storeId별로 그룹화
      order: [['createdAt', 'DESC']],
      group: ['Stores.storeId'],
    });
    // 유효성 검사
    if (!storeList)
      return res.status(400).json({ errorMessage: '가게 목록을 불러오지 못했습니다.' });
    return res.status(200).json({ data: storeList });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

// (관리자) 가게 등록
router.post('/stores', middleware, async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { storeName, storeAddress, storeUrl } = req.body;
    // 중복된 이름의 가게가 있는지 확인하기 위해서
    const existingStore = await Stores.findOne({ where: { storeName } });
    // 유효성 검사
    if (existingStore) {
      return res.status(409).json({
        errorMessage: '이미 등록된 가게입니다!!!',
      });
    }
    if (!storeName) return res.status(403).json({ errorMessage: '가게 이름을 입력해주세요.' });
    if (!storeAddress) return res.status(403).json({ errorMessage: '가게 주소를 입력해주세요.' });
    // 일반 user와 role 구분완료 => 가게등록을 할때  role의 값이 1로 설정 findOne을 통해 role값을 가진 사용자를 찾고 반환
    const getMaxRole = async () => {
      const maxRoleUser = await Users.findOne({ order: [['role', 'DESC']] });
      return maxRoleUser.role;
    };
    // maxRole 변수에 role 값 저장
    let maxRole = await getMaxRole();

    // console.log(maxRole);
    // DB에 가게 등록 data 생성
    const storeRegister = await Stores.create({
      userId,
      storeName,
      storeAddress,
      storeUrl,
      // 94번째 줄에서 선언한 maxRole 변수에 ++를 통해 0 -> 1로 증가시킴
      role: maxRole++,
    });
    // 유효성 검사
    if (!storeRegister)
      return res.status(400).json({ errorMessage: '가게 등록에 실패하였습니다.' });
    return res.status(200).json({ data: storeRegister });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
