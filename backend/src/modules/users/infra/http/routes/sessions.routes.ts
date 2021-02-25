import { Router } from 'express';
import SessionControllers from '../Controllers/SessionsController';

const sessionsRouter = Router();
const sessionsCoontroller = new SessionControllers();

sessionsRouter.post('/', sessionsCoontroller.create);

export default sessionsRouter;
