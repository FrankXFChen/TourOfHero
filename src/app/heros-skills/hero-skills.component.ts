import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-skills',
  templateUrl: './hero-skills.component.html',
  //styleUrls: [ './hero-skills.component.css' ]
})
export class HeroSkillsComponent implements OnInit {
  @Input() heroSkills: any[];
  attrClass: string;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    //this.getHero();
  }

  // getHero(): void {
  //   const id = +this.route.snapshot.paramMap.get('id');
  //   this.heroService.getHero(id)
  //     .subscribe(hero => {
  //       this.hero = hero;
  //       this.setClass(hero);
  //     });
  // }

  setClass(hero): void {
     var attr = hero.attribute;
     if(attr == 'agility'){
       this.attrClass = 'aHero';
     }else if(attr == 'strength'){
       this.attrClass = 'sHero';
     }else{
       this.attrClass = 'iHero';
     }
  }

  goBack(): void {
    this.location.back();
  }

//  save(): void {
//     this.heroService.updateHero(this.hero)
//       .subscribe(() => this.goBack());
//   }
}
