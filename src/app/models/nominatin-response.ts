export class NominatinResponse {
    "features": Feature[];
}

class Feature {
    "geometry": Geometry;
} 

class Geometry {
    "coordinates": number[]; 
}