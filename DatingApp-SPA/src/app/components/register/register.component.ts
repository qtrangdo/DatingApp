import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyServiceService } from 'src/app/_services/alertify-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter()
  model: any = {};

  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyServiceService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      this.alertifyService.success('Registered');
      this.router.navigate(['/'])
    }, err => {
      this.alertifyService.error(err)
    });
  }

  cancel() {
    this.cancelRegister.emit(true);
  }
}
