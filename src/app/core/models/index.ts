import { User } from './user.model';
import { UserToken } from './token.model';
import { SinginDto } from './singin.dto';
import { Product } from './product.model';

export const models = [SinginDto, UserToken, User, Product];

export * from './singin.dto';
export * from './token.model';
export * from './user.model';
export * from './product.model';
