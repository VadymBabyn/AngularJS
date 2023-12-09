import { Component } from '@angular/core';
import {
  Validators,
  FormArray,
  FormControl,
  AbstractControl,
  ValidationErrors,
  FormGroup,
} from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NotificationService } from './services/notification.service';
import { UserService } from './services/user.service';

interface User {
  id: string;
  name: string;
  lastname: string;
  type: string;
  email: string;
  password: string;
  confirmPassword: string;
  subjects: string[];
  description: string;
  sex: string;
  phone: string;
}

interface ChipItem {
  label: string;
  selected: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //#region
  selectedChip: ChipItem | null = null;

  chipItems: ChipItem[] = [
    { label: 'Batmen', selected: false },
    { label: 'Pantera', selected: false },
    { label: 'Thor', selected: false },
  ];

  images: { [key: string]: string } = {
    Batmen: '../assets/images/1.jpg',
    Pantera: '../assets/images/2.jpg',
    Thor: '../assets/images/3.jpg',
  };

  selectChip(chip: ChipItem) {
    this.selectedChip = chip;
  }
  //#endregion

  usersForm = new FormGroup({
    users: new FormArray([this.getUserFields()]),
  });
  isSmallScreen: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private notificationsService: NotificationService,
    private userService: UserService
  ) {
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });
  }

  generateUniqueId(): string {
    return 'id-' + new Date().getTime();
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value === confirmPassword?.value) {
      confirmPassword?.setErrors(null);
      return null;
    } else {
      confirmPassword?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
  }

  getUserFields() {
    return new FormGroup(
      {
        id: new FormControl(''),
        name: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        type: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/
          ),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/
          ),
        ]),
        subjects: new FormGroup({
          subjectsArray: new FormArray([this.getSubjectFields()]),
        }),
        description: new FormControl(''),
        sex: new FormControl('MALE'),
        phone: new FormControl('', Validators.pattern(/^\+380\d{9}$/)),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  getSubjectFields() {
    return new FormGroup({
      subject: new FormControl(''),
    });
  }

  getUsers() {
    return this.usersForm.get('users') as FormArray;
  }

  addUser() {
    this.getUsers().push(this.getUserFields());
  }

  deleteUser(index: number): void {
    const userId = this.getUsers().at(index).get('id')?.value;
    if (userId) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          this.notificationsService.showSuccess('Користувача успішно видалено');
        },
        (error) => {
          this.notificationsService.showError(
            'Помилка при видаленні користувача'
          );
        }
      );
    }
    this.getUsers().removeAt(index);
  }

  getUserSubjects(userIndex: number) {
    return this.getUsers().at(userIndex).get('subjects') as FormGroup;
  }

  getSubjectArray(userIndex: number) {
    return this.getUserSubjects(userIndex).get('subjectsArray') as FormArray;
  }

  addSubject(index: number) {
    const subjectsArray = this.getSubjectArray(index);
    subjectsArray.push(this.getSubjectFields());
  }

  deleteSubject(userIndex: number, subjectIndex: number) {
    this.getSubjectArray(userIndex).removeAt(subjectIndex);
  }

  onSubmit() {
    this.userService.getUsers().subscribe((existingUsers) => {
      this.usersForm.value.users?.forEach((user, index) => {
        const existingUser = existingUsers.find((u) => u.id === user.id);
        if (!existingUser) {
          if (!user.id) {
            user.id = this.generateUniqueId();
          }
          const userFormGroup = this.getUsers().at(index) as FormGroup;
          userFormGroup.patchValue(user);
          this.userService.createUser(user as User).subscribe(
            (savedUser) => {
              this.notificationsService.showSuccess(
                'Користувачів успішно збережено'
              );
            },
            (error) => {
              this.notificationsService.showError(
                'Помилка при збереженні користувачів'
              );
            }
          );
        } else {
          this.userService.updateUser(user as User).subscribe(
            (updatedUser) => {
              this.notificationsService.showSuccess(
                'Користувачів успішно оновлено'
              );
            },
            (error) => {
              this.notificationsService.showError(
                'Помилка при оновленні користувачів'
              );
            }
          );
        }
      });
      console.log('users', existingUsers);
    });
  }
}
