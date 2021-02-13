import { environment } from '../../environments/environment';

import { Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export class BaseResourceService<T> {

  protected http: HttpClient;
  headers = new HttpHeaders();
  private baseUrlApi = environment.apiUrl;
  private finalUrl: string;
  constructor(
    protected apiPath: string,
    protected injector: Injector
  ) {
    this.http = injector.get(HttpClient);
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
  }

  getBaseUrl() {
    this.finalUrl = `${this.baseUrlApi}/${this.apiPath}`;
  }

  getAll(): Observable<T[]> {
    this.getBaseUrl();
    return this.http.get(this.finalUrl).pipe(catchError(this.handleError), map(this.jsonDatatoResources));
  }

  getById(id: number): Observable<T> {
    this.getBaseUrl();
    
    const url = `${this.finalUrl}/${id}`;
    
    return this.http.get(url).pipe(map(this.jsonDatatoResource), catchError(this.handleError));
  }

  create(resource: T): Observable<T> {
    this.getBaseUrl();
    return this.http.post(this.finalUrl, resource).pipe(map(this.jsonDatatoResource), catchError(this.handleError));
  }

  update(resource: T, id:number): Observable<T> {
      this.getBaseUrl();
      const url = id ? `${this.finalUrl}/${id}` : this.finalUrl;
      
      return this.http.put(url, resource).pipe(map(this.jsonDatatoResource), catchError(this.handleError));
  }
  
  protected jsonDatatoResources(jsonData: any[]): T[] {
    return jsonData;
  }
  
  protected jsonDatatoResource(jsonData: any): T {
    return jsonData as T;
  }
  
  protected handleError(error: any): Observable<any> {
    throw new Error(error.message);
  }

}