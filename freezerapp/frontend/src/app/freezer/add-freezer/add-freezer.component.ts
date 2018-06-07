import { Component, OnInit } from '@angular/core';
import { FreezerDataService } from '../freezer-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Freezer } from '../freezer/freezer.model';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Compartment } from '../compartment/compartment.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-add-freezer',
  templateUrl: './add-freezer.component.html',
  styleUrls: ['./add-freezer.component.css']
})
export class AddFreezerComponent implements OnInit {

  public errorMsg: string;
  public freezer: FormGroup;

  constructor(private fb : FormBuilder, private _freezerDataService : FreezerDataService) { }

  ngOnInit() {
    this.freezer = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      compartments: this.fb.array([ this.createCompartments() ])
    });

    this.compartments.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(compList => {
        // if the last entry's name is typed, add a new empty one
        // if we're removing an entry's name, and there is an empty one after that one, remove the empty one
        const lastElement = compList[compList.length - 1];
        if (
          lastElement.compartmentname &&
          lastElement.compartmentname.length > 2
        ) {
          this.compartments.push(this.createCompartments());
        } else if (compList.length >= 2) {
          const secondToLast = compList[compList.length - 2];
          if (
            !lastElement.compartmentname &&
            (!secondToLast.compartmentname ||
              secondToLast.compartmentname.length < 2)
          ) {
            this.compartments.removeAt(this.compartments.length - 1);
          }
        }
      });
  }

  //takes input from the form and sends it to the backend where it gets stored
  onSubmitFreezer() {
    const fre = new Freezer(this.freezer.value.name);
    for (const comp of this.freezer.value.compartments) {
      if (comp.compartmentname.length > 2) {
        const compart = new Compartment(
          comp.compartmentname
        );
        fre.addCompartment(compart);
      }
    }
    this._freezerDataService.addNewFreezer(fre).subscribe(
        () => {},
        (error: HttpErrorResponse) => {
          this.errorMsg = `Error ${error.status} while adding
            freezer for ${fre.name}: ${error.error}`;
        }
      );
  }
  createCompartments(): FormGroup {
    return this.fb.group({
      compartmentname: ['', [Validators.required, 
        Validators.minLength(2)]]
    });
  }

  get compartments(): FormArray {
    return <FormArray>this.freezer.get('compartments');
  }



}
