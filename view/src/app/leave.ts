export class Leave {
	
	constructor(
	public lid:string,
    public uid:string,
    public uname:string,
    public userrole:string,
    public department:string,
    public base_wage:string,
    public email:string,
    public ltime: string,//离开时间
    public atime:string, //返回时间
    public ltype:string,//请假类型
    public desc:string,//请假描述
    public lstatus:string//假期申请状态
  	) {  }
}

    