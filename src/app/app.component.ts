import { Component} from '@angular/core';
import { Http } from '@angular/http/src/http';
import { HttpHandler } from '@angular/common/http/src/backend';
import { HttpClient } from '@angular/common/http';
import {PokemonService} from '../services/pokemon-service'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

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
  constructor(private pService: PokemonService){
    this.pokemon_names =  pService.get_all_pokemon();
  }

  change_poke (name:string){
    //console.log(this.pService.get_all_pokemon());
   var data = this.pService.get_pokemon(name).subscribe(data=>{
     console.log(data);
    this.pokemon_url = data['sprites']['front_default'];
    console.log(this.pokemon_url);
  });
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
