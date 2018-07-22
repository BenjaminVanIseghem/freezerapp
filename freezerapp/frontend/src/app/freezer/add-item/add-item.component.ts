import { Component, OnInit } from '@angular/core';
import { FreezerDataService } from '../freezer-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Freezer } from '../freezer/freezer.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Compartment } from '../compartment/compartment.model';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  errorMsg: string;
  public itemForm: FormGroup;
  private _freezersArr: Freezer[];
  private _compArr: Compartment[];

  constructor(private fb: FormBuilder, private _freezerDataService : FreezerDataService) { }

  ngOnInit() {
    this.itemForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
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
    
    console.log("added");
  }
}
