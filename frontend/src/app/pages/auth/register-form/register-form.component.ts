import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { LoginService } from "../shared/login.service";
import { Router } from "@angular/router";

import toastr from "toastr";

@Component({
  selector: "app-register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.scss"]
})
export class RegisterFormComponent implements OnInit {
  formRegister: FormGroup;
  erros: any = [];
  loading: boolean = false;

  constructor(
    private authService: LoginService,
    private formBuider: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.buildFormRegister();
  }

  protected buildFormRegister(): void {
    this.formRegister = this.formBuider.group({
      tipo_pessoa: ["j", [Validators.required]],
      cnpj_cpf: [null, [Validators.required]],
      razao_social: [null, [Validators.required]],
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirm_password: [null, [Validators.required]]
    });
  }

  submitForm() {
    this.loading = true;
    this.authService.register(this.formRegister.value).subscribe(
      result => {
        this.loading = false;
        toastr.success("Registro realizado com sucesso!");
        toastr.info("Por favor, complete seu cadastro empresarial");
        // CARREGA AS PERMISSOES DO USUARIOS
        //this.autorizacaoService.getPermissions().subscribe();
        this.router.navigate(["auth"]);
      },
      error => {
        this.loading = false;
        this.erros = [];
        if (typeof error.error.error_description === "object") {
          const keys = Object.keys(error.error.error_description);
          keys.forEach(el => {
            console.warn(error.error.error_description[el][0]);
            error.error.error_description[el].forEach(element => {
              this.erros.push(element);
            });
          });
        } else {
          this.erros.push(error.error.error_description);
        }
      }
    );
  }
}
