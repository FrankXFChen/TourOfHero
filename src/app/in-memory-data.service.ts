import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Mr. Nice', attribute: 'agility', skill: ['A', 'D', 'S'], showSkill:false },
      { id: 12, name: 'Narco', attribute: 'strength', skill: ['A', 'S'], showSkill:false },
      { id: 13, name: 'Bombasto', attribute: 'strength', skill: ['D', 'S'], showSkill:false },
      { id: 14, name: 'Celeritas', attribute: 'intelligence', skill: ['A', 'D', 'S'] , showSkill:false},
      { id: 15, name: 'Magneta', attribute: 'strength', skill: ['A', 'S'] , showSkill:false},
      { id: 16, name: 'RubberMan', attribute: 'agility', skill: ['S'] , showSkill:false},
      { id: 17, name: 'Dynama', attribute: 'agility', skill: ['D'] , showSkill:false},
      { id: 18, name: 'Dr IQ', attribute: 'intelligence', skill: ['A', 'S'] , showSkill:false},
      { id: 19, name: 'Magma', attribute: 'intelligence', skill: ['A', 'D'] , showSkill:false},
      { id: 20, name: 'Tornado', attribute: 'strength', skill: ['A'] , showSkill:false}
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
