import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Freezer } from './freezer/freezer.model'
import { Observable } from 'rxjs/Observable';
import { FreezerDataService } from './freezer-data.service';

@Injectable()
export class FreezerResolver implements Resolve<Freezer> {
  constructor(private freezerService: FreezerDataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Freezer> {
      return this.freezerService.getFreezer(route.params['id']);
    }
}