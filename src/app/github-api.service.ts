/*
* Serviço para consulta de informações do Github
* Autor: Frederico Wagner Carneiro Rodrigues da Silva
* Contato: frederico.software (at) gmail (dot) com
*
* Nesse service utilizei o fetch para realizar as requisições, por ser fácil de utilizar e ser o novo padrão da Web
*/
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GithubAPIService {
  // Guarda o nome de usuário do Github
  // Utilizei o usuário 'blackmiaool' para teste por já estar populado com muitos repositórios
  private githubUsername = 'blackmiaool';

  constructor() { }

  /*
  * Obtém informações sobre os repositórios de determinado usuário
  */
  getRepositoryInfo(userName) {
    this.githubUsername = userName;
    return fetch(`https://api.github.com/users/${userName}/repos`).then(response => response.json());
  }

  /*
  * Obtém informações sobre os repositórios com estrela de determinado usuário
  */
  getStaredRepositories(userName) {
    this.githubUsername = userName;
    return fetch(`https://api.github.com/users/${userName}/starred`).then(response => response.json());
  }

}
