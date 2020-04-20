import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {TypeaheadService} from '../services/typeahead.service';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {isNullOrUndefined} from 'util';
import {TypeaheadAddressResult} from '../types/address-result';


@Component({
  selector: 'app-mycomp',
  templateUrl: './mycomp.component.html',
  styleUrls: ['./mycomp.component.scss']
})
export class MycompComponent implements OnInit {

  taInput = new FormControl('');

  addresses: TypeaheadAddressResult[];

  constructor(
    private typeaheadService: TypeaheadService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.taInput.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe((value: string) => {
        if (!isNullOrUndefined(value) && value.trim().length > 0) {
          this.typeaheadService.getAddresses(value).subscribe((results) => {
            console.log('---------------------------------');
            console.log(results);
            console.log('---------------------------------');
            this.addresses = results;
          });
        } else {
          this.addresses = [];
        }
      });
  }
}
