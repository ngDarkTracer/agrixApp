import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng-lts/api";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  items: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Agriculteur',
        icon: 'ri-user-star-line',
        routerLink: 'agriculteur'
      },
      {
        label: 'Plante',
        icon: 'ri-plant-line',
        routerLink: 'plante'
      },
      {
        label: 'Projet',
        icon: 'ri-file-paper-line',
        routerLink: 'projet'
      }
    ];
  }
}
