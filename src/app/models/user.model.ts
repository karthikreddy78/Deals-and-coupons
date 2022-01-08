import { Role } from "./role.model";

export class User {

    id: string ="";
    email:string ="";
    password:string ="";
    fullname:string="";
    token:string="";
    enabled:boolean=true;
    roles:Set<Role> | undefined
    //private Set<Role> roles= new HashSet<>();
}