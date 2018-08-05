import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FreezerDataService } from '../freezer-data.service';
import { Freezer } from '../freezer/freezer.model';
import { Compartment } from '../compartment/compartment.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-freezer-detail',
  templateUrl: './freezer-detail.component.html',
  styleUrls: ['./freezer-detail.component.css']
})
export class FreezerDetailComponent implements OnInit {
  public errorMsg: string;
  private _freezer : Freezer;
  private _size : number;
  public fg : FormGroup;
  

  constructor(private route : ActivatedRoute, 
              private _freezerDataService : FreezerDataService,
              private fb : FormBuilder) { }

  ngOnInit() {
    this.route.data.subscribe(
      item => this._freezer = item['freezer'],
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${
          error.status
        } while trying to retrieve freezer: ${error.error}`;
      }
    );
    this.fg = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  get freezer(){
    return this._freezer;
  }

  onSubmitCompartment() {
    const comp = new Compartment(this.fg.value.name);
    this._freezerDataService.addCompartmentToFreezer(comp, this._freezer.id).subscribe(
        comp => {this._freezer.addCompartment(comp)},
        (error: HttpErrorResponse) => {
          this.errorMsg = `Error ${error.status} while adding
            compartment for ${comp.name}: ${error.error}`;
        }
      );
  }

  removeCompartment(comp: Compartment){
    this._freezerDataService.removeCompartmentFromFreezer(comp, this._freezer.id).subscribe(
      (c) => {this._freezer.removeCompartment(c)},
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${error.status} while deleting
          compartment for ${comp.name}: ${error.error}`;
      }
    );
  }

}
