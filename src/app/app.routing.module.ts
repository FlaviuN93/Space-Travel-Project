import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PlanetsListComponent } from "./planets/planets-list/planets-list.component";
import { CreatePlanetComponent } from "./planets/create-planet/create-planet.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  { path: "", component: PlanetsListComponent },
  {
    path: "newPlanet",
    component: CreatePlanetComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "edit/:planetId",
    component: CreatePlanetComponent,
    canActivate: [AuthGuard]
  },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
