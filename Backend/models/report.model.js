const mongoose = require("mongoose");

const presSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  supervisor: {
    type: String,
    required: true,
  },
  reviewto: {
    type: Date,
    required: true,
  },
  reviewfrom: {
    type: Date,
    required: true,
  },
  coreValuesAndObjectives: [
    {
      qualityofwork: [
        {
          rating: {
            type: Number,
          },
          comments: {
            type: String,
          },
        },
      ],
    },
    {
      attendenceandPanctuality: [
        {
          rating: {
            type: Number,
          },
          comments: {
            type: String,
          },
        },
      ],
    },
    {
      reliability: [
        {
          rating: {
            type: Number,
          },
          comments: {
            type: String,
          },
        },
      ],
    },
    {
      communicationskills: [
        {
          rating: {
            type: Number,
          },
          comments: {
            type: String,
          },
        },
      ],
    },
    {
      judgementanddecissionmaking: [
        {
          rating: {
            type: Number,
          },
          comments: {
            type: String,
          },
        },
      ],
    },
  ],
  jobspecificperformancecriteria: [
    {
      knowledgeofposition: [
        {
          rating: {
            type: Number,
          },
          comments: {
            type: String,
          },
        },
      ],
    },
    {
      workconsistency: [
        {
          rating: {
            type: Number,
          },
          comments: {
            type: String,
          },
        },
      ],
    },
  ],
  performancegoals: {
    type: String,
  },
  overallrating: {
    type: String,
  },
});

const PresModel = mongoose.model("report", presSchema);

module.exports = PresModel;
