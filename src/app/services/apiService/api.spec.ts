import {inject, async, TestBed} from '@angular/core/testing';
import {Http, BaseRequestOptions, Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {ApiService} from './apiService';
import {ToasterService} from "../../components/toaster/toaster.component";
import {StoreService} from "../storeService/storeService";


describe('ApiService', ()=> {
  let apiService: ApiService;
  let mockService: MockBackend;

  beforeEach(()=> {
    TestBed.configureTestingModule({
      providers: [
        ApiService, MockBackend, BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options)=>new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        },
        {
          provide: ToasterService,
          useFactory: ()=>({
            showToaster(){
            }
          })
        },
        {
          provide: StoreService,
          useFactory: ()=>({
            dispatch(){
            }
          })
        }
      ]
    });
  });

  beforeEach(inject([ApiService, MockBackend], (service, mock)=> {
    apiService = service;
    mockService = mock;
  }));

  it('should make a get request', async(()=> {
    let response = {items: [1, 2, 3]};
    mockService.connections.subscribe(connection=> {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(response),
        status: 200
      })))
    });

    apiService.get('/anyPathHere')
      .subscribe(items=> {
        expect(items).toEqual(response);
      })

  }));

  it('should make a post request', async(()=> {
    let response = {};
    mockService.connections.subscribe(connection=> {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(response),
        status: 201
      })))
    });

    apiService.post('/anyPathHere', {})
      .subscribe(items=> {
        expect(items).toEqual(response);
      })

  }));

  it('should make a put request', async(()=> {
    let response = {};
    mockService.connections.subscribe(connection=> {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(response),
        status: 201
      })))
    });

    apiService.put('/anyPathHere', {})
      .subscribe(items=> {
        expect(items).toEqual(response);
      })

  }));

  it('should make a delete request', async(()=> {
    mockService.connections.subscribe(connection=> {
      connection.mockRespond(new Response(new ResponseOptions({
        status: 201
      })))
    });

    apiService.delete('/anyPathHere')
      .subscribe(resp=> {
        expect(resp.status).toBe(201);
      })

  }));

});
