import { useEffect, useRef } from 'react';

const useIdleTimer = (onIdle: any, idleTime = 300000) => { // default 5 min = 300000 ms
  const timer = useRef<any>(null);

  const resetTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(onIdle, idleTime);
  };

  const handleActivity = () => {
    resetTimer();
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart'];
    
    events.forEach(event =>
      window.addEventListener(event, handleActivity)
    );

    resetTimer(); // start the timer

    return () => {
      events.forEach(event =>
        window.removeEventListener(event, handleActivity)
      );
      clearTimeout(timer.current);
    };
  }, []);
};

export default useIdleTimer;