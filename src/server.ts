import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from './prisma'

const app = express()

app.use(express.json())

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '67c689f85f4e47',
    pass: 'f598a19aa0eeb9'
  }
})

app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    }
  })

  transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Davi Freitas <davi.israel01@gmail.com>',
    subject: 'Novo feedback',
    html: [
      '<div style="font-family: sans-serif; font-size: 16px; color: #111;">',
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      '<div>'
    ].join('\n')
  })

  return res.status(201).json({ data: feedback })
})

app.listen(3000, () => {
  console.log('HTTP server running!')
})
