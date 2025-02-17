# 🎬 Ciniplex Countdown Timer

![Project Preview](https://via.placeholder.com/1000x300?text=Ciniplex+Countdown+Timer)

A **customizable countdown timer** built with **React**, featuring real-time updates, draggable elements, dynamic styling, and user preferences stored in **localStorage**. The app allows users to upload a **background image or video**, customize colors, fonts, and font sizes for the countdown, and dynamically set dates and times.

---

## 🚀 Features

- 🕰 **Real-time Countdown** - Displays days, hours, minutes, and seconds dynamically updating.
- 🎨 **Customizable UI** - Users can select fonts, colors, and font sizes for different elements.
- 🖼 **Background Upload** - Supports both **.png** images and **.mp4** videos.
- 🎭 **Draggable Components** - Each countdown section (Days, Hours, Minutes, Seconds) can be moved independently.
- 💾 **Persistent Settings** - Custom settings (fonts, colors, background, etc.) are saved in `localStorage`.
- 📅 **Date Picker Integration** - Users can select a date and time using `react-datepicker`, with restrictions on past dates.
- 📏 **Sidebar Toggle** - Users can **hide or show the sidebar** for a full-screen experience.

---

## 📸 Screenshots

### **Default Countdown View**

![Default View](https://cdn.discordapp.com/attachments/1149095512302166157/1340917334600060948/image.png?ex=67b41a15&is=67b2c895&hm=939ec003a1609d9b0de6fe4705ba70f279972b60fdd4a4c75bd01b5d26fe8957&)

### **Customizable Settings Panel**

![Customization Panel](https://via.placeholder.com/800x400?text=Customization+Panel)

### **Draggable Countdown Blocks**

![Draggable Countdown](https://via.placeholder.com/800x400?text=Draggable+Countdown)

---

## 🛠 Tech Stack

| **Technology**   | **Purpose**                     |
| ---------------- | ------------------------------- |
| React            | Frontend Framework              |
| React-Draggable  | Makes countdown blocks movable  |
| React-DatePicker | Handles date and time selection |
| LocalStorage     | Saves user preferences          |
| CSS Variables    | Enables dynamic styling         |

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
| Font Selection   | Choose from built-in fonts (Arial, Courier, Verdana, etc.)       |
| Font Size        | Adjust using number inputs for days, hours, minutes, and seconds |
| Colors           | Use color pickers to change number and label colors              |
| Draggable Blocks | Drag and reposition countdown blocks anywhere on the screen      |

---

## 🛠 Project Structure

```
📦 ciniplex_oa
├── 📂 src
│   ├── 📂 components
│   │   ├── 📄 CountdownTimer.js  # Main countdown logic
│   │   ├── 📄 VideoUploader.js    # Handles background uploads
│   │   ├── 📄 TextCustomizer.js   # Dynamically updates fonts & colors
│   ├── 📄 App.js                 # Main entry point
│   ├── 📄 index.js               # React render logic
├── 📄 index.css                  # Styling and layout
├── 📄 package.json               # Dependencies & scripts
├── 📄 README.md                  # You are here!
```

---

## 📝 To-Do List

- [ ] Add support for **custom font uploads** 🎭
- [ ] Improve **mobile responsiveness** 📱
- [ ] Implement **pre-set themes** for quick styling 🎨

---

## 👨‍💻 Contributing

We welcome contributions! If you'd like to improve the project, feel free to:

1. **Fork** the repository
2. **Create a new branch** (`feature/new-feature`)
3. **Make your changes** and commit them
4. **Submit a pull request** 🚀

---

## 📜 License

This project is licensed under the **MIT License**. Feel free to use and modify it as you wish.

---

## 📬 Contact

For any questions or feature requests, feel free to reach out:
📧 Email: **your-email@example.com**  
🐙 GitHub: [@aeishan](https://github.com/aeishan)
