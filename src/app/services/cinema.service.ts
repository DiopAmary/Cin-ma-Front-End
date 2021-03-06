import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  public host:string = "http://localhost:8080/api"

  constructor(private http:HttpClient) { }

  public getVilles(){
    return this.http.get(this.host+"/villes");
  }

  public getCinemas(v){
    return this.http.get(v._links.cinemas.href);
  }

  public getSalles(c){
    return this.http.get(c._links.salles.href);
  }

  public getProjections(salle){
    let url = salle._links.projections.href.replace("{?projection}", "")
    return this.http.get(url+"?projection=p");
  }

  public getTicketPlace(p){
    let url = p._links.tickets.href.replace("{?projection}", "")
    return this.http.get(url+"?projection=t");
  }

  public payerTicket(formulaire){
    return this.http.post(this.host+ "/payerTickets", formulaire);
  }
}
