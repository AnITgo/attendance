export class User {
	
	constructor(
    public uid:string,
    public uname:string,
    public password:string,
    public userrole:string,
    public uvacation:string,//年假
    public department:string,
    public base_wage:string,
    public email:string
  	) {  }
}
