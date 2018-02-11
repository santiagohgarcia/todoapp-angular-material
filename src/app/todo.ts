class ToDo {
    _id:string;
    title: string;
    description: string;
    date: Date;
    status: string;

    constructor(
    ){
        this._id = null;
        this.title = ""
        this.description = ""
        this.date = new Date()
        this.status = ""
    }
}

export default ToDo;