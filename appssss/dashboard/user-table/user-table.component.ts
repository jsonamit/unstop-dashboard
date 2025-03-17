import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from '../../user-form/user-form-dialog/user-form-dialog.component';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'role'];
  dataSource = new MatTableDataSource<User>([]);
  isLoading = true;  // Loading indicator

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngAfterViewInit() {
    setTimeout(() => {
      document.querySelector('mat-table')?.classList.add('loaded');
    }, 100);
    this.userService.users$.subscribe(users => {
      this.dataSource.data = users;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;  // Hide loading indicator
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAddUserDialog() {
    this.dialog.open(UserFormDialogComponent);
  }
}
