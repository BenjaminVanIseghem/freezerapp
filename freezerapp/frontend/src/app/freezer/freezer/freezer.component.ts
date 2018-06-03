import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Freezer } from './freezer.model';
import { FreezerDataService } from '../freezer-data.service';

@Component({
  selector: 'app-freezer',
  templateUrl: './freezer.component.html',
  styleUrls: ['./freezer.component.css']
})
export class FreezerComponent implements OnInit {
  @Input() freezer : Freezer;
  @Output() public deleteFreezer = new EventEmitter<Freezer>();

  constructor(private _freezerDataService: FreezerDataService) {
  }

  ngOnInit() {
  }

  removeFreezer() {
    this.deleteFreezer.emit(this.freezer);
  }
}
  
