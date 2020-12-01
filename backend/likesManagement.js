module.exports = (sauce, userId, like) => {
  switch (like) {
    case 1:
      sauce.usersLiked.push(userId);
      sauce.likes++;
      break;
    case -1:
      sauce.usersDisliked.push(userId);
      sauce.dislikes++;
      break;
    case 0:
      const likeIndex = sauce.usersLiked.indexOf(userId)      
      if (likeIndex !== -1) {
        sauce.usersLiked.splice(likeIndex, 1);
        sauce.likes--;
      };
      const dislikeIndex = sauce.usersDisliked.indexOf(userId)      
      if (dislikeIndex !== -1) {
        sauce.usersDisliked.splice(dislikeIndex, 1);
        sauce.dislikes--;
      };
      break;
    default:
      return (error);
  }
  return (sauce)
}
