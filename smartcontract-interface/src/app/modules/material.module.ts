import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule, MatExpansionModule,
  MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatOptionModule,
  MatPaginatorModule, MatRadioModule, MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

@NgModule({
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
  exports: [
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
  ]
})
export class SmartContractInterfaceMaterialModule {
}
