import React from "react";
import * as moment from "moment"
const iconVisibility=<svg className="bi bi-person-square" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" 
                            clipRule="evenodd"/><path fillRule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/></svg>

const iconEdit=<button type="button" className="btn"><svg className="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clipRule="evenodd"/>
                <path fillRule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clipRule="evenodd"/>
                </svg></button>

const iconDelete=<svg className="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
                <path fillRule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clipRule="evenodd"/>
                </svg>
function TaskManager(props){
    return  <>
            <TaskTable tasks={props.tasks} filter={props.filter} deleteTask={props.deleteTask}/>
            
            </>
}
class TaskTable extends React.Component{
    
    render(){
        console.log(this.props);
        return <>
        <table className='table ' style={{marginBottom: 0}}>
        <thead className="headTable">
        </thead>
        <tbody>{
            this.props.tasks.map((e) => <TaskItem key={e.id}
                                                  task={e}
                                                  deleteTask={this.props.deleteTask}
                                                 />)
        }
        </tbody>
    </table>
    </>
    }
}
class TaskItem extends React.Component{
    

    render(){
        return <tr className="taskRow" id={`task${this.props.task.id}`}>
                <TaskItemInfo task={this.props.task} /><TaskItemControl task={this.props.task} deleteTask={this.props.deleteTask}/>
               </tr>
    }
    
}
function TaskItemInfo(props){
    let priority=props.task.important;
    let visibility=props.task.visibility;
    let completed= props.task.completed;
    let deadline=props.task.deadline;
    let classType;
    if (priority === 1)
        classType="custom-control-input important"
    else classType="custom-control-input "  
    if (visibility === 1)
        visibility=iconVisibility;
    else visibility =null;
    let check;
    if (completed==1)
        check=true;
    else check=false;
    let scaduto=null;
    if (deadline!=null){
        deadline=deadline.format("YYYY-MM-DD HH:mm");
        if (moment(deadline).isBefore(moment()))
            scaduto="scaduto";
    }

    return <>
        <td>
            <div className="d-flex w-100 justify-content-between">
                <div className="custom-control custom-checkbox">
                    <input className={classType} type="checkbox" id={props.task.id} defaultChecked={check}/>
                    <label htmlFor={props.task.id} className="custom-control-label">
                        {props.task.description}
                    </label>
                </div>
            </div>
        </td>
        <td>
            <span className="badge badge-primary ml-4">{props.task.project}</span>
        </td>
        <td>{visibility}</td>
        <td className={scaduto}>{deadline}</td>
    </>;
}
function TaskItemControl(props){
    return  <td>{iconEdit}
                <button type="button" className="btn" onClick={()=>{props.deleteTask(props.task)}}>
                {iconDelete}
                </button>
            </td>;
}

export default TaskManager;