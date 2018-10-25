import { GardenPlant } from './../../models/gardenPlant';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
  admin?: boolean;
  phone?: number;
  zone?: number;
  zip?: number;
  garden?: Array<GardenPlant>;
}

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

@Injectable()
export class AuthenticationService {
  private token: string;

  apiPath: String = 'http://localhost:3000/api';

    // CORS config
    corsUrl = 'https://cors-anywhere.herokuapp.com/';

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post'|'get' | 'put', type: 'login'|'register'|'user', user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(this.apiPath + '/' + type, user);
    } else if (method === 'get') {
      base = this.http.get(this.apiPath + '/' + type, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    } else if ( method === 'put') {
      base = this.http.put(this.apiPath + '/' + type, user, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data && data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public getUser(): Observable<any> {
    return this.request('get', 'user');
  }

  public updateUser(user: TokenPayload): Observable<any> {
    return this.request('put', 'user', user);
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }

  public setUser(credentials) {
    // Latitude and Longitude to use for Frostline API
    let lat: number;
    let lon: number;

    this.doCORSRequest({
      method: 'GET',
      url: 'https://phzmapi.org/' + credentials.zip + '.json',
    }, function printResult(result) {
        console.log(result);
        credentials.zone = result.zone;
        lat = result.lat;
        lon = result.lon;
    });
  }

  public doCORSRequest(options, printResult) {
    const x = new XMLHttpRequest();
    x.open(options.method, this.corsUrl + options.url);
    x.onload = x.onerror = () => {
      printResult(x.responseText);
    };
    x.send(options.data);
  }
}
