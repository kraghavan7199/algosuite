import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "../components/footer/footer.component";
import { HeaderComponent } from "../components/header/header.component";



@Component({
    selector: 'app-public',
    standalone: true,
    imports: [RouterOutlet, FooterComponent, HeaderComponent],
    templateUrl: './master-public.component.html'
    
  })
  export class MasterPublicComponent { 
    
  }