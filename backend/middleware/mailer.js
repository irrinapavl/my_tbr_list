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
      html: `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f6f9; font-family: Arial, sans-serif;">
          <tr>
            <td align="center" style="padding: 20px;">
              <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <tr>
                  <td style="padding: 40px 30px;">
                    <h3 style="margin-top: 0; color: #2c3e50; font-size: 24px;">Здравствуйте, ${username}! 📚</h3>
                    <p style="color: #34495e; line-height: 1.6; font-size: 16px;">Пожалуйста, нажмите на кнопку ниже, чтобы подтвердить адрес электронной почты и завершить регистрацию:</p>
                    
                    <table cellpadding="0" cellspacing="0" border="0" style="margin: 30px auto 20px;">
                      <tr>
                        <td align="center" bgcolor="#1007baff" style="padding: 14px 35px; border-radius: 50px;">
                          <a href="${verifyURL}" target="_blank" style="color: #ffffff; text-decoration: none; font-weight: 600; font-size: 18px; display: inline-block;">📖 Подтвердить email</a>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="color: #34495e; line-height: 1.6; font-size: 16px;">
                      Ссылка действительна в течение часа, и ее можно использовать всего один раз.
                    </p> 
                    <p style="color: #34495e; line-height: 1.6; font-size: 16px;">
                      Если Вы не регистрировались на нашем сайте, извините за беспокойство; просто проигнорируйте это письмо.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `,
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
      html: `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f6f9; font-family: Arial, sans-serif;">
          <tr>
            <td align="center" style="padding: 20px;">
              <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <tr>
                  <td style="padding: 40px 30px;">
                    <h3 style="margin-top: 0; color: #2c3e50; font-size: 24px;">Здравствуйте, ${username}! 📚</h3>
                    <p style="color: #34495e; line-height: 1.6; font-size: 16px;">Пожалуйста, нажмите на кнопку ниже, чтобы перейти на страницу восстановления пароля:</p>
                    
                    <table cellpadding="0" cellspacing="0" border="0" style="margin: 30px auto 20px;">
                      <tr>
                        <td align="center" bgcolor="#462dc5ff" style="padding: 14px 35px; border-radius: 50px;">
                          <a href="${verifyURL}" target="_blank" style="color: #ffffff; text-decoration: none; font-weight: 600; font-size: 18px; display: inline-block;">🔐 Восстановить пароль</a>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="color: #34495e; line-height: 1.6; font-size: 16px;">
                      Ссылка действительна в течение часа, и ее можно использовать всего один раз.
                    </p> 
                    <p style="color: #34495e; line-height: 1.6; font-size: 16px;">
                      Если Вы не запрашивали восстановление пароля, извините за беспокойство; просто проигнорируйте это письмо.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `,
    })
    console.log('Verification email sent:', info.messageId)
  } catch (err) {
    console.log('Failed to send a password recovery email', err)
  }
}