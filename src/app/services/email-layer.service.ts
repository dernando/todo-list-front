import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EmailLayerService {

    private mailBoxLayerUrk = environment.mailBoxLayer.url;
    private accessKey = environment.mailBoxLayer.accessKey;

    constructor(
        protected http: HttpClient
    ) {

    }
    
    checkEmail(email) {
        
        const checkEmailUrl = 
            `${this.mailBoxLayerUrk}/check?access_key=${this.accessKey}&email=${email}&smtp=1&format=1`;

        return this.http.get(checkEmailUrl).pipe(map(response => response), catchError(err => err));
    
    }
}