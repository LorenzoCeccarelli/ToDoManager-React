import React from "react";

function Sidebar(props) {
        return <aside className="collapse d-sm-block col-sm-4 col-12 bg-light below-nav" id="left-sidebar">
                    <nav id="navbar-example3" className="navbar navbar-light navbar-full">
                        <nav className="nav nav-pills flex-column">
                            <FilterList filterTasks={props.filterTasks} filter={props.filter}/>
                            <ProjectList projectList={props.projectList} filter={props.filter} projectTasks={props.projectTasks}/>
                        </nav>
                    </nav>
                </aside>
    
}

function FilterList(props){
    return <>
            <a className="nav-link nav-link-group">Filters</a>
            <nav className="nav nav-pills flex-column">
                <a className={`nav-link ml-3 my-1 nav-link-item ${props.filter==="All"? "active": ""}`} href="#" onClick={()=>{props.filterTasks("All")}}>All</a>
                <a className={`nav-link ml-3 my-1 nav-link-item ${props.filter==="Important"? "active": ""}`} href="#" onClick={()=>{props.filterTasks("Important")}}>Important</a>
                <a className={`nav-link ml-3 my-1 nav-link-item ${props.filter==="Today"? "active": ""}`} href="#" onClick={()=>{props.filterTasks("Today")}}>Today</a>
                <a className={`nav-link ml-3 my-1 nav-link-item ${props.filter==="Next7days"? "active": ""}`} href="#" onClick={()=>{props.filterTasks("Next7days")}}>Next 7 Days</a>
                <a className={`nav-link ml-3 my-1 nav-link-item ${props.filter==="Private"? "active": ""}`} href="#" onClick={()=>{props.filterTasks("Private")}}>Private</a>
                <a className={`nav-link ml-3 my-1 nav-link-item ${props.filter==="SharedWith..."? "active": ""}`} href="#" onClick={()=>{props.filterTasks("SharedWith...")}}>Shared with...</a>
            </nav>
             </>
    
}
   
function ProjectList(props){
    return <>
                <ProjectTitle />
                <nav className="nav nav-pills flex-column">
                    {
                        props.projectList.map((e,index)=> <ProjectItem key={index} projectItem={e} projectTasks={props.projectTasks} filter={props.filter}/> )
                    }
                </nav>
               </>

                
    
}
function ProjectTitle(){
    return <a className="nav-link nav-link-group" >Projects</a>
}
function ProjectItem(props){
    console.log(props.projectItem);
    return <a name={props.projectItem} className={`nav-link ml-3 my-1 nav-link-item ${props.filter===props.projectItem? "active": ""}`} href="#" onClick={()=>{props.projectTasks(props.projectItem)}}>{props.projectItem}</a>
}
export default Sidebar;