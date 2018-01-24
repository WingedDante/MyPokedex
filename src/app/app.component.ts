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
  poke: Pokemon;
  error: string;
  constructor(private pService: PokemonService){
    this.pokemon_names =  pService.get_all_pokemon();
  }

  change_poke (name:string){
    this.error = null;
    // console.log(this.pokemon_names.indexOf(name.toLowerCase()));
    if (this.pokemon_names.indexOf(name.substring(0,1).toUpperCase() + name.substring(1,name.length).toLowerCase()) <0){
      this.poke = null;
      this.error = 'Pokemon not found';
      
    }
    //console.log(this.pService.get_all_pokemon());
    this.show_progress = true;
    this.search_progress = 50;
    //this.pokemon_name = name;
    this.pService.get_pokemon(name).subscribe(data =>{
      this.poke = new Pokemon();
      this.poke.stats={
        total: 0,
        hp: 0,
        attack: 0,
        defense: 0,
        spAttack: 0,
        spDefense: 0,
        speed: 0
      };
      this.poke.name = name;
      this.poke.types = [];
      this.search_progress= 100;
      this.pokemon_name = name;
      this.pokemon_url = data['sprites']['front_default'];
      for(var stat = 0; stat < data['stats'].length; stat++){
        this.poke.stats.total += data['stats'][stat].base_stat;
        
        switch (data['stats'][stat].stat.name) {
          case 'speed':
            this.poke.stats.speed = data['stats'][stat].base_stat
            break;
          case 'special-defense':
          this.poke.stats.spDefense = data['stats'][stat].base_stat
            break;
          case 'special-attack':
          this.poke.stats.spAttack = data['stats'][stat].base_stat
            break;
          case 'attack':
          this.poke.stats.attack = data['stats'][stat].base_stat
            break;
          case 'defense':
          this.poke.stats.defense = data['stats'][stat].base_stat
            break;
          case 'hp':
          this.poke.stats.hp = data['stats'][stat].base_stat
            break;
          default:
            break;
        }
      };

      data['types'].forEach(element => {
        this.poke.types.push(element['type']['name']);
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

  getStyle = (item) => {
    switch (item) {
      case 'psychic':
        return '#F85888';
      case 'grass':
        return '#78C850';
      case 'normal':
        return '#A8A878';
      case 'fighting':
        return '#C03028';
      case 'flying':
        return '#A890F0';
      case 'poison':
        return '#A040A0';
      case 'ground':
        return '#E0C068';
      case 'rock':
        return '#B8A038';
      case 'bug':
        return '#A8B820';
      case 'ghost':
        return '#705898';
      case 'steel':
        return '#B8B8D0';
      case 'fire':
        return '#F08030';
      case 'water':
        return '#6890F0';
      case 'electric':
        return '#F8D030';
      case 'ice':
        return '#98D8D8';
      case 'dragon':
        return '#7038F8';
      case 'dark':
        return '#705848';
      case 'fairy':
        return '#EE99AC';
      default:
        return '#cccccc';
    }
  };

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
