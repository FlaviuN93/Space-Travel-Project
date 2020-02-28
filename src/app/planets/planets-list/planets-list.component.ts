import { Component, OnInit, OnDestroy } from "@angular/core";
import { Planet } from "../planet.model";
import { PlanetService } from "../planet.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-planets-list",
  templateUrl: "./planets-list.component.html",
  styleUrls: ["./planets-list.component.css"]
})
export class PlanetsListComponent implements OnInit, OnDestroy {
  planets: Planet[] = [];
  private planetSub: Subscription;
  isLoading = false;

  constructor(public planetService: PlanetService) {}

  ngOnInit() {
    this.isLoading = true;
    this.planetService.getPlanets();
    this.planetSub = this.planetService
      .getPlanetsUpdated()
      .subscribe((planets: Planet[]) => {
        this.isLoading = false;
        this.planets = planets;
      });
  }

  onDelete(planetId: string) {
    console.log(planetId);
    this.planetService.deletePlanet(planetId);
  }

  ngOnDestroy() {
    this.planetSub.unsubscribe();
  }
}
