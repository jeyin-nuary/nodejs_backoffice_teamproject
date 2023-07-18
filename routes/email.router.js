const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const nodemailer = require('nodemailer');
// const emailAuth = require('../public/emailAuth.html');
// const SMTPTransport = require('nodemailer/lib/smtp-transport');
const dayjs = require('dayjs');
require('dotenv').config();

// 이메일 인증 생성
router.post('/auth/email', async (req, res) => {
  try {
    const { email } = req.body;
    // 이메일 인증 번호 생성
    const authCode = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');

    // 이메일 주소 유효성
    const validateEmail = (email) => {
      const emailRegex =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      emailRegex.test(email);
    };

    if (!validateEmail(email)) {
      return res.status(412).json({ errorMessage: '이메일 형식이 올바르지 않습니다.' });
    }

    // 중복되는 이메일 찾기
    const overlappedEmail = await Users.findOne({ where: { email } });
    if (overlappedEmail) {
      return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
    }

    // 이메일 인증: 메일 전송
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'nodeking6@gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    const emailMessage = {
      from: 'NODEKING', // 발신자 이메일 주소
      to: email, // 사용자가 입력한 수신자 이메일 주소
      subject: 'NODEKING 배달서비스 회원가입 이메일 인증',
      html: '<h1>인증번호를 입력해 주세요. \n\n\n\n\n\n</h1>' + authCode,
    };
    await transporter.sendMail(emailMessage, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: '이메일 전송에 실패했습니다.' });
      }
      res.status(200).json({ message: '이메일을 전송했습니다.' });
    });
    // console.log('Email sent:', response);

    // if (verifiedEmail === 0) {
    //   return res.status(412).json({ errorMessage: '이메일을 인증 해주세요.' });
    // }

    // 이메일 인증을 하지 않았을 경우
    const isEmailValid = await Users.findOne({ where: { email } });

    if (!isEmailValid) {
      return res.status(400).json({ message: '이메일을 인증해 주세요.' });
    }

    // 이메일 인증 번호가 틀린 경우
    const isEmailValidAuthCode = isEmailValid.authCode == authCode;

    if (!isEmailValidAuthCode) {
      return res.status(405).json({ message: '인증번호가 일치하지 않습니다. 다시 확인해 주세요.' });
    }

    // 이메일 인증 시간
    // const expiryDate = dayjs().add(1, 'year').endOf('day').$d;

    // 이메일 인증 시간이 초과된 경우
    const isEmailValidExpiryTime = dayjs().diff(new Date(isEmailValid.createdAt), 'm') >= 30;

    if (isEmailValidExpiryTime) {
      return res
        .status(405)
        .json({ message: '이메일 인증 시간이 초과되었습니다. 이메일 인증을 재시도 해주세요.' });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: '이메일 전송에 실패했습니다.' });
  }
});

module.exports = router;
