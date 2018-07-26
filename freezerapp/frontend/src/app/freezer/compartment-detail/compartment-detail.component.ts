import { Component, OnInit } from '@angular/core';
import { Compartment } from '../compartment/compartment.model';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { FreezerDataService } from '../freezer-data.service';

@Component({
  selector: 'app-compartment-detail',
  templateUrl: './compartment-detail.component.html',
  styleUrls: ['./compartment-detail.component.css']
})
export class CompartmentDetailComponent implements OnInit {

  public errorMsg: string;
  private _compartment : Compartment;

  constructor(private route : ActivatedRoute, 
    private _freezerDataService : FreezerDataService) { }

  ngOnInit() {
    this.route.data.subscribe(
      item => this._compartment = item['compartment'],
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${
          error.status
        } while trying to retrieve compartment: ${error.error}`;
      }
    );
  }

}
