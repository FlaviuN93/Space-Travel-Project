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
  private postsUpdated = new Subject<{
    planets: Planet[];
    postCount: number;
  }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; planets: any; maxPosts: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map(planetData => {
          return {
            planets: planetData.planets.map(planet => {
              return {
                status: planet.status,
                description: planet.description,
                id: planet._id
              };
            }),
            maxPosts: planetData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.planets = transformedPostData.planets;
        this.postsUpdated.next({
          planets: [...this.planets],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPostEdit(id: string) {
    return this.http.get<{
      _id: string;
      description: string;
      status: string;
    }>(BACKEND_URL + id);
  }

  addPost(description: string, status: string) {
    //   .post<{ message: string; postId: string }>(
    //     "http://localhost:3000/api/posts",
    //     post
    // const planetData ;
    // planetData.append("description", description);
    // planetData.append("status", status);
    const planet: Planet = {
      id: null,
      description: description,
      status: status
    };
    this.http
      .post<{ message: string; planet: Planet }>(BACKEND_URL, planet)
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  updatePost(id: string, description: string, status: string) {
    let planetData: Planet | FormData;

    planetData = {
      id: id,
      description: description,
      status: status
    };
    this.http.put(BACKEND_URL + id, planetData).subscribe(response => {
      this.router.navigate(["/"]);
    });
  }

  deletePost(planetId: string) {
    return this.http.delete(BACKEND_URL + planetId);
  }
}
