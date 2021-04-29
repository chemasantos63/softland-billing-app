import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';
import { SinginDto } from '../../core/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    if (this.authService.currentUserValue) {
      this.router.navigate(['home']);
    }
  }

  ngOnInit() {}

  async handleSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      const singinDto = this.loginForm.value as SinginDto;
      const user = await this.authService.singin(singinDto);
      if (user) {
        this.router.navigate(['home']);
      }
    }
  }
}
