import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms'
import { PokemonService } from '../services/pokemon-service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
