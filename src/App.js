import React, { useState, useEffect } from 'react';
import './App.css';
import CountdownTimer from './components/CountdownTimer';
import VideoUploader from './components/VideoUploader';
import TextCustomizer from './components/TextCustomizer';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function App() {
  // Load settings from localStorage, or use default values
  const loadFromLocalStorage = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    
    if (!saved || saved === "undefined") {  
        return defaultValue;
    }
    
    try {
        return JSON.parse(saved);
    } catch (error) {
        console.error(`Error parsing localStorage key "${key}":`, error);
        return defaultValue;
    }
  };

const storeBackground = (file) => {
  if (!file) return;

  const type = file.type.split('/')[1];

  if (type === "png") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileURL = e.target.result;
        setBackground(fileURL);
        setBackgroundFileName(file.name);
        localStorage.setItem("background", JSON.stringify(fileURL)); // Save only PNGs
        localStorage.setItem("backgroundFileName", file.name);
      };
      reader.readAsDataURL(file);
  } else if (type === "mp4") {
      setBackground(file);
      setBackgroundFileName(file.name);
      localStorage.removeItem("background"); // Remove stored background on refresh
      localStorage.removeItem("backgroundFileName"); // Remove stored filename on refresh
  } else {
      alert("Invalid file type! Please upload a .png image or .mp4 video.");
  }
};

  const [background, setBackground] = useState(loadFromLocalStorage("background", null));
  const [backgroundFileName, setBackgroundFileName] = useState(localStorage.getItem("backgroundFileName") || null);

  const [selectedDate, setSelectedDate] = useState(loadFromLocalStorage("selectedDate", 0));
  const [colours, setColours] = useState(
    loadFromLocalStorage("colours", {
      daysNumColour: "white",
      daysLabelColour: "#ffcc00",
      hoursNumColour: "white",
      hoursLabelColour: "#ffcc00",
      minutesNumColour: "white",
      minutesLabelColour: "#ffcc00",
      secondsNumColour: "white",
      secondsLabelColour: "#ffcc00"
    })
  );
  
  const [fontSizes, setFontSizes] = useState(
    loadFromLocalStorage("fontSizes", {
      daysNumFS: "60px",
      daysLabelFS: "26px",
      hoursNumFS: "60px",
      hoursLabelFS: "26px",
      minutesNumFS: "60px",
      minutesLabelFS: "26px",
      secondsNumFS: "60px",
      secondsLabelFS: "26px"
    })
  );
  const numberFonts = "'Courier New', Courier, monospace";
  const labelFonts = "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";

  const [isSidebarVisible, setIsSidebarVisible] = useState(loadFromLocalStorage("isSidebarVisible", true));
  const [fonts, setFonts] = useState(
    loadFromLocalStorage("fonts", {
      daysNumFont: numberFonts,
      daysLabelFont: labelFonts,
      hoursNumFont: numberFonts,
      hoursLabelFont: labelFonts,
      minutesNumFont: numberFonts,
      minutesLabelFont: labelFonts,
      secondsNumFont: numberFonts,
      secondsLabelFont: labelFonts
    })
  );
  

  useEffect(() => {
    localStorage.setItem("fonts", JSON.stringify(fonts));
  }, [fonts]);


  // Save settings whenever they change
  useEffect(() => {
    localStorage.setItem("background", JSON.stringify(background));
  }, [background]);

  useEffect(() => {
    localStorage.setItem("selectedDate", JSON.stringify(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    localStorage.setItem("colours", JSON.stringify(colours));
  }, [colours]);

  useEffect(() => {
    localStorage.setItem("fontSizes", JSON.stringify(fontSizes));
  }, [fontSizes]);

  useEffect(() => {
    localStorage.setItem("isSidebarVisible", JSON.stringify(isSidebarVisible));
  }, [isSidebarVisible]);

  return (
    <div className="appContainer">
      
      {/* Toggle Sidebar Button */}
      <button className="toggleSidebarBtn" onClick={() => setIsSidebarVisible(prev => !prev)}>
        {isSidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
      </button>

      {/* Sidebar */}
      {isSidebarVisible && (
        <div className="sidebar">
          <h1>Select a Date and Time!</h1>
          <DatePicker 
  showYearDropdown 
  scrollableMonthYearDropdown 
  minDate={new Date()} 
  minTime={
    selectedDate && new Date(selectedDate).toDateString() === new Date().toDateString()
      ? new Date() // If today, restrict minTime to current time
      : new Date(new Date().setHours(0, 0, 0, 0)) // Otherwise, allow from 00:00
  }
  maxTime={new Date(new Date().setHours(23, 59, 59))}
  showTimeSelect 
  timeFormat="HH:mm" 
  dateFormat="MMMM d, yyyy h:mm aa" 
  placeholderText="Please select a date and time" 
  selected={selectedDate ? new Date(selectedDate) : null} 
  onChange={(date) => {
    if (date) {
      const now = new Date();
      const selected = new Date(date);

      // not recognizing midnight as a time selected
      if (
        selected.getHours() === 0 && 
        selected.getMinutes() === 0 &&
        selected.getSeconds() === 0
      ) {
        // if (selected.toDateString() === now.toDateString()) {
        //   // If it's today, set the time to the current time
        //   selected.setHours(now.getHours(), now.getMinutes(), now.getSeconds());
        // } else {
        //   // If it's a future date, keep the time as 00:00
        //   selected.setHours(0, 0, 0);
        // }
        selected.setHours(now.getHours(), now.getMinutes(), now.getSeconds());

      }

      setSelectedDate(selected);
    }
  }} 
/>




          <h1>Upload a background</h1>
          <label className="custom-file-upload">
            <input 
              type="file" 
              accept=".png, .mp4" 
              onChange={(e) => storeBackground(e.target.files[0])}
            />
            {backgroundFileName ? `Selected: ${backgroundFileName}` : "Choose File"}
          </label>

          <h1>Upload a colour</h1>
          <div>
            <input type="color" value={colours.daysLabelColour === colours.daysNumColour ? colours.daysLabelColour : ""} onChange={(e) => setColours(prev => ({ ...prev, daysLabelColour: e.target.value, daysNumColour: e.target.value }))} />
            <input type="color" value={colours.hoursLabelColour === colours.hoursNumColour ? colours.hoursLabelColour : ""} onChange={(e) => setColours(prev => ({ ...prev, hoursLabelColour: e.target.value, hoursNumColour: e.target.value }))} />
            <input type="color" value={colours.minutesLabelColour === colours.minutesNumColour ? colours.minutesLabelColour : ""} onChange={(e) => setColours(prev => ({ ...prev, minutesLabelColour: e.target.value, minutesNumColour: e.target.value }))} />
            <input type="color" value={colours.secondsLabelColour === colours.secondsNumColour ? colours.secondsLabelColour : ""} onChange={(e) => setColours(prev => ({ ...prev, secondsLabelColour: e.target.value, secondsNumColour: e.target.value }))} />
          </div>

          <h1>Change the font size</h1>
          <div>
            <input type="number" value={fontSizes.daysNumFS === fontSizes.daysLabelFS ? parseInt(fontSizes.daysLabelFS) : ""} onChange={(e) => setFontSizes(prev => ({ ...prev, daysLabelFS: e.target.value + "px", daysNumFS: e.target.value + "px" }))} />
            <input type="number" value={fontSizes.hoursNumFS === fontSizes.hoursLabelFS ? parseInt(fontSizes.hoursLabelFS) : ""}  onChange={(e) => setFontSizes(prev => ({ ...prev, hoursLabelFS: e.target.value + "px", hoursNumFS: e.target.value + "px" }))} />
            <input type="number" value={fontSizes.minutesNumFS === fontSizes.minutesLabelFS ? parseInt(fontSizes.minutesLabelFS) : ""}  onChange={(e) => setFontSizes(prev => ({ ...prev, minutesLabelFS: e.target.value + "px", minutesNumFS: e.target.value + "px" }))} />
            <input type="number" value={fontSizes.secondsNumFS === fontSizes.secondsLabelFS ? parseInt(fontSizes.secondsLabelFS) : ""}  onChange={(e) => setFontSizes(prev => ({ ...prev, secondsLabelFS: e.target.value + "px", secondsNumFS: e.target.value + "px" }))} />
          </div>

          <h1>Select Fonts for Each Section</h1>

<label>Days Font</label>
<div>
<label>Days Font</label>
<select onChange={(e) => e.target.value === labelFonts ? setFonts(prev => ({ 
    ...prev, 
    daysNumFont: numberFonts, 
    daysLabelFont: labelFonts 
})) :
setFonts(prev => ({ 
  ...prev, 
  daysNumFont: e.target.value, 
  daysLabelFont: e.target.value 
}))} className="fontPicker">
    <option value={labelFonts}>Default</option>
    <option value="'Courier New', Courier, monospace">Courier New</option>
    <option value="'Georgia', serif">Georgia</option>
    <option value="'Times New Roman', Times, serif">Times New Roman</option>
    <option value="'Verdana', sans-serif">Verdana</option>
    <option value="'Comic Sans MS', cursive">Comic Sans MS</option>
</select>

<label>Hours Font</label>
<select onChange={(e) => e.target.value === labelFonts ? setFonts(prev => ({ 
    ...prev, 
    hoursNumFont: numberFonts, 
    hoursLabelFont: labelFonts 
})) : setFonts(prev => ({ 
  ...prev, 
  hoursNumFont: e.target.value, 
  hoursLabelFont: e.target.value 
}))} className="fontPicker">
    <option value={labelFonts}>Default</option>
    <option value="'Courier New', Courier, monospace">Courier New</option>
    <option value="'Georgia', serif">Georgia</option>
    <option value="'Times New Roman', Times, serif">Times New Roman</option>
    <option value="'Verdana', sans-serif">Verdana</option>
    <option value="'Comic Sans MS', cursive">Comic Sans MS</option>
</select>

<label>Minutes Font</label>
<select onChange={(e) => e.target.value === labelFonts ? setFonts(prev => ({ 
    ...prev, 
    minutesNumFont: numberFonts, 
    minutesLabelFont: labelFonts 
})) : setFonts(prev => ({ 
  ...prev, 
  minutesNumFont: e.target.value, 
  minutesLabelFont: e.target.value 
}))} className="fontPicker">
    <option value={labelFonts}>Default</option>
    <option value="'Courier New', Courier, monospace">Courier New</option>
    <option value="'Georgia', serif">Georgia</option>
    <option value="'Times New Roman', Times, serif">Times New Roman</option>
    <option value="'Verdana', sans-serif">Verdana</option>
    <option value="'Comic Sans MS', cursive">Comic Sans MS</option>
</select>

<label>Seconds Font</label>
<select onChange={(e) => e.target.value === labelFonts ? setFonts(prev => ({ 
    ...prev, 
    secondsNumFont: numberFonts, 
    secondsLabelFont: labelFonts 
})):  setFonts(prev => ({ 
  ...prev, 
  secondsNumFont: e.target.value, 
  secondsLabelFont: e.target.value 
}))} className="fontPicker">
    <option value={labelFonts}>Default</option>
    <option value="'Courier New', Courier, monospace">Courier New</option>
    <option value="'Georgia', serif">Georgia</option>
    <option value="'Times New Roman', Times, serif">Times New Roman</option>
    <option value="'Verdana', sans-serif">Verdana</option>
    <option value="'Comic Sans MS', cursive">Comic Sans MS</option>
</select>
</div>



          <button onClick={() => {
        localStorage.clear();
        window.location.reload(); // Refresh the page
      }}>
      Reset Settings
    </button>
        </div>
      )}

      <VideoUploader file={background} />
      <div className="mainContent">
        <CountdownTimer selectedDate={selectedDate} />
      </div>
      <TextCustomizer colours={colours} fontSizes={fontSizes} fonts={fonts}/>

    </div>
  );
}

export default App;
