import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ToasterService, ToasterTypes} from '../../components/toaster'
import {StoreService} from '../storeService/storeService';
import {DROP_TOKEN} from '../authService/actions';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {
  headers: Headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  });
  api_url: string = 'https://my-bootcamp.herokuapp.com';
  // api_url: string = 'http://localhost:3030';

  constructor(private http: Http, private toaster: ToasterService, private storageService: StoreService) {
  }

  private checkForError(response: Response): Response | Observable<any> {
    if (response.status === 401) {
      this.toaster.showToaster('Unauthorized access attempt', ToasterTypes.error);
      //remove token from auth service, rest shoud be up to auth service
      this.storageService.dispatch({type:DROP_TOKEN});
    }
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      const body = response.json();
      this.toaster.showToaster(body.message, ToasterTypes.error);
      error['response'] = response;
      return Observable.throw(error);
    }
  }

  get(path: string): Observable<any> {
    return this.http.get(`${this.api_url}${path}`, {headers: this.headers})
      .catch(this.checkForError.bind(this))
      .map((r:Response)=>r.json())
  }

  post(path: string, body: any): Observable<any> {
    return this.http.post(
      `${this.api_url}${path}`,
      JSON.stringify(body),
      {headers: this.headers}
    )
      .catch(this.checkForError.bind(this))
      .map((r:Response)=>r.json())
  }

  delete(path: string): Observable<any> {
    return this.http.delete(
      `${this.api_url}${path}`,
      {headers: this.headers}
    )
      .catch(this.checkForError.bind(this))
  }

  put(path: string, body: any): Observable<any> {
    return this.http.put(
      `${this.api_url}${path}`,
      JSON.stringify(body),
      {headers: this.headers}
    )
      .catch(this.checkForError.bind(this))
      .map((r:Response)=>r.json())
  }


  setHeaders(headers) {
    Object.keys(headers).forEach(header => this.headers.set(header, headers[header]));
  }
}
