import * as moment from "moment"
import Task from "./task.js";

 let fakeTasks=[
    new Task(0,"Fare la spesa", 1, 0, "Rifornimento", moment("2020-12-05 22:45"),0),
    new Task(1,"Pulire la casa", 0, 1, "Casa", moment("2020-05-08 21:09"),1),
    new Task(2,"Studiare aw1",1,1,"Università",null,0),
    new Task(3,"vvvrfbg", 0, 1, "Casa", moment("2020-05-16 21:09"),1),
    new Task(4,"asdrubale", 0, 1, "Casa", moment("2020-05-14 23:09"),1),
  ];

async function getFilterTasks(filter){
    switch (filter){
        case "All":
            return fakeTasks;
        case "Important":
            return fakeTasks.filter((task)=>task.important==1);
        case "Today":
            return fakeTasks.filter((task)=>task.deadline!= null && task.deadline.isSame(moment(),"day"));
        case "Next7days":
            const nextWeek = moment().add(1, 'weeks');
            const tomorrow = moment().add(1, 'days');
            return fakeTasks.filter((task)=>task.deadline!=null && task.deadline.isAfter(tomorrow) && task.deadline.isBefore(nextWeek));
        case "Private":
            return fakeTasks.filter((task)=>task.visibility==0);
        case "SharedWith...":
            return fakeTasks.filter((task)=>task.visibility==1);
        default :
            return [];
        
    }
}

async function getProjectNames(){
    const fakeProjects=[
        "Rifornimento", "Casa","Università"
      ];
      return fakeProjects; 
}

async function getProjectTasks(project){
    return fakeTasks.filter((task)=>task.project==project);
}

async function deleteTask(task){
    fakeTasks=fakeTasks.filter((t)=>t.id!=task.id);
    return fakeTasks;
}
const API= {getFilterTasks, getProjectNames, getProjectTasks, deleteTask};
export default API;