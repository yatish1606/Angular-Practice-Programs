import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { MessagesServiceService } from './messages-service.service';
import { HEROES } from './mock-heros';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService : MessagesServiceService) { }

  getHero (id : number) : Observable<Hero> {
    const hero = HEROES.find(hero => hero.id === id) as Hero
    this.messageService.add(`HeroService: fetched hero id=${id}`)
    return of(hero)
  }

  getHeroes () : Observable<Hero[]> {
    this.messageService.add('Fetched all heroes')
    return of(HEROES)
  }
}
