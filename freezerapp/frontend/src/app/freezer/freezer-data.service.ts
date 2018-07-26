import {HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Freezer } from './freezer/freezer.model';
import { map } from 'rxjs/operators';
import { Compartment } from './compartment/compartment.model';
import { Item } from './item/item.model';


@Injectable()
export class FreezerDataService {

    private readonly _appUrl = '/API/';


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
          .delete(`${this._appUrl}freezers/${fre.id}`)
          .pipe(map(Freezer.fromJSON));
    }
    //WORKS
    addCompartmentToFreezer(comp: Compartment, freid: string): Observable<Compartment> {
      const theUrl = `${this._appUrl}freezers/${freid}/compartments`;
      return this.http
          .post(theUrl, comp)
          .pipe(map(Compartment.fromJSON));
    }
    //WORKS
    removeCompartmentFromFreezer(comp: Compartment, freid: string): Observable<Compartment>{
      const theUrl = `${this._appUrl}freezers/${freid}/compartments/${comp.id}`;
      return this.http
          .delete(theUrl)
          .pipe(map(Compartment.fromJSON));
    }
    //WORKS Get a single compartment
    getCompartment(freezerid: string, compid: string): Observable<Compartment>{
      const theUrl = `${this._appUrl}freezers/${freezerid}/compartments/${compid}`;
      return this.http
          .get(theUrl)
          .pipe(map(Compartment.fromJSON))
    }
    //WORKS
    getItems(freid: string, compid: string): Observable<Item[]>{
      const theUrl = `${this._appUrl}freezers/${freid}/compartments/${compid}`;
      return this.http
        .get(theUrl)
        .pipe(map((list:any[]): Item[] => list.map(Item.fromJSON)));
    }
    //WORKS
    addItemToCompartment(item: Item, freid: string, compId: string): Observable<Item>{
      const theUrl = `${this._appUrl}freezers/${freid}/compartments/${compId}/items`;
      return this.http
          .post(theUrl, item)
          .pipe(map(Item.fromJSON));
    }
  }

