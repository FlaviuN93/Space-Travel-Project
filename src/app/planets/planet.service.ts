import { Planet } from "./planet.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
@Injectable({ providedIn: "root" })
export class PlanetService {
  private planets: Planet[] = [];
  private planetUpdated = new Subject<Planet[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPlanets() {
    this.http
      .get<{ message: string; planets: any }>("http://localhost:3000/planets")
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
      .subscribe(transformedPlanets => {
        this.planets = transformedPlanets;
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
    const planet: Planet = {
      id: null,
      description: description,
      status: status
    };
    this.http
      .post<{ message: string; postId: string }>(
        "http://localhost:3000/planets",
        planet
      )
      .subscribe(responseData => {
        const postId = responseData.postId;
        planet.id = postId;
        this.planets.push(planet);
        this.planetUpdated.next([...this.planets]);
        this.router.navigate(["/"]);
      });
  }

  updatePlanetStatus(id: string, description: string, status: string) {
    const planet: Planet = { id: id, description: description, status: status };
    this.http
      .patch("http://localhost:3000/planets/" + id, planet)
      .subscribe(response => {
        const updatedPlanets = [...this.planets];
        const oldPostIndex = updatedPlanets.findIndex(p => p.id === planet.id);
        updatedPlanets[oldPostIndex] = planet;
        this.planets = updatedPlanets;
        this.planetUpdated.next([...this.planets]);
        this.router.navigate(["/"]);
      });
  }

  deletePlanet(planetId: string) {
    this.http
      .delete("http://localhost:3000/planets/" + planetId)
      .subscribe(() => {
        const updatedPlanets = this.planets.filter(
          planet => planet.id !== planetId
        );
        this.planets = updatedPlanets;
        this.planetUpdated.next([...this.planets]);
      });
  }
}
