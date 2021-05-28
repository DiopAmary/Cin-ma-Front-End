import { CinemaService } from './../services/cinema.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {
  public villes;
  public cinemas;
  public salles;
  public currentVille;
  public currentCinema;
  public currentProjection;

  public selectedTickets;
  constructor(public cinemaService:CinemaService) { }

  ngOnInit(): void {
    this.cinemaService.getVilles()
      .subscribe(data=>{
        this.villes = data;
      },err=>{
        console.log(err)
      }
    );
  }

  onGetCinemas(v){
    this.currentVille = v;
    this.salles = undefined;
    this.cinemaService.getCinemas(v)
      .subscribe(data=>{
        this.cinemas = data;
      },err=>{
        console.log(err)
      }
      );
  }

  onPayTickets(formulaire){
    var tickets= new Array();
    this.selectedTickets.forEach(t=>{
      tickets.push(t.id);
    })
    formulaire.tickets = tickets;
    console.log(formulaire);
    this.cinemaService.payerTicket(formulaire)
      .subscribe(data=>{
         alert("Ticket réservé avec succès")
         this.onGetPlace(this.currentProjection);
      },err=>{
        console.log(err)
      }
      );
  }

  onSelectedTicket(t){
    if(!t.selected){
      t.selected = true;
      this.selectedTickets.push(t);
    }else{
      t.selected = false;
    this.selectedTickets.splice(this.selectedTickets.indexOf(t), 1);
    }
  }

  getTicketClass(t){
    let str = "ticket btn ";
    if(t.reserve == true){
      str+= "btn-success";
    }
    else if(t.selected == true){
      str += "btn-warning";
    }
    else{
      str +="btn-primary";
    }
    return str;
  }

  onGetSalles(c){
    this.currentCinema = c;
    this.cinemaService.getSalles(c)
      .subscribe(data=>{
        this.salles = data;
        this.salles._embedded.salles.forEach(salle=>{
          this.cinemaService.getProjections(salle)
            .subscribe(data=>{
              salle.projections = data;
            },err=>{
              console.log(err)
            }
            );
        })
      },err=>{
        console.log(err)
      }
      );
  }

  onGetPlace(p){
    this.currentProjection = p;
    this.cinemaService.getTicketPlace(p)
      .subscribe(data=>{
        this.currentProjection.tickets = data;
        this.selectedTickets = [];
      },err=>{
        console.log(err)
      }
      );
  }

}
function subscribe(arg0: (data: any) => void, arg1: (err: any) => void) {
  throw new Error('Function not implemented.');
}

