import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndiaComponent } from './components/india/india.component';


const routes: Routes = [
  // {path:'', component: HomeComponent},
  // {path:'countries', component:CountriesComponent},
  {path:'india', component:IndiaComponent},
  {path:'', component:IndiaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
