import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.scss']
})
export class ConfigureComponent implements OnInit {
  category: String= '';
  cost: any = '';
  categories = [];
  constructor(
    private commonService: CommonService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllCategory();
  }

  onSubmit(){
    const category = {
      title: this.category,
      cost: this.cost
    };
    if(this.category.length > 0 && this.cost > 0){
      this.commonService.addCategory(category).
      subscribe((data: any) => {
          this.toastr.success('Successfully added category', 'Success',{timeOut: 3000});
          this.getAllCategory();
          this.category = '';
          this.cost = '';
      },
      (err) =>{
        if(err.status == 401) {
          this.toastr.error('Session has expired', 'Error', { timeOut: 3000 });
          this.router.navigate(['login']);
        } else {
          this.toastr.error('Error', 'Error', { timeOut: 3000 });
        }
      });
    } else {
      this.toastr.error('Required fields are not correct. Please check the input', 'Error',{timeOut: 3000});
    }

  }

  getAllCategory(){
    this.categories = [];
    this.commonService.getAllCategory().
      subscribe((data: any) => {
          if(data.length  > 0){
            for(let i = 0;i<data.length;i++){
              this.categories.push(data[i]);
            }
          }
      },
      (err) =>{
        if(err.status == 401) {
          this.toastr.error('Session has expired', 'Error', { timeOut: 3000 });
          this.router.navigate(['login']);
        } else {
          this.toastr.error('Error', 'Error', { timeOut: 3000 });
        }
      });
  }

}
