import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatSelectModule,
  MatInputModule,
  MatPaginatorModule,
  MatToolbarModule,
  MatOptionModule,
  MatRadioModule,
  MatExpansionModule,
  MatMenuModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './components/header/header.component';
import {OverzichtComponent} from './components/overzicht/overzicht.component';
import {AppRoutingModule} from './app-routing.module';
import {
  AanmakenSmartcontractComponent
} from './components/aanmaken-smartcontract/aanmaken-smartcontract.component';
import {FormsModule} from '@angular/forms';
import {ParameterComponent} from './components/parameter/parameter.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OverzichtComponent,
    AanmakenSmartcontractComponent,
    ParameterComponent
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    MatListModule,
    MatPaginatorModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatOptionModule,
    MatRadioModule,
    MatExpansionModule,
    MatMenuModule,
    MatPaginatorModule,
    MatToolbarModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [AanmakenSmartcontractComponent, ParameterComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
