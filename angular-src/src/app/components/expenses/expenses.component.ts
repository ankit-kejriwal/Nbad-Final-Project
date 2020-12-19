import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
  categories = [];
  expenses = [];
  dp: any;
  dp2: any;
  selectedCategory = '';
  selectedDate: any;
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
  cost: any;
  constructor(
    private commonService: CommonService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initiazlizeCalendar();
    let date = new Date();
    let obj = {
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
    this.displayMonth = this.monthNames[obj.month];
    this.getExpenses(obj);
    this.getAllCategory();
  }

  initiazlizeCalendar() {
    this.dp = $('#datepicker1')
      .datepicker({
        format: 'mm-yyyy',
        startView: 'months',
        endDate: new Date(),
        minViewMode: 'months',
        autoclose: true,
      })
      .on('changeDate', (selected) => {
        this.selectedDate = selected;
      });

    this.dp2 = $('#datepicker2')
      .datepicker({
        format: 'mm-yyyy',
        startView: 'months',
        endDate: new Date(),
        minViewMode: 'months',
        autoclose: true,
      })
      .on('changeDate', (selected) => {
        let obj = {
          month: selected.date.getMonth() + 1,
          year: selected.date.getFullYear(),
        };
        this.displayMonth = this.monthNames[obj.month];
        this.getExpenses(obj);
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
        } else {
          this.selectedCategory = 'Category not present';
        }
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

  getExpenses(obj) {
    this.expenses = [];
    this.commonService.getMonthExpenses(obj).subscribe(
      (data: any) => {
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            this.expenses.push(data[i]);
          }
        }
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

  setCategory(data: any) {
    this.selectedCategory = data;
  }

  addExpenses() {
    if (this.cost < 0) {
      this.toastr.error('Cost should be greater than zero', 'Error', {
        timeOut: 3000,
      });
    } else if (this.selectedDate == null) {
      this.toastr.error('Please select date', 'Error', { timeOut: 3000 });
    } else {
      const expense = {
        title: this.selectedCategory,
        cost: this.cost,
        month: this.selectedDate.date.getMonth() + 1,
        year: this.selectedDate.date.getFullYear(),
      };
      let obj = {
        month: this.selectedDate.date.getMonth() + 1,
        year: this.selectedDate.date.getFullYear(),
      };
      this.commonService.addExpenses(expense).subscribe(
        (data: any) => {
          this.toastr.success('Successfully added expense', 'Success', {
            timeOut: 3000,
          });
          this.cost = 0;
          this.displayMonth = this.monthNames[obj.month];
          this.getExpenses(obj);
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
}
