const Conference = require("../models/conference.model")

const getConferences = async (req, res) => {
    try {
        const conferences = await Conference.find({});
        res.status(200).json(conferences)
      } catch (error) {
        res.status(500).json({message: error.message});
      }
}

const getConferenceById = async (req, res) => {
    try {
      const {id} = req.params;
      const conference = await Conference.findById(id);
      res.status(200).json(conference)
    } catch (error) {
      res.status(500).json({message: error.message});
    }
}

const createConference = async (req, res) => {
    try {
      const conference = await Conference.create(req.body);
      res.status(200).json(conference)
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  }

  const updateConference = async(req, res) => {
    try {
      const {id} = req.params;
      const conference = await Conference.findByIdAndUpdate(id, req.body);
  
      if(!conference){
        return res.status(404).json({message: "Conference not found"});
      }
  
      const updatedConference = await Conference.findById(id);
      res.status(200).json(updatedConference);
  
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  }

const deleteConference = async (req, res) => {
    try {
      const {id} = req.params;
      const conference = await Conference.findByIdAndDelete(id);
      if(!conference){
        return res.status(404).json({message: "Conference not found"});
      }
      res.status(200).json({message: "Conference has been deleted succesfully!"});
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  }

module.exports = {
    getConferences,
    getConferenceById,
    createConference,
    updateConference,
    deleteConference

}