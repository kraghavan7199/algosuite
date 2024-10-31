import { Component } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { Store } from "@ngrx/store";
import { AuthState } from "../store/state";
import { selectUserProfile } from "../store/selectors";
import { HeaderComponent } from "../components/header/header.component";
import { FooterComponent } from "../components/footer/footer.component";





@Component({
    selector: 'app-private',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, FooterComponent],
    templateUrl: './master-private.component.html'
    
  })
  export class MasterPrivateComponent { 

    ngOnInit() {

    }
  }