import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './footer.component.html',
})
export class FooterComponent {

    currentYear: number = new Date().getFullYear();
  constructor( private router: Router) {}
}