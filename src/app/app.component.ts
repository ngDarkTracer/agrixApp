import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng-lts/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'agrix';

  items: MenuItem[];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Agriculteur',
        icon: 'ri-user-star-line',
        routerLink: '/agriculteur'
      },
      {
        label: 'Plante',
        icon: 'ri-plant-line',
        routerLink: '/plante'
      },
      {
        label: 'Projet',
        icon: 'ri-file-paper-line',
        routerLink: '/projet'
      }
    ];
  }
}
