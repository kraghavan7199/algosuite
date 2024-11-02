import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/state';
import { selectUserProfile } from '../../store/selectors';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgbModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
   
    name: string | null;
    isCollapsed = true;
    
    constructor(private router: Router, private authService: AuthService,  private store: Store<{ auth: AuthState }>) {
        this.name = null;
    }

    ngOnInit() {
      this.store.select(selectUserProfile).subscribe(res => {
        if(res && res.name) {
          this.name = res.name;
        }
      })
    }

 

    navigateToHome() {
      this.router.navigate(['/private/dashboard'])
    }

    navigateToStringAnalyzer() {
      this.router.navigate(['/private/substring']);
    }

    navigateToTree() {
      this.router.navigate(['/private/tree']);
    }

    navigateToLanding() {
      this.router.navigate(['/landing'])
    }

    navigateToAuth() {
        this.router.navigate(['/auth']);
    }    
    logout() {
      this.authService.logout();
    }

    
}