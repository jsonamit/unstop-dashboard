import { Component, ViewChild, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from '../user-form/user-form-dialog.component';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  standalone: false,
})
export class UserTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'role'];
  dataSource = new MatTableDataSource<User>([]);
  isLoading = true;
  pageIndex: number = 5;
  totalRecords:any;
  allUserData:any = [];
  @Input() pageSize: number = 5;  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Output() page: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  constructor(private userService: UserService, private dialog: MatDialog) {
  
  }

  ngOnInit() {
    setTimeout(() => {
      document.querySelector('mat-table')?.classList.add('loaded');
    }, 100);
    this.userService.users$.subscribe(users => {
      this.allUserData = users;
      this.dataSource.data = users;
      this.totalRecords = users.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAddUserDialog() {
    this.dialog.open(UserFormDialogComponent);
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.dataSource.data = this.allUserData.slice(startIndex, endIndex);
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.totalRecords = this.allUserData.length;
    this.page.emit(event);  
  }
}
