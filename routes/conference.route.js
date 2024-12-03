const express = require("express");
const Conference = require("../models/conference.model.js");
const router = express.Router();
const  {getConferences, getConferenceById, createConference, updateConference, deleteConference}= require("../controllers/conference.controller.js")

router.get('/', getConferences);
router.get('/:id', getConferenceById)
router.post('/', createConference)
router.put('/:id', updateConference)
router.delete('/:id', deleteConference)

module.exports = router;