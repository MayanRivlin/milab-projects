const fs = require('fs');
const express = require('express');
let  app = express();


app.listen(3000, () => {
  console.log('Listening on port 3000');
});

// print all tasks:
app.get('/tasks', (req, res) => {
  //res.send("user list");
  fs.readFile('/Users/mayanrivlin/Documents/milab/moblieProj/HW4/tasks.json',(err, data) => {
    if (err) {
      console.error(err);
      return;
     }
    console.log(data);
    //res.send("your tasks are:" );
    res.send(`Your tasks are: ${data}`); 
    return;
    });
});

// add new task
app.get('/tasks/new',(req, res) => {
    // get from user new id, task
    let new_id = req.query.id || "<unknown>";
    let new_task = req.query.task || "<unknown>";

    fs.readFile('/Users/mayanrivlin/Documents/milab/moblieProj/HW4/tasks.json',(err, data) => {
      if (err) {
          console.error(err);
          return;
      }
      console.log(data);
      input = JSON.parse(data);
      // make the new task as the same format
      input.tasks.push({
        id: new_id,
        task: new_task 
      });
      // add the new task to the json file
      let output = JSON.stringify(input);
      fs.writeFile("/Users/mayanrivlin/Documents/milab/moblieProj/HW4/tasks.json", output, (err) => {
        if (err) {
          console.log(err);
          return;
        }
      })
    });
    //print new task
    res.send(`You added this task: ${new_task}`);
  });

  //removes a task
  app.get('/tasks/remove',(req, res) => {
    //get task id from user
    let id = req.query.id || "<unknown>";
    //err cheack
    fs.readFile('/Users/mayanrivlin/Documents/milab/moblieProj/HW4/tasks.json',(err, content) => {
      if (err) {
          console.error(err);
          return;
      }
      //find the task with od number from user
      input = JSON.parse(content);
      let remove_id = input.tasks.findIndex((task) => task.id === id);
      if(remove_id > -1) {
        input.tasks.splice(remove_id , 1);
      }
      // 
      let output = JSON.stringify(input);
      fs.writeFile("/Users/mayanrivlin/Documents/milab/moblieProj/HW4/tasks.json", output, (err) => {
        if (err) {
          console.log(err);
          return;
        }
      })
    });
    res.send(`You removed the task with this number: ${id}`);
  });
