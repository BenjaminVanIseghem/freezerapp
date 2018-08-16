import { Component, OnInit } from '@angular/core';
import { Freezer } from '../freezer/freezer.model';
import { FreezerDataService } from '../freezer-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-freezer-list',
  templateUrl: './freezer-list.component.html',
  styleUrls: ['./freezer-list.component.css']
})
export class FreezerListComponent implements OnInit {

  public filterFreezerName: string;
  public filterFreezer$ = new Subject<string>();
  
  private _freezers : Freezer[];
  public errorMsg;

  constructor(private _freezerDataService : FreezerDataService) { 
    this.filterFreezer$
      .pipe(
        distinctUntilChanged(),
        debounceTime(400),
        map(val => val.toLowerCase())
      )
      .subscribe(val => (this.filterFreezerName = val));
  }

  ngOnInit() {
    this._freezerDataService.freezers
        .subscribe(items => (this._freezers = items),
        (error: HttpErrorResponse) => {
          this.errorMsg = `Error ${
            error.status
          } while trying to retrieve freezers: ${error.error}`;
        });
  }

  get freezers(){
    return this._freezers;
  }

  removeFreezer(freezer: Freezer) {
    this._freezerDataService.removeFreezer(freezer).subscribe(
      item => (this._freezers = this._freezers.filter(val => item.id !== val.id)),
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${error.status} while removing freezers for ${
          freezer.name
        }: ${error.error}`;
      }
    );
  }


}
