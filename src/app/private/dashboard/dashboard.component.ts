import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthState } from "../../store/state";
import { selectUserProfile } from "../../store/selectors";

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [RouterOutlet, FormsModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
  })
  export class DashboardComponent { 

    name!: string;
    constructor( private router: Router, private store: Store<{ auth: AuthState }>) {}

    ngOnInit() {
      this.store.select(selectUserProfile).subscribe(res => {
        if(res && res.name) {
          this.name = res.name;
        }
      })
    }

    goToStringAnalysis() {
      this.router.navigate(['/private/substring']);
    }

    goToTreeVisualizer() {
      this.router.navigate(['/private/tree']);
    }


  }