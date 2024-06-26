import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  type ReCaptchaResponse = {
    success: boolean
    challenge_ts: string
    hostname: string
    score: number
    action: string
    "error-codes": string[]
  }

  const { token, name, email, subject, message } = await readBody(event)

  if(!token) {
    return {
      success: false,
      error: 'reCaptcha token not found'
    }
  }

  if(!name || !email || !subject || !message) {
    return {
      success: false,
      error: 'name, email, subject and message are required'
    }
  }

  const config = useRuntimeConfig()
  const result: ReCaptchaResponse = await $fetch(config.private.RECAPTCHA_URL, { method: 'POST', params: {
    secret: config.private.RECAPTCHA_SECRETKEY,
    response: token
  }})

  if(!result.success) {
    return {
      success: false,
      error: 'reCaptcha failed'
    }
  }

  let transporter = nodemailer.createTransport({
    host: 'mail.smtp2go.com',
    port: 2525,
    secure: false,
    auth: {
      user: config.private.SMTP2GO_USER,
      pass: config.private.SMTP2GO_PASS,
    },
  });

  let mailOptions = {
    from: 'contact@brandontaylor.dev',
    replyTo: email,
    to: 'hello@brandontaylor.dev',
    subject: subject,
    text: message,
  };

  

  const sendResult = await new Promise<boolean>((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(false)
      }
      resolve(true)
    });
  })

  if(!sendResult) {
    return {
      success: false,
      error: 'failed to send email'
    }
  }

  return {
    success: true
  }
})
