import { Routes } from "@angular/router";
import { SubstringComponent } from "./string-analyzer/substring.component";
import { TreeComponent } from "./tree-visualizer/tree.component";
import { LandingPageComponent } from "../public/landing-page.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MasterPrivateComponent } from "./master-private.component";
import { authGuard } from "../guards/auth-guard";
import { inject } from "@angular/core";




export const PRIVATE_ROUTES: Routes = [

    {
        path: '',
        component: MasterPrivateComponent,
        children: [
            {
                path: 'substring',
                loadComponent: () => 
                    import('./string-analyzer/substring.component').then(m => m.SubstringComponent)
            },
            {
                path: 'tree',
                loadComponent: () => 
                    import('./tree-visualizer/tree.component').then(m => m.TreeComponent)
            },
            {
                path: 'dashboard',
                loadComponent: () => 
                    import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
            }
        ]
    
    }
]