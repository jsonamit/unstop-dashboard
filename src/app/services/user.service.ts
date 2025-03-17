import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private usersSubject = new BehaviorSubject<User[]>([]);
    users$ = this.usersSubject.asObservable();

    private roleDistributionSubject = new BehaviorSubject<{ [key: string]: number }>({});
    roleDistribution$ = this.roleDistributionSubject.asObservable();

    private users: User[] = [];

    addUser(user: User) {
        this.users.push(user);
        this.usersSubject.next([...this.users]);
        this.updateRoleDistribution();
    }

    updateRoleDistribution() {
        const distribution: { [key: string]: number } = { Admin: 0, Editor: 0, Viewer: 0 };
        this.users.forEach(user => distribution[user.role]++);
        this.roleDistributionSubject.next(distribution);
    }
}
