import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../angular-material.module";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { CreatePlanetComponent } from "./create-planet/create-planet.component";
import { PlanetListComponent } from './planet-list/planet-list.component';

@NgModule({
  declarations: [PlanetListComponent, CreatePlanetComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class PlanetsModule {}
