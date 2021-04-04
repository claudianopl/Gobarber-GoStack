import { Router } from 'express';
import ForgotPasswordController from '../Controllers/ForgotPasswordController';
import ResetPasswordController from '../Controllers/ResetPasswordController';

const sessionsRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

sessionsRouter.post('/forgot', forgotPasswordController.create);
sessionsRouter.post('/reset', resetPasswordController.create);

export default sessionsRouter;
