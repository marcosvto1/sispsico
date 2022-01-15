import { DashboardService } from './../shared/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { Dashboard } from '../shared/dashboard.model';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListComponent implements OnInit {
  dashboard: Dashboard = new Dashboard();
  loading = false;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard() {
    this.loading = true;
    this.dashboardService.consultarDashboard().subscribe(
      (result) => {
        this.dashboard = result;
        this.loading = false;
      }
    );
  }

}
