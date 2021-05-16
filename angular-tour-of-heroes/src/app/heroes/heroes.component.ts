import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessagesServiceService } from '../messages-service.service';
import { HEROES } from '../mock-heros';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor(private heroService : HeroService, private messagesService : MessagesServiceService) { }
  public heroes : Hero[] = []
  public selectedHero ?: Hero 

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe(data => this.heroes = data)
  }

  add(name: string): void {
    name = name.trim()
    if (!name) return 
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero)
      })
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero)
    this.heroService.deleteHero(hero.id).subscribe()
  }

  // onSelect (hero : Hero) : void {
  //   this.selectedHero = hero
  //   this.messagesService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  // }

}
