import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../model/employee.model';
import { EmployeeService } from '../model/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers:[EmployeeService],
  
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.onReset();
    this.refresgEmployeeList();
  }

onReset(form?:NgForm){
if(form){
  form.reset();
}
  this.employeeService.selectedEmployee = {
    _id:"",
    name:"",
    age:null,
    position:"",
    salary:null,
    address:"",
    phone_number:null

  }
}

  onSubmit(form:NgForm){
    if(form.value._id==""){

      this.employeeService.postEmployee(form.value).subscribe((res)=>{
        this.onReset(form);
        this.refresgEmployeeList();
      });
    }
    else{
      this.employeeService.putEmployee(form.value).subscribe((res)=>{
        this.onReset(form);
        this.refresgEmployeeList();
        alert("Updated Successfully...!");
      })
    }
  }

  refresgEmployeeList(){
    this.employeeService.getEmployeeList().subscribe((res)=>{
      this.employeeService.employees = res as Employee[];
    })
  }

  onEdit(emp:Employee){
    this.employeeService.selectedEmployee = emp;
  }

  onDelete(_id:String , form:NgForm){
    if(confirm("Are you sure to delete this entry")){
      this.employeeService.deleteEmployee(_id).subscribe((res)=>{
        this.onReset(form);
        this.refresgEmployeeList();
        alert("Deleted Successfully...!");
      });
    }
    
  }
}
