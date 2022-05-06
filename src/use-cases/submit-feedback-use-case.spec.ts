import {SubmitFeedbackUseCase} from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
  it('should to able to submit a submit', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,dowkodwdw'
    })).resolves.not.toThrow()

    expect(createFeedbackSpy).toBeCalled()
    expect(sendMailSpy).toBeCalled()
  })

  it('should not be able to submit feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,dowkodwdw'
    })).rejects.toThrow()
  })

  it('should not be able to submit feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,dowkodwdw'
    })).rejects.toThrow()
  })

  it('should not be able to submit feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'test.jpg'
    })).rejects.toThrow()
  })

  it('should send feedback with screenshot if screenshot exists', async () => {
    const sendFeedbackToEmail = await submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,dowkodwdw'
    })
    expect(sendFeedbackToEmail).toBe('sent feedback with screenshot')
  })

  it('should send feedback without screenshot if screenshot doesn\'t exists', async () => {
    const sendFeedbackToEmail = await submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: ''
    })
    expect(sendFeedbackToEmail).toBe('sent feedback without screenshot')
  })
})
