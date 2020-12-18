import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  pieChartData = [];
  expenseData = [];
  stackData = [];
  estimateExpenseObj = {};
  displayPieChart = false;
  displayStackChart = false;
  constructor(
    private commonService: CommonService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getPieChartData();
  }

  getPieChartData(){
    this.commonService.getAllCategory().
      subscribe((data: any) => {
          if(data.length  > 0){
            for(let i = 0;i<data.length;i++){
              let obj = {
                title: data[i].title,
                estimatedCost: data[i].cost,
                actualCost: 0
              }
              this.estimateExpenseObj[data[i].title] = data[i].cost;
              this.pieChartData.push(data[i]);
            }
          }
          this.getExpenseData();
          this.displayPieChart = true;
      },
      (err) =>{
        this.toastr.error('Unable to fetch category', 'Error',{timeOut: 3000});
      });
  }

  getExpenseData(){
    this.commonService.getCurrentMonthExpenses().subscribe(
      (data: any) => {
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            this.expenseData.push(data[i]);
            let obj = {
              title: data[i].title,
              estimatedCost: this.estimateExpenseObj[data[i].title],
              actualCost: data[i].cost
            }
            this.stackData.push(obj);
          }
        }
        this.displayStackChart = true;
      },
      (err) => {
        this.toastr.error('Unable to fetch expenses', 'Error', {
          timeOut: 3000,
        });
      }
    );
  }

}
