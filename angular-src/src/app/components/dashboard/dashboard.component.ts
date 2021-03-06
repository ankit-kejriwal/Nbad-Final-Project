import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  pieChartData = [];
  expenseData = [];
  stackData = [];
  dp: any;
  displayMonth = '';
  monthNames = [
    '',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  selectedDate: any;
  estimateExpenseObj = {};
  displayPieChart = false;
  displayStackChart = false;
  constructor(
    private commonService: CommonService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initiazlizeCalendar();
    this.getPieChartData();
  }
  initiazlizeCalendar() {
    this.dp = $('#datepicker')
      .datepicker({
        format: 'mm-yyyy',
        startView: 'months',
        endDate: new Date(),
        minViewMode: 'months',
        autoclose: true,
      })
      .on('changeDate', (selected) => {
        this.displayStackChart = false;
        this.selectedDate = selected;
        let obj = {
          month: this.selectedDate.date.getMonth() + 1,
          year: this.selectedDate.date.getFullYear(),
        };
        this.displayMonth = this.monthNames[obj.month];
        this.getExpenseData(obj);
      });
    let date = new Date();
    let obj = {
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
    this.displayMonth = this.monthNames[obj.month];
    $('#datepicker').datepicker('setDate', date);
  }

  getPieChartData() {
    this.pieChartData = [];
    this.commonService.getAllCategory().subscribe(
      (data: any) => {
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            let obj = {
              title: data[i].title,
              estimatedCost: data[i].cost,
              actualCost: 0,
            };
            this.estimateExpenseObj[data[i].title] = data[i].cost;
            this.pieChartData.push(data[i]);
          }
        }
        let date = new Date();

        let obj = {
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        };
        this.getExpenseData(obj);
        this.displayPieChart = true;
      },
      (err) => {
        if(err.status == 401) {
          this.toastr.error('Session has expired', 'Error', { timeOut: 3000 });
          this.router.navigate(['login']);
        } else {
          this.toastr.error('Error', 'Error', { timeOut: 3000 });
        }
      }
    );
  }

  getExpenseData(obj) {
    this.expenseData = [];
    this.stackData = [];
    this.commonService.getMonthExpenses(obj).subscribe(
      (data: any) => {
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            this.expenseData.push(data[i]);
            let obj = {
              title: data[i].title,
              estimatedCost: this.estimateExpenseObj[data[i].title],
              actualCost: data[i].cost,
            };
            this.stackData.push(obj);
          }
        }
        this.displayStackChart = true;
      },
      (err) => {
        if(err.status == 401) {
          this.toastr.error('Session has expired', 'Error', { timeOut: 3000 });
          this.router.navigate(['login']);
        } else {
          this.toastr.error('Error', 'Error', { timeOut: 3000 });
        }
      }
    );
  }
}
