import React from 'react';
import IsLoading from '../components/IsLoading';
import api from '../services/api-service';

export default (WrappedComponent) => (
  class PostsGetter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        allPosts: null,
      };
    }
    
    async componentWillMount() {
      const allPosts = await api.request({ path: 'posts' });
      this.setState({ allPosts });
    }
    
    render() {
      const additionalProps = {
        allPosts: this.state.allPosts
      };
      return this.state.allPosts ? 
        (<WrappedComponent {...this.props} {...additionalProps} />)
        : (<IsLoading loading={true} />);
    }
  }
);
