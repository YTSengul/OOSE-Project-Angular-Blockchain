import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { OverzichtComponent } from './components/overzicht/overzicht.component';
import { AanmakenSmartcontractComponent } from './components/aanmaken-smartcontract/aanmaken-smartcontract.component';

const routes: Routes = [
  {path: 'overzicht', component: OverzichtComponent},
  {path: 'aanmaken-smartcontract', component: AanmakenSmartcontractComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
