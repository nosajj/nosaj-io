import React, { PropTypes } from 'react'

import Logo from '../../components/Logo';
import Footer from '../../components/Footer';
import Posts from '../../components/Posts';
import FrontIntro from '../../components/FrontIntro';

import './front.scss';

const Front = ({ data: { freshRender, isBusy, navigateToPost, showoff, triggerNavDance } }) => (    
  <div className={`front-view ${freshRender ? 'animate' : ''}`}>
    <Logo 
      onTrigger={triggerNavDance}
      text="nosaj" 
      showoff={showoff} 
      loading={isBusy} />
    <main className="front-view__main">
      <FrontIntro className="front-section" />
        <Posts 
          className="front-section" 
          navigateToPost={(location) => navigateToPost(location)} 
        />
    </main>
    <Footer />
  </div>
)

Front.propTypes = {
  data: PropTypes.object, // this will be the shared state object
};

export default Front
