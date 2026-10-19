import { HttpClient } from '@angular/common/http';
import { employee, IApiResponse, project, ProjectEmployee } from '../model/employee';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService{

  apiUrl:string = "https://projectapi.gerasim.in/api/EmployeeManagement/"
  constructor(private http : HttpClient){

  }
  createNewEmployee(obj:employee){

    return this.http.post<employee>(this.apiUrl+"CreateEmployee",obj);
    
  }
   updateEmployee(obj:employee){

    return this.http.put<employee>(this.apiUrl+"UpdateEmployee/"+obj.employeeId,obj);
    
  }
  getEmployees(){
    return this.http.get<employee[]>(this.apiUrl+"GetAllEmployees");
  }

   deleteEmpById(id :  number){
    return this.http.delete<employee>(this.apiUrl+"DeleteEmployee"+id);
  }

  createNewProject(obj:project){

    return this.http.post<project>(this.apiUrl+"CreateProject",obj);
    
  }
  updateProject(obj:project){

    return this.http.put<project>(this.apiUrl+"UpdateProject/"+obj.projectId,obj);
    
  }

  getProjects(){
    return this.http.get<project[]>(this.apiUrl+"GetAllProjects");
  }
   addNewProjectEmployee(obj:ProjectEmployee){

    return this.http.post<ProjectEmployee>(this.apiUrl+"CreateProjectEmployee",obj);
    
  }

    GetProjectEmployee(){
    return this.http.get<ProjectEmployee[]>(this.apiUrl+"GetAllProjectEmployees");
  }
}
