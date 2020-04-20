/**
 * Fetches location predictions from Google Maps
 * @summary https://developers.google.com/places/web-service/autocomplete
 * @param input the text string on which to search
 */
export function getPlacePredictions(input: string): Promise<any> {
    const autocompleteService = new google.maps.places.AutocompleteService();

    return new Promise((resolve, reject) => {
        autocompleteService.getPlacePredictions({
            componentRestrictions: { country: ['us'] },
            input,
        }, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                resolve({results});
            } else {
                resolve({error: status});
            }
        });
    });
}

/**
 * Fetches geocode information from Google Maps
 * @summary https://developers.google.com/maps/documentation/geocoding/intro
 * @param request geocode fetch parameters
 */
export function getGeocode(request: google.maps.GeocoderRequest): Promise<any> {
    const geocoder = new google.maps.Geocoder();

    return new Promise((resolve, reject) => {
        geocoder.geocode(request, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                resolve({results});
            } else {
                resolve({error: status});
            }
        });
    });
}

export const DUPLICATE_ENTRY = 'duplicate';
