import { Component, OnInit } from '@angular/core';
import {Plant} from "../plante/plante.component";
import {agri} from "../agriculteur/agriculteur.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {ConfirmationService, MessageService} from "primeng-lts/api";


export interface Project {
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
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  projects: Project[];
  plantes: Plant[];
  agriculteurs: agri[];
  formGroup: FormGroup;
  editFormGroup: FormGroup;
  openDialog: boolean;
  edit: boolean;
  currentId: number;

  constructor(private api: ApiService, private confirmationService: ConfirmationService,
              private messageService: MessageService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.api.getProjetFromServer().subscribe((projects: Project[]) => {
        this.projects = projects;
      },
      (error) => {
        console.log('error here =====> ', error)
      });

    this.api.getPlantFromServer().subscribe((plantes: Plant[]) => {
        this.plantes = plantes;
      },
      (error) => {
        console.log('error here =====> ', error)
      });

    this.api.getAgriFromServer().subscribe((agriculteurs: agri[]) => {
        this.agriculteurs = agriculteurs;
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
      datecontact: new Date(projet.datecontact),
      datesemis: new Date(projet.datesemi),
      dateanticiperecolte: new Date(projet.dateanticipederecolte),
      agriculteur: projet.agriculteur,
      plante: projet.plante
    })
    this.edit = true;
  }

  deleteProject(projet: Project) {
    this.projects = this.projects.filter(pro => pro != projet);
    this.messageService.add({severity:'error', summary: 'Succès', detail: 'Projet supprimé', life: 2000});
    this.api.deleteProjectFromServer(projet.id);
  }

  newProjet(): void {
    this.openDialog = true;
  }

  save(): void {
    const data = {
      nom: this.formGroup.get('nom').value,
      etat: this.formGroup.get('etat').value,
      pays: this.formGroup.get('pays').value,
      region: this.formGroup.get('region').value,
      superficie: this.formGroup.get('superficie').value,
      localisation: this.formGroup.get('localisation').value,
      datecontact: this.formGroup.get('datecontact').value,
      datesemis: this.formGroup.get('datesemis').value,
      dateanticiperecolte: this.formGroup.get('dateanticiperecolte').value,
      agriculteur: this.formGroup.get('agriculteur').value,
      plante: this.formGroup.get('plante').value
    }
    this.api.saveProjetToServer(data).subscribe((response) => {
        console.log(response);
      },
      error => {
        this.api.getProjetFromServer().subscribe((projects: Project[]) => {
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
    const project = {
      id: this.currentId,
      nom: this.editFormGroup.get('nom').value,
      etat: this.editFormGroup.get('etat').value,
      pays: this.editFormGroup.get('pays').value,
      region: this.editFormGroup.get('region').value,
      superficie: this.editFormGroup.get('superficie').value,
      localisation: this.editFormGroup.get('localisation').value,
      datecontact: this.editFormGroup.get('datecontact').value,
      datesemis: this.editFormGroup.get('datesemis').value,
      dateanticiperecolte: this.editFormGroup.get('dateanticiperecolte').value,
      agriculteur: this.editFormGroup.get('agriculteur').value,
      plante: this.editFormGroup.get('plante').value
    }
    console.log(project)
    this.api.updateProject(project).subscribe((response) => {
        console.log(response)
      },
      error => {
        this.api.getProjetFromServer().subscribe((projects: Project[]) => {
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

  getAgriculteur(id: number): string {
    return this.agriculteurs ? this.agriculteurs.filter(agriculteur => agriculteur.id === id)[0].nom : '...chargement'
  }

  getPlante(id: number): string {
    return this.plantes ? this.plantes.filter(plante => plante.id === id)[0].nom : '...chargement'
  }
}
