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
    API.deleteTask(task).then((ts)=> this.setState({tasks: ts.tasks, projectList: ts.projects}));
  }
  openTaskForm = ()=>{
    this.setState({mode: 'add'});
  } 
  handleCloseModal = ()=>{
    this.setState({mode : "view", editedTask:null});
  }
  addOrEditTask = (task)=>{
    console.log(task)
    if (this.state=="edit")
      API.modifyTask(task).then((ts)=>this.setState({tasks : ts}));
    else if (this.state=="add")
      API.addTask(task).then((ts)=>this.setState({tasks: ts}));
  }
  render() {
      return <div className="App">
          <Navbar/>
          <MainContent tasks={this.state.tasks} filter={this.state.filter} projectList={this.state.projectList} filterTasks={this.filterTasks}
           projectTasks={this.projectTasks} deleteTask={this.deleteTask} openTaskForm={this.openTaskForm} requireEditTask={this.requireEditTask}/>
          <OptionalModal mode={this.state.mode} editedTask={this.state.editedTask} handleCloseModal={this.handleCloseModal} addOrEditTask={this.addOrEditTask}/>
      </div>

  }

}

export default App;
