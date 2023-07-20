const express = require('express');
const router = express.Router();
const { Menus, Stores } = require('../models/');
// const upload = require('../middlewares/uploader');

// 메뉴 조회
router.get('/stores/:storeId/menus', async (req, res) => {
  try {
    const { storeId } = req.params;
    const store = await Stores.findOne({ where: { storeId } });
    if (!store) return res.status(404).json({ message: '가게가 존재하지 않습니다.' });
    const menus = await Menus.findAll({ where: { storeId } });

    res.status(200).json({ data: menus });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

// 메뉴 생성
router.post('/stores/:storeId/menus', async (req, res) => {
  try {
    const { storeId } = req.params;
    const { menuName, menuPrice, menuInfo } = req.body;
    const store = await Stores.findOne({ where: { storeId } });
    if (!store) return res.status(404).json({ message: '가게가 존재하지 않습니다.' });
    const existMenu = await Menus.findOne({ where: { menuName } });
    if (existMenu) return res.status(400).json({ message: '메뉴가 이미 존재합니다.' });

    await Menus.create({ storeId, menuName, menuPrice, menuInfo });
    res.status(200).json({ message: '메뉴가 등록되었습니다.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

// 메뉴 사진 추가

// const AWS = require('aws-sdk');
// require('dotenv').config();

// const s3 = new AWS.S3({
//   region: process.env.REGION,
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// router.post('/stores/:storeId/menus/:menuId', upload, async (req, res) => {
//   const { menuId } = req.params;
//   const menu = await Menus.findOne({ where: { menuId } });
//   console.log(menu.menuUrl);
//   const decordURL = decodeURIComponent(menu.menuUrl);
//   const imgUrl = decordURL.substring(56);
//   console.log(imgUrl);
//   if (menu.menuUrl === null) {
//     const uploadimageUrl = req.file.location;
//     console.log(uploadimageUrl);
//     await Menus.update(
//       { img: uploadimageUrl },
//       {
//         where: {
//           menuId,
//         },
//       }
//     );
//   } else {
//     s3.deleteObject(
//       {
//         Bucket: process.env.BUCKET_NAME,
//         Key: imgUrl,
//       },
//       (err, data) => {
//         if (err) {
//           throw err;
//         }
//         console.log('s3 deleteObject ', data);
//       }
//     );
//     const imageUrl = req.file.location;
//     console.log(imageUrl);
//     await Menus.update(
//       { img: imageUrl },
//       {
//         where: {
//           menuId,
//         },
//       }
//     );
//   }
//   res.status(201).json({ Message: '사진이 변경되었습니다.' });
// });

// 메뉴 수정
router.put('/stores/:storeId/menus/:menuId', async (req, res) => {
  try {
    const { storeId, menuId } = req.params;
    const { menuName, menuPrice, menuInfo } = req.body;
    const store = await Stores.findOne({ where: { storeId } });
    if (!store) return res.status(404).json({ message: '가게가 존재하지 않습니다.' });
    const menu = await Menus.findOne({ where: { menuId } });
    if (!menu) return res.status(404).json({ message: '메뉴가 존재하지 않습니다.' });

    await Menus.update({ menuName, menuPrice, menuInfo }, { where: { storeId, menuId } });
    res.status(200).json({ message: '메뉴가 수정되었습니다.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

// 메뉴 삭제
router.delete('/stores/:storeId/menus/:menuId', async (req, res) => {
  try {
    const { storeId, menuId } = req.params;
    const store = await Stores.findOne({ where: { storeId } });
    if (!store) return res.status(404).json({ message: '가게가 존재하지 않습니다.' });
    const menu = await Menus.findOne({ where: { menuId } });
    if (!menu) return res.status(404).json({ message: '메뉴가 존재하지 않습니다.' });

    await Menus.destroy({ where: { storeId, menuId } });
    res.status(200).json({ message: '메뉴가 삭제되었습니다.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

module.exports = router;
