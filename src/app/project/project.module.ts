import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import {SharedModule} from "primeng-lts/api";
import {RippleModule} from "primeng-lts/ripple";
import {ToastModule} from "primeng-lts/toast";
import {ToolbarModule} from "primeng-lts/toolbar";
import {ButtonModule} from "primeng-lts/button";
import {TableModule} from "primeng-lts/table";
import {InputTextModule} from "primeng-lts/inputtext";
import {DropdownModule} from "primeng-lts/dropdown";
import {RadioButtonModule} from "primeng-lts/radiobutton";
import {InputNumberModule} from "primeng-lts/inputnumber";
import {DialogModule} from "primeng-lts/dialog";
import {ConfirmDialogModule} from "primeng-lts/confirmdialog";
import {CardModule} from "primeng-lts/card";
import {CalendarModule} from "primeng-lts/calendar";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ProjectComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
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
    CalendarModule,
    DropdownModule,
    ReactiveFormsModule
  ]
})
export class ProjectModule { }
