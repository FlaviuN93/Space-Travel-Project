import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PlanetService } from "../planet.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Planet } from "../planet.model";

@Component({
  selector: "app-create-planet",
  templateUrl: "./create-planet.component.html",
  styleUrls: ["./create-planet.component.css"]
})
export class CreatePlanetComponent implements OnInit {
  private mode = "create";
  private planetId: string;
  planet: Planet;
  form: FormGroup;
  imagePreview: string;
  isLoading = false;

  statuses = ["OK", "!OK", "TODO", "En route"];

  constructor(
    public planetService: PlanetService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      description: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(20)]
      }),
      status: new FormControl(null, { validators: [Validators.required] })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("planetId")) {
        this.mode = "edit";
        this.planetId = paramMap.get("planetId");
        this.isLoading = true;
        this.planetService.getPlanet(this.planetId).subscribe(planetData => {
          this.isLoading = false;
          this.planet = {
            id: planetData._id,
            description: planetData.description,
            status: planetData.status
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
      this.planetService.addPlanet(
        this.form.value.description,
        this.form.value.status
      );
    } else {
      this.planetService.updatePlanetStatus(
        this.planetId,
        this.form.value.description,
        this.form.value.status
      );
    }
    this.form.reset();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      this.form.patchValue({ file: file });
      this.form.get("file").updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        //check lesson 81,82,83 for images
      };
      reader.readAsDataURL(file);
    }
  }
}
// export interface Tile {
//   cols: number;
//   rows: number;
//   id: string;
// }
// tiles: Tile[] = [
//   { id: "One", cols: 1, rows: 1 },
//   { id: "Two", cols: 2, rows: 1 },
//   { id: "Three", cols: 1, rows: 1 }
// ];
