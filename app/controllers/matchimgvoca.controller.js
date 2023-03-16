const db = require("../models");
const Matchimgvoca = db.matchimgvoca;

// Retrieve all Matchimgvocas from the database.
exports.findAll = (req, res) => {
  Matchimgvoca.find({}, ["title", "slug", "url"], { sort:{
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

// Retrieve slug Matchimgvoca from the database.
exports.findSlug = (req, res) => {
  Matchimgvoca.findOne({slug : req.params.slug})
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

exports.findNew = (req, res) => {
  Matchimgvoca.find({}, ["title", "slug", "url"], { skip:0, limit:req.params.limit, sort:{ _id: -1 }})
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