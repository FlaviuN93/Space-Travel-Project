import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { CreatePlanetComponent } from "./planets/create-planet/create-planet.component";
import { PlanetListComponent } from "./planets/planet-list/planet-list.component";

const routes: Routes = [
  { path: "", component: PlanetListComponent },
  {
    path: "create",
    component: CreatePlanetComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "edit/:planetId",
    component: CreatePlanetComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(mod => mod.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
