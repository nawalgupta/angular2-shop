import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class ProductService {
  // The `public` keyword denotes that the constructor parameter will
  // be retained as a field.
    public url = '/api/product';
    public urlMy = '/api/myproduct/';
    public urlShopProducts = '/api/shopproducts/';

    public userId = '';

  //public urlDel=`/api/product/`;
  
  constructor(public http:Http) {

  }

  getMy() {
      return this.http.get(this.urlMy)
          .map(res => res.json());
  }

  getAll() {
      return this.http.get(this.url)
          .map(res => res.json());
  }

  getProductsByShop(shopId){
      return this.http.get(this.urlShopProducts + "/" + shopId)
          .map(res => res.json());
  }

  getUserProducts(userId) {
      return this.http.get(this.urlMy + "/" + this.userId)
          .map(res => res.json());
  }


  getOne(id) {
      return this.http.get(this.url + "/" + id)
          .map(res => res.json());
  }

  create(data) {

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    return this.http.post('/api/product', JSON.stringify(data),
          {headers: headers})
        .map(res => res.json());
  }


  delete(id) {

      return this.http.delete(`${this.url}/${id}`)
          .map(res => res.json());
  }
}
