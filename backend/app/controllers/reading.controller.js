const db = require("../models");
const Reading = db.reading;

// Retrieve all Readings from the database.
exports.findAll = (req, res) => {
  Reading.find({}, ["title", "slug", "url"], { sort:{
        _id: -1 
    }})
    .then(data => { 
      const responses = [];
      data.map((response)=>{
        responses.push({title: response.title, slug: response.slug, url: response.url})
      })
      res.send(responses);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

exports.findNew = (req, res) => {
  Reading.find({}, ["title", "slug", "url"], { skip:0, limit: req.params.limit, sort:{ _id: -1 }})
    .then(data => { 
      const responses = [];
      data.map((response)=>{
        responses.push({title: response.title, slug: response.slug, url: response.url})
      })
      res.send(responses);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Retrieve slug Reading from the database.
exports.findSlug = (req, res) => {
  Reading.findOne({slug : req.params.slug})
  .then(data => {
    if (!data) res.send({success: false, message: "Not found"});
    else res.send({success: true, data: data});
  })
  .catch(err => {
    res
      .status(500)
      .send({success: false, message: "Error"});
  });
};