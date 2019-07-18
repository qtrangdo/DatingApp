import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from 'src/app/_models/User';
import { UserService } from '../_services/user.service';
import { AlertifyServiceService } from '../_services/alertify-service.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ListsResolver implements Resolve<User[]> {
  pageNumber = 1;
  pageSize = 5;
  likesParam = 'Likers';

  constructor (
    private userSerive: UserService,
    private router: Router,
    private alertify: AlertifyServiceService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userSerive.getUsers(this.pageNumber.toString(), this.pageSize.toString(), null, this.likesParam).pipe(
      catchError(err => {
        this.alertify.error("Problem retrieving data");
        this.router.navigate(['/lists']);
        return of(null)
      })
    )
  }
}