/*
* Lógica da tela de Login
* Autor: Frederico Wagner Carneiro Rodrigues da Silva
* Contato: frederico.software (at) gmail (dot) com
*/
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
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
  private repositoryData = [];
  private staredRepositoryData = [];
  private loading = null;

  constructor(
    private router: Router,
    private githubAPIService: GithubAPIService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {

  }

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

    const { role, data } = await this.loading.onDidDismiss();
    console.log('Loading dismissed!');
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

  doLogin() {
    if (!this.username || this.username === '') {
      this.showErrorAlert('Digite um nome de usuário do Github!');
      return;
    }

    const self = this;
    this.presentLoading(null);
    sessionStorage.clear();
    this.githubAPIService.getRepositoryInfo(this.username).then(data => {
      self.repositoryData = data;
      sessionStorage.setItem('items', JSON.stringify(data));

      this.githubAPIService.getStarredRepositories(this.username).then(data => {
        this.staredRepositoryData = data;
        sessionStorage.setItem('staredItems', JSON.stringify(data));
        this.stopLoading();
        this.router.navigate(['/tabs/tab1']);
      });
    });
  }

}
