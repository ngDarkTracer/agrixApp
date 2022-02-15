import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  serverAdress = 'https://agrixllorel.herokuapp.com';

  constructor(private httpClient: HttpClient) { }

  getPlantFromServer(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.serverAdress + '/plante', { responseType: "json" });
  }
  getAgriFromServer(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.serverAdress + '/agriculteur', { responseType: "json" });
  }
  getProjetFromServer(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.serverAdress + '/projet', { responseType: "json" });
  }

  savePlantToServer(data): Observable<any[]> {
    return this.httpClient.post<any[]>(this.serverAdress + '/savePlant', data);
  }

  saveAgriToServer(data): Observable<any[]> {
    return this.httpClient.post<any[]>(this.serverAdress + '/saveAgri', data);
  }

  saveProjetToServer(data): Observable<any[]> {
    console.log(data)
    return this.httpClient.post<any[]>(this.serverAdress + '/saveProject', data);
  }

  deletePlantFromServer(id: number) {
    this.httpClient.get(this.serverAdress + '/deletePlant/' + id).subscribe((response) => {
      console.log(response)
    },
      error => {
        console.log(error)
      })
  }

  deleteAgriFromServer(id: number) {
    this.httpClient.get(this.serverAdress + '/deleteAgri/' + id).subscribe((response) => {
        console.log(response)
      },
      error => {
        console.log(error)
      })
  }

  deleteProjectFromServer(id: number) {
    this.httpClient.get(this.serverAdress + '/deleteProject/' + id).subscribe((response) => {
        console.log(response)
      },
      error => {
        console.log(error)
      })
  }

  updatePlant(plant: any): Observable<any> {
    return this.httpClient.post(this.serverAdress + '/updatePlant', plant);
  }

  updateProject(project: any): Observable<any> {
    return this.httpClient.post(this.serverAdress + '/updateProject', project)
  }

  updateAgri(agri: any): Observable<any> {
    return this.httpClient.post(this.serverAdress + '/updateAgri', agri);
  }
}
