/*
* Lógica da tela de Login
* Autor: Frederico Wagner Carneiro Rodrigues da Silva
* Contato: frederico.software (at) gmail (dot) com
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GithubAPIService } from '../github-api.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [
    GithubAPIService
  ]
})
export class LoginPage implements OnInit {

  private username = '';
  private loading = null;

  constructor(
    private router: Router,
    private githubAPIService: GithubAPIService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() { }

  async presentLoading(messageText) {
    let text = '';
    if (!messageText || messageText === '') {
      text = 'Carregando...';
    } else {
      text = messageText;
    }

    this.loading = await this.loadingController.create({
      message: text,
      duration: 2000
    });

    await this.loading.present();
  }

  async stopLoading() {
    await this.loading.dismiss();
  }

  async showErrorAlert(text) {
    const alert = await this.alertController.create({
      header: 'Github Repo Explorer',
      subHeader: 'Erro',
      message: text,
      buttons: ['OK']
    });

    await alert.present();
  }

  /*
  * Esse método efetua o processo de login, fazendo chamada para os endpoints e obtendo dados
  */
  doLogin() {
    if (!this.username || this.username === '') {
      this.showErrorAlert('Digite um nome de usuário do Github!');
      return;
    }

    this.presentLoading(null); // Exibe o loader
    // Limpamos o sessionStorage para garantir que os dados sejam recentes
    sessionStorage.clear();
    // Todas as chamadas de endpoint são feitas aqui em um único lugar.
    // Isso evita a sobrecarga do servidor que disponibiliza os dados
    this.githubAPIService.getRepositories(this.username).then(data => {
      sessionStorage.setItem('items', JSON.stringify(data)); // Dados são serializados como string e armazenados em sessionStorage 

      this.githubAPIService.getStaredRepositories(this.username).then(staredData => {

        sessionStorage.setItem('staredItems', JSON.stringify(staredData)); // Guarda informações
        this.stopLoading(); // Esconde o loader
        this.router.navigate(['/tabs/tab1']); // Redireciona para a tela de abas

      }).catch(() => {
        this.showErrorAlert('Não foi possível obter dados. Verifique sua conexão com a Internet.');
      });

    }).catch(() => {
      this.showErrorAlert('Não foi possível obter dados. Verifique sua conexão com a Internet.');
    });
  }

}
