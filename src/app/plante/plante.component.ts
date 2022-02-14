import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";
import {ConfirmationService, MessageService} from "primeng-lts/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

export interface Plant {
  id: number,
  nom: string,
  periodicite: number,
  type_de_semence: string
}

@Component({
  selector: 'app-plante',
  templateUrl: './plante.component.html',
  styleUrls: ['./plante.component.scss']
})
export class PlanteComponent implements OnInit {

  plantes: Plant[];
  formGroup: FormGroup;
  editFormGroup: FormGroup;
  openDialog: boolean;
  edit: boolean;
  currentId: number;

  constructor(private api: ApiService, private confirmationService: ConfirmationService,
              private messageService: MessageService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.api.getPlantFromServer().subscribe((plantes: Plant[]) => {
      this.plantes = plantes;
    },
      (error) => {
        console.log('error here =====> ', error)
      });

    this.formGroup = this.formBuilder.group({
      nom: ['', Validators.required],
      periodicite: ['', Validators.required],
      type_de_semence: ['', Validators.required]
    })

    this.editFormGroup = this.formBuilder.group({
      nom: ['', Validators.required],
      periodicite: ['', Validators.required],
      type_de_semence: ['', Validators.required]
    })
  }

  editPlant(plant: Plant) {
    this.currentId = plant.id
    this.editFormGroup.setValue({
      nom: plant.nom,
      periodicite: plant.periodicite,
      type_de_semence: plant.type_de_semence
    })
    this.edit = true;
  }

  deletePlant(plant: Plant) {
    this.plantes = this.plantes.filter(plante => plante != plant);
    this.messageService.add({severity:'error', summary: 'Succès', detail: 'Plante supprimée', life: 2000});
    this.api.deletePlantFromServer(plant.id);
  }

  newPlant(): void {
    this.openDialog = true;
  }

  save(): void {
    const data = {
      nom: this.formGroup.get('nom').value,
      periodicite: this.formGroup.get('periodicite').value,
      type_de_semence: this.formGroup.get('type_de_semence').value
    }
    this.api.savePlantToServer(data).subscribe((response) => {
        console.log(response);
      },
      error => {
        this.api.getPlantFromServer().subscribe((plantes: Plant[]) => {
            console.log(this.plantes)
            this.plantes = plantes;
            this.openDialog = false;
            this.messageService.add({severity:'success', summary: 'Succès', detail: 'Plante ajoutée', life: 2000});
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
      periodicite: this.editFormGroup.get('periodicite').value,
      type_de_semence: this.editFormGroup.get('type_de_semence').value
    }
    this.api.updatePlant(plant).subscribe((response) => {
        console.log(response)
      },
      error => {
        this.api.getPlantFromServer().subscribe((plantes: Plant[]) => {
            console.log(this.plantes)
            this.plantes = plantes;
            this.openDialog = false;
            this.messageService.add({severity:'success', summary: 'Succès', detail: 'Plante modifiée', life: 2000});
          },
          (error) => {
            console.log('error here =====> ', error)
          });
      })
    this.edit = false;
  }
}
