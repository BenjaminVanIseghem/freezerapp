import { Component, OnInit } from '@angular/core';
import { FreezerDataService } from '../freezer-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Freezer } from '../freezer/freezer.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  errorMsg: string;
  public itemForm: FormGroup;
  private _freezersArr: Freezer[];

  constructor(private fb: FormBuilder, private _freezerDataService : FreezerDataService) { }

  ngOnInit() {
    this.itemForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      freezers: ['', [Validators.required]]
    });

    this._freezerDataService.freezers
        .subscribe(items => (this._freezersArr = items),
        (error: HttpErrorResponse) => {
          this.errorMsg = `Error ${
            error.status
          } while trying to retrieve freezers: ${error.error}`;
        });
  }

  OnSubmitItem(){
    console.log("added");
  }
}
