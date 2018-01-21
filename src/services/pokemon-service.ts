import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import * as pokemon_names from '../assets/pokemon-names.json';

@Injectable()
export class PokemonService{
     api_url: string;

    constructor(private http:HttpClient){
        this.api_url = "https://pokeapi.co/api/v2/pokemon/";
    };

    get_pokemon(name): Observable<object>{
        console.log('pokemon service call start for ' + name.toLowerCase());
        return this.http.get(this.api_url + name.toLowerCase());
    }
    get_all_pokemon(): string[]{

        return pokemon_names[0];
    }
}



