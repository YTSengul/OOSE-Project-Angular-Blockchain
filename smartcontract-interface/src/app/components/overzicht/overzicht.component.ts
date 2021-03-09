import {Component, OnInit} from '@angular/core';

const CONTRACTEN: string[] = [
  'Contract 1',
  'Contract 2',
  'Contract 3',
  'Contract 4',
  'Contract 5',
  'Contract 6',
  'Contract 7',
  'Contract 8',
  'Contract 9',
  'Contract 10',
  'Contract 11'];

@Component({
  selector: 'app-overzicht',
  templateUrl: './overzicht.component.html',
  styleUrls: ['./overzicht.component.css']
})

export class OverzichtComponent implements OnInit {
  contracten = CONTRACTEN;
  aantal = CONTRACTEN.length;

  constructor() {
  }

  ngOnInit() {
  }

  getElement() {

  }

}
