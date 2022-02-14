import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {ConfirmationService, MessageService} from "primeng-lts/api";

export interface project {
  id: number,
  nom: string,
  etat: string,
  pays: string,
  region: string,
  superficie: number,
  localisation: string,
  datecontact: Date,
  datesemis: Date,
  dateanticiperecolte: Date,
  agriculteur: number,
  plante: number
}

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})
export class ProjetComponent implements OnInit {

  projects: project[];
  formGroup: FormGroup;
  editFormGroup: FormGroup;
  openDialog: boolean;
  edit: boolean;
  currentId: number;

  constructor(private api: ApiService, private confirmationService: ConfirmationService,
              private messageService: MessageService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.api.getProjetFromServer().subscribe((projects: project[]) => {
        this.projects = projects;
      },
      (error) => {
        console.log('error here =====> ', error)
      });

    this.formGroup = this.formBuilder.group({
      nom: ['', Validators.required],
      etat: ['', Validators.required],
      pays: ['', Validators.required],
      region: ['', Validators.required],
      superficie: ['', Validators.required],
      localisation: ['', Validators.required],
      datecontact: ['', Validators.required],
      datesemis: ['', Validators.required],
      dateanticiperecolte: ['', Validators.required],
      agriculteur: ['', Validators.required],
      plante: ['', Validators.required]
    })

    this.editFormGroup = this.formBuilder.group({
      nom: ['', Validators.required],
      etat: ['', Validators.required],
      pays: ['', Validators.required],
      region: ['', Validators.required],
      superficie: ['', Validators.required],
      localisation: ['', Validators.required],
      datecontact: ['', Validators.required],
      datesemis: ['', Validators.required],
      dateanticiperecolte: ['', Validators.required],
      agriculteur: ['', Validators.required],
      plante: ['', Validators.required]
    })
  }

  editProject(projet: any) {
    this.currentId = projet.id
    this.editFormGroup.setValue({
      nom: projet.nom,
      etat: projet.etat,
      pays: projet.pays,
      region: projet.region,
      superficie: projet.superficie,
      localisation: projet.localisation,
      datecontact: projet.datecontact,
      datesemis: projet.datesemis,
      dateanticiperecolte: projet.dateanticiperecolte,
      agriculteur: projet.agriculteur,
      plante: projet.plante
    })
    this.edit = true;
  }

  deleteProject(projet: project) {
    this.projects = this.projects.filter(pro => pro != projet);
    this.messageService.add({severity:'error', summary: 'Succès', detail: 'Projet supprimé', life: 2000});
    this.api.deleteProjectFromServer(projet.id);
  }

  newProjet(): void {
    this.openDialog = true;
  }

  save(): void {
    const data = {
      nom: this.formGroup.get('nom'),
      etat: this.formGroup.get('etat'),
      pays: this.formGroup.get('pays'),
      region: this.formGroup.get('region'),
      superficie: this.formGroup.get('superficie'),
      localisation: this.formGroup.get('localisation'),
      datecontact: this.formGroup.get('datecontact'),
      datesemis: this.formGroup.get('datesemis'),
      dateanticiperecolte: this.formGroup.get('dateanticiperecolte'),
      agriculteur: this.formGroup.get('agriculteur'),
      plante: this.formGroup.get('plante')
    }
    this.api.saveProjetToServer(data).subscribe((response) => {
        console.log(response);
      },
      error => {
        this.api.getProjetFromServer().subscribe((projects: project[]) => {
            this.projects = projects;
            this.openDialog = false;
            this.messageService.add({severity:'success', summary: 'Succès', detail: 'Projet ajouté', life: 2000});
          },
          (error) => {
            console.log('error here =====> ', error)
          });
      });
  }

  update(): void {
    const plant = {
      id: this.currentId,
      nom: this.formGroup.get('nom'),
      etat: this.formGroup.get('etat'),
      pays: this.formGroup.get('pays'),
      region: this.formGroup.get('region'),
      superficie: this.formGroup.get('superficie'),
      localisation: this.formGroup.get('localisation'),
      datecontact: this.formGroup.get('datecontact'),
      datesemis: this.formGroup.get('datesemis'),
      dateanticiperecolte: this.formGroup.get('dateanticiperecolte'),
      agriculteur: this.formGroup.get('agriculteur'),
      plante: this.formGroup.get('plante')
    }
    this.api.updateProject(plant).subscribe((response) => {
        console.log(response)
      },
      error => {
        this.api.getAgriFromServer().subscribe((projects: project[]) => {
            this.projects = projects;
            this.openDialog = false;
            this.messageService.add({severity:'success', summary: 'Succès', detail: 'Projet modifié', life: 2000});
          },
          (error) => {
            console.log('error here =====> ', error)
          });
      })
    this.edit = false;
  }
}
