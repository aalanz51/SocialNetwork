const { Thought, User } = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No such thought' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  createThought({body}, res) {
    Thought.create(body)
        .then((_id) => {
            return User.findOneAndUpdate({ _id: body.userId }, { $push: { thoughts: _id } }, { new: true });
        })
        .then((thought) => res.json(thought))
        .catch((err) => res.json(err))
},
 
deleteThought(req, res) {
  Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No such thought' })
        : res.status(200).json({message: "Thought deleted"})
    )        
    .catch((err) => res.status(500).json(err));
},


  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No such thought' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

addReaction(req, res) {
  console.log('Reaction added!');
  console.log(req.params.thoughtId)
  console.log(req.body);
  Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { runValidators: true, new: true }
  )
      .then((thought) =>
      !thought
          ? res.status(404).json({ message: 'No such reaction' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
},
deleteReaction(req, res) {
  console.log(req.params.reactionId)
  Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
  )
      .then((thought) =>
      !thought
          ? res.status(404).json({ message: 'No such thought' })
          : res.status(200).json({message: "Reaction deleted"})
      )
      .catch((err) => res.status(500).json(err));
},


};