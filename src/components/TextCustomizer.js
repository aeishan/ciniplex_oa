import React, { useEffect, useState } from 'react';

const TextCustomizer = ({colours, fontSizes, fonts}) => {
    useEffect(() => {
        document.documentElement.style.setProperty("--days-number-colour", colours.daysNumColour);  
        document.documentElement.style.setProperty("--days-label-colour", colours.daysLabelColour);

        document.documentElement.style.setProperty("--hours-number-colour", colours.hoursNumColour);  
        document.documentElement.style.setProperty("--hours-label-colour", colours.hoursLabelColour);

        document.documentElement.style.setProperty("--minutes-number-colour", colours.minutesNumColour);  
        document.documentElement.style.setProperty("--minutes-label-colour", colours.minutesLabelColour);

        document.documentElement.style.setProperty("--seconds-number-colour", colours.secondsNumColour);  
        document.documentElement.style.setProperty("--seconds-label-colour", colours.secondsLabelColour);

        document.documentElement.style.setProperty("--days-number-font-size", fontSizes.daysNumFS);  
        document.documentElement.style.setProperty("--days-label-font-size", fontSizes.daysLabelFS);

        document.documentElement.style.setProperty("--hours-number-font-size", fontSizes.hoursNumFS);  
        document.documentElement.style.setProperty("--hours-label-font-size", fontSizes.hoursLabelFS);

        document.documentElement.style.setProperty("--minutes-number-font-size", fontSizes.minutesNumFS);  
        document.documentElement.style.setProperty("--minutes-label-font-size", fontSizes.minutesLabelFS);

        document.documentElement.style.setProperty("--seconds-number-font-size", fontSizes.secondsNumFS);  
        document.documentElement.style.setProperty("--seconds-label-font-size", fontSizes.secondsLabelFS);

        document.documentElement.style.setProperty("--days-number-font", fonts.daysNumFont);  
        document.documentElement.style.setProperty("--days-label-font", fonts.daysLabelFont);

        document.documentElement.style.setProperty("--hours-number-font", fonts.hoursNumFont);  
        document.documentElement.style.setProperty("--hours-label-font", fonts.hoursLabelFont);

        document.documentElement.style.setProperty("--minutes-number-font", fonts.minutesNumFont);  
        document.documentElement.style.setProperty("--minutes-label-font", fontSizes.minutesLabelFont);

        document.documentElement.style.setProperty("--seconds-number-font", fonts.secondsNumFont);  
        document.documentElement.style.setProperty("--seconds-label-font", fonts.secondsLabelFont);

    }, [colours.daysNumColour, colours.hoursNumColour, colours.minutesNumColour, colours.secondsNumColour, 
        fontSizes.daysLabelFS, fontSizes.hoursLabelFS, fontSizes.minutesLabelFS, fontSizes.secondsLabelFS,
        fonts.daysLabelFont, fonts.hoursNumFont, fonts.minutesLabelFont, fonts.secondsLabelFont
    ]);

    return null;
}
export default TextCustomizer;