import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {

    constructor(
        private _snackBar: MatSnackBar
    ){}

    showMessage(message, type, action=":)") {
        this._snackBar.open(message,action, {
            duration: 2000,
            panelClass: [type]
        });
    }

    showSuccessMessage(message="Ação realizada com sucesso.") {
        this.showMessage(message, "success");
    }

    showErrorMessage(message="Erro ao realizar ação.") {
        this.showMessage(message, "error", ":(");
    }

}