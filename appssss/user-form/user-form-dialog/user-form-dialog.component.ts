import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.css'],
  standalone: false,
})
export class UserFormDialogComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<UserFormDialogComponent>
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['User', Validators.required]
    });
  }

  submit() {
    if (this.userForm.valid) {
      const user = { id: Date.now(), ...this.userForm.value };
      this.userService.addUser(user);
      this.dialogRef.close();
    }
  }
}
