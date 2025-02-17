import React, { useEffect } from 'react';

const TextCustomizer = ({ colours, fontSizes, fonts }) => {
  useEffect(() => {
    const root = document.documentElement;

    const properties = {
      days: ["daysNumColour", "daysLabelColour", "daysNumFS", "daysLabelFS", "daysNumFont", "daysLabelFont"],
      hours: ["hoursNumColour", "hoursLabelColour", "hoursNumFS", "hoursLabelFS", "hoursNumFont", "hoursLabelFont"],
      minutes: ["minutesNumColour", "minutesLabelColour", "minutesNumFS", "minutesLabelFS", "minutesNumFont", "minutesLabelFont"],
      seconds: ["secondsNumColour", "secondsLabelColour", "secondsNumFS", "secondsLabelFS", "secondsNumFont", "secondsLabelFont"]
    };

    Object.entries(properties).forEach(([unit, props]) => {
      root.style.setProperty(`--${unit}-number-colour`, colours[props[0]]);
      root.style.setProperty(`--${unit}-label-colour`, colours[props[1]]);
      root.style.setProperty(`--${unit}-number-font-size`, fontSizes[props[2]]);
      root.style.setProperty(`--${unit}-label-font-size`, fontSizes[props[3]]);
      root.style.setProperty(`--${unit}-number-font`, fonts[props[4]]);
      root.style.setProperty(`--${unit}-label-font`, fonts[props[5]]);
    });

  }, [colours, fontSizes, fonts]);

  return null;
};

export default TextCustomizer;
