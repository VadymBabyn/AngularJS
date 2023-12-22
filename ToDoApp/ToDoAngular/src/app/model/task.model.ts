export interface Task {
    task_id:number;

    root_table_username_id:number;
        
    taskName:string;

    completed:boolean;

    favorite: boolean;

    dataTimeCreateTask: Date;

    dataTimeEndTask: Date;

    dataTimeToCompleteTask: Date;
    
    category_category_id:number;
}