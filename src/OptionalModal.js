import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


function OptionalModal(props) {
    const [show, setShow] = React.useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <NewTaskButton showModal={handleShow} />
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <OptionalTaskForm />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

function NewTaskButton(props){
    return <button id="newTaskButton" type="button" className="btn btn-lg btn-success fixed-right-bottom" onClick={props.showModal}>&#43;</button>;
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