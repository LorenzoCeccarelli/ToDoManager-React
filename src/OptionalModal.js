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
        let d=null;
        if (this.props.editedTask!==null)
            d=this.props.editedTask.deadline;
        this.state = {task : this.props.editedTask, datePicker : d===null ? false : true};
    }
    validateForm = (event) => {
        event.preventDefault();
    }
    doInsertTask=()=>{
        console.log(this.form.inputDescription)
        if (this.form.checkValidity()) {
           this.props.addOrEditTask()
        } else {
            this.form.reportValidity();
        }
    }
    updateDescription = ( value) => {
        description = this.state.task.description;
        this.setState({task: value});
    }
    render(){
    return  <form id="formNewTask" autoComplete="off" ref={form => this.form = form} onSubmit={this.validateForm}>
                <OptionalTaskFormDescription  description={this.state.task === null ? null : this.state.task.description}/>
                <OptionalTaskFormPriority priority={this.state.task === null ? null : this.state.task.important}/>
                <OptionalTaskFormVisibility visibility={this.state.task === null ? null : this.state.task.visibility}/>
                <OptionalTaskFormProjectName project={this.state.task === null ? null : this.state.task.project}/>
                <OptionalTaskFormDeadline  deadline={this.state.task === null ? null : this.state.task.deadline}/>
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
                    <input type="Text" className="form-control" id="inputDescription" required={true} placeholder="This field is mandatory" defaultValue={props.description} />
                </div>
            </div>
}
function OptionalTaskFormPriority(props){
    
    return <fieldset className="form-group">
                <div className="row">
                    <legend className="col-form-label col-sm-2 pt-0">Priority:</legend>
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gridRadios" id="UrgentRadios" required={true} defaultChecked={props.priority===1 ? true : null} />
                                <label className="form-check-label" htmlFor="UrgentRadios">
                                    Urgent
                                </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gridRadios" id="NotUrgentRadios" defaultChecked={props.priority===0 ? true : null} />
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
                            <input className="form-check-input" type="radio" name="gridRadios1" id="PrivateRadios" required={true} defaultChecked={props.visibility===0 ? true : null} />
                                <label className="form-check-label" htmlFor="PrivateRadios">
                                Private
                                </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gridRadios1" id="SharedRadios" defaultChecked={props.visibility===1 ? true : null}/>
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
            <input type="Text" className="form-control" id="inputProjectName" placeholder="This field is optional" defaultValue={props.project} />
        </div>
        </div>
}
class OptionalTaskFormDeadline extends React.Component{
    constructor(props){
        super(props);
        this.state={datePicker : this.props.deadline==null ? false : true}
    }
    toggleDatePicker=()=>{
        this.setState({datePicker : !this.state.datePicker});
    }
    render(){
    return <fieldset className="form-group">
                <div className="row">
                    <legend className="col-form-label col-sm-2 pt-0">Deadline:</legend>
                    <div className="col-sm-10">
                        <div className="form-check" >
                            <input className="form-check-input" type="radio" name="gridRadios2" id="yesDeadline" required={true} defaultChecked={this.props.deadline===null ? null : true} onClick={()=>{this.toggleDatePicker()}}/>
                            <label className="form-check-label" htmlFor="yesDeadline" id="labelYesDeadline">
                            Yes
                            </label>
                            {(this.state.datePicker===true) &&
                            <DatePicker deadline={this.props.deadline}/>
                            }
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gridRadios2" id="noDeadline" defaultChecked={this.props.deadline ===null ? true : null} onClick={()=>{this.toggleDatePicker()}}/>
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
            <input type="date"  className="form-control input-lg" required={true} min={moment().format("YYYY-MM-DD")} value={props.deadline===null ? moment().format("YYYY-MM-DD") : props.deadline.format("YYYY-MM-DD")} />
            <input type="time" className="form-control input-lg" required={true} value={props.deadline === null ? moment().format("HH:mm") : props.deadline.format("HH:mm")} />
            </>
}
export default OptionalModal;