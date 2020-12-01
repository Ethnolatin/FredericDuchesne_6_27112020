module.exports = (sauce, userId, like) => {
  switch (like) {
    case 1:
      sauce.usersLiked.push(userId);
      sauce.likes += 1;
      break;
    case -1:
      sauce.usersDisliked.push(userId);
      sauce.dislikes += 1;
      break;
    case 0:
      const likeIndex = sauce.usersLiked.indexOf(userId)      
      if ( likeIndex !== -1) {
        sauce.usersLiked.splice(likeIndex, 1);
        sauce.likes -= 1;
      };
      const dislikeIndex = sauce.usersDisliked.indexOf(userId)      
      if (dislikeIndex !== -1) {
        sauce.usersDisliked.splice(dislikeIndex, 1);
        sauce.dislikes -= 1;
      };
      break;
    default:
      return (error);
  }
  return (sauce)
}
