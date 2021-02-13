import { Injectable, Injector } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ValidatorService {

    validatePassword(password: string) : boolean {
        return password === environment.superVisorPass;
    }  

}