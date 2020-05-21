import * as moment from "moment"
import Task from "./task.js";
const APIURL=new URL("http://localhost:3001");

 /*let fakeTasks=[
    new Task(0,"Fare la spesa", 1, 0, "Rifornimento", moment("2020-12-05 22:45"),0),
    new Task(1,"Pulire la casa", 0, 1, "Casa", moment("2020-05-08 21:09"),1),
    new Task(2,"Studiare aw1",1,1,"Università",null,0),
    new Task(3,"vvvrfbg", 0, 1, "Casa", moment("2020-05-16 21:09"),1),
    new Task(4,"asdrubale", 0, 1, "Casa", moment("2020-05-14 23:09"),1),
  ];

  let fakeProjects=[
    "Rifornimento", "Casa","Università"
  ];*/

async function getFilterTasks(filter){
    switch (filter){
        case "All":
            return getAllTasks();
        case "Important":
            return getImportantTasks();
        case "Today":
            return getTodayTasks()
        case "Next7days":
            return getNext7DayTasks();
        case "Private":
            return getPrivateTasks();
        case "SharedWith...":
            return getSharedTasks();
        default :
            return [];
        
    }
}

async function getAllTasks() {
    // call REST API : GET /tasks
    const response = await fetch(new URL('/tasks',APIURL));
    const tasks_json = await response.json();
    if (response.ok) {
        return tasks_json.map((task) => Task.from(task)); 
    } else {
        throw tasks_json;  // An object with the error coming from the server
    }
}

async function getImportantTasks() {
    // call REST API : GET /importantTasks
    const response = await fetch(new URL('/importantTasks',APIURL));
    const tasks_json = await response.json();
    if (response.ok) {
        return tasks_json.map((task) => Task.from(task));
    } else {
        throw tasks_json;  // An object with the error coming from the server
    }
}

async function getTodayTasks() {
    // call REST API : GET /todayTasks
    const response = await fetch(new URL('/todayTasks',APIURL));
    const tasks_json = await response.json();
    if (response.ok) {
        return tasks_json.map((task) => Task.from(task));
    } else {
        throw tasks_json;  // An object with the error coming from the server
    }
}
async function getNext7DayTasks() {
    // call REST API : GET /next7DayTasks
    const response = await fetch(new URL('/next7DaysTasks',APIURL));
    const tasks_json = await response.json();
    if (response.ok) {
        return tasks_json.map((task) => Task.from(task));
    } else {
        throw tasks_json;  // An object with the error coming from the server
    }
}

async function getPrivateTasks() {
    // call REST API : GET /privateTasks
    const response = await fetch(new URL('/privateTasks',APIURL));
    const tasks_json = await response.json();
    if (response.ok) {
        return tasks_json.map((task) => Task.from(task));
    } else {
        throw tasks_json;  // An object with the error coming from the server
    }
}

async function getSharedTasks() {
    // call REST API : GET /sharedTasks
    const response = await fetch(new URL('/sharedTasks',APIURL));
    const tasks_json = await response.json();
    if (response.ok) {
        return tasks_json.map((task) => Task.from(task));
    } else {
        throw tasks_json;  // An object with the error coming from the server
    }
}

async function getAllProjects() {
    // call REST API : GET /projects
    const response = await fetch(new URL(`/projects`,APIURL));
    const tasks_json = await response.json();
    if (response.ok) {
        return tasks_json/*.map((task) => ({name: task.projectName}));*/
    } else {
        throw tasks_json;  // An object with the error coming from the server
    }
}

async function getProjectTasks(projectName) {
    // call REST API : GET /projects/:projectName/tasks
    const response = await fetch(new URL(`/projects/${projectName}/tasks`,APIURL));
    const tasks_json = await response.json();
    if (response.ok) {
        return tasks_json.map((task) => Task.from(task));
    } else {
        throw tasks_json;  // An object with the error coming from the server
    }
}
async function addTask(task) {
    //if (task.deadline!=null)
        //task.deadline=task.deadline.format("YYYY-MM-DD HH:mm");
    return new Promise((resolve, reject) => {
        console.log(task);
        fetch(new URL('/tasks',APIURL), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        }).then( (response) => {
            if(response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                .then( (obj) => {reject(obj);} ) // error msg in the response body
                .catch( (err) => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
                  }
        }).catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
    
}

async function deleteTask(task) {
    return new Promise((resolve, reject) => {
        console.log(task.id);
        fetch(new URL(`/tasks/${task.id}`,APIURL), {
            method: 'DELETE',
        }).then( (response) => {
            if(response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                .then( (obj) => {reject(obj);} ) // error msg in the response body
                .catch( (err) => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
                  }
        }).catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
    
}
async function updateTask(task) {
    // call REST API : PUT /tasks/<task_id>
    console.log(task.deadline);
    if (task.deadline!=null)
        task.deadline=moment(task.deadline).format("YYYY-MM-DD HH:mm");
    return new Promise((resolve, reject) => {
        console.log(JSON.stringify(task));
        fetch(new URL(`/tasks/${task.id}`,APIURL), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        }).then( (response) => {
            if(response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                .then( (obj) => {reject(obj);} ) // error msg in the response body
                .catch( (err) => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
                  }
        }).catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
    
}

async function setTaskCompleted(task,value) {
    return new Promise((resolve, reject) => {
        console.log(task);
        fetch(new URL(`/tasks/${task}/completed/${value}`,APIURL), {
            method: 'PUT',
        }).then( (response) => {
            if(response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                .then( (obj) => {reject(obj);} ) // error msg in the response body
                .catch( (err) => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
                  }
        }).catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
    
}
const API= {getFilterTasks,getProjectTasks, addTask,deleteTask, getAllProjects, updateTask, setTaskCompleted};
export default API;