import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-chart',
  templateUrl: './user-chart.component.html',
  styleUrls: ['./user-chart.component.scss'],
  standalone: false,
})
export class UserChartComponent implements AfterViewInit,OnInit {
  @ViewChild('userChart', { static: false }) chartRef!: ElementRef;
  chart!: Chart;
  isLoading = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if (!this.chartRef?.nativeElement) {
      this.isLoading = false;
      console.info('Canvas element not found! Please add user');
    }

    this.userService.roleDistribution$.subscribe(data => {
      if (this.chart) this.chart.destroy();

      if(data) {
        this.chart = new Chart('userChart', {
          type: 'pie',
          data: {
            labels: Object.keys(data),
            datasets: [{
              data: Object.values(data),
              backgroundColor: ['red', 'blue', 'green']
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
              padding: 5
            }
          }
        });
  
        this.isLoading = false;
      }
    });
  }

  ngAfterViewInit() {

   
  }
}
