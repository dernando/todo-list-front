import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ValidatorService } from "../../../services/validator.service";

@Component({
  selector: 'app-validation-form',
  templateUrl: './validation-form.component.html',
  styleUrls: ['./validation-form.component.scss']
})
export class ValidationFormComponent {

  validationForm = this.formBuilder.group({
    password: [null],
  });

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ValidationFormComponent>
  ) { }

  onSubmit() {

    const password = this.validationForm.value.password;

    this.dialogRef.close(password);

  }

}
