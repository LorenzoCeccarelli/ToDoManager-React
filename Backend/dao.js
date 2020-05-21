'use strict';

// DAO module for accessing courses and exams
// Data Access Object 

const sqlite = require('sqlite3');
const moment=require('moment');

const db = new sqlite.Database('tasks.sqlite', (err) => {
  if (err) throw err;
});

exports.listTasks = function() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const tasks = rows.map((e) => ({id: e.id, description: e.description, important: e.important,
                                      visibility: e.private, project: e.project, deadline: e.deadline, 
                                      completed: e.completed                                   }));
      resolve(tasks);
    });
  });
};


exports.readTaskById = function(id) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks WHERE id=?';
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row == undefined) {
        resolve({});
      } else {
        const task = {id: row.id, description: row.description, important: row.important,
                      visibility: row.private, project: row.project, deadline: row.deadline, 
                      completed: row.completed };
        resolve(task);
      }
    });
  });
};

exports.createTask = function(task) {
  return new Promise((resolve, reject) => {
    let idNew;
    const sqlId='SELECT MAX(id) MAXID FROM tasks';
    db.get(sqlId,(err,row)=>{
      if(err){
        reject(err);
        return;
      }
      console.log(task);
      if (row.MAXID =="NULL")
        row.MAXID=0;
      idNew=row.MAXID+1;
      if (task.project==undefined)
        task.project="NULL";
      if(task.deadline==undefined)
        task.deadline="NULL";
    });
    const sql = 'INSERT INTO tasks(id,description,important,private,project,deadline,completed) VALUES(?, ?, ?, ?, ?, ? ,? )';
    db.run(sql, [idNew,task.description,task.important,task.private,task.project,task.deadline,task.completed], (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve({id: idNew});
    
    });
  });
};

exports.updateTask = function(task) {
  return new Promise((resolve, reject) => {
    if (task.project==undefined)
        task.project=null;
    if(task.deadline==undefined)
        task.deadline=null;
    const sql = "UPDATE tasks SET description = ?, important = ?, private = ?, project = ?, deadline = ?  WHERE id=?";
    db.run(sql, [task.description,task.important,task.private,task.project,task.deadline,task.id], (err, row) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      resolve();
    });
  });
};

exports.removeTaskById = function(id) {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM tasks WHERE id=?';
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

exports.setCompleted = function(id,value) {
  return new Promise((resolve, reject) => {
    console.log(id);
    const sql = "UPDATE tasks SET completed=? WHERE id=?";
    db.run(sql, [value,id], (err, row) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      resolve();
    });
  });
};

exports.readTasksByImportant = function() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks WHERE important=1';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const tasks = rows.map((e) => ({id: e.id, description: e.description, important: e.important,
                                      visibility: e.private, project: e.project, deadline: e.deadline, 
                                      completed: e.completed                                   }));
      resolve(tasks);
    });
  });
};

exports.readTasksByPrivate = function() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks WHERE private=1';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const tasks = rows.map((e) => ({id: e.id, description: e.description, important: e.important,
                                      visibility: e.private, project: e.project, deadline: e.deadline, 
                                      completed: e.completed                                   }));
      resolve(tasks);
    });
  });
};

exports.readTasksBySharing = function() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks WHERE private=0';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const tasks = rows.map((e) => ({id: e.id, description: e.description, important: e.important,
                                      visibility: e.private, project: e.project, deadline: e.deadline, 
                                      completed: e.completed                                   }));
      resolve(tasks);
    });
  });
};

exports.readTodayTasks = function() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks WHERE deadline IS NOT NULL';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const tasks = rows
                    .filter(e => moment(e.deadline).isSame(moment(),'day'))
                    .map((e) => ({id: e.id, description: e.description, important: e.important,
                                      visibility: e.private, project: e.project, deadline: e.deadline, 
                                      completed: e.completed                                   }));
      resolve(tasks);
    });
  });
};

exports.readNext7DaysTasks = function() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks WHERE deadline IS NOT NULL';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const tasks = rows
                    .filter(e => moment(e.deadline).isBetween(moment(),moment().add(7,'d'),'d','()]'))
                    .map((e) => ({id: e.id, description: e.description, important: e.important,
                                      visibility: e.private, project: e.project, deadline: e.deadline, 
                                      completed: e.completed                                   }));
      resolve(tasks);
    });
  });
};

exports.readProjects = function() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT DISTINCT project FROM tasks WHERE project !=""';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const tasks = rows.map((e) => (e.project));
      resolve(tasks);
    });
  });
};

exports.readTasksByProject = function(projectName) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM tasks WHERE project=?';
    db.all(sql, [projectName], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const tasks = rows.map((e) => ({id: e.id, description: e.description, important: e.important,
                                      private: e.private, project: e.project, deadline: e.deadline, 
                                      completed: e.completed                                   }));
      resolve(tasks);
    });
  });
};
