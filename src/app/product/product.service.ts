import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  baseApiUrl = 'https://fakestoreapi.com/products?sort=desc' 

  constructor(private http: HttpClient) { }

  getProducts(category : string): Observable<Product[]>{
    const  categoryUrl = category? `/category/${category}` : ''
    return this.http.get<Product[]>(`https://fakestoreapi.com/products${categoryUrl}?sort=desc`)
  }
  addEditProduct(data : any, selectedPdt: any){
    if(!selectedPdt){
      return this.http.post(this.baseApiUrl,data)

    }else{
      return this.http.put(`https://fakestoreapi.com/products/${selectedPdt.id}`,data)
    }
    
  }

  deleteProduct(productId : number){
    return this.http.delete(`https://fakestoreapi.com/products/${productId}`)
  }
  getCategories():Observable<string[]>{
    return this.http.get<string[]>(`https://fakestoreapi.com/products/categories`)

  }
}
