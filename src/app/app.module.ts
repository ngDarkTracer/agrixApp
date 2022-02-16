import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MenubarModule} from "primeng-lts/menubar";
import {ConfirmationService, MessageService, SharedModule} from "primeng-lts/api";
import {HttpClientModule} from "@angular/common/http";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { MainComponent } from './main/main.component';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {CardModule} from "primeng-lts/card";
import {InputTextModule} from "primeng-lts/inputtext";
import {PasswordModule} from "primeng-lts/password";
import {ButtonModule} from "primeng-lts/button";
import {ApiService} from "./services/api.service";
import {AuthGuard} from "./auth/auth.guard";

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule
  ],
  providers: [
    FormBuilder,
    MessageService,
    ApiService,
    AuthGuard,
    ConfirmationService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
