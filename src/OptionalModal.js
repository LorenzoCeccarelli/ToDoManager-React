import React from "react";

function OptionalModal(props){
    return <div className="modal fade" id="staticBackdrop" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <OptionalModalHeader />
                        <OptionalModalBody />
                        <OptionalModalFooter />
                    </div>
                </div>
            </div>
}
function OptionalModalHeader(){
    return <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">New Task Manager</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
            </div>
}
function OptionalModalBody(){
    return <div className="modal-body" id="modalBody">
                <OptionalTaskForm />
            </div>
}
function OptionalModalFooter(){
    return  <div className="modal-footer" id="modalFooter">
                <button type="button" className="btn btn-secondary" id="cancelButton" data-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary" id="buttonNewTask" >Add task!</button>
            </div>
}
function OptionalTaskForm(){
    return  <form id="formNewTask" autoComplete="off" name="new">
                <OptionalTaskFormDescription />
                <OptionalTaskFormPriority />
                <OptionalTaskFormVisibility />
                <OptionalTaskFormProjectName />
                <OptionalTaskFormDeadline />
            </form>;
}
function OptionalTaskFormDescription(){
    return <div className="form-group row">
            <label htmlFor="inputDescription" className="col-sm-2 col-form-label">Description:</label>
                <div className="col-sm-10">
                    <input type="Text" className="form-control" id="inputDescription" required={true} placeholder="This field is mandatory" />
                </div>
            </div>
}
function OptionalTaskFormPriority(){
    return <fieldset className="form-group">
                <div className="row">
                    <legend className="col-form-label col-sm-2 pt-0">Priority:</legend>
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gridRadios" id="UrgentRadios" value="urgent" />
                                <label className="form-check-label" htmlFor="UrgentRadios">
                                    Urgent
                                </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gridRadios" id="NotUrgentRadios" value="notUrgent" defaultChecked={true} />
                                <label className="form-check-label" htmlFor="NotUrgentRadios" >
                                    Not Urgent
                                </label>
                        </div>
                    </div>
                </div>
            </fieldset>
}
function OptionalTaskFormVisibility(){
    return <fieldset className="form-group">
                <div className="row">
                    <legend className="col-form-label col-sm-2 pt-0">Visibility:</legend>
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gridRadios1" id="PrivateRadios" value="private" />
                                <label className="form-check-label" htmlFor="PrivateRadios">
                                Private
                                </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gridRadios1" id="SharedRadios" value="shared" defaultChecked={true} />
                                <label className="form-check-label" htmlFor="SharedRadios">
                                Shared
                                </label>
                        </div>
                    </div>
                </div>
            </fieldset>;
}
function OptionalTaskFormProjectName(){
    return <div className="form-group row">
        <label htmlFor="inputProjectName" className="col-sm-2 col-form-label">Project Name:</label>
        <div className="col-sm-10">
            <input type="Text" className="form-control" id="inputProjectName" placeholder="This field is optional" />
        </div>
        </div>
}
function OptionalTaskFormDeadline(){
    return <fieldset className="form-group">
                <div className="row">
                    <legend className="col-form-label col-sm-2 pt-0">Deadline:</legend>
                    <div className="col-sm-10">
                        <div className="form-check" >
                            <input className="form-check-input" type="radio" name="gridRadios2" id="yesDeadline" value="yes" />
                            <label className="form-check-label" htmlFor="yesDeadline" id="labelYesDeadline">
                            Yes
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gridRadios2" id="noDeadline" value="no" defaultChecked={true} />
                                <label className="form-check-label" htmlFor="noDeadline" >
                                No
                                </label>
                        </div>
                    </div>
                </div>
            </fieldset>;
}
export default OptionalModal;