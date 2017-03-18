import React, { PropTypes } from 'react';

// import './posts.scss';

const returnPostItem = (post, i, navigateToPost) => (
  <a 
    tabIndex={0}
    key={i} 
    onKeyPress={e => e.key === 'Enter' && navigateToPost(post)}
    onClick={() => navigateToPost(post)} 
    className="posts-list__post"
  >{post.title}</a>
);

const Posts = ({ data, className, navigateToPost }) => (
  <section className={`posts-list ${className}`}>
    {data.map((post, i) => returnPostItem(post, i, navigateToPost))}
  </section>
);

Posts.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
  navigateToPost: PropTypes.func,
};

export default Posts;