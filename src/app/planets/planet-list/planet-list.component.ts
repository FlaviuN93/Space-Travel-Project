import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material";

import { Planet } from "../planet.model";
import { PlanetsService } from "../planets.service";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-planet-list",
  templateUrl: "./planet-list.component.html",
  styleUrls: ["./planet-list.component.css"]
})
export class PlanetListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is the first post's content" },
  //   { title: "Second Post", content: "This is the second post's content" },
  //   { title: "Third Post", content: "This is the third post's content" }
  // ];
  planets: Planet[] = [];
  isLoading = false;
  totalPosts = 0;
  currentPage = 1;
  postsPerPage = 2;
  pageSizeOptions = [1, 2, 5, 10];
  public userIsAuthenticated = false;
  private planetsSub: Subscription;
  private statusSub: Subscription;
  constructor(
    public planetsService: PlanetsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.planetsService.getPosts(this.postsPerPage, 1);
    this.planetsSub = this.planetsService
      .getPostUpdateListener()
      .subscribe((planetData: { planets: Planet[]; postCount: number }) => {
        this.isLoading = false;
        this.totalPosts = planetData.postCount;
        this.planets = planetData.planets;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.statusSub = this.authService
      .getAuthListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.planetsService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(planetId: string) {
    this.isLoading = true;
    this.planetsService.deletePost(planetId).subscribe(
      () => {
        this.planetsService.getPosts(this.postsPerPage, this.currentPage);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    this.planetsSub.unsubscribe();
    this.statusSub.unsubscribe();
  }
}
