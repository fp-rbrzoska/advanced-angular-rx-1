import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObservablesComponent } from './observables/observables.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'subjects', component: SubjectsComponent },
  { path: 'observables', component: ObservablesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
