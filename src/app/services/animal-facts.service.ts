import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class animalFactsService {

    private animalFactsUrl = environment.catFactUrl;
    private animalType = "dog";
    private amount = 3;

    constructor(
        protected http: HttpClient
    ) {}
    
    getFacts() {
        
        const factslUrl = 
            `${this.animalFactsUrl}/facts/random?animal_type=${this.animalType}&amount=${this.amount}`;

        return this.http.get(factslUrl).pipe(map(response => response), catchError(err => err));
    
    }
}