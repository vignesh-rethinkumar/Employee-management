export class employee{
  
  "employeeId": number;
  "employeeName": string;
  "contactNo": string;
  "emailId": string;
  "deptId": number;
  "password": string;
  "gender": string;
  "role": string;
  "createdDate": Date;

  constructor (){
    this.employeeId=0;
    this.deptId=0;
    this.employeeName='';
    this.contactNo = '';
    this.emailId = '';
    this.password = '';
    this.gender = '';
    this.role = 'employee';
    this.createdDate = new Date();
  }

}
export interface IParentDept{
  
      "departmentId": number,
      "departmentName": string,
      "departmentLogo": string;
    
}
export interface IchildDept{
  
   
      "childDeptId": number,
      "parentDeptId": number,
      "departmentName": string
    
    
}

export interface IApiResponse{
  message:string;
  result:boolean;
  data :any
}
export interface project {
  projectId: number,
  projectName: string,
  clientName: string,
  startDate: string,
  leadByEmpId: number,
  contactPerson: string,
  contactNo: string,
  emailId: string,
  employeeName:string
}
export class ProjectEmployee {
  empProjectId: number;
  projectId: number;
  empId: number;
  assignedDate: string;
  role: string;
  isActive: boolean;
  projectName?:string;
  employeeName?:string;

   constructor(){
    this.assignedDate = "";
    this.empId= 0;
    this.empProjectId = 0;
    this.isActive = true;
    this.projectId = 0;
    this.role = "";

   }

}

