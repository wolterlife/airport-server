const express = require('express');
const router = require('./router')
const app = express();
const port = 3000;

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware)

const db = {
  courses: [
    {id: 1, title: 'front-end'},
    {id: 2, title: 'back-end'},
    {id: 3, title: 'devops'},
    {id: 4, title: 'automationQA'},
  ]
}

// app.get('/', (req, res) => {
//   res.json('Hello world. Main page')
// })
//
// app.get('/courses/', (req, res) => {
//   let dbCourses = db.courses;
//   if (req.query.title) dbCourses = dbCourses.filter(e => e.title.includes(req.query.title))
//   res.json(dbCourses);
// })
//
// app.get('/courses/:id', (req, res) => {
//     const foundCourse = db.courses.find(e => e.id === +req.params.id);
//     if (!foundCourse) {
//       res.sendStatus(404);
//       return;
//     }
//   res.json(foundCourse);
// })
//
// app.post('/courses', (req, res) => {
//   const createdCourse = {
//     id: +new Date(),
//     title: req.body.title,
//   }
//   console.log(req.body);
//   db.courses.push(createdCourse);
//   res.json(createdCourse);
// })
//
// app.put('/courses/:id', (req, res) => {
//   const foundedCourse = db.courses.find(e => e.id === +req.params.id);
//   if (!foundedCourse) {
//     res.sendStatus(404);
//     return;
//   }
//   foundedCourse.title = req.body.title;
//   res.status(200).json(foundedCourse);
// })
//
// app.delete('/courses/:id', (req, res) => {
//   const foundedCourse = db.courses.find(e => e.id === +req.params.id);
//   if (!foundedCourse) {
//     res.sendStatus(404);
//     return;
//   }
//   db.courses = db.courses.filter(e => e.id !== +req.params.id)
//   res.json(foundedCourse);
// })

/*
fetch("http://localhost:3000/courses", { method: "POST", body: JSON.stringify({title: 'dba'}), headers: {
    'content-type': 'application/json'
}
})
    .then(res => res.json())
    .then(json => console.log(json))
 */

app.use("/", router)

app.listen(port, () => {console.log(`App listen on port ${port}!`)})
