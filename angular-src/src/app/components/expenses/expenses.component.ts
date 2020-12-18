import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
  categories = [];
  dp: any;
  selectedCategory = '';
  constructor(
    private commonService: CommonService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.dp = $('#datepicker').datepicker({
      format: 'mm-yyyy',
      startView: 'months',
      minViewMode: 'months',
      autoclose: true,
    }).on('changeDate', function(selected){
      console.log(selected);
  });
    this.getAllCategory();
  }

  getAllCategory() {
    this.commonService.getAllCategory().subscribe(
      (data: any) => {
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            this.categories.push(data[i]);
          }
          this.selectedCategory = data[0].title;
        }
        else {
          this.selectedCategory = 'Category not present';
        }
      },
      (err) => {
        this.toastr.error('Unable to fetch category', 'Error', {
          timeOut: 3000,
        });
      }
    );
  }

  setCategory(data: any){
    this.selectedCategory = data;
  }
}
