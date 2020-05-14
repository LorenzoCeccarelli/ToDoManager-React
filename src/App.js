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
    //API.getAllTasks().then((t) => this.setState({tasks: t}));
    API.getProjectNames().then((pn) => this.setState({ projectList : pn}));
  }
  filterTasks= (filtro)=>{
    API.getFilterTasks(filtro).then((ts)=> this.setState({tasks: ts, filter: filtro}))
    //API.getAllTasks().then((ts)=> this.setState({tasks: ts, filter: filterList[0]}));
  }

  render() {
    console.log(this.state.tasks);
    console.log(this.state.projectList);
      return <div className="App">
          <Navbar/>
          <MainContent tasks={this.state.tasks} filter={this.state.filter} projectList={this.state.projectList} filterTasks={this.filterTasks} />
          <OptionalModal mode={this.state.mode} />
      </div>

  }

}

export default App;
