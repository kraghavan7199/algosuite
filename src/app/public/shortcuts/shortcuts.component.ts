import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import {Location } from '@angular/common';

@Component({
  selector: 'app-shortcuts',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './shortcuts.component.html',
  styleUrl: './shortcuts.component.css'
})
export class ShortcutsComponent {
  constructor( private router: Router, private location: Location) {}

  goBack() {
    this.location.back();
  }
}