import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Compartment } from './compartment.model';
import { FreezerDataService } from '../freezer-data.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-compartment',
  templateUrl: './compartment.component.html',
  styleUrls: ['./compartment.component.css']
})
export class CompartmentComponent implements OnInit {
  public errorMsg: string;
  @Input() public compartment: Compartment;
  private _size: number;
  
  @Output() public deleteCompartment = new EventEmitter<Compartment>();

  constructor(private _freezerDataService : FreezerDataService) {

   }

  ngOnInit() {
    this._size = this.compartment.items.length;
  }

  get size(): number{
    return this._size;
  }
}
