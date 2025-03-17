import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-chart',
  templateUrl: './user-chart.component.html',
  styleUrls: ['./user-chart.component.css']
})
export class UserChartComponent implements AfterViewInit {
  chart!: Chart;
  isLoading = true;

  constructor(private userService: UserService) {}

  ngAfterViewInit() {
    this.userService.roleDistribution$.subscribe(data => {
      if (this.chart) this.chart.destroy();

      this.chart = new Chart('userChart', {
        type: 'pie',
        data: {
          labels: Object.keys(data),
          datasets: [{
            data: Object.values(data),
            backgroundColor: ['red', 'blue', 'green']
          }]
        }
      });

      this.isLoading = false;
    });
  }
}
