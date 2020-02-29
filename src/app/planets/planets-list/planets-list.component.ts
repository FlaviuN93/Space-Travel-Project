import { Component, OnInit, OnDestroy } from "@angular/core";
import { Planet } from "../planet.model";
import { PlanetService } from "../planet.service";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-planets-list",
  templateUrl: "./planets-list.component.html",
  styleUrls: ["./planets-list.component.css"]
})
export class PlanetsListComponent implements OnInit, OnDestroy {
  planets: Planet[] = [];
  private planetSub: Subscription;
  private authStatusSub: Subscription;
  isLoading = false;
  isAuthenticated = false;

  constructor(
    public planetService: PlanetService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.planetService.getPlanets();
    this.planetSub = this.planetService
      .getPlanetsUpdated()
      .subscribe((planets: Planet[]) => {
        this.isLoading = false;
        this.planets = planets;
      });
    this.isAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(userAuthenticated => {
        this.isAuthenticated = userAuthenticated;
      });
  }

  onDelete(planetId: string) {
    console.log(planetId);
    this.planetService.deletePlanet(planetId);
  }

  ngOnDestroy() {
    this.planetSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
