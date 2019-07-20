import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { UserService } from '../_services/user.service';
import { AlertifyServiceService } from '../_services/alertify-service.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../_models/Message';
import { AuthService } from '../_services/auth.service';


@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
  pageNumber = "1";
  pageSize = "5";
  messageContainer = "Unread";

  constructor (
    private userSerive: UserService,
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyServiceService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
    const userId = this.authService.decodeToken.nameid;
    return this.userSerive.getMessages(userId,this.pageNumber, this.pageSize, this.messageContainer).pipe(
      catchError(err => {
        this.alertify.error("Problem retrieving messages");
        this.router.navigate(['/']);
        return of(null)
      })
    )
  }
}