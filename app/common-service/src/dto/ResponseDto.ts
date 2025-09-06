
export class ResponseDto<T=any> {
    result : any;
    success : boolean;
    status: number;

    constructor(result:T,success:boolean,status:number){
        this.status = status;
        this.success = success;
        this.result = result;
    }
}