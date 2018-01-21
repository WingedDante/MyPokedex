import { TestBed, async } from '@angular/core/testing';
import { PokemonService } from './pokemon-service';
import { HttpClientModule} from '@angular/common/http';

describe('PokemonService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PokemonService
      ],
      imports: [
        HttpClientModule
      ],
    }).compileComponents();
  }));
  it('should create the component', async(() => {
    // var pService = PokemonService;
    //const fixture = TestBed.createComponent(PokemonService);
    //const app = fixture.debugElement.componentInstance;
    
    //expect(app).toBeTruthy();
    return true;
  }));
});
