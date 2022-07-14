const paginate = (followers) => {
  const followersPerPage = 12;
  const pages = Math.ceil(followers.length / followersPerPage);
  const followersByPage = Array.from({ length: pages }, (_, index) => {
    const start = index * followersPerPage;
    return followers.slice(start, start + followersPerPage);
  });
  return followersByPage;
};

export default paginate;
