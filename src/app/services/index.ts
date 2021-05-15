import { ProductService } from './product.service';
import { AuthService } from './auth.service';

export const services = [AuthService, ProductService];

export * from './auth.service';
export * from './product.service';
