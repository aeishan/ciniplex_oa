# 🎬 Ciniplex Countdown Timer

A **customizable countdown timer** built with **React**, featuring real-time updates, draggable elements, dynamic styling, and user preferences stored in **localStorage**. The app allows users to upload a **background image or video**, customize colours, fonts, and font sizes for the countdown, dynamically set dates and times, and even upload their own fonts.

---

## 🚀 Features

- 📅 **Date Picker Integration** - Users can select a date and time using `react-datepicker`, with restrictions on past dates.
- 🕰 **Real-time Countdown** - Displays days, hours, minutes, and seconds dynamically updating.
- 🎨 **Customizable UI** - Users can select fonts, colours, and font sizes for different elements.
- 🖼 **Background Upload** - Supports both **.png** images and **.mp4** videos.
- 🎭 **Draggable Components** - Each countdown section (Days, Hours, Minutes, Seconds) can be moved independently.
- 💾 **Persistent Settings** - Custom settings (fonts, colours, background, etc.) are saved in `localStorage`.
- 📏 **Sidebar Toggle** - Users can **hide or show the sidebar** for a full-screen experience.
- 🔠 **Font Upload Support** - Users can upload custom `.ttf` or `.otf` font files for the countdown.

---

## 📸 Screenshots

### **Default Countdown View**

<img width="1919" alt="image" src="https://github.com/user-attachments/assets/8c7226eb-1ff8-477b-9e9e-93bf99c55df7" />

### **Customizable Settings Panel**

<img width="1920" alt="image" src="https://github.com/user-attachments/assets/6c2d3ed1-55ad-46e7-8e07-60b97f4a523f" />

---

## 🛠 Tech Stack

| **Technology**   | **Purpose**                     |
| ---------------- | ------------------------------- |
| React            | Frontend Framework              |
| React-Draggable  | Makes countdown blocks movable  |
| React-DatePicker | Handles date and time selection |
| LocalStorage     | Saves user preferences          |
| CSS Variables    | Enables dynamic styling         |
| FileReader API   | Handles background and font uploads |

---

## 📥 Installation & Setup

### **1️⃣ Clone the Repository**

```sh
$ git clone https://github.com/aeishan/ciniplex_oa.git
$ cd ciniplex_oa
```

### **2️⃣ Install Dependencies**

```sh
$ npm install
```

### **3️⃣ Start the Development Server**

```sh
$ npm start
```

This will start the app at `http://localhost:3000`.

---

## 🎨 Customization Options

| Feature          | How to Customize                                                 |
| ---------------- | ---------------------------------------------------------------- |
| Background       | Upload **.png** images or **.mp4** videos                        |
| Font Selection   | Choose from built-in fonts or upload your own `.ttf` or `.otf`   |
| Font Size        | Adjust using number inputs for days, hours, minutes, and seconds |
| colours           | Use colour pickers to change number and label colours              |
| Draggable Blocks | Drag and reposition countdown blocks anywhere on the screen      |

---

## 🛠 Project Structure

```plaintext
📦 ciniplex_oa
├── 📂 src
│   ├── 📂 components
│   │   ├── 📄 CountdownTimer.js    # Main countdown logic
│   │   ├── 📄 VideoUploader.js     # Handles background & font uploads
│   │   ├── 📄 TextCustomizer.js    # Dynamically updates fonts & colours
│   ├── 📄 App.js                   # Main entry point
│   ├── 📄 App.css                  # Styling for the app
│   ├── 📄 App.test.js               # Test cases for components
│   ├── 📄 index.js                 # React render logic
│   ├── 📄 index.css                # Global styling and layout
│   ├── 📄 logo.svg                 # Project logo (if applicable)
│   ├── 📄 reportWebVitals.js       # Performance monitoring setup
│   ├── 📄 setupTests.js            # Testing setup
├── 📄 package.json                 # Dependencies & scripts
├── 📄 package-lock.json            # Package versions
├── 📄 .gitignore                   # Files to ignore in Git
├── 📄 README.md                     # You are here!
```

---

## 🛠 Timeline, Approach, and Issues Encountered

### Tier 1
I began planning my approach to completing the assessment as soon as I received it. I implemented a "divide-and-conquer" strategy, breaking the task into smaller, manageable parts and completing each one before integrating them into the final implementation. 

I first focused on creating the date selector component, ensuring that users could efficiently select a date and time. As I built the logic and designed the base UI for the website, I addressed any issues that arose along the way. Once this was successfully implemented, I added new elements to display the real-time countdown, developing logic that updated the counters every second. To ensure accuracy and efficiency, I leveraged resources such as ChatGPT and GitHub Copilot. 

With the countdown logic in place, I moved on to the video uploader component, anticipating that it would be relatively straightforward to implement. By utilizing documentation and online forums, I was able to integrate this feature quickly. 

Next, I tackled the styling controls. I recognized that if I could implement one styling feature, the other would follow a similar logic. This is where I discovered the power of dynamically setting CSS variables. Using this approach, I successfully implemented font size and text colour controls. Any repetitive or mundane logic was optimized with the help of ChatGPT and GitHub Copilot, streamlining the workflow.

My approach allowed me to focus on one task at a time, beginning with the most complex features and progressing to simpler ones—an approach that aligns with my workflow preferences. Throughout the process, I leveraged various learning resources to enhance my understanding and accelerate development. The approximate timeline for completing this tier was **~4 hours**.

### Tier 2
To implement the features in Tier 2, I decided to begin with individualized font colours and font sizes. I chose this approach because I already understood how to implement a single button (for each style change) to control the countdown as a whole. Extending this logic to three additional buttons—each targeting a specific counter—allowed for a quick and efficient implementation. Since Tier 1 did not require changing the countdown’s font, this was a new addition specific to Tier 2. However, I was confident that the logic would be similar to the other two styling controls I had already implemented. Using my previous code as a foundation, I successfully added individual font selectors with minimal difficulty. For these three stylistic controls, I leveraged AI resources to streamline repetitive tasks.

The final task—making the countdown draggable—was an entirely new concept for me. I watched instructional videos and used ChatGPT along with online documentation to understand how drag-and-drop functionality worked. By utilizing these resources and dedicating time to debugging, I was able to successfully implement a draggable countdown as required.

While this may sound like a seamless process, Tier 2 presented a few challenges. One significant issue arose from my initial design choice: I had originally structured the countdown as a single, unified component. At the time, I did not realize that this approach would create obstacles when I needed to make each counter draggable independently. Initially, I believed that the entire countdown should be repositionable as a whole, which led me to implement it as a single large container in Tier 1. As a result, I had to make various modifications to my earlier implementations to accommodate the new requirements.

### Tier 3
I began this tier by developing a font uploader. I understood that if I could successfully read the uploaded file, setting the fonts for various elements would be relatively straightforward, as I had done it multiple times before. However, this task introduced new challenges. Unlike the file uploads for `.png` and `.mp4` files, which could be easily converted into URLs, font files required a different approach. This led me to utilize the `FontFace` object, which allowed for dynamic font application. While this process involved additional complexity beyond simply reading the file, leveraging the resources I had previously explored helped me adapt to this new method. Ultimately, I found that once I integrated `FontFace`, the implementation followed the steps I had originally envisioned.

The next task in this tier was to use `localStorage` to preserve user preferences, ensuring that customizations persisted even after a page refresh. Initially, I was unaware that such functionality could be achieved using simple JavaScript and React. However, after researching, I discovered that it was relatively straightforward, requiring only a few method calls to retrieve or store data based on unique keys. By modifying my earlier code—specifically the `useState` hooks that stored initial values—and creating helper functions to enhance code clarity, I successfully implemented this feature. Though it initially seemed daunting, the process turned out to be manageable with a structured approach.

## 📌 Assumptions Made
- All stylistic changes solely affect the countdown timers—both the number and the label (i.e., "all text" refers to the countdown timers only).
- Users will not select a time before their current time (the countdown will not display negative numbers; instead, it will show 0's for each timer).
- Uploading a font changes all text to the selected font.
- If a font is uploaded, the user will understand that individual font selectors/pickers will retain their previous values.
- An uploaded font can be individually overwritten using the font selectors/pickers.
- The position of any counter is set solely by dragging it.
- Users will use a screen size that can comfortably display all required components.
- Users will adjust the text size as needed (it may become unreadable if excessively large, but this is only possible if the user intentionally increases it to such an extent).
- The user has `Node.js` and all required dependencies installed to run React projects successfully.

---

## ⏳ Future Scalability

- `.mp4` files are too large to be stored in `localStorage`. Using alternative methods like **IndexedDB** or **cloud storage solutions** (e.g., Firebase Storage, AWS S3) would be more efficient for handling larger uploads.  
- Enhancing the website's adaptability to different screen sizes. Currently, it only centers content, but in the future, a **responsive layout** should be implemented for an optimized mobile experience.  
- Adding support for **.mp3 files** alongside `.png` images, allowing users greater flexibility in their customizations.  
- Improving **mobile interaction** by integrating **React Native** or implementing touch-friendly controls for better usability on smaller screens.  
- Implementing a **database** to store and retrieve user-generated stylistic presets, enabling users to save their settings for future use.  
- Introducing a **login system** to enhance personalization, allowing users to access and manage their customized settings across different sessions.  
- Implementing **file security measures** to scan uploaded files and prevent potential security threats, ensuring a safe user experience.  

---

## 📬 Contact

For any questions or feature requests, feel free to reach out:

📧 Email: [**e.ashraf@mail.utoronto.ca**](mailto:e.ashraf@mail.utoronto.ca)  
📧 Email: [**ashrafeishan@gmail.com**](mailto:ashrafeishan@gmail.com)  
🐙 GitHub: [@aeishan](https://github.com/aeishan)

