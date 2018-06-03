import {HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Freezer } from './freezer/freezer.model';
import { map } from 'rxjs/operators';
import { Compartment } from './compartment/compartment.model';
import { Item } from './item/item.model';


@Injectable()
export class FreezerDataService {

    private readonly _appUrl = '/API';


    constructor(private http : HttpClient) {
    }
    //WORKS
    get freezers(): Observable<Freezer[]> {
      return this.http
        .get(`${this._appUrl}freezers/`)
        .pipe(map((list: any[]): Freezer[] => list.map(Freezer.fromJSON)));
    }
    //WORKS
    getFreezer(id: string): Observable<Freezer> {
      return this.http
        .get(`${this._appUrl}freezers/${id}`)
        .pipe(map(Freezer.fromJSON));
    }
    //WORKS
    addNewFreezer(freezer: Freezer): Observable<Freezer> {
      return this.http
      .post(`${this._appUrl}freezers/`, freezer)
      .pipe(map(Freezer.fromJSON));
    }
    //WORKS
    removeFreezer(fre : Freezer) : Observable<Freezer>{
      return this.http
          .delete('${this._appUrl}freezer/${fre.id}')
          .pipe(map(Freezer.fromJSON));
    }
    //WORKS
    addCompartmentToFreezer(comp: Compartment, fre: Freezer): Observable<Compartment> {
      const theUrl = `${this._appUrl}/freezer/${fre.id}/compartments`;
      return this.http
          .post(theUrl, comp)
          .pipe(map(Compartment.fromJSON));
    }

    getItems(freid: string, compid: string): Observable<Item[]>{
      return this.http
        .get('${this._appUrl}freezers/${freid}/compartments/${compid}/items')
        .pipe(map((list:any): Item[] => list.map(Item.fromJSON)));
    }
  }

