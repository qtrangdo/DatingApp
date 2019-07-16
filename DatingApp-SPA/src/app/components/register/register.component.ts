import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyServiceService } from 'src/app/_services/alertify-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter()
  model: any = {};
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl(),
    })
  }

  register() {
    // this.authService.register(this.model).subscribe(() => {
    //   this.alertifyService.success('Registered');
    //   this.router.navigate(['/'])
    // }, err => {
    //   this.alertifyService.error(err)
    // });
    console.log(this.registerForm.value);
  }

  cancel() {
    this.cancelRegister.emit(true);
  }
}
