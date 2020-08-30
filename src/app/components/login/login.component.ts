import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public alert: 'success' | 'error';

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  public login(): void {
    const username = this.form.get('username').value;
    const password = this.form.get('password').value;
    this.appService.getAccessToken({ username, password }).subscribe(
      (response) => {
        this.appService.setToken(response.access_token);
        this.router.navigate(['/restaurant/dashboard']);
      },
      (error) => {
        console.error(error);
        this.alert = 'error';
      }
    );
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      username: [undefined, Validators.required],
      password: [undefined, Validators.required],
    });
  }
}
