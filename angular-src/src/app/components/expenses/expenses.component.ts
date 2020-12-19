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
  expenses = [];
  dp: any;
  selectedCategory = '';
  selectedDate : any;
  cost: any ;
  constructor(
    private commonService: CommonService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initiazlizeCalendar();
    this.getExpenses();
    this.getAllCategory();
  }

  initiazlizeCalendar(){
    this.dp = $('#datepicker1').datepicker({
      format: 'mm-yyyy',
      startView: 'months',
      endDate: new Date(),
      minViewMode: 'months',
      autoclose: true,
    }).on('changeDate', (selected) => {
      this.selectedDate = selected;
  });
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

  getExpenses() {
    this.expenses = [];
    this.commonService.getCurrentMonthExpenses().subscribe(
      (data: any) => {
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            this.expenses.push(data[i]);
          }
        }
      },
      (err) => {
        this.toastr.error('Unable to fetch expenses', 'Error', {
          timeOut: 3000,
        });
      }
    );
  }

  setCategory(data: any){
    this.selectedCategory = data;
  }

  addExpenses(){
    if(this.cost < 0){
      this.toastr.error('Cost should be greater than zero', 'Error',{timeOut: 3000});
    } else if(this.selectedDate == null){
      this.toastr.error('Please select date', 'Error',{timeOut: 3000});
    } else {
      const expense = {
        title: this.selectedCategory,
        cost: this.cost,
        month:this.selectedDate.date.getMonth() + 1,
        year:this.selectedDate.date.getFullYear(),
      };
      this.commonService.addExpenses(expense).subscribe(
        (data: any) => {
          this.toastr.success('Successfully added expense', 'Success',{timeOut: 3000});
          this.getExpenses();
      },
      (err) =>{
        this.toastr.error('Error', 'Error',{timeOut: 3000});
      }
      );
    }
  }
}
