import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyServiceService } from 'src/app/_services/alertify-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;

  constructor (
    private userService: UserService,
    private alertify: AlertifyServiceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadUser()
  }

  loadUser() {
    const id = +this.route.snapshot.params['id'];
    // '+' is used to convert id from string to number
    this.userService.getUser(id).subscribe(user => this.user = user,
      err => this.alertify.error(err)
    );
  }
}
