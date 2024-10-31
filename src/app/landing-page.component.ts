import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  constructor( private router: Router) {}

    goToDashboard() {
      this.router.navigate(['/private/dashboard'])
    }
    
    goToDocs() {
      this.router.navigate(['/docs'])
    }

    goToShortcuts() {
      this.router.navigate(['/shortcuts'])
    }
}

