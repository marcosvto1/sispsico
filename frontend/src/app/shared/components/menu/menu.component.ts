import { Router } from '@angular/router';

import { Component, OnInit, Input } from '@angular/core';

export interface MenuItem {
  title: string;
  icon?: string;
  link: any[];
  expanded: boolean;
  children: MenuItem[];
}



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input()
  items: any[] = [];

  @Input()
  config: any = {
    iconOpen: 'fa fa-chevron-left',
    iconClose: 'fa fa-chevron-down'
  };

  handleLink(link: any) {
    console.log(link);
    this.router.navigate(link);
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
