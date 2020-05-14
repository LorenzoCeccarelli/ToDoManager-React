import React from "react";

function Sidebar(props) {
        return <aside className="collapse d-sm-block col-sm-4 col-12 bg-light below-nav" id="left-sidebar">
                    <nav id="navbar-example3" className="navbar navbar-light navbar-full">
                        <nav className="nav nav-pills flex-column">
                            <FilterList filterList={props.filterList} />
                            <ProjectList projectList={props.projectList} />
                        </nav>
                    </nav>
                </aside>
    
}

class FilterList extends React.Component{
    constructor(props){
        super(props);
        this.state={filterList: props.filterList};
    }
    render(){
        return <>
                <FilterTitle />
                <nav className="nav nav-pills flex-column">
                    {
                    this.state.filterList.map((e,index) => <FilterItem key={index}
                                                        filterItem={e}
                                                     />)
                    }
                
                </nav>
             </>
    }
}

function FilterTitle(){
    return <a className="nav-link nav-link-group">Filters</a>;
}
function FilterItem(props){
    return <a id={`filter${props.filterItem}`} className="nav-link ml-3 my-1 nav-link-item" href="#">{props.filterItem}</a>
}
class ProjectList extends React.Component{
    constructor(props){
        super(props);
        this.state={projectList : props.projectList};
    }
    render(){
        return <>
                <ProjectTitle />
                <nav className="nav nav-pills flex-column">
                    {
                        this.state.projectList.map((e,index)=> <ProjectItem key={index}
                                                        projectItem={e}/> )
                    }
                </nav>
               </>

                
    }
}
function ProjectTitle(){
    return <a className="nav-link nav-link-group" >Projects</a>
}
function ProjectItem(props){
    return <a id={`project${props.projectItem}`} className="nav-link ml-3 my-1 nav-link-item" href="#">{props.projectItem}</a>
}
export default Sidebar;