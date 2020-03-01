import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { Planet } from "./planet.model";

const BACKEND_URL = environment.apiUrl + "/posts/";

@Injectable({ providedIn: "root" })
export class PlanetsService {
  private planets: Planet[] = [];
  private planetsUpdated = new Subject<Planet[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http
      .get<{ message: string; planets: any }>(BACKEND_URL)
      .pipe(
        map(planetData => {
          return {
            planets: planetData.planets.map(planet => {
              return {
                status: planet.status,
                description: planet.description,
                id: planet._id,
                creator: planet.creator
              };
            })
          };
        })
      )
      .subscribe(transformedPostData => {
        this.planets = transformedPostData.planets;
        this.planetsUpdated.next([...this.planets]);
      });
  }

  getPostUpdateListener() {
    return this.planetsUpdated.asObservable();
  }

  getPostEdit(id: string) {
    return this.http.get<{
      _id: string;
      description: string;
      status: string;
      creator: string;
    }>(BACKEND_URL + id);
  }

  addPost(description: string, status: string) {
    const planet: Planet = {
      id: null,
      description: description,
      status: status,
      creator: null
    };
    this.http
      .post<{ message: string; planetId: string }>(BACKEND_URL, planet)
      .subscribe(responseData => {
        const id = responseData.planetId;
        planet.id = id;
        this.planets.push(planet);
        this.planetsUpdated.next([...this.planets]);
        this.router.navigate(["/"]);
      });
  }

  updatePost(id: string, description: string, status: string) {
    const planetData: Planet = {
      id: id,
      description: description,
      status: status,
      creator: null
    };
    this.http.put(BACKEND_URL + id, planetData).subscribe(response => {
      console.log(response);
      this.planetsUpdated.next([...this.planets]);
      this.router.navigate(["/"]);
    });
  }

  deletePost(planetId: string) {
    return this.http.delete(BACKEND_URL + planetId);
  }
}
