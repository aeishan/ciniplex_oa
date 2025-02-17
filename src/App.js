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

const handleFontUpload = (file) => {
  if (!file) return;

  const type = file.name.split('.').pop();
  if (type !== "ttf" && type !== "otf") {
    alert("Invalid file type! Please upload a .ttf or .otf font.");
    return;
  }

  const reader = new FileReader();
  reader.onload = async (e) => {
    const fontURL = e.target.result; // This is the Base64 Data URL
    const fontName = file.name.split('.')[0].replace(/\s+/g, '-');

    try {
      const newFont = new FontFace(fontName, `url(${fontURL})`);
      await newFont.load();
      document.fonts.add(newFont);

      setFonts(prev => ({
        ...prev,
        customFont: fontName,         // Correctly store the font name
        customFontName: file.name,    // Store the actual filename
        daysNumFont: fontName,
        daysLabelFont: fontName,
        hoursNumFont: fontName,
        hoursLabelFont: fontName,
        minutesNumFont: fontName,
        minutesLabelFont: fontName,
        secondsNumFont: fontName,
        secondsLabelFont: fontName
      }));

      // Save to localStorage
      localStorage.setItem("customFont", fontName);
      localStorage.setItem("customFontFile", fontURL);
      localStorage.setItem("customFontName", file.name); // Store only the filename, not the URL
    } catch (error) {
      console.error("Error loading font:", error);
    }
  };

  reader.readAsDataURL(file);
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
      secondsLabelFont: labelFonts,
      customFont: "",
      customFontName: null
    })
  );

  useEffect(() => {
    const loadCustomFont = async () => {
      const storedFontName = localStorage.getItem("customFont"); // Font name
      const storedFontFile = localStorage.getItem("customFontFile"); // Base64 Data URL
      const storedFontRealName = localStorage.getItem("customFontName"); // Actual file name
  
      if (storedFontName && storedFontFile && storedFontRealName) {
        try {
          const newFont = new FontFace(storedFontName, `url(${storedFontFile})`);
          await newFont.load();
          document.fonts.add(newFont);
  
          setFonts(prev => ({
            ...prev,
            customFont: storedFontName,
            customFontName: storedFontRealName, // Ensure this is the actual filename
            // daysNumFont: storedFontName,
            // daysLabelFont: storedFontName,
            // hoursNumFont: storedFontName,
            // hoursLabelFont: storedFontName,
            // minutesNumFont: storedFontName,
            // minutesLabelFont: storedFontName,
            // secondsNumFont: storedFontName,
            // secondsLabelFont: storedFontName
          }));
        } catch (error) {
          console.error("Error loading stored font:", error);
        }
      }
    };
  
    loadCustomFont();
  }, []);
  
  
  
  

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
<div className="color-picker-container">
  {/* Days Color */}
  <div className="color-picker-wrapper">
    <label>Days Color</label>
    <input type="color" value={colours.daysNumColour} onChange={(e) => setColours(prev => ({ ...prev, daysNumColour: e.target.value, daysLabelColour: e.target.value }))} />
  </div>

  {/* Hours Color */}
  <div className="color-picker-wrapper">
    <label>Hours Color</label>
    <input type="color" value={colours.hoursNumColour} onChange={(e) => setColours(prev => ({ ...prev, hoursNumColour: e.target.value, hoursLabelColour: e.target.value }))} />
  </div>

  {/* Minutes Color */}
  <div className="color-picker-wrapper">
    <label>Minutes Color</label>
    <input type="color" value={colours.minutesNumColour} onChange={(e) => setColours(prev => ({ ...prev, minutesNumColour: e.target.value, minutesLabelColour: e.target.value }))} />
  </div>

  {/* Seconds Color */}
  <div className="color-picker-wrapper">
    <label>Seconds Color</label>
    <input type="color" value={colours.secondsNumColour} onChange={(e) => setColours(prev => ({ ...prev, secondsNumColour: e.target.value, secondsLabelColour: e.target.value }))} />
  </div>
</div>

<h1>Change the font size</h1>
<div className="font-size-container">
  <div className="font-size-wrapper">
    <label className="font-size-label">Days Font Size</label>
    <input type="number" value={fontSizes.daysNumFS === fontSizes.daysLabelFS ? parseInt(fontSizes.daysNumFS) : ""} onChange={(e) => setFontSizes(prev => ({ ...prev, daysNumFS: e.target.value + "px", daysLabelFS: e.target.value + "px" }))} />
  </div>

  <div className="font-size-wrapper">
    <label className="font-size-label">Hours Font Size</label>
    <input type="number" value={fontSizes.hoursNumFS === fontSizes.hoursLabelFS ? parseInt(fontSizes.hoursNumFS) : ""} onChange={(e) => setFontSizes(prev => ({ ...prev, hoursNumFS: e.target.value + "px", hoursLabelFS: e.target.value + "px" }))} />
  </div>

  <div className="font-size-wrapper">
    <label className="font-size-label">Minutes Font Size</label>
    <input type="number" value={fontSizes.minutesNumFS === fontSizes.minutesLabelFS ? parseInt(fontSizes.minutesNumFS) : ""} onChange={(e) => setFontSizes(prev => ({ ...prev, minutesNumFS: e.target.value + "px", minutesLabelFS: e.target.value + "px" }))} />
  </div>

  <div className="font-size-wrapper">
    <label className="font-size-label">Seconds Font Size</label>
    <input type="number" value={fontSizes.secondsNumFS === fontSizes.secondsLabelFS ? parseInt(fontSizes.secondsNumFS) : ""} onChange={(e) => setFontSizes(prev => ({ ...prev, secondsNumFS: e.target.value + "px", secondsLabelFS: e.target.value + "px" }))} />
  </div>
</div>

<h1>Select Fonts for Each Section</h1>
<div className="font-picker-container">
  {/* Days Font */}
  <div className="font-picker-wrapper">
    <label>Days Font</label>
    <select onChange={(e) => setFonts(prev => ({ 
      ...prev, 
      daysNumFont: labelFonts === e.target.value ? numberFonts : e.target.value, 
      daysLabelFont: e.target.value 
    }))} className="fontPicker">
      <option value={labelFonts}>Default</option>
      <option value="'Courier New', Courier, monospace">Courier New</option>
      <option value="'Georgia', serif">Georgia</option>
      <option value="'Times New Roman', Times, serif">Times New Roman</option>
      <option value="'Verdana', sans-serif">Verdana</option>
      <option value="'Comic Sans MS', cursive">Comic Sans MS</option>
    </select>
  </div>

  {/* Hours Font */}
  <div className="font-picker-wrapper">
    <label>Hours Font</label>
    <select onChange={(e) => setFonts(prev => ({ 
      ...prev, 
      hoursNumFont: labelFonts === e.target.value ? numberFonts : e.target.value, 
      hoursLabelFont: e.target.value 
    }))} className="fontPicker">
      <option value={labelFonts}>Default</option>
      <option value="'Courier New', Courier, monospace">Courier New</option>
      <option value="'Georgia', serif">Georgia</option>
      <option value="'Times New Roman', Times, serif">Times New Roman</option>
      <option value="'Verdana', sans-serif">Verdana</option>
      <option value="'Comic Sans MS', cursive">Comic Sans MS</option>
    </select>
  </div>

  {/* Minutes Font */}
  <div className="font-picker-wrapper">
    <label>Minutes Font</label>
    <select onChange={(e) => setFonts(prev => ({ 
      ...prev, 
      minutesNumFont: labelFonts === e.target.value ? numberFonts : e.target.value, 
      minutesLabelFont: e.target.value 
    }))} className="fontPicker">
      <option value={labelFonts}>Default</option>
      <option value="'Courier New', Courier, monospace">Courier New</option>
      <option value="'Georgia', serif">Georgia</option>
      <option value="'Times New Roman', Times, serif">Times New Roman</option>
      <option value="'Verdana', sans-serif">Verdana</option>
      <option value="'Comic Sans MS', cursive">Comic Sans MS</option>
    </select>
  </div>

  {/* Seconds Font */}
  <div className="font-picker-wrapper">
    <label>Seconds Font</label>
    <select onChange={(e) => setFonts(prev => ({ 
      ...prev, 
      secondsNumFont: labelFonts === e.target.value ? numberFonts : e.target.value, 
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
</div>

<h1>Upload Custom Font</h1>
<label className="custom-file-upload">
  <input 
    type="file" 
    accept=".ttf, .otf" 
    onChange={(e) => handleFontUpload(e.target.files[0])} 
  />
  {fonts.customFontName ? `Selected: ${fonts.customFontName}` : "Choose File"}
</label>




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
