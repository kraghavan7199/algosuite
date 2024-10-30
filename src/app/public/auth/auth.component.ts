import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { AuthState } from '../../store/state';
import * as AuthActions from '../../store/actions'

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoginMode = true;
  loginForm: FormGroup;
  signupForm: FormGroup;
  loading: boolean = false;
  constructor(private store: Store<{ auth: AuthState }>, private authService: AuthService, private fb: FormBuilder) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {

  }

  onTabChange(tab: string) {
    if (tab === 'login') {
      this.isLoginMode = true;
    } else if (tab === 'signup') {
      this.isLoginMode = false;
    }
  }

  onSubmit() {
    if (this.isLoginMode) {
      if (this.loginForm.valid) {
        this.loading = true;
        this.store.dispatch(AuthActions.login({ credentials: this.loginForm.value }));
      }
    } else {
      if (this.signupForm.valid) {
        this.loading = true;
        this.authService.register(this.signupForm.value).subscribe(res => {

        });
      }
    }
  }
}