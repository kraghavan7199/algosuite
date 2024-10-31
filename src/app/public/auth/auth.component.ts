import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { AuthState } from '../../store/state';
import * as AuthActions from '../../store/actions'
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { selectError } from '../../store/selectors';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, CommonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoginMode = true;
  loginForm: FormGroup;
  signupForm: FormGroup;
  loading: boolean = false;
  error: any;
  constructor(private store: Store<{ auth: AuthState }>, private authService: AuthService, private fb: FormBuilder,  private messageService: MessageService) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {

  }


  onSubmit() {
    
    if (this.isLoginMode) {
      if (this.loginForm.valid) {
        this.loading = true;
        this.store.dispatch(AuthActions.login({ credentials: this.loginForm.value }));
        this.store.select(selectError).subscribe(res => {
          if(res) {
              this.error = res.error
          }
        })
      }
    } else {
      if (this.signupForm.valid) {
        this.loading = true;
        this.store.dispatch(AuthActions.signup({ credentials: this.signupForm.value }))
        this.store.select(selectError).subscribe(res => {
          console.log(res)
          if(res)
            this.error = res.error
        })
      }
    }
  }
}