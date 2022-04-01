const { reaction, user } = require('../models');

module.exports = {
  getReactions(req, res) {
    reaction.find()
      .then((reactions) => res.json(reactions))
      .catch((err) => res.status(500).json(err));
  },
  getSingleReaction(req, res) {
    reaction.findOne({ _id: req.params.reactionId })
      .select('-__v')
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: 'No reaction with that ID' })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },
  createReaction({params, body}, res) {
    reaction.create(body)
        .then((_id) => {
            return user.findOneAndUpdate({ _id: params.userId }, { $push: { reactions: _id } }, { new: true });
        })
        .then((reaction) => res.json(reaction))
        .catch((err) => res.json(err))
},
  deleteReaction(req, res) {
    reaction.findOneAndDelete({ _id: req.params.reactionId })
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: 'No such reaction' })
          : res.status(200).json({message: "reaction deleted"})
      )        
      .catch((err) => res.status(500).json(err));
  },

  updateReaction(req, res) {
    reaction.findOneAndUpdate(
      { _id: req.params.reactionId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: 'No such reaction' })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },

addReaction(req, res) {
  console.log('reaction added!');
  console.log(req.body);
  reaction.findOneAndUpdate(
      { _id: req.params.reactionId },
      { $push: { reactions: req.body } },
      { runValidators: true, new: true }
  )
      .then((reaction) =>
      !reaction
          ? res.status(404).json({ message: 'No such reaction' })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
},
deleteReaction(req, res) {
  console.log(req.params.reactionId)
  reaction.findOneAndUpdate(
      { _id: req.params.reactionId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { runValidators: true, new: true }
  )
      .then((reaction) =>
      !reaction
          ? res.status(404).json({ message: 'No such reaction' })
          : res.status(200).json({message: "Reaction deleted"})
      )
      .catch((err) => res.status(500).json(err));
},


};