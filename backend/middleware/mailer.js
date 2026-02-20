import nodemailer from "nodemailer"
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export const sendVerificationEmail = async (email, username, rawToken) => {
  const verifyURL = `${process.env.CLIENT_URL}/verify-email?token=${rawToken}`
  try { 
    const info = await transporter.sendMail({
      from: `"Мой список книг" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Подтверждение адреса электронной почты для сайта «Мой список книг»',
      html: `<h3>Здравствуйте, ${username}!<h3> 
      <p>Пожалуйста, перейдите по <a href="${verifyURL}">ссылке</a>, чтобы подтвердить адрес электронной почты 📚</p>
      <p>Если Вы не регистрировались на нашем сайте, извините за беспокойство; просто проигнорируйте это письмо</p>`,
    })
    console.log('Verification email sent:', info.messageId)
  } catch (err) {
    console.log('Failed to send verification email', err)
  }
} 

export const sendPassRecoveryEmail = async (email, username, rawToken) => {
  const verifyURL = `${process.env.CLIENT_URL}/verify-recovery?token=${rawToken}`
  try { 
    const info = await transporter.sendMail({
      from: `"Мой список книг" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Восстановление пароля для сайта «Мой список книг»',
      html: `<h3>Здравствуйте, ${username}!<h3> 
      <p>Пожалуйста, перейдите по <a href="${verifyURL}">ссылке</a>, чтобы восстановить пароль 🔐</p>
      <p>Если Вы не запрашивали восстановление пароля, извините за беспокойство; просто проигнорируйте это письмо</p>`,
    })
    console.log('Verification email sent:', info.messageId)
  } catch (err) {
    console.log('Failed to send a password recovery email', err)
  }
}