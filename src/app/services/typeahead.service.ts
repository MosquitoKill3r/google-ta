import {Injectable} from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {getGeocode, getPlacePredictions} from './google-map-services';
import {catchError, filter, last, map, mergeMap, scan, tap} from 'rxjs/operators';
import {TypeaheadAddressResult} from '../types/address-result';
import {isNullOrUndefined} from 'util';
import GeocoderResult = google.maps.GeocoderResult;
import GeocoderAddressComponent = google.maps.GeocoderAddressComponent;


@Injectable({
  providedIn: 'root'
})
export class TypeaheadService {

  constructor() {
  }

  getAddresses(input: string): Observable<TypeaheadAddressResult[]> {

    from(getGeocode({address: input}))
      .subscribe(results => {
        console.log(results);
      });

    return of([]);

    let placePredictions = getPlacePredictions(input);
    console.log('initial', placePredictions);
    return from(placePredictions)
      .pipe(
        tap(i => console.log('1. raw: ', i)),
        filter(result => !isNullOrUndefined(result.results)),
        map(result => result.results),
        tap(i => console.log('2. map: ', i)),
        mergeMap(a => a),
        tap(i => console.log('3. mergeMap: ', i)),
        map((item: any) => item.description),
        tap(i => console.log('4. map: ', i)),

        mergeMap(addressString => from(getGeocode({address: addressString}))),
        tap(i => console.log('4.1. mergeMap: ', i)),
        filter(result => !isNullOrUndefined(result.results)),
        map(result => result.results),
        // mergeMap(async addressString => (await getGeocode({address: addressString})).results),

        tap(i => console.log('5. mergeMap: ', i)),
        mergeMap(a => a),
        tap(i => console.log('6. mergeMap: ', i)),
        map((result: GeocoderResult) => this.buildTypeAheadResult(result)),
        tap(i => console.log('7. map: ', i)),
        scan((a, c) => [...a, c], []),
        tap(i => console.log('8. scan: ', i)),
        last(),
        catchError((error, caught) => {
          console.error('ERROR nah!', error);
          return of([]);
        })
      ) as any;
  }

  private buildTypeAheadResult(gcResult: GeocoderResult): TypeaheadAddressResult {
    let addressLine1 = '';
    let addressLine2 = '';
    let city = '';
    let state = '';
    let zip = '';

    // console.log('gcResult ', gcResult);
    let addressComponents: GeocoderAddressComponent[] = gcResult.address_components;
    addressComponents.map((addressComponent) => {
      if (addressComponent.types.find(e => e === 'street_number')) {
        addressLine1 += addressComponent.short_name + ' ';
      } else if (addressComponent.types.find(e => e === 'route')) {
        addressLine1 += addressComponent.short_name;
      } else if (addressComponent.types.find(e => e === 'locality')) {
        city = addressComponent.short_name;
      } else if (addressComponent.types.find(e => e === 'administrative_area_level_1')) {
        state = addressComponent.short_name;
      } else if (addressComponent.types.find(e => e === 'postal_code')) {
        zip = addressComponent.short_name;
      }
    });
    return new TypeaheadAddressResult(gcResult.formatted_address, addressLine1, addressLine2, city, state, zip);
  }

}
