import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FreezerDataService } from '../freezer-data.service';
import { Freezer } from '../freezer/freezer.model';

@Component({
  selector: 'app-freezer-detail',
  templateUrl: './freezer-detail.component.html',
  styleUrls: ['./freezer-detail.component.css']
})
export class FreezerDetailComponent implements OnInit {
  public errorMsg: string;
  private _freezer : Freezer;
  private _size : number;

  constructor(private route : ActivatedRoute, 
              private _freezerDataService : FreezerDataService) { }

  ngOnInit() {
    this.route.data.subscribe(
      item => this._freezer = item['freezer'],
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${
          error.status
        } while trying to retrieve freezer: ${error.error}`;
      }
    );

  }

  get freezer(){
    return this._freezer;
  }

  addCompartment(){

  }

  removeCompartment(){
    
  }

}
