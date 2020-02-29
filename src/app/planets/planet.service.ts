import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Planet } from "./planet.model";

@Injectable({ providedIn: "root" })
export class PlanetService {
  private planets: Planet[] = [];
  private planetUpdated = new Subject<Planet[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPlanets() {
    this.http
      .get<{ message: string; planets: any }>("http://localhost:3000/planets/")
      .pipe(
        map(planetData => {
          return planetData.planets.map(planet => {
            return {
              description: planet.description,
              status: planet.status,
              id: planet._id
            };
          });
        })
      )
      .subscribe(transformedPosts => {
        this.planets = transformedPosts;
        this.planetUpdated.next([...this.planets]);
      });
  }

  getPlanetsUpdated() {
    return this.planetUpdated.asObservable();
  }

  getPlanet(id: string) {
    return this.http.get<{ _id: string; description: string; status: string }>(
      "http://localhost:3000/planets/" + id
    );
  }

  addPlanet(description: string, status: string) {
    const planetData = new FormData();
    planetData.append("description", description);
    planetData.append("status", status);
    this.http
      .post<{ message: string; planetId: string }>(
        "http://localhost:3000/planets/",
        planetData
      )
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  updatePlanetStatus(id: string, description: string, status: string) {
    let planetData: Planet = {
      id: id,
      description: description,
      status: status
    };
    this.http
      .patch("http://localhost:3000/planets/" + id, planetData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  deletePlanet(planetId: string) {
    this.http.delete("http://localhost:3000/planets/" + planetId);
    // .subscribe(() => {
    //   const updatedPosts = this.planets.filter(
    //     planet => planet.id !== planetId
    //   );
    //   this.planets = updatedPosts;
    //   this.planetUpdated.next([...this.planets]);
    // });
  }
}
