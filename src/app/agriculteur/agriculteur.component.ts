import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {ConfirmationService, MessageService} from "primeng-lts/api";

export interface agri {
  id: number,
  nom: string,
  sexe: string,
  age: number,
  telephone: string,
  whatsapp: string,
  email: string,
  possede_agrix: boolean,
  biographie: string,
  source: string
}

@Component({
  selector: 'app-agriculteur',
  templateUrl: './agriculteur.component.html',
  styleUrls: ['./agriculteur.component.scss']
})
export class AgriculteurComponent implements OnInit {

  agriculteurs: agri[];
  formGroup: FormGroup;
  editFormGroup: FormGroup;
  openDialog: boolean;
  edit: boolean;
  currentId: number;

  constructor(private api: ApiService, private confirmationService: ConfirmationService,
              private messageService: MessageService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.api.getAgriFromServer().subscribe((agriculteurs: agri[]) => {
        this.agriculteurs = agriculteurs;
      },
      (error) => {
        console.log('error here =====> ', error)
      });

    this.formGroup = this.formBuilder.group({
      nom: ['', Validators.required],
      sexe: ['', Validators.required],
      age: ['', Validators.required],
      telephone: ['', Validators.required],
      whatsapp: ['', Validators.required],
      email: ['', Validators.required],
      possede_agrix: ['', Validators.required],
      biographie: ['', Validators.required],
      source: ['', Validators.required]
    })

    this.editFormGroup = this.formBuilder.group({
      nom: ['', Validators.required],
      sexe: ['', Validators.required],
      age: ['', Validators.required],
      telephone: ['', Validators.required],
      whatsapp: ['', Validators.required],
      email: ['', Validators.required],
      possede_agrix: ['', Validators.required],
      biographie: ['', Validators.required],
      source: ['', Validators.required]
    })
  }

  editAgri(agriculteur: any) {
    this.currentId = agriculteur.id
    this.editFormGroup.setValue({
      nom: agriculteur.nom,
      sexe: agriculteur.sexe,
      age: agriculteur.age,
      telephone: agriculteur.telephone,
      whatsapp: agriculteur.wha,
      email: agriculteur.email,
      possede_agrix: agriculteur.agrix,
      biographie: agriculteur.biographie,
      source: agriculteur.source
    })
    this.edit = true;
  }

  deleteAgri(agriculteur: agri) {
    this.agriculteurs = this.agriculteurs.filter(agri => agri != agriculteur);
    this.messageService.add({severity:'error', summary: 'Succès', detail: 'Agriculteur supprimé', life: 2000});
    this.api.deleteAgriFromServer(agriculteur.id);
  }

  newPlant(): void {
    this.openDialog = true;
  }

  save(): void {
    const data = {
      nom: this.formGroup.get('nom').value,
      sexe: this.formGroup.get('sexe').value,
      age: this.formGroup.get('age').value,
      telephone: this.formGroup.get('telephone').value,
      whatsapp: this.formGroup.get('whatsapp').value,
      email: this.formGroup.get('email').value,
      possede_agrix: this.formGroup.get('possede_agrix').value,
      biographie: this.formGroup.get('biographie').value,
      source: this.formGroup.get('source').value
    }
    this.api.saveAgriToServer(data).subscribe((response) => {
        console.log(response);
      },
      error => {
        this.api.getAgriFromServer().subscribe((agriculteurs: agri[]) => {
            this.agriculteurs = agriculteurs;
            this.openDialog = false;
            this.messageService.add({severity:'success', summary: 'Succès', detail: 'Agriculteur ajouté', life: 2000});
          },
          (error) => {
            console.log('error here =====> ', error)
          });
      });
  }

  update(): void {
    const plant = {
      id: this.currentId,
      nom: this.editFormGroup.get('nom').value,
      sexe: this.editFormGroup.get('sexe').value,
      age: this.editFormGroup.get('age').value,
      telephone: this.editFormGroup.get('telephone').value,
      whatsapp: this.editFormGroup.get('whatsapp').value,
      email: this.editFormGroup.get('email').value,
      possede_agrix: this.editFormGroup.get('possede_agrix').value,
      biographie: this.editFormGroup.get('biographie').value,
      source: this.editFormGroup.get('source').value
    }
    this.api.updateAgri(plant).subscribe((response) => {
        console.log(response)
      },
      error => {
        this.api.getAgriFromServer().subscribe((agriculteurs: agri[]) => {
            this.agriculteurs = agriculteurs;
            this.openDialog = false;
            this.messageService.add({severity:'success', summary: 'Succès', detail: 'Agriculteur modifié', life: 2000});
          },
          (error) => {
            console.log('error here =====> ', error)
          });
      })
    this.edit = false;
  }
}
