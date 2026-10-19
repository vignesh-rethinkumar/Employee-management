/* 

import { Component, inject, OnInit } from '@angular/core';
import { Master } from '../../service/master';
import { employee, IApiResponse, IchildDept, IParentDept } from '../../model/employee';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../service/employee';


@Component({
  imports: [FormsModule],
  selector: 'app-employee',
  styleUrl: './employee.css',
  templateUrl: './employee.html',
})
export class Employee implements OnInit {

  parentDeptList: IParentDept[] = [];
  childDeptList : IchildDept[] = [];
  deptId :number = 0;

  employeeObj : employee = new employee();
  employeeList : employee[]=[];

  masterService = inject(Master);
  empService = inject(EmployeeService);

  ngOnInit(): void {

    console.log("Employee component loaded");

    this.getParentDeptList();
    this.getEmployees();
  }

    getEmployees() {

    console.log("getParentDeptList() called");

       this.empService.getEmployees().subscribe((res: employee[]) => {

        this.employeeList=res;

    console.log("API RESPONSE:", res);

  


  });
    
  }

  getParentDeptList() {

    console.log("getParentDeptList() called");

       this.masterService.getParentDept().subscribe((res: IApiResponse) => {

    console.log("API RESPONSE:", res);

    console.log("DATA:", res.data);

    this.parentDeptList = res.data;

    console.log("PARENT DEPARTMENT LIST:", this.parentDeptList);

  });
    
  }
  onDeptChange(){
    this.masterService.getChildDeptByParentId(this.deptId).subscribe((res:IApiResponse)=>{
       this.childDeptList = res.data;
    })
  }

  onSaveEmp(){
    debugger;
    this.empService.createNewEmployee(this.employeeObj).subscribe((res:employee)=>{
      debugger;
      
        alert("employee created successfully!")
     
    },error=>{
      alert('Error form API')
    })
  }

}
 */

import { Component, inject, OnInit, ChangeDetectorRef, signal } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Master } from '../../service/master';
import {
  employee,
  IApiResponse,
  IchildDept,
  IParentDept
} from '../../model/employee';
import { EmployeeService } from '../../service/employee';
import { CommonModule } from '@angular/common';


@Component({
  imports: [FormsModule,CommonModule],
  selector: 'app-employee',
  styleUrl: './employee.css',
  templateUrl: './employee.html',
})
export class Employee implements OnInit {

  parentDeptList: IParentDept[] = [];
  childDeptList: IchildDept[] = [];
  deptId: number = 0;

  employeeObj: employee = new employee();
  employeeList: employee[] = [];

  masterService = inject(Master);
  empService = inject(EmployeeService);
  cdr = inject(ChangeDetectorRef);

  isSidePanelOpen = signal<boolean>(false);

  ngOnInit(): void {
    console.log('Employee component loaded');

    this.getParentDeptList();
    this.getEmployees();
  }

  addNew(){
    this.isSidePanelOpen.set(true);
  }

  close(){
    this.isSidePanelOpen.set(false);
  }

 onEdit(obj: employee) {
  this.employeeObj = { ...obj };      // copy, so the table does not change while typing
  this.isSidePanelOpen.set(true);     // open the form panel
}

  getEmployees(): void {
    console.log('getEmployees() called');

    this.empService.getEmployees().subscribe({
      next: (res: employee[]) => {
        console.log('EMPLOYEE API RESPONSE:', res);

        this.employeeList = res;

        console.log('EMPLOYEE LIST:', this.employeeList);

        // Update the view after receiving the API response
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
      }
    });
  }

  getParentDeptList(): void {
    this.masterService.getParentDept().subscribe({
      next: (res: IApiResponse) => {
        console.log('PARENT DEPARTMENT RESPONSE:', res);

        this.parentDeptList = res.data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching parent departments:', error);
      }
    });
  }

  onDeptChange(): void {
    this.childDeptList = [];
    this.employeeObj.deptId = 0;

    if (this.deptId === 0) {
      return;
    }

    this.masterService.getChildDeptByParentId(this.deptId).subscribe({next: (res: IApiResponse) => {
          this.childDeptList = res.data;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error fetching child departments:', error);
        }
      });
  }

  onSaveEmp(): void {
    this.empService.createNewEmployee(this.employeeObj).subscribe({next: (res: employee) => {
        console.log('CREATE EMPLOYEE RESPONSE:', res);

        alert('Employee created successfully!');

        // Reload the employee list after saving
        this.getEmployees();

        // Reset the form
        this.employeeObj = new employee();
        this.deptId = 0;
        this.childDeptList = [];
      },
      error: (error) => {
        console.error('Error creating employee:', error);
        alert('Error creating employee. Check the console.');
      }
    });
  }

  onUpdateEmp(){
     this.empService.updateEmployee(this.employeeObj).subscribe({next: (res: employee) => {
        console.log('CREATE EMPLOYEE RESPONSE:', res);

        alert('Employee Updated successfully!');

        // Reload the employee list after saving
        this.getEmployees();

        // Reset the form
        this.employeeObj = new employee();
        this.deptId = 0;
        this.childDeptList = [];
      },
      error: (error) => {
        console.error('Error creating employee:', error);
        alert('Error creating employee. Check the console.');
      }
    });
  }


        onDelete(id: number): void {
          // Ask for confirmation
          const result = confirm('Are you sure you want to delete this employee?');

          // Stop if the user clicks Cancel
          if (!result) {
            return;
          }

          // Call the Delete API
          this.empService.deleteEmpById(id).subscribe({
            next: () => {
              // Runs when the API succeeds
              alert('Employee deleted successfully!');
              this.getEmployees(); // Refresh the list
            },
            error: (error) => {
              // Runs when the API fails
              console.error('Delete error:', error);
              alert(
                'Could not delete this employee because the API failed. Please continue with other features.'
              );
            }
          });
        }

}
