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
      },err=>{
        console.log(err)
      }
      );
  }

}
