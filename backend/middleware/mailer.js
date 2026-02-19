import nodemailer from "nodemailer"
import dotenv from 'dotenv'

dotenv.config()

const testAccount = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
  host: testAccount.smtp.host,
  port: testAccount.smtp.port,
  secure: testAccount.smtp.secure,
  auth: {
    user: testAccount.user,
    pass: testAccount.pass,
  },
});

export const sendVerificationEmail = async (email, username, rawToken) => {
  const verifyURL = `${process.env.CLIENT_URL}/verify-email?token=${rawToken}`
  try { 
    const info = await transporter.sendMail({
      from: '"Мой список книг" <toy87@ethereal.email>',
      to: email,
      subject: 'Подтверждение адреса электронной почты для сайта "Мой список книг"',
      html: `<h3>Здравствуйте, ${username}!<h3> 
      <p>Пожалуйста, перейдите по <a href="${verifyURL}">ссылке</a>, чтобы подтвердить адрес электронной почты</p>`,
    })
    console.log('Verification email sent. Preview URL:', nodemailer.getTestMessageUrl(info))
  } catch (err) {
    console.log('Failed to send verification email', err)
  }
} 

export const sendPassRecoveryEmail = async (email, username, rawToken) => {
  const verifyURL = `${process.env.CLIENT_URL}/verify-recovery?token=${rawToken}`
  try { 
    const info = await transporter.sendMail({
      from: '"Мой список книг" <toy87@ethereal.email>',
      to: email,
      subject: 'Восстановление пароля для сайта "Мой список книг"',
      html: `<h3>Здравствуйте, ${username}!<h3> 
      <p>Пожалуйста, перейдите по <a href="${verifyURL}">ссылке</a>, чтобы восстановить пароль</p>`,
    })
    console.log('Password recovery email sent. Preview URL:', nodemailer.getTestMessageUrl(info))
  } catch (err) {
    console.log('Failed to send a password recovery email', err)
  }
}