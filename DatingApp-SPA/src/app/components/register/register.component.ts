import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyServiceService } from 'src/app/_services/alertify-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from 'src/app/_models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter()
  user: User;
  registerForm: FormGroup;
  colorTheme = 'theme-red';
  bsConfig: Partial<BsDatepickerConfig>;

  constructor (
    private authService: AuthService,
    private alertifyService: AlertifyServiceService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    }
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator })
  }
  // FB.GROUP IS EQUIVALENT OF NEW FORMGROUP
  // this.registerForm = new FormGroup({
  //   username: new FormControl('', Validators.required),
  //   password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
  //   confirmPassword: new FormControl('', Validators.required)
  // }, this.passwordMatchValidator)

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true };
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.alertifyService.success("Registration successfully");
      }, err => this.alertifyService.error(err),
        () => this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        })
      )
    }
  }

  cancel() {
    this.cancelRegister.emit(true);
  }
}
