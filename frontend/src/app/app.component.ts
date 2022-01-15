import { Router } from '@angular/router';
import { MenuItem } from './shared/components/menu/menu.component';

import { Component, ViewChild, ElementRef } from "@angular/core";
import { LoginService } from './pages/auth/shared/login.service';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = 'web';
  currentUser;

  constructor(private loginService: LoginService, private router: Router) {
    this.loginService.currentUser.subscribe(result => {
      this.currentUser = result.user.original;
      console.log(this.currentUser.papel);
    });
  }

  logout() {
    this.loginService.logout().subscribe(
      (result) => {
        this.router.navigate(['/auth']);
      }
    );
  }

}
