import { Component, OnInit, Input } from '@angular/core';
import { Compartment } from './compartment.model';

@Component({
  selector: 'app-compartment',
  templateUrl: './compartment.component.html',
  styleUrls: ['./compartment.component.css']
})
export class CompartmentComponent implements OnInit {
  @Input() public compartment: Compartment;
  private _size: number;

  constructor() {

   }

  ngOnInit() {
    this._size = this.compartment.items.length;
  }

  get size(): number{
    return this._size;
  }

}
