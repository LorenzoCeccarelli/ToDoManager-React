import React from 'react';
import Task from "./task.js";
import Navbar from "./Navbar.js";
import MainContent from "./MainContent.js";
import OptionalModal from "./OptionalModal.js";
import * as moment from "moment"

const fakeTasks=[
  new Task(0,"Fare la spesa", 1, 0, "Rifornimento", moment("2020-12-05 22:45"),0),
  new Task(1,"Pulire la casa", 0, 1, "Casa", moment("2020-05-08 21:09"),1),
  new Task(2,"Studiare aw1",1,1,"Università",null,0)
];

const fakeProjects=[
  "Rifornimento", "Casa","Università"
]

const filterList=[
  "All", "Important", "Today", "Next 7 days", "Private", "Shared with..."
]

class App extends React.Component {
  render() {
      return <div className="App">
          <Navbar/>
          <MainContent filterList={filterList} tasks={fakeTasks} filter={filterList[0]} projectList={fakeProjects} />
          <OptionalModal  />
      </div>

  }

}

export default App;
