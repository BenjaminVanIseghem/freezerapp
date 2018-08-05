import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, SimpleChange, OnChanges } from '@angular/core';
import { Item } from './item.model';
import { Freezer } from '../freezer/freezer.model';
import { Compartment } from '../compartment/compartment.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() item : Item;
  @Input() freezer : Freezer;
  @Input() compartment : Compartment;
  @Output() public deleteItem = new EventEmitter<Item>();

  constructor() { }

  

  ngOnInit() {
    console.log(this.item);
    console.log(this.freezer.name + ', ' + this.compartment.name)
  }
  
  removeItem() {
    this.deleteItem.emit(this.item);
  }
  addAmount(){
    this.item.add();
  }
  substractAmount(){
    this.item.substract();
  }
}
