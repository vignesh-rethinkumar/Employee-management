
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Component, ElementRef, inject, OnInit,ViewChild} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { employee, project, ProjectEmployee } from '../../model/employee';
import { EmployeeService } from '../../service/employee';
import { Block } from '@angular/compiler';

import { Modal } from 'bootstrap';

@Component({
  imports: [CommonModule, ReactiveFormsModule, AsyncPipe,DatePipe,FormsModule],
  selector: 'app-project',
  styleUrl: './project.css',
  templateUrl: './project.html',
})
export class Project implements OnInit {


 @ViewChild('myModal') employeeModal?: ElementRef;
  currentView: string = 'List';

  projectForm: FormGroup = new FormGroup({});
  projectEmployee: ProjectEmployee = new ProjectEmployee()

  employeeSrv = inject(EmployeeService);
  projectList :project[]=[];
  projectEmployeeList :ProjectEmployee[]=[];

  employeeData$: Observable<employee[]> = new Observable<employee[]>();

 constructor() {
  this.initializeForm();

  this.employeeData$ = this.employeeSrv.getEmployees();

  this.employeeData$.subscribe({
    next: (res) => {
      console.log('Employee API response:', res);
      console.log('Is the response an array?', Array.isArray(res));
    },
    error: (err) => {
      console.error('Employee API error:', err);
    }
  });
}
   ngOnInit(): void {
     this.getAllProject();
   }

  onAddEmployees(id: number) {
    this.getAllProjectEmployee(id);
    this.projectEmployee.projectId = id;
  if (this.employeeModal) {
    const modal = Modal.getOrCreateInstance(
      this.employeeModal.nativeElement
    );
    modal.show();
  }
}

closeModal() {
  if (this.employeeModal) {
    const modal = Modal.getInstance(
      this.employeeModal.nativeElement
    );

    modal?.hide();
  }
}

    onEdit(projectData: project) {
  console.log('Edit button clicked:', projectData);
  this.initializeForm(projectData);
  this.currentView = 'create';
}


  initializeForm(project? : project) {
    this.projectForm = new FormGroup({
      projectId: new FormControl(project ? project.projectId:0),
      projectName: new FormControl(project ? project.projectName:""),
      clientName: new FormControl(project ? project.clientName:""),
      startDate: new FormControl(project ? project.startDate:""),
      leadByEmpId: new FormControl(project ? project.leadByEmpId:""),
      contactPerson: new FormControl(project ? project.contactPerson:""),
      contactNo: new FormControl(project ? project.contactNo:""),
      emailId: new FormControl(project ? project.emailId:"")
    });
    this.currentView="create";
  }


onAddEmp() {
  const projectId = this.projectEmployee.projectId;

  this.employeeSrv.addNewProjectEmployee(this.projectEmployee).subscribe({
    next: (res: ProjectEmployee) => {
      alert("Employee Added To The Project Successfully!!");

      // Refresh the employee list
      this.getAllProjectEmployee(projectId);

      // Reset fields while keeping the project ID
      this.projectEmployee = new ProjectEmployee();
      this.projectEmployee.projectId = projectId;
    },
    error: (error) => {
      console.error('Error assigning employee:', error);
    }
  });
}


  onSaveProject(){
    const formValue = this.projectForm.value;
    if(formValue.projectId == 0){
        this.employeeSrv.createNewProject(formValue).subscribe((res:project)=>{
      debugger;
         alert("Project Added Successfully!!");
         this.getAllProject();
    },error=>{

    })
    }else{
       this.employeeSrv.updateProject(formValue).subscribe((res:project)=>{
      debugger;
         alert("Project Updated Successfully!!");
          this.getAllProject();
    },error=>{

    })
    }
    debugger;
   
  }
   getAllProjectEmployee(id :  number){
   
    this.employeeSrv.GetProjectEmployee().subscribe((res:ProjectEmployee[])=>{
      debugger;
      debugger;
      const record = res.filter(m=>m.projectId == id)
         this.projectEmployeeList = record;
    },error=>{

    })
  }

    getAllProject(){
   
    this.employeeSrv.getProjects().subscribe((res:project[])=>{
      debugger;
         this.projectList = res;
    },error=>{

    })
  }
}
