import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Jhon Trê',
      email: 'jhontre@example.com',
    });

    expect(updateUser.name).toBe('Jhon Trê');
    expect(updateUser.email).toBe('jhontre@example.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@example.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Jhon Trê',
        email: 'jhondoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Jhon Trê',
      email: 'jhontre@example.com',
      old_password: '123456',
      password: '123456789',
    });

    expect(updateUser.password).toBe('123456789');
  });

  it('should not be able to update the profile without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Jhon Trê',
        email: 'jhontre@example.com',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the profile with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Jhon Trê',
        email: 'jhontre@example.com',
        old_password: '1234586',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
