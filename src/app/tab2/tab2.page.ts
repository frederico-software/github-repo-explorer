/*
* Lógica da segunda aba
* Autor: Frederico Wagner Carneiro Rodrigues da Silva
* Contato: frederico.software (at) gmail (dot) com
*/

import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  private items = [];

  constructor() {
    // Obtém as informações sobre os repositórios armazenadas localmente em sessionStorage
    try {
      this.items = JSON.parse(sessionStorage.getItem('staredItems'));
    } catch (e) {
      this.items = [];
    }
  }

}
