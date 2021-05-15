import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../core/models';
import { ApiPath } from '../shared/endpoints';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  async fetchProducts(): Promise<Product[]> {
    return this.http
      .get<Product[]>(`${environment.apiBaseUri}/${ApiPath.product}`)
      .toPromise();
  }
}
