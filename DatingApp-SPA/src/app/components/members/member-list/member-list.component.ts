import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyServiceService } from 'src/app/_services/alertify-service.service';
import { User } from 'src/app/_models/User';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/Pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [
    { value: "female", display: "Males" },
    { value: "male", display: "Females" },
  ];
  userParams: any = {};
  pagination: Pagination;

  constructor (
    private userService: UserService,
    private alertify: AlertifyServiceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    }, err => this.alertify.error(err));

    this.userParams.gender = this.user.gender === "male" ? "male" : "female";
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = "lastActive";
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  resetFilters() {
    this.userParams.gender = this.user.gender === "male" ? "male" : "female";
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = "lastActive";
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage.toString(), this.pagination.itemsPerPage.toString(), this.userParams).subscribe(
      (res: PaginatedResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      },
      err => this.alertify.error(err));
  }
}
