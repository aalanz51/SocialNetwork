const { Schema, model} = require("mongoose");
const moment = require('moment')

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      maxlength: 280,
    },
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      maxlength: 20,
    },
    createdAt: {
      type: Date,
      default: () => Date.now(),
    },
      reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);


thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const reaction = model('thought', thoughtSchema);

module.exports = reaction;