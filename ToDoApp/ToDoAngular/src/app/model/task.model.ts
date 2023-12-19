export interface Task {
    Task_id:number;

    root_table_username_id:number;
        
    taskName:string;

    completed:boolean;

    Favorite: boolean;

    dataTimeCreateTask: Date;

    dataTimeEndTask: Date;

    dataTimeToCompleteTask: Date;
}