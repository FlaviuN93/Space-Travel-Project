import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
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
  isLoading = false;

  statuses = ["OK", "!OK", "TODO", "En route"];

  constructor(
    public planetService: PlanetService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
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
        });
      } else {
        this.mode = "create";
        this.planetId = null;
      }
    });
  }
  onSavePlanet(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.planetService.addPlanet(form.value.description, form.value.status);
    } else {
      this.planetService.updatePlanetStatus(
        this.planetId,
        form.value.description,
        form.value.status
      );
    }
    form.resetForm();
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
