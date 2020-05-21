import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import * as moment from "moment"


class OptionalModal extends React.Component {
    constructor(props){
        super(props);
        this.state={show: true}
    }
    handleClose = ()=>{
        this.props.handleCloseModal();
    }
    render(){
    if (this.props.mode==="view")
        return null;
    
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose} size="lg">
          <Modal.Header closeButton>
              <Modal.Title>{this.props.mode==="add" ? "New" : "Edit"} task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <OptionalTaskForm mode={this.props.mode}editedTask={this.props.mode==="edit" ? this.props.editedTask : null} handleCloseButton={this.handleClose} addOrEditTask={this.props.addOrEditTask}/>
          </Modal.Body>
        </Modal>
      </>
    );
    }
  }


class OptionalTaskForm extends React.Component{
    constructor (props){
        super(props);
        /*let deadline=null;
        if (this.props.editedTask!==null)
            deadline=this.props.editedTask.deadline;*/
        this.state = {task : this.props.editedTask/*, datePicker : deadline===null ? false : true*/};
    }
    validateForm = (event) => {
        event.preventDefault();
    }
    doInsertTask=()=>{
        if (this.form.checkValidity()) {
           this.props.addOrEditTask(this.state.task)
        } else {
            this.form.reportValidity();
        }
    }
    updateField = (field, value) => {
        let newTask;
        if (this.props.mode==="edit")
            newTask=this.state.task;
        if (this.props.mode==="add")
            if (this.state.task===null)
                newTask={project : '', deadline : null};
            else newTask=this.state.task;
        newTask[`${field}`]=value;
        this.setState({task: newTask});
    }
    render(){
    return  <form id="formNewTask" autoComplete="off" ref={form => this.form = form} onSubmit={this.validateForm}>
                <OptionalTaskFormDescription  updateField={this.updateField} description={this.state.task === null ? null : this.state.task.description}/>
                <OptionalTaskFormPriority updateField={this.updateField} priority={this.state.task === null ? null : this.state.task.important}/>
                <OptionalTaskFormVisibility updateField={this.updateField} visibility={this.state.task === null ? null : this.state.task.visibility}/>
                <OptionalTaskFormProjectName updateField={this.updateField} project={this.state.task === null ? null : this.state.task.project}/>
                <OptionalTaskFormDeadline  updateField={this.updateField} deadline={this.state.task === null ? null : this.state.task.deadline}/>
                <OptionalControlTaskForm mode={this.props.mode} handleCloseButton={this.props.handleCloseButton} handleSubmitButton={this.doInsertTask}/>
            </form>;
    }
}
function OptionalControlTaskForm(props){
            return <>
            <Button variant="secondary" onClick={()=>{props.handleCloseButton()}}>
              Close
            </Button>
            <Button variant="primary" onClick={()=>{props.handleSubmitButton()}}>
              {props.mode==="add" ? "Add" : "Modify"} task!
            </Button>
            </>

}
function OptionalTaskFormDescription(props){
    return <div className="form-group row">
            <label htmlFor="inputDescription" className="col-sm-2 col-form-label">Description:</label>
                <div className="col-sm-10">
                    <input type="Text" className="form-control" name="description" id="inputDescription" required={true} placeholder="This field is mandatory" value={props.description} onChange={(ev)=>{props.updateField(ev.target.name,ev.target.value)}}/>
                </div>
            </div>
}
function OptionalTaskFormPriority(props){
    
    return <fieldset className="form-group">
                <div className="row">
                    <legend className="col-form-label col-sm-2 pt-0">Priority:</legend>
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="important" id="UrgentRadios" required={true} checked={props.priority===1 ? true : null} onClick={(ev)=>{props.updateField(ev.target.name,ev.target.value==="on" ? 1 : 0)}}/>
                                <label className="form-check-label" htmlFor="UrgentRadios">
                                    Urgent
                                </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="important" id="NotUrgentRadios" checked={props.priority===0 ? true : null} onClick={(ev)=>{props.updateField(ev.target.name,ev.target.value==="on" ? 0 : 1)}}/>
                                <label className="form-check-label" htmlFor="NotUrgentRadios" >
                                    Not Urgent
                                </label>
                        </div>
                    </div>
                </div>
            </fieldset>
}
function OptionalTaskFormVisibility(props){
    return <fieldset className="form-group">
                <div className="row">
                    <legend className="col-form-label col-sm-2 pt-0">Visibility:</legend>
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="visibility" id="PrivateRadios" required={true} checked={props.visibility===0 ? true : null} onClick={(ev)=>{props.updateField(ev.target.name,ev.target.value==="on" ? 0 : 1)}}/> 
                                <label className="form-check-label" htmlFor="PrivateRadios">
                                Private
                                </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="visibility" id="SharedRadios" checked={props.visibility===1 ? true : null} onClick={(ev)=>{props.updateField(ev.target.name,ev.target.value==="on" ? 1 : 0)}}/>
                                <label className="form-check-label" htmlFor="SharedRadios">
                                Shared
                                </label>
                        </div>
                    </div>
                </div>
            </fieldset>;
}
function OptionalTaskFormProjectName(props){
    return <div className="form-group row">
        <label htmlFor="inputProjectName" className="col-sm-2 col-form-label">Project Name:</label>
        <div className="col-sm-10">
            <input type="Text" className="form-control" name="project" placeholder="This field is optional" value={props.project} onChange={(ev)=>{props.updateField(ev.target.name,ev.target.value)}}/>
        </div>
        </div>
}
class OptionalTaskFormDeadline extends React.Component{
    constructor(props){
        super(props);
        this.state={datePicker : this.props.deadline==null ? false : true, deadlineDate: this.props.deadline===null ? moment().format("YYYY-MM-DD") : moment(this.props.deadline).format("YYYY-MM-DD") , deadlineHour: this.props.deadline===null ? moment().format("HH:mm") : moment(this.props.deadline).format("HH:mm")}
    }
    toggleDatePicker=()=>{
        this.setState({datePicker : !this.state.datePicker});
    }
    setDeadlineHour=(hour)=>{
        this.setState({deadlineHour : hour});
        this.props.updateField("deadline",this.state.deadlineDate+" "+hour);
    }
    setDeadlineDate= (date)=>{
        this.setState({deadlineDate : date})
        this.props.updateField("deadline",date+" "+this.state.deadlineHour);
    }
    render(){
    return <fieldset className="form-group">
                <div className="row">
                    <legend className="col-form-label col-sm-2 pt-0">Deadline:</legend>
                    <div className="col-sm-10">
                        <div className="form-check" >
                            <input className="form-check-input" type="radio" name="deadline" id="yesDeadline" required={true} checked={this.props.deadline===null ? null : true} onChange={(ev)=>{this.props.updateField(ev.target.name, ev.target.value==="on" ? moment(this.state.deadlineDate+" "+this.state.deadlineHour) : null);
                                                                                                                                                                                                         this.toggleDatePicker()}}/>
                            <label className="form-check-label" htmlFor="yesDeadline" id="labelYesDeadline">
                            Yes
                            </label>
                            {(this.state.datePicker===true) &&
                            <DatePicker deadlineHour={this.state.deadlineHour} deadlineDate={this.state.deadlineDate} setDeadlineHour={this.setDeadlineHour} setDeadlineDate={this.setDeadlineDate}/>
                            }
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="deadline" id="noDeadline" checked={this.props.deadline ===null ? true : null} onChange={(ev)=>{this.toggleDatePicker(); 
                                                                                                                                                                                        this.props.updateField(ev.target.name, ev.target.value==="on" ? null : this.state.deadlineDate+" "+this.state.deadlineHour)}}/>
                                <label className="form-check-label" htmlFor="noDeadline" >
                                No
                                </label>
                        </div>
                    </div>
                </div>
            </fieldset>;
    }
}
function DatePicker(props){
    return  <>
            <input type="date"  className="form-control input-lg" required={true} min={moment().format("YYYY-MM-DD")} value={props.deadlineDate} onChange={(ev)=>props.setDeadlineDate(ev.target.value)} />
            <input type="time" className="form-control input-lg" required={true} value={props.deadlineHour} onChange={(ev)=> props.setDeadlineHour(ev.target.value)}/>
            </>
}
export default OptionalModal;