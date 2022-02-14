import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgriculteurRoutingModule } from './agriculteur-routing.module';
import { AgriculteurComponent } from './agriculteur.component';
import {PlanteRoutingModule} from "../plante/plante-routing.module";
import {SharedModule} from "primeng-lts/api";
import {ToastModule} from "primeng-lts/toast";
import {ButtonModule} from "primeng-lts/button";
import {RippleModule} from "primeng-lts/ripple";
import {ToolbarModule} from "primeng-lts/toolbar";
import {TableModule} from "primeng-lts/table";
import {InputTextModule} from "primeng-lts/inputtext";
import {DropdownModule} from "primeng-lts/dropdown";
import {RadioButtonModule} from "primeng-lts/radiobutton";
import {InputNumberModule} from "primeng-lts/inputnumber";
import {DialogModule} from "primeng-lts/dialog";
import {ConfirmDialogModule} from "primeng-lts/confirmdialog";
import {CardModule} from "primeng-lts/card";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng-lts/inputtextarea";


@NgModule({
  declarations: [
    AgriculteurComponent
  ],
  imports: [
    CommonModule,
    AgriculteurRoutingModule,
    SharedModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    ToolbarModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    ConfirmDialogModule,
    CardModule,
    InputTextareaModule,
    DropdownModule,
    ReactiveFormsModule
  ]
})
export class AgriculteurModule { }
