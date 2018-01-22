import { Component} from '@angular/core';
import { Http } from '@angular/http/src/http';
import { HttpHandler } from '@angular/common/http/src/backend';
import { HttpClient } from '@angular/common/http';
import {PokemonService} from '../services/pokemon-service'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pokemon Encyclopedia';
  pokemon = '';
  pokemon_url = '';
  pokemon_names : string[];
  pokemon_name: string;
  search_progress = 0;
  show_progress = false;
  types: string[];

  constructor(private pService: PokemonService){
    this.pokemon_names =  pService.get_all_pokemon();
  }

  change_poke (name:string){
    //console.log(this.pService.get_all_pokemon());
    this.show_progress = true;
    this.search_progress = 50;
    this.pokemon_name = name;
    this.pService.get_pokemon(name).subscribe(data =>{
      this.search_progress= 100;
      this.pokemon_name = name;
      this.pokemon_url = data['sprites']['front_default'];
      this.types = [];
      data['types'].forEach(element => {
        this.types.push(element['type']['name']);
      });
            // console.log(p);
            // return p;
            this.show_progress = false;
    })
    
    // ((result) => {
      // console.log(result);
      // this.pokemon_url = result.image_url;
      // this.pokemon_name = result.name;
      // this.types = result.types;
    // });

  //  this.pokemon_url = data.image_url;
  //  this.pokemon_name = data.name;
  //  this.types = data.types;
    //  this.search_progress = 100;
    //  console.log(data);
    // this.pokemon_url = data['sprites']['front_default'];
    // console.log(this.pokemon_url);
    // this.show_progress = false;
  // });
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.pokemon_names.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
  //pService = new PokemonService;

  //pService.get_pokemon(this.pokemon, (result)=>{
    //this.pokemonURL = result;
  //});
  
}
