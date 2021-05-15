import { ProductService } from './../../services';
import { Product } from './../../core/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.page.html',
  styleUrls: ['./billing.page.scss'],
})
export class BillingPage implements OnInit {
  products: Product[];
  constructor(private readonly productService: ProductService) {}

  async ngOnInit(): Promise<void> {
    this.products = await this.productService.fetchProducts();
    console.log(this.products);
  }
}
