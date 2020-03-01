import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { PlanetsService } from "../planets.service";
import { Planet } from "../planet.model";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
@Component({
  selector: "app-create-planet",
  templateUrl: "./create-planet.component.html",
  styleUrls: ["./create-planet.component.css"]
})
export class CreatePlanetComponent implements OnInit, OnDestroy {
  planet: Planet;
  isLoading = false;
  form: FormGroup;
  private mode = "create";
  private planetId: string;
  private authStatusSub: Subscription;

  statuses = ["OK", "!OK", "TODO", "En route"];

  constructor(
    public planetsService: PlanetsService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });

    this.form = new FormGroup({
      description: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.maxLength(120),
          Validators.minLength(20)
        ]
      }),
      status: new FormControl(null, { validators: [Validators.required] })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("planetId")) {
        this.mode = "edit";
        this.planetId = paramMap.get("planetId");
        this.isLoading = true;
        this.planetsService.getPostEdit(this.planetId).subscribe(planetData => {
          this.isLoading = false;
          this.planet = {
            id: planetData._id,
            description: planetData.description,
            status: planetData.status,
            creator: planetData.creator
          };
          this.form.setValue({
            description: this.planet.description,
            status: this.planet.status
          });
        });
      } else {
        this.mode = "create";
        this.planetId = null;
      }
    });
  }

  onSavePlanet() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.planetsService.addPost(
        this.form.value.description,
        this.form.value.status
      );
    } else {
      this.planetsService.updatePost(
        this.planetId,
        this.form.value.description,
        this.form.value.status
      );
    }
    this.form.reset();
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
