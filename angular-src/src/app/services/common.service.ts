import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  addCategory(category){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/budget/', category, {headers});
  }

  getAllCategory(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/budget/all', {headers});
  }

  getCurrentMonthExpenses(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/expense/getCurrentMonthExpense', {headers});
  }

  addExpenses(expense){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/expense/', expense, {headers});
  }
}
