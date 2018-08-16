import { Component, OnInit } from '@angular/core';
import { Compartment } from '../compartment/compartment.model';
import { HttpErrorResponse } from 'freezerapp/node_modules/@angular/common/http';
import { ActivatedRoute } from 'freezerapp/node_modules/@angular/router';
import { FreezerDataService } from '../freezer-data.service';
import { FormGroup, FormBuilder, Validators } from 'freezerapp/node_modules/@angular/forms';
import { Item } from '../item/item.model';
import { Freezer } from '../freezer/freezer.model';

@Component({
  selector: 'app-compartment-detail',
  templateUrl: './compartment-detail.component.html',
  styleUrls: ['./compartment-detail.component.css']
})
export class CompartmentDetailComponent implements OnInit {

  public errorMsg: string;
  public _compartment : Compartment;
  private _freezer : Freezer;
  public fg : FormGroup;

  constructor(private route : ActivatedRoute, 
    private _freezerDataService : FreezerDataService,
    private fb : FormBuilder) { }

  ngOnInit() {
    this.route.data.subscribe(
      item => {
        this._compartment = item['compartment'],
        this._freezer = item['freezer']
      },
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${
          error.status
        } while trying to retrieve compartment: ${error.error}`;
      }
    );

    this.fg = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      amount: ['', Validators.required],
      detail: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmitItem() {
    const item = new Item(this.fg.value.name, this.fg.value.amount, this.fg.value.detail);
    this._freezerDataService.addItemToCompartment(item, this._freezer.id, this._compartment.id).subscribe(
        item => {this._compartment.addItem(item)},
        (error: HttpErrorResponse) => {
          this.errorMsg = `Error ${error.status} while adding
            item for ${this._compartment.name}: ${error.error}`;
        }
      );
  }

  removeItem(item : Item){
    this._freezerDataService.removeItem(item, this._freezer.id, this._compartment.id).subscribe(
      (it) => {this._compartment.removeItem(it)},
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${error.status} while deleting
          item for ${this._compartment.name}: ${error.error}`;
      }
    );
  }
}
