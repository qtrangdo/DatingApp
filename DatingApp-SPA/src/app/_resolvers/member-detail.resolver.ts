import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from 'src/app/_models/User';
import { UserService } from '../_services/user.service';
import { AlertifyServiceService } from '../_services/alertify-service.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class MemberDetailResolver implements Resolve<User> {
  constructor (
    private userSerive: UserService,
    private router: Router,
    private alertify: AlertifyServiceService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userSerive.getUser(route.params.id).pipe(
      catchError(err => {
        this.alertify.error("Problem retrieving data");
        this.router.navigate(['/members']);
        return of(null)
      })
    )
  }
}