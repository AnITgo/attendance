export class Checkin {
	
	constructor(
    public cid:string,
    public uid:string,
    //public uname:string,
    public cdate:string,
    public starttime:string,//打卡开始时间
    public endtime:string   //打开结束时间
  	) {  }
}
