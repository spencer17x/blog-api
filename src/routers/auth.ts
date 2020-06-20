import koaJwt from 'koa-jwt';
import { jwtSecret } from '../config';

export const auth = koaJwt({ secret: jwtSecret });
