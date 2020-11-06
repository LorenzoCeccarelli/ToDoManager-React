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
    API.getAllProjects().then((pn) => {console.log(pn);
                                      this.setState({ projectList : pn})});
   
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
    API.deleteTask(task).then(()=> {
      let t=this.state.tasks;
      t=t.filter(e=>e.id!=task.id);
      this.setState({tasks: t})
      });
      API.getAllProjects().then((pn) => {console.log(pn);
        this.setState({ projectList : pn})});
  }
  openTaskForm = ()=>{
    this.setState({mode: 'add'});
  } 
  handleCloseModal = ()=>{
    this.setState({mode : "view", editedTask:null});
  }
  addOrEditTask = (task)=>{
    console.log(task)
    if (this.state.mode=="edit")
      API.updateTask(task).then((ts)=>this.setState({tasks:null, filter: null, mode:"view"}));
    else if (this.state.mode=="add"){
      task.completed=0;
      API.addTask(task).then(()=>this.setState({tasks:null, filter: null, mode: "view"}));
    }
    API.getAllProjects().then((pn) => {console.log(pn);
      this.setState({ projectList : pn})});
  }
  setCompleted = (taskId,value)=>{
    API.setTaskCompleted(taskId,value).then(()=> {
      let t=this.state.tasks;
      for (let i=0;i<t.length;i++)
        if (t[i].id===taskId)
          t[i].completed=value;
        console.log(t);
      this.setState({tasks : t});
    })
  }
  render() {
      return <div className="App">
        <h1 data-testid="prova">Prova</h1>
          <Navbar/>
          <MainContent tasks={this.state.tasks} filter={this.state.filter} projectList={this.state.projectList} filterTasks={this.filterTasks}
           projectTasks={this.projectTasks} deleteTask={this.deleteTask} openTaskForm={this.openTaskForm} requireEditTask={this.requireEditTask}
           setCompleted={this.setCompleted}/>
          <OptionalModal mode={this.state.mode} editedTask={this.state.editedTask} handleCloseModal={this.handleCloseModal} addOrEditTask={this.addOrEditTask}/>
      </div>

  }

}

export default App;
