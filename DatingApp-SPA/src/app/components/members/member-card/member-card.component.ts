import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyServiceService } from 'src/app/_services/alertify-service.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyServiceService
  ) { }

  ngOnInit() {
  }

  sendLike(recipientId: number) {
    const userId = this.authService.decodeToken.nameid;
    this.userService.sendLike(userId, recipientId).subscribe(() => {
      this.alertify.success("You have like " + this.user.knownAs)
    }, err => this.alertify.error(err))
  }
}
