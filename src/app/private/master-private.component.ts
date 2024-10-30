import { Component } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";





@Component({
    selector: 'app-private',
    standalone: true,
    imports: [ RouterOutlet],
    templateUrl: './master-private.component.html'
    
  })
  export class MasterPrivateComponent { 
    
    constructor(private router: Router, private authService: AuthService) {
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
    
    logout() {
      this.authService.logout();
    }
  }