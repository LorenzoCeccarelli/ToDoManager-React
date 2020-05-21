import React from "react";
import Sidebar from "./Sidebar";
import TaskManager from "./TaskManager"

function MainContent(props){
    return  <div className="container-fluid">
                <div className="row vheight-100">
                    <Sidebar  projectList={props.projectList} filterTasks={props.filterTasks} filter={props.filter} projectTasks={props.projectTasks} />
                    <main className="col-sm-8 col-12 below-nav grid" id="MainContent">
                    <TaskManager tasks={props.tasks} filter={props.filter} deleteTask={props.deleteTask}  
                    requireEditTask={props.requireEditTask} setCompleted={props.setCompleted}/>
                     <NewTaskButton openTaskForm={props.openTaskForm}/>
                    </main>
                </div>
            </div>
}
function NewTaskButton(props){
    return <button id="newTaskButton" type="button" className="btn btn-lg btn-success fixed-right-bottom" onClick={()=>{props.openTaskForm()}}>&#43;</button>;
}


export default MainContent;