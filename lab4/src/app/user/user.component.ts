import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  users: any[] = [];

  userForm = this.fb.group({
    id: [0],
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    type: ['type A'],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#/.,_])[A-Za-z\d@$!%*?&#/.,]{6,}$/)]],
    confirmPassword: ['', [Validators.required]],
    subjects: this.fb.array([
      this.fb.control('')
    ]),
    description: [''],
    sex: ['Male'],
    phone: ['', [Validators.pattern(/^\+380\d{9}$/)]],
    },
    { validator: passwordConfirmationValidator() }
    );

    constructor(private fb: FormBuilder) {

      this.userForm.get('name')?.valueChanges.subscribe(value => {
        console.log('valid:', this.userForm.get('name')?.valid);
        console.log('touched:', this.userForm.get('name')?.untouched);
        console.log('dirty:', this.userForm.get('name')?.dirty);
      });
  }

  addUser() {
    if (this.userForm?.valid) {
      const id = this.users.length + 1;
      this.userForm.get('id')?.setValue(id);
      this.users.push(this.userForm.value);
      this.userForm.reset();
      this.userForm.markAsPristine();
      this.userForm.markAsUntouched();
      this.userForm.markAsPending();
    }
  }

  addSubject() {
    this.subjects.push(this.fb.control(''));
  }

  get subjects() {
    return this.userForm.get('subjects') as FormArray;
  }
  removeSubject(index: number) {
    this.subjects.removeAt(index);
  }
  getAllUsers(){
    console.log(this.users)
  }
  onAddUser() {
    this.addUser();
    this.getAllUsers();
  }

}
function passwordConfirmationValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value === confirmPassword.value) {
      return null;
    } else {
      return { passwordMismatch: true };
    }
  };
}



