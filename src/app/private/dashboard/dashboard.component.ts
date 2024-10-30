import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [RouterOutlet, FormsModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
  })
  export class DashboardComponent { 

    constructor( private router: Router) {}

    substring() {
      this.router.navigate(['/private/substring']);
    }

    tree() {
      this.router.navigate(['/private/tree']);
    }


  }