import React from 'react';
import Navbar from "./Navbar.js";
import MainContent from "./MainContent.js";
import OptionalModal from "./OptionalModal.js";
import API from "./Api.js"

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {tasks: [], projectList: [], mode: 'view', editedTask: null, filter: null };
  }
  componentDidMount() {
    // fake loading the tasks from the API server
    API.getProjectNames().then((pn) => this.setState({ projectList : pn}));
  }

  filterTasks= (filtro)=>{
    API.getFilterTasks(filtro).then((ts)=> this.setState({tasks: ts, filter: filtro}));
  }
  
  projectTasks= (project)=>{
    API.getProjectTasks(project).then((ts)=>this.setState({tasks: ts, filter: project}));
  }

  requireEditTask= (task) =>{
    this.setState({mode : 'edit', editedTask: task});
  }

  deleteTask=(task)=> {
    API.deleteTask(task).then((ts)=> this.setState({tasks: ts}));
  }

  render() {
    console.log(this.state.tasks);
    console.log(this.state.projectList);
      return <div className="App">
          <Navbar/>
          <MainContent tasks={this.state.tasks} filter={this.state.filter} projectList={this.state.projectList} filterTasks={this.filterTasks}
           projectTasks={this.projectTasks} deleteTask={this.deleteTask}/>
          <OptionalModal mode={this.state.mode} />
      </div>

  }

}

export default App;
