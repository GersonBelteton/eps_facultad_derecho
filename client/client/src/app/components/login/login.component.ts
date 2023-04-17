import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { RecaptchaService } from 'src/app/services/recaptcha.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public robot: boolean;
  public presionado: boolean;


  constructor(private _router: Router, private httpService: RecaptchaService, private recaptchaV3Service: ReCaptchaV3Service) {
    this.robot = true;
    this.presionado = false;
  }

  ngOnInit(): void {
    this.robot = true;
    this.presionado = false;
  }

  goInicio() {
    this._router.navigate(['inicio'])
  }


  getInfoRecaptcha() {
    this.robot = true;
    this.presionado = true;
    this.recaptchaV3Service.execute('')
      .subscribe((token) => {
        const auxiliar = this.httpService.getTokenClientModule(token)
        auxiliar.subscribe({
          complete: () => {
            this.presionado = false;
          },
          error: () => {
            this.presionado = false;
            this.robot = true;
            alert('Tenemos un problema, recarga la página página para solucionarlo o contacta con 1938web@gmail.com');
          },
          next: (resultado: Boolean) => {
            if (resultado === true) {
              this.presionado = false;
              this.robot = false;
            } else {
              alert('Error en el captcha. Eres un robot')
              this.presionado = false;
              this.robot = true;
            }
          }
        });
      }
      );

  }
}
