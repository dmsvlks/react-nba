import React from 'react';
import { Transition } from 'react-transition-group';
import anime from 'animejs';

const animation = el => {
  anime({
    targets: el,
    duration: 350,
    scale: [0.8, 1],
    easing: 'easeInOutQuad'
  });
};

const FadeScaleUp = ({ children }) => React.Children.map(children, child => 
  <Transition 
    timeout={350}
    in={true}
    appear={true}
    onEntering={animation}
  >
    {child}
  </Transition>
);

export default FadeScaleUp;