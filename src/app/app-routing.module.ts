import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { Page404Component } from './page404/page404.component';
import { ProgramComponent } from './program/program.component';

const routes: Routes = [
  { path: "", component: ProgramComponent },
  { path: "program", component: ProgramComponent },
  { path: "map", component: MapComponent },
  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
