import React from 'react';
import { Transition } from 'react-transition-group';
import anime from 'animejs';

const enterAnimation = el => {
  anime({
    targets: el,
    duration: 250,
    opacity: [0, 1],
    maxHeight: 190,
    easing: 'easeOutQuad'
  })
};

const leaveAnimation = el => {
  anime({
    targets: el,
    duration: 250,
    opacity: 0,
    maxHeight: 0,
    easing: 'easeInQuad'
  })
};

const FadeSlideDown = ({ in: inProp, children }) => React.Children.map(children, child => 
  <Transition 
    timeout={250}
    in={inProp}
    mountOnEnter={true}
    unmountOnExit={true}
    onEntering={enterAnimation}
    onExiting={leaveAnimation}
  >
    {child}
  </Transition>
);

export default FadeSlideDown;