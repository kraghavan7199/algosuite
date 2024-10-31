import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shortcuts',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './shortcuts.component.html',
  styleUrl: './shortcuts.component.css'
})
export class ShortcutsComponent {
  constructor( private router: Router) {}
}