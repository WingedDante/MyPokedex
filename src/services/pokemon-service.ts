import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import * as pokemon_names from '../assets/pokemon-names.json';
import {Pokemon} from '../models/pokemon.model'

@Injectable()
export class PokemonService{
     api_url: string;

    constructor(private http:HttpClient){
        this.api_url = "https://pokeapi.co/api/v2/pokemon/";
    };

     get_pokemon(name): Observable<Object>{
        var p = new Pokemon();
        p.types = [];
        console.log('pokemon service call start for ' + name.toLowerCase());
        
        
        return this.http.get(this.api_url + name.toLowerCase());
            // p.name = name;
            // p.image_url = data['sprites']['front_default'];
            // data['types'].forEach(element => {
                // p.types.push(element['type']['name']);
            // });
            // console.log(p);
            // return p;
        // });

         
    }

    get_all_pokemon(): string[]{

        return pokemon_names[0];
    }

}



