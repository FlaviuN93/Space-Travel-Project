import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Planet } from "../planet.model";
import { PlanetsService } from "../planets.service";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-planet-list",
  templateUrl: "./planet-list.component.html",
  styleUrls: ["./planet-list.component.css"]
})
export class PlanetListComponent implements OnInit, OnDestroy {
  planets: Planet[] = [];
  isLoading = false;
  userId: string;
  public userIsAuthenticated = false;
  private planetsSub: Subscription;
  private statusSub: Subscription;
  constructor(
    public planetsService: PlanetsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.planetsService.getPosts();
    this.userId = this.authService.getUserId();
    this.planetsSub = this.planetsService
      .getPostUpdateListener()
      .subscribe((planetData: Planet[]) => {
        this.isLoading = false;
        this.planets = planetData;
      });

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.statusSub = this.authService
      .getAuthListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onDelete(planetId: string) {
    this.isLoading = true;
    this.planetsService.deletePost(planetId).subscribe(() => {
      this.planetsService.getPosts();
    });
  }

  ngOnDestroy() {
    this.planetsSub.unsubscribe();
    this.statusSub.unsubscribe();
  }
}
