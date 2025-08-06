import { useState, useEffect } from 'react';

export interface Breakpoints {
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  xxl: boolean;
}

export const useResponsive = (): Breakpoints => {
  const [breakpoints, setBreakpoints] = useState<Breakpoints>({
    sm: false,
    md: false,
    lg: false,
    xl: false,
    xxl: false,
  });

  useEffect(() => {
    const updateBreakpoints = () => {
      const width = window.innerWidth;
      
      setBreakpoints({
        sm: width >= 576,
        md: width >= 768,
        lg: width >= 992,
        xl: width >= 1200,
        xxl: width >= 1600,
      });
    };

    // Set initial values
    updateBreakpoints();

    // Listen for resize events
    window.addEventListener('resize', updateBreakpoints);

    // Cleanup
    return () => window.removeEventListener('resize', updateBreakpoints);
  }, []);

  return breakpoints;
};
