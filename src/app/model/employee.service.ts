import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee:Employee;
  employees:Employee[];
   readonly URL = "http://localhost:3000/employees/";

  constructor(private http: HttpClient) { }

  postEmployee(emp : Employee){
    return this.http.post(this.URL,emp);
  }

  getEmployeeList(){
    return this.http.get(this.URL);
  }

  putEmployee(emp:Employee){
    return this.http.put(this.URL+`/${emp._id}`,emp);
  }

  deleteEmployee(_id:String){
    return this.http.delete(this.URL+_id);
  }
  
}
