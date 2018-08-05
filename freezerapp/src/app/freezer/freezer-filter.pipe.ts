import { Pipe, PipeTransform } from '@angular/core';
import { Freezer } from './freezer/freezer.model';

@Pipe({
  name: 'freezerFilter'
})
export class FreezerFilterPipe implements PipeTransform {
  transform(freezers: Freezer[], name: string): Freezer[] {
    if (!name || name.length === 0) {
      return freezers;
    }
    return freezers.filter(
      fre => fre.name && fre.name.toLowerCase().startsWith(name.toLowerCase())
    );
  }
}
