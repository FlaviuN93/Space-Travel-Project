import { NgModule } from "@angular/core";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import {
  MatExpansionModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatPaginatorModule,
  MatDialogModule
} from "@angular/material";

@NgModule({
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    LayoutModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatPaginatorModule
  ]
})
export class AngularMaterialModule {}
