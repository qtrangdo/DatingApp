import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User';
import { ActivatedRoute } from '@angular/router';
import { AlertifyServiceService } from 'src/app/_services/alertify-service.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;

  constructor (
    private route: ActivatedRoute,
    private alertify: AlertifyServiceService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => this.user = data.user,
      err => this.alertify.error(err))
  }

}
