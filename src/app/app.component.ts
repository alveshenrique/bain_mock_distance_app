import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Coordinates } from './models/coordinates';
import { NominatinResponse } from './models/nominatin-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  address1 = '';
  address2 = '';
  add1LatLong!: Coordinates;
  add2LatLong!: Coordinates;
  results = '';

  apiUrl = 'https://nominatim.openstreetmap.org/search?q=';
  format = '&format=geocodejson';

  constructor(private http: HttpClient) {

  }


  private buildAPIUrl(address: string) {
    return this.apiUrl + address + this.format;
  }
  
  onClick() {
    let coord1 = this.getCoords(this.address1);
    let coord2 = this.getCoords(this.address2);
    Promise.all([coord1, coord2]).then((values: Coordinates[]) => {
      console.log("All promisses done:");
      console.log(values);
      console.log("Calculating Distance:");
      let d = this.calcCrow(values[0].lat, values[0].lng, values[1].lat, values[1].lng);
      console.log(d);
      let roundDistance = Math.round(d * 100) / 100;
      this.results = 'The calculated distance is: ' + roundDistance + 'km'; 
  });
  }

  private getCoords(address: string): Promise<Coordinates> {
    return new Promise((resolve, reject) => this.http.get<NominatinResponse>(this.buildAPIUrl(address)).subscribe({
      next: (r1) => {
        if(r1.features.length == 0)
        { return console.log("No features found")}
        console.log(r1);
        console.log("Address:")
        let coord: number[] = r1.features[0].geometry.coordinates;
        console.log(coord[0]);
        console.log(coord[1]);
        let latLong: Coordinates = {lat: coord[1], lng: coord[0]};
        console.log(latLong);
        resolve(latLong)
      },
      error: (e) => console.log(e)
    }
    )
    )
  }

  private calcCrow(lat1: number, lon1: number, lat2: number, lon2: number) 
    {
      var R = 6371; // km
      var dLat = this.toRad(lat2-lat1);
      var dLon = this.toRad(lon2-lon1);
      var lat1 = this.toRad(lat1);
      var lat2 = this.toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    // Converts numeric degrees to radians
    private toRad(Value: number) 
    {
        return Value * Math.PI / 180;
    }

}
