import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/_models/Message';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyServiceService } from 'src/app/_services/alertify-service.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[]

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyServiceService
  ) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.userService.getMessageThread(this.authService.decodeToken.nameid, this.recipientId)
      .subscribe(messages => this.messages = messages,
        err => this.alertify.error(err)
      )
  }

}
