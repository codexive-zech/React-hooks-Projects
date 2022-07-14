const paginate = (followers) => {
  const followersPerPage = 12; // set number of followers per page
  const pages = Math.ceil(followers.length / followersPerPage); // set number of pages
  const followersByPage = Array.from({ length: pages }, (_, index) => {
    const start = index * followersPerPage; // set the start of the array
    return followers.slice(start, start + followersPerPage); // set the start and end number to be received from the followers data
  }); // created array form an array via the length of pages
  return followersByPage;
};

export default paginate;
