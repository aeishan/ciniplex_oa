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

  const options = ["days", "hours", "minutes", "seconds"];

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
          <h1>Select a Date and Time</h1>
          <DatePicker 
            showYearDropdown 
            scrollableMonthYearDropdown 
            minDate={new Date()} 
            minTime={
              selectedDate && new Date(selectedDate).toDateString() === new Date().toDateString()
                ? new Date(new Date().setHours(0, 0, 0, 0))
                : new Date(new Date().setHours(0, 0, 0, 0))
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

                if (
                  selected.getHours() === 0 && 
                  selected.getMinutes() === 0 &&
                  selected.getSeconds() === 0
                ) {
                  selected.setHours(0, 0, 0);
                }
                setSelectedDate(selected);
              }
            }} 
            renderCustomHeader={({ date, decreaseMonth, increaseMonth, changeYear }) => {
              const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - 50 + i);

              return (
                <div className="custom-datepicker-header">
                  <div className="month-header">
                    <button onClick={decreaseMonth} className="prev-month-btn">‹</button>
                    <span className="month-label">{date.toLocaleString('default', { month: 'long' })}</span>
                    <button onClick={increaseMonth} className="next-month-btn">›</button>
                  </div>
                  <select
                    className="year-dropdown"
                    value={date.getFullYear()}
                    onChange={({ target: { value } }) => changeYear(Number(value))}
                  >
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              );
            }}
          />

          <h1>Upload a Background (.png or .mp4)</h1>
          <label className="custom-file-upload">
            <input 
              type="file" 
              accept=".png, .mp4" 
              onChange={(e) => storeBackground(e.target.files[0])}
            />
            {backgroundFileName ? `Selected: ${backgroundFileName}` : "Choose File"}
          </label>

          <h1>Change Colours</h1>
          <div className="color-picker-container">
            {options.map((unit) => (
              <div className="color-picker-wrapper" key={unit}>
                <label>{unit.charAt(0).toUpperCase() + unit.slice(1)} Colour</label>
                <input 
                  type="color" 
                  value={colours[`${unit}NumColour`]} 
                  onChange={(e) => setColours(prev => ({ 
                    ...prev, 
                    [`${unit}NumColour`]: e.target.value, 
                    [`${unit}LabelColour`]: e.target.value 
                  }))} 
                />
              </div>
            ))}
          </div>

          <h1>Change Font Sizes</h1>
          <div className="font-size-container">
            {options.map((unit) => (
              <div className="font-size-wrapper" key={unit}>
                <label className="font-size-label">{unit.charAt(0).toUpperCase() + unit.slice(1)} Font Size</label>
                <input 
                  type="number" 
                  value={fontSizes[`${unit}NumFS`] === fontSizes[`${unit}LabelFS`] ? parseInt(fontSizes[`${unit}NumFS`]) : ""}
                  onChange={(e) => setFontSizes(prev => ({ 
                    ...prev, 
                    [`${unit}NumFS`]: e.target.value + "px", 
                    [`${unit}LabelFS`]: e.target.value + "px" 
                  }))} 
                />
              </div>
            ))}
          </div>

          <h1>Select Fonts</h1>
          <div className="font-picker-container">
            {options.map((unit) => (
              <div className="font-picker-wrapper" key={unit}>
                <label>{unit.charAt(0).toUpperCase() + unit.slice(1)} Font</label>
                <select 
                  onChange={(e) => setFonts(prev => ({ 
                    ...prev, 
                    [`${unit}NumFont`]: labelFonts === e.target.value ? numberFonts : e.target.value, 
                    [`${unit}LabelFont`]: e.target.value 
                  }))} 
                  className="fontPicker"
                >
                  <option value={labelFonts}>Default</option>
                  <option value="'Courier New', Courier, monospace">Courier New</option>
                  <option value="'Georgia', serif">Georgia</option>
                  <option value="'Times New Roman', Times, serif">Times New Roman</option>
                  <option value="'Verdana', sans-serif">Verdana</option>
                  <option value="'Comic Sans MS', cursive">Comic Sans MS</option>
                </select>
              </div>
            ))}
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
