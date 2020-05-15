import React from "react";
import Sidebar from "./Sidebar";
import TaskManager from "./TaskManager"

function MainContent(props){
    return  <div className="container-fluid">
                <div className="row vheight-100">
                    <Sidebar  projectList={props.projectList} filterTasks={props.filterTasks} filter={props.filter} projectTasks={props.projectTasks} />
                    <main className="col-sm-8 col-12 below-nav grid" id="MainContent">
                    <TaskManager tasks={props.tasks} filter={props.filter} deleteTask={props.deleteTask}/>
                    </main>
                </div>
            </div>
}

export default MainContent;