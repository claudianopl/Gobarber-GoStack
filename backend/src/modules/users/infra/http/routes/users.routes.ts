import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import uploadConfig from '@config/upload';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

interface IDeletePassword {
  password?: string;
}

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const usersRepository = new UsersRepository();

  const { name, email, password } = request.body;

  const createUser = new CreateUserService(usersRepository);

  const user: IDeletePassword = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const usersRepository = new UsersRepository();

    const updateUserAvatar = new UpdateUserAvatarService(usersRepository);

    const user: IDeletePassword = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);
export default usersRouter;
