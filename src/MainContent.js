import React from "react";
import Sidebar from "./Sidebar";
import TaskManager from "./TaskManager"

function MainContent(props){
    return  <div className="container-fluid">
                <div className="row vheight-100">
                    <Sidebar filterList={props.filterList} projectList={props.projectList} />
                    <main className="col-sm-8 col-12 below-nav grid" id="MainContent">
                    <TaskManager tasks={props.tasks} filter={props.filter} />
                    </main>
                </div>
            </div>
}

export default MainContent;