import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.css'],
  standalone: false,
})
export class UserFormDialogComponent implements OnInit {
  userForm: FormGroup;
  roles = [
    { label: 'Admin', role: 'Admin' },
    { label: 'Editor', role: 'Editor' },
    { label: 'Viewer', role: 'Viewer' },
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserFormDialogComponent>
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['Viewer', Validators.required]
    });
  }

  ngOnInit(): void {
    
  }

  submit() {
    if (this.userForm.valid) {
      const user = { id: Date.now(), ...this.userForm.value };
      this.userService.addUser(user);
      this.dialogRef.close();
    }
  }
}
