import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PlanetsListComponent } from "./planets/planets-list/planets-list.component";
import { CreatePlanetComponent } from "./planets/create-planet/create-planet.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignUpComponent } from "./auth/signup/sign-up.component";

const routes: Routes = [
  { path: "", component: PlanetsListComponent },
  { path: "newPlanet", component: CreatePlanetComponent },
  { path: "edit/:planetId", component: CreatePlanetComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignUpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
