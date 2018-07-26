import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Compartment } from './freezer/compartment/compartment.model'
import { Observable } from 'rxjs/Observable';
import { FreezerDataService } from './freezer/freezer-data.service';

@Injectable()
export class CompartmentResolver implements Resolve<Compartment> {
  constructor(private freezerService: FreezerDataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Compartment> {
      return this.freezerService.getCompartment(route.params['id'], route.params['compid']);
    }
}