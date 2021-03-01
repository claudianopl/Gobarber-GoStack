import FakeMailProvider from '@shared/Container/providers/MailProvider/fakes/FakeMailProvider';
// import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('CreateUser', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailPRovider = new FakeMailProvider();
    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailPRovider,
    );

    const sendMail = jest.spyOn(fakeMailPRovider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'jhondoe@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
