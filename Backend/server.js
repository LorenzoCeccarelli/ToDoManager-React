const express = require('express');
const morgan = require('morgan'); // logging middleware
const {check, validationResult} = require('express-validator'); // validation library
const dao = require('./dao.js');
const cors=require("cors");

const app = express();
const port = 3001;
//Set-up cors ONLY FOR DEVELOPMENT
app.use(cors());
// Set-up logging
app.use(morgan('tiny'));

// Process body content
app.use(express.json());

// Set-up the 'client' component as a static website
//app.use(express.static('../FrontEnd'));
//app.get('/', (req, res) => res.redirect('./index.html'));

// REST API endpoints

// Resources: Tasks,Projects

// GET /tasks/
// Retrieve the list of all the available tasks
// Request body: empty
// Response body: Array of objects, each describing a Task
// Errors: if the tasks does not exist ,500 Bad request
app.get('/tasks', (req, res) => {
  dao.listTasks()
    .then((tasks) => { 
      res.json(tasks); })
    .catch(() => { res.status(500).end(); });
});


// GET /tasks/<task_id>
// Create a new task, by providing all relevant information - except the "id"
// Parameter: task id
// Response body: object describing a task
// Error: if the task does not exist, returns {}
app.get('/tasks/:id', (req, res) => {
  dao.readTaskById(req.params.id)
    .then((task) => { res.json(task); })
    .catch(() => { res.status(500).end(); });
});


// POST /tasks
// Retrieve a task, given its id
// Request body: object describing a Task {description(mandatory),important(true/false),
//                                         private(true/false),project(optional),deadline(optional),
//                                         completed(true/false)  }
// Response body: new "id" for inserted Task
// Error: 422 invalid parameter
app.post('/tasks', [
  check('description').notEmpty().isString(),
  check('important').isInt({min:0,max:1}),
  check('visibility').isInt({min:0,max:1}),
  check('completed').isInt({min:0,max:1}),
  check('project').optional().isString(),
  check('deadline').optional(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }
  dao.createTask({
    description: req.body.description,
    important: req.body.important,
    private: req.body.visibility,
    project: req.body.project,
    deadline: req.body.deadline,
    completed: req.body.completed
  }).then((result) => {res.json(result)})
    .catch((err) => res.status(503).json({
      errors: [{'param': 'Server', 'msg': 'Database error'}],
    }));
});


// PUT /tasks/<task_id>
// Update an existing task except the "id"
// Request body: object describing a Task {description(mandatory),important(true/false),
//                                         private(true/false),project(optional),deadline(optional),
//                                         completed(true/false)  }
// Response body: none
// Error: 422 invalid parameter
app.put('/tasks/:id',[
  check('description').notEmpty().isString(),
  check('important').isInt({min:0,max:1}),
  check('visibility').isInt({min:0,max:1}),
  check('project').optional().isString(),
  check('deadline').optional(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }
  dao.updateTask({
    id: req.params.id,
    description: req.body.description,
    important: req.body.important,
    private: req.body.visibility,
    project: req.body.project,
    deadline: req.body.deadline
  })
    .then((task) => { res.end(); })
    .catch(() => { res.status(422).end(); });
});


// DELETE /tasks/<task_id>
// Delete an existing task, given its id
// Parameter: task id
// Request body: none
// Response body: none
// Error: if the task does not exist, 500 bad request
app.delete('/tasks/:id', (req, res) => {
  dao.removeTaskById(req.params.id)
    .then(() => { res.end(); })
    .catch(() => { res.status(500).end(); });
});


// PUT /tasks/<task_id>/completed/<value>
// Mark the task with <task_id> as completed
// Parameter: task id
// Request body: none
// Response body: none
// Error: if the task does not exist, 422 code error
app.put('/tasks/:id/completed/:value',(req,res)=>{
  dao.setCompleted(req.params.id,req.params.value)
      .then(()=>{ res.end();})
      .catch(()=>{res.status(422).end(); });
});


// GET /importantTasks
// Retrieve a list of all important tasks
// Parameter: none
// Response body: list of tasks
// Error: none
app.get('/importantTasks', (req, res) => {
  dao.readTasksByImportant()
    .then((tasks) => { res.json(tasks); })
    .catch(() => { res.status(500).end(); });
});


// GET /privateTasks
// Retrieve a list of all private tasks
// Parameter: none
// Response body: list of tasks
// Error: none
app.get('/privateTasks', (req, res) => {
  dao.readTasksByPrivate()
    .then((tasks) => { res.json(tasks); })
    .catch(() => { res.status(500).end(); });
});

// GET /sharedTasks
// Retrieve a list of all shared tasks
// Parameter: none
// Response body: list of tasks
// Error: none
app.get('/sharedTasks', (req, res) => {
  dao.readTasksBySharing()
    .then((tasks) => { res.json(tasks); })
    .catch(() => { res.status(500).end(); });
});

// GET /todayTasks
// Retrieve a list of all today tasks
// Parameter: none
// Response body: list of tasks
// Error: none
app.get('/todayTasks', (req, res) => {
  dao.readTodayTasks()
    .then((tasks) => { res.json(tasks); })
    .catch(() => { res.status(500).end(); });
});

// GET /next7DaysTasks
// Retrieve a list of all next7Days tasks
// Parameter: none
// Response body: list of tasks
// Error: none
app.get('/next7DaysTasks', (req, res) => {
  dao.readNext7DaysTasks()
    .then((tasks) => { res.json(tasks); })
    .catch(() => { res.status(500).end(); });
});

// GET /projects
// Retrieve a list of all projects name
// Parameter: none
// Response body: list of projects name
// Error: none
app.get('/projects', (req, res) => {
  dao.readProjects()
    .then((tasks) => { res.json(tasks); })
    .catch(() => { res.status(500).end(); });
});

// GET /projects/:projectName/tasks
// Retrieve a list of all tasks name given its project name
// Parameter:projectName
// Response body: list of all tasks with project = projectName
// Error: none
app.get('/projects/:projectName/tasks', (req, res) => {
  dao.readTasksByProject(req.params.projectName)
    .then((tasks) => { res.json(tasks); })
    .catch(() => { res.status(500).end(); });
});


/////////PROVA//////
/*app.get('/tasks', (req, res) => {
  console.log(req.params);
  console.log(req.query);
  console.log(Object.keys(req.query));

  res.end();
});*/

/////////FINE PROVA//
// Activate web server
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
