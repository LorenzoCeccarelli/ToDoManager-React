import * as moment from "moment"
/**
 * Information about Task
 */
class Task{
    /**
   * Constructs a new Task object DA COMPLETARE
   * @param {Number} id unique code for the task
   * @param {String} description the task description
   * @param {Number} important 0 (important) or 1 (not important)
   * @param {Number} visibility 0 (private) or 1 (not private)
   * @param {String} project the project name of the task (Null if there isn't)
   * @param {moment} deadline the deadline of the task (Null if there isn't)
   * @param {Number} completed 0 (completed) or 1 (not completed)
   */
    constructor(id,description,important,visibility,project,deadline,completed){
        this.id=id;
        this.description=description;
        this.important=important;
        this.visibility=visibility;
        this.project=project; 
        this.deadline=deadline;
        this.completed=completed; 
    }

    /**
   * Construct a Task from a plain object
   * @param {{}} json 
   * @return {Task} the newly created Task object
   */
  static from(json) {
    return Object.assign(new Task(), json);
  }

}

export default Task;