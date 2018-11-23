'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const _ = require('lodash');

const db = require('../utils/db');
const {User} = require('../models/user');
const {Bank} = require('../models/bank');
// const {Group} = require('../models/group');
const {Question} = require('../models/question');
const {QuestionItem} = require('../models/questionItem');
const {Exam} = require('../models/exam');
const {ExamQuestion} = require('../models/examQuestion');
const {ExamStudent} = require('../models/examStudent');
const {ExamStudentDetail} = require('../models/examStudentDetail');

// Add headers
app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.use(bodyParser.json())

//region user route
app.get('/user', (req, res) => {
  User.find().then((user) => {
    res.send({user});
  }, (e) => {
    res.status(400).send(e);
  });
});


app.post('/user', (req, res) => {
    var user = new User({
        userID: req.body.userID,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        name: req.body.name,
        prename: req.body.prename,
        school: req.body.school,
        class: req.body.class,
        description: req.body.description,
    });
    // result = User.addUser(user);
    user.save().then((user) => {
      res.send(user);
    }, (e) => {
      res.status(400).send(e);
    });
});

app.get('/user/:userID', (req, res) => {
  var userID = req.params.userID;

  User.findOne({userID:userID}).then((user) => {
    res.send(user);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.put('/user/:userID', (req, res) => {
  var query = { userID: req.params.userID };

  User.findOneAndUpdate(query, {
    role: req.body.role,
    password: req.body.password,
    name: req.body.name,
    prename: req.body.prename,
    school: req.body.school,
    class: req.body.class,
    description: req.body.description
  }, {upsert:true}, (e, raw) => {
    if (e) {
      res.status(400).send('Invalid user supplied');
    }
    res.send(raw);
  });
});

app.delete('/user/:userID', (req, res) => {
  var query = { userID: req.params.userID };
  User.findOneAndRemove(query, 
    (e, raw) => {
      if (e) {
        res.status(400).send('Invalid username supplied');
      }
    res.send(raw);
  });
});

//endregion

//region bank route
app.get('/bank', (req, res) => {
  Bank.find().then((bank) => {
    res.send({bank});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.post('/bank', (req, res) => {
  var bank = new Bank({
    qbID: req.body.qbID,
    qbName: req.body.qbName,
    qbDescription: req.body.qbDescription,
  });
  bank.save().then((bank) => {
    res.send(bank);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/bank/:qbID', (req, res) => {
  var query = { qbID: req.params.qbID };

  Question.find(query).then((question) => {
    res.send(question);
  }, (e) => {
    res.status(404).send('Question Bank not found');
  });

});

app.put('/bank/:qbID', (req, res) => {
  var query = { qbID: req.params.qbID };

  Bank.findOneAndUpdate(query, {
    qbName: req.body.qbName,
    qbDescription: req.body.qbDescription,
  }, {upsert:true}, (e, raw) => {
    if (e) {
      res.status(400).send('Update question bank false');
    }
    res.send(raw);
  });
});

app.delete('/bank/:qbID', (req, res) => {
  var query = { qbID: req.params.qbID };

  Bank.findOneAndRemove(query, 
    (e, raw) => {
      if (e) {
        res.status(400).send('Invalid qbID supplied');
      }
    res.send(raw);
  });
});
//endregion

//region question route
app.get('/question', (req, res) => {
  Question.find().then((question) => {
    res.send({question});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.post('/question', (req, res) => {
  var question = new Question({
    qID: req.body.qID,
    qbID: req.body.qbID,
    type: req.body.type,
    qContent: req.body.qContent
  });
  question.save().then((question) => {
    res.send(question);
  }, (e) => {
    res.status(400).send('Add question item false');
  });
});

app.get('/question/:qID', (req, res) => {
  var query = { qID: req.params.qID };

  QuestionItem.find(query).then((questionItem) => {
    res.send({questionItem});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.put('/question/:qID', (req, res) => {
  var query = { qID: req.params.qID };

  Question.findOneAndUpdate(query, {
    qbID: req.body.qbID,
    type: req.body.type,
    qContent: req.body.qContent
  }, {upsert:true}, (e, raw) => {
    if (e) {
      res.status(400).send('Update question group false');
    }
    res.send(raw);
  });
});

app.delete('/question/:qID', (req, res) => {
  var query = { qID: req.params.qID };

  Question.findOneAndRemove(query, 
    (e, raw) => {
      if (e) {
        res.status(400).send('Invalid qID supplied');
      }
    res.send(raw);
  });
});

//endregion

//region question item route

app.post('/question/:qID', (req, res) => {

  var questionItem = new QuestionItem({
    qiID: req.body.qiID,
    qID: req.params.qID,
    qiContent: req.body.qiContent,
    note: req.body.note,
    answer: req.body.answer,
  });
  questionItem.save().then((questionItem) => {
    res.send(questionItem);
  }, (e) => {
    res.status(400).send('Add question item false');
  });
});

app.put('/question/:qID/:qiID', (req, res) => {
  var query = { qiID: req.params.qiID };

  QuestionItem.findOneAndUpdate(query, {
    qID: req.params.qID,
    qiContent: req.body.qiContent,
    note: req.body.note,
    answer: req.body.answer,
  }, {upsert:true}, (e, raw) => {
    if (e) {
      res.status(400).send('Update question group false');
    }
    res.send(raw);
  });
});

app.delete('/question/:qID/:qiID', (req, res) => {
  var query = { qiID: req.params.qiID };

  QuestionItem.findOneAndRemove(query, 
    (e, raw) => {
      if (e) {
        res.status(400).send('Invalid qID supplied');
      }
    res.send(raw);
  });
});

//endregion

//region exam item route

app.get('/exam', (req, res) => {
  Exam.find().then((exam) => {
    res.send({exam});
  }, (e) => {
    res.status(404).send('Exam not found');
  });
});

app.post('/exam', (req, res) => {
  var  isRandom = req.body.isRandom;
  var qbID = req.body.qbID;
  var questionsNumber = req.body.questionsNumber;
  var exam = new Exam({
    eID: req.body.eID,
    eDescription: req.body.eDescription,
    questionsNumber: questionsNumber,
    time: req.body.time,
    qbID: qbID,
    isRandom: isRandom,
  });
  exam.save().then((exam) => {
    if (isRandom === true){
      Question.find({qbID: qbID}).then((question) => {
        var qIDs = [];
        for (i in question) {
          qIDs.push(question[i].qID);
        }
        qIDsRandom = _.sampleSize(qIDs, questionsNumber);
        console.log(qIDsRandom);
        console.log(exam.eID);
        
        for (i in qIDsRandom) {
          var examQuestion = new ExamQuestion({
            eID: exam.eID,
            qID: qIDsRandom[i],
          });
          examQuestion.save().then((examQuestion) => {
            // res.send(examQuestion);
          });        
        }
      });
    }
    res.send(exam);
  }, (e) => {
    res.status(400).send('Add exam false');
  });
});

app.get('/exam/:eID', (req, res) => {
  var query = { eID: req.params.eID };
  ExamQuestion.find(query).then((examQuestion) => {
      var qIDs = [];
      for (i in examQuestion) {
        qIDs.push(examQuestion[i].qID);
      }
      Question.find({
        'qID': { $in: qIDs }
      }).then((question) => {
        res.send(question);
      });
    }, (e) => {
    res.status(400).send(e);
  });

});

app.post('/exam/:eID', (req, res) => {

  var examQuestion = new ExamQuestion({
    eqID: req.body.eID,
    eID: req.params.eID,
    qID: req.body.qID,
  });
  examQuestion.save().then((examQuestion) => {
    res.send(examQuestion);
  }, (e) => {
    res.status(400).send('Install exam false');
  });
});

app.put('/exam/:eID', (req, res) => {
  var query = { eID: req.params.eID };

  Exam.findOneAndUpdate(query, {
    eDescription: req.body.eDescription,
    questionsNumber: req.body.questionsNumber,
    time: req.body.time,
  }, {upsert:true}, (e, raw) => {
    if (e) {
      res.status(404).send('Exam not found');
    }
    res.send(raw);
  });
});

app.delete('/exam/:eID', (req, res) => {
  var query = { eID: req.params.eID };

  Exam.findOneAndRemove(query, 
    (e, raw) => {
      if (e) {
        res.status(404).send('Exam not found');
      }
    res.send(raw);
  });
});

//endregion

//region student route

app.get('/student', (req, res) => {
  ExamStudent.find().then((examStudent) => {
    res.send({examStudent});
  }, (e) => {
    res.status(400).send(e);
  });
});


app.post('/student', (req, res) => {
    var examStudent = new ExamStudent({
        eID: req.body.eID,
        userID: req.body.userID,
        mark: req.body.mark,
        numberQuestion: req.body.numberQuestion,
    });
    examStudent.save().then((examStudent) => {
      res.send(examStudent);
    }, (e) => {
      res.status(400).send(e);
    });
});

app.get('/student/:userID', (req, res) => {
  ExamStudent.find({userID: req.params.userID}).then((examStudent) => {
    res.send({examStudent});
  }, (e) => {
    res.status(400).send(e);
  });
});

//endregion

//region student route
var async = require('async');

app.post('/studentdetail', (req, res) => {
    var markStudent = 0;
    async.forEachOf(req.body, (detail, idDetail, done) => {
      var examStudentDetail = new ExamStudentDetail({
        userID: detail.userID,
        eID: detail.eID,
        qID: detail.qID,
        qiID: detail.qiID,
      });
      QuestionItem.find({qID:detail.qID}).then((questionItem) => {
        async.forEachOf(questionItem, (item, idItem, call) => {
          if(item.qiID == detail.qiID && item.answer == true){
            markStudent++;
            console.log(markStudent + ' - ' + idDetail);
          }
          call();
        })
      });
      examStudentDetail.save().then((examStudentDetail) => {
      }); 
      done(); 
    }), err => {
      if (err) console.error(err.message);
    }
    setTimeout(() => { 
      var examStudent = new ExamStudent({
          eID: req.body[0].eID,
          userID: req.body[0].userID,
          mark: markStudent,
          numberQuestion: req.body.length,
      });
      examStudent.save().then((examStudent) => {
        console.log(examStudent);
      }, (e) => {
        res.status(400).send(e);
      });
    }, 60000);
    res.send('Add success...');
});

// app.post('/studentdetail', (req, res) => {
//   var markStudent = 0;
//   for (var j = 0; j < req.body.length; j++) {
//         var examStudentDetail = new ExamStudentDetail({
//           userID:  req.body[j].userID,
//           eID:  req.body[j].eID,
//           qID:  req.body[j].qID,
//           qiID:  req.body[j].qiID,
//         });
//         var qis = [];
//         QuestionItem.find({qID: req.body[j].qID}).then((questionItem) => {
//           for (var i = 0; i < questionItem.length; i++) {
//             if(questionItem[i].qiID ==  req.body[j].qiID && questionItem[i].answer == true){
//               markStudent++;
//               console.log('a' + markStudent + ' - ' + j);
//               // if (idDetail === arrayDetail.length - 1){ 
//               //   console.log('b ' + markStudent + ' - ' + idDetail);
//               // }
//             }
//           }
//           // questionItem.forEach((item) => {
    
//           // })
//         });
//         examStudentDetail.save().then((examStudentDetail) => {
//         });  
//   }
//   res.send('Add success...');
// });
app.get('/studentdetail/:userID', (req, res) => {
  ExamStudentDetail.find({userID: req.params.userID}).then((examStudentDetail) => {
    res.send({examStudentDetail});
  }, (e) => {
    res.status(400).send(e);
  });
});

//endregion



module.exports = app;