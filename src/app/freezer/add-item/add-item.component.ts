import { Component, OnInit } from '@angular/core';
import { FreezerDataService } from '../freezer-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Freezer } from '../freezer/freezer.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Compartment } from '../compartment/compartment.model';
import { Item } from '../item/item.model';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  errorMsg: string;
  public itemForm: FormGroup;
  public _freezersArr: Freezer[];
  public _compArr: Compartment[];

  constructor(private fb: FormBuilder, private _freezerDataService : FreezerDataService) { }

  ngOnInit() {
    this.itemForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      quantity: ['', [Validators.required]],
      freezers: ['', [Validators.required]],
      compartments: ['', [Validators.required]]
    });

    this._freezerDataService.freezers
        .subscribe(items => (this._freezersArr = items),
        (error: HttpErrorResponse) => {
          this.errorMsg = `Error ${
            error.status
          } while trying to retrieve freezers: ${error.error}`;
        });
    this.onChanges();
  }
  //listen to changes on the freezer dropdownlist to fill the compartment array
  onChanges(): void{
    this.itemForm.get('freezers').valueChanges
    .subscribe(val =>
      {
        for(let f of this._freezersArr){
          if(f.name == this.itemForm.get('freezers').value)
            this._compArr = f.compartments;
        }
      },
    (error: HttpErrorResponse) => {
      this.errorMsg = `Error ${
        error.status
      } while trying to retrieve freezers: ${error.error}`;
    })
    
  }
  //submit the new item
  OnSubmitItem(){
    //new item with data from form
    let it = new Item(this.itemForm.get('name').value, this.itemForm.get('quantity').value);

    //find the id of the correct freezer
    let freid;
    for(let fre of this._freezersArr){
      if(fre.name == this.itemForm.get('freezers').value)
        freid = fre.id;
    }

    //find the id of the correct compartment
    let compid;
    for(let comp of this._compArr){
      if(comp.name == this.itemForm.get('compartments').value)
        compid = comp.id;
    }

    //pass it on to freezerdataservice to save to the backend
    this._freezerDataService.addItemToCompartment(it, freid, compid).subscribe();
  }
}
