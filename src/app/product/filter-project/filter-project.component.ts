import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { response } from 'express';

@Component({
  selector: 'app-filter-project',
  templateUrl: './filter-project.component.html',
  styleUrls: ['./filter-project.component.scss']
})
export class FilterProjectComponent implements OnInit {
  
  selectedCategory : string = ''
  categories: string[]= []; 
  @Output() selectCategory : EventEmitter<string> = new EventEmitter<string>()
  
  constructor(private productService : ProductService) {
    
  }

  ngOnInit(): void {
    this.getCategories();
      
  }
  getCategories(){
    this.productService.getCategories().subscribe(
      response => this.categories = response
    )

  }
  onChangeCategory($event : any){
    this.selectCategory.emit($event.value)
    console.log($event.value);
    
  }

}
