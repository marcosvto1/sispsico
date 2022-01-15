import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthRoutingModule } from "./auth-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

import { AuthFormComponent } from "./auth-form/auth-form.component";
import { RegisterFormComponent } from "./register-form/register-form.component";

@NgModule({
  declarations: [AuthFormComponent, RegisterFormComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule, FormsModule, ReactiveFormsModule]
})
export class AuthModule {}
