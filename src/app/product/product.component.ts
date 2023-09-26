import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  products : Product[] = [];
  displayAddEditModal = false
  selectedProduct: any = null
  subscriptions : Subscription[]=[]
  pdtSubscription : Subscription = new Subscription();

  constructor(private productService : ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService){}

  ngOnInit(): void {
    this.getProductList()
      
  }
  getProductList(category?: string) {
    this.pdtSubscription = this.productService.getProducts(category || "")
    .subscribe(
      response => {

        this.products = response;
         
      }
    );
    this.subscriptions.push(this.pdtSubscription)
  }
  showAddModal(){
    this.displayAddEditModal = true 
    this.selectedProduct = null
  }
  hideAddModal(isClosed: boolean){
    this.displayAddEditModal = !isClosed

  }
  saveorUpdateProductList(newData:any){
    if(newData.id === this.selectedProduct.id){
      const productIndex = this.products.findIndex(data => data.id === newData.id);
      this.products[productIndex] = newData
    }else{
      this.products.unshift(newData) //adiciona um elemento no inicio do array 

    }
    
  }

  showEditModal(product:Product){
    this.displayAddEditModal = true;
    this.selectedProduct = product;

    
  }
  deleteProduct(product : Product) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to delete this product?',
        accept: () => {
            //LOGICA
            this.productService.deleteProduct(product.id).subscribe(
              response => {
                // this.getProductList(); se tiver  backend
               this.products = this.products.filter(data => data.id !== product.id)

                this.messageService.add({severity:'success',summary:'success', detail:'Deleted Successfuly'});
              },
              error => {
                this.messageService.add({severity:'error',summary:'Error', detail: error});
              }
            )
        }
      });
    
    }
    getProductsByCategory(category:string){
      this.getProductList(category)

    }
    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe()) //para realizar a limpeza quando o componente for removido do DOM
    }
    
   }
