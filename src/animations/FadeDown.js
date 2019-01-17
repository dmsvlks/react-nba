import React from 'react';
import { Transition } from 'react-transition-group';
import anime from 'animejs';

const enterAnimation = el => {
  anime({
    targets: el,
    duration: 350,
    opacity: [0.5, 1],
    translateY: ['-10px', 0],
    easing: 'easeInOutQuad'
  });
};

const FadeDown = ({ children }) => React.Children.map(children, child => 
  <Transition 
    timeout={350}
    in={true}
    appear={true}
    onEnter={el => el.style.opacity = 0}
    onEntering={enterAnimation}
  >
    {child}
  </Transition>
);

export default FadeDown;