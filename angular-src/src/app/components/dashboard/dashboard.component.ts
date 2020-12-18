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
  barChartData = [];
  displayPieChart = false;
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
              this.pieChartData.push(data[i]);
            }
            this.displayPieChart = true;
          }
      },
      (err) =>{
        this.toastr.error('Unable to fetch category', 'Error',{timeOut: 3000});
      });
  }

}
