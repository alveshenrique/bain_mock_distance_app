import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NominatinResponse } from './models/nominatin-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  address1 = '';
  address2 = '';

  apiUrl = 'https://nominatim.openstreetmap.org/search?q=Av Ary Barnabé 50 Indaiatuba SP&format=geocodejson';

  constructor(private http: HttpClient) {
    this.http.get<NominatinResponse>(this.apiUrl).subscribe({
      next: (r) => {
        console.log(r.features[0].geometry.coordinates[0]);
        console.log(r.features[0].geometry.coordinates[1])
      }
    }
    );
  }

  findDistance(add1: google.maps.LatLng, add2: google.maps.LatLng) {
    return google.maps.geometry.spherical.computeDistanceBetween(add1, add2);
  }
  
  onClick() {
    console.log("Button Clicked with two addresses: " + this.address1 + ' and ' + this.address2);
  }


}
