import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from 'src/app/_models/User';
import { UserService } from '../_services/user.service';
import { AlertifyServiceService } from '../_services/alertify-service.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';


@Injectable()
export class MemberEditResolver implements Resolve<User> {
  constructor (
    private userSerive: UserService,
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyServiceService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const currentUserId = this.authService.decodeToken.nameid;
    return this.userSerive.getUser(currentUserId).pipe(
      catchError(err => {
        this.alertify.error("Problem retrieving your data");
        this.router.navigate(['/members']);
        return of(null)
      })
    )
  }
}