import { Component, OnInit, ElementRef, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";


import { LoginService } from "../shared/login.service";


@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  formLogin: FormGroup;
  erros: any[] = [];
  loading = false;

  constructor(
    private authService: LoginService,
    private formBuider: FormBuilder,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.buildFormLogin();
  }

  protected buildFormLogin(): void {
    this.formLogin = this.formBuider.group({
      usuario: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  submitForm() {
    this.loading = true;
    this.authService.login(this.formLogin.value).subscribe(
      result => {
        this.loading = false;
        this.router.navigateByUrl('/dashboard');
      },
      error => {
        this.erros = [];
        this.loading = false;
        if (error.status == 400) {
          if ('mensagem' in error.error) {
            this.erros = error.error.mensagem;
          }
        }
      }
    );
  }
}
