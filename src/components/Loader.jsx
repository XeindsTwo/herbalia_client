import {useEffect, useState} from 'react';
import {animated, useSpring} from 'react-spring';
import {SpinnerDotted} from 'spinners-react';

export const Loader = ({loading}) => {
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const springProps = useSpring({
    opacity: isLoading ? 1 : 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#fbfbfb',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: isLoading ? 1000 : -2
  });

  useEffect(() => {
    const html = document.documentElement;
    html.style.overflow = isLoading ? 'hidden' : 'auto';
  }, [isLoading]);

  return (
    <animated.div style={springProps}>
      <SpinnerDotted size={150} thickness={99} color="#FF8E9A"/>
    </animated.div>
  );
};