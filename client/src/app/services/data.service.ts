import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Plant } from '../../models/plant';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiPath: String = 'http://localhost:3000/api';

  constructor( private http: Http ) { }

  getUser(id: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.apiPath + '/user/', '5bc1582c4d699095a5b3446e', {headers: headers})
      .pipe(map(res => res.json()));
    // return this.http.post(this.apiPath + '/garden/', id, {headers: headers})
    //   .pipe(map(res => res.json()));
  }

  getAllPlants() {
    return this.http.get(this.apiPath + '/search')
      .pipe(map(res => res.json()));
  }

  addPlant(newPlant: Plant) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.apiPath + '/new_plant', newPlant, {headers: headers})
      .pipe(map(res => res.json()));
  }

  addToGarden(plant: Plant) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.apiPath + '/garden/', '5bc1582c4d699095a5b3446e', {headers: headers})
      .pipe(map(res => res.json()));
    // return this.http.post(this.apiPath + '/garden/', id, {headers: headers})
    //   .pipe(map(res => res.json()));
  }
}
