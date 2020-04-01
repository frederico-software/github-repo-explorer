/*
* Lógica da primeira aba
* Autor: Frederico Wagner Carneiro Rodrigues da Silva
* Contato: frederico.software (at) gmail (dot) com
*/

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private items = [];

  constructor(private router: Router) {
    // Obtém as informações sobre os repositórios armazenadas localmente em sessionStorage
    try {
      this.items = JSON.parse(sessionStorage.getItem('items'));
    } catch (e) {
      this.items = [];
    }
  }

}
