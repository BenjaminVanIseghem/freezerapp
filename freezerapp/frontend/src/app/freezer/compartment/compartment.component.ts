import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Compartment } from './compartment.model';
import { FreezerDataService } from '../freezer-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Freezer } from '../freezer/freezer.model';
import { Item } from '../item/item.model';

@Component({
  selector: 'app-compartment',
  templateUrl: './compartment.component.html',
  styleUrls: ['./compartment.component.css']
})
export class CompartmentComponent implements OnInit {
  public errorMsg: string;
  @Input() public compartment: Compartment;
  @Input() public freezer: Freezer;
  public items: Item[]
  
   @Output() public deleteCompartment = new EventEmitter<Compartment>();

  constructor(private _freezerDataService : FreezerDataService) {

   }

  ngOnInit() {
    //very strange situation in the file
    //when a compartment is loaded via the input tag
    //it only has the item id, no other details
    //so all the id's are there but the other data is just gone
    //the getCompartment method I created to fix this may seem unnecessary but I've spent too much time on this.
    //With this, it works
    this._freezerDataService.getCompartment(this.freezer.id, this.compartment.id).subscribe(comp =>{
      this.items = comp.items;
    })
  }
  removeCompartment() {
    this.deleteCompartment.emit(this.compartment);
  }
}
