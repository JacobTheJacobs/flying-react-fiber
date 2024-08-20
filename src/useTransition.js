import { useState, useEffect, useRef, useCallback } from "react";

export const useTransition = (active, config) =>{
  const { from, enter, leave, onRest, duration } = config;
  const [style, setStyle] = useState(from);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);

  const animate = useCallback(
    (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      const interpolate = (start, end) =>
        start + (end - start) * progress;

      const newStyle = {};
      for (let key in from) {
        const startValue = from[key];
        const endValue = active ? enter[key] : leave[key];
        newStyle[key] = interpolate(startValue, endValue);
      }

      setStyle(newStyle);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        if (onRest) onRest();
      }
    },
    [active, from, enter, leave, duration, onRest]
  );

  useEffect(() => {
    if (active !== null) {
      startTimeRef.current = null;
      cancelAnimationFrame(animationRef.current);
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationRef.current);
  }, [active, animate]);

  return style;
}
