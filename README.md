# Algo Viz Hub 🧠⚡

**An Interactive Algorithm Visualization Platform for Learning Data Structures and Algorithms**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-algo--viz--hub.vercel.app-brightgreen)](https://algo-viz-hub.vercel.app/)
[![Built with](https://img.shields.io/badge/Built%20with-HTML%2FCSS%2FJS-blue)](#tech-stack)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](#license)

---

## 📖 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Live Demo](#live-demo)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Tech Stack](#tech-stack)
- [Algorithms Included](#algorithms-included)
- [Usage Guide](#usage-guide)
- [Educational Value](#educational-value)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

---

## 🎯 About the Project

**Algo Viz Hub** is an interactive web-based platform designed to help students, educators, and developers visualize and understand fundamental algorithms through engaging animations and real-time interactions. Built with a focus on educational accessibility, this platform transforms abstract algorithmic concepts into visual, understandable experiences.

### 🎓 Why Algo Viz Hub?

- **Visual Learning**: Transform complex algorithms into easy-to-understand visual representations
- **Interactive Experience**: Hands-on learning with customizable parameters and real-time feedback
- **Educational Focus**: Comprehensive explanations alongside visualizations
- **Accessibility**: No installation required - runs directly in your browser
- **Performance Metrics**: Real-time statistics including nodes visited, path length, and execution time

---

## ✨ Features

### 🔍 **Shortest Path Algorithms**
- **Breadth-First Search (BFS)** - Unweighted graph shortest path
- **Dijkstra's Algorithm** - Weighted graph shortest path (non-negative weights)
- **Bellman-Ford Algorithm** - Handles negative weights and detects negative cycles
- **Floyd-Warshall Algorithm** - All-pairs shortest path solution

### ♛ **N-Queens Problem**
- Interactive backtracking algorithm visualization
- Adjustable board sizes (4×4 to 10×10)
- Step-by-step solution process
- Multiple solution navigation

### 📊 **Real-time Analytics**
- Nodes visited counter
- Path length measurement
- Execution time tracking
- Algorithm performance comparison

### 🎮 **Interactive Controls**
- Variable speed visualization
- Custom grid creation with walls and obstacles
- Drag-and-drop start/end point placement
- Pause/resume functionality

---

## 🚀 Live Demo

**[🌐 Try Algo Viz Hub Live](https://algo-viz-hub.vercel.app/)**

*No installation required! The platform runs directly in your web browser.*

---

## 📱 Screenshots

*Add screenshots here showing:*
- Main dashboard with algorithm selection
- Pathfinding visualization in action
- N-Queens solver interface
- Algorithm comparison table

---

## 🛠 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for live demo
- OR local web server for development

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/algo-viz-hub.git
   cd algo-viz-hub
   ```

2. **Project Structure**
   ```
   algo-viz-hub/
   ├── index.html              # Main landing page
   ├── index1.html             # Pathfinding visualizer
   ├── index2.html             # N-Queens solver
   ├── aboutme.html            # About page
   ├── css/
   │   ├── style.css           # Main styles
   │   ├── pathfinding.css     # Pathfinding specific styles
   │   └── nqueens.css         # N-Queens specific styles
   ├── js/
   │   ├── algorithms/
   │   │   ├── bfs.js          # BFS implementation
   │   │   ├── dijkstra.js     # Dijkstra's algorithm
   │   │   ├── bellmanford.js  # Bellman-Ford algorithm
   │   │   ├── floydwarshall.js # Floyd-Warshall algorithm
   │   │   └── nqueens.js      # N-Queens backtracking
   │   ├── visualizer.js       # Main visualization engine
   │   └── utils.js            # Utility functions
   └── assets/
       ├── images/             # UI images and icons
       └── docs/               # Documentation assets
   ```

3. **Run locally**
   ```bash
   # Using Python (if installed)
   python -m http.server 8000
   
   # Using Node.js (if installed)
   npx serve .
   
   # Or simply open index.html in your browser
   ```

4. **Access the application**
   - Open `http://localhost:8000` in your browser
   - Navigate through different algorithm visualizations

---

## 💻 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with responsive design
- **Deployment**: Vercel
- **Version Control**: Git & GitHub

---

## 🧮 Algorithms Included

### Shortest Path Algorithms

| Algorithm | Time Complexity | Space Complexity | Use Case | Handles Negative Weights |
|-----------|----------------|------------------|----------|-------------------------|
| **BFS** | O(V + E) | O(V) | Unweighted graphs | ❌ |
| **Dijkstra** | O(E + V log V) | O(V) | Weighted graphs | ❌ |
| **Bellman-Ford** | O(V × E) | O(V) | Detects negative cycles | ✅ |
| **Floyd-Warshall** | O(V³) | O(V²) | All-pairs shortest path | ✅ |

### Constraint Satisfaction

| Algorithm | Time Complexity | Space Complexity | Problem Type |
|-----------|----------------|------------------|--------------|
| **N-Queens Backtracking** | O(N!) | O(N) | Constraint satisfaction |

---

## 📚 Usage Guide

### Pathfinding Visualizer

1. **Select Algorithm**: Choose from BFS, Dijkstra, Bellman-Ford, or Floyd-Warshall
2. **Set Points**: 
   - Right-click to set start point (green)
   - Ctrl+click to set end point (red)
3. **Create Obstacles**: Left-click to toggle walls (black)
4. **Add Weights**: Shift+click to add weighted nodes (for applicable algorithms)
5. **Visualize**: Click the algorithm button to start visualization
6. **Control Speed**: Use the speed slider to adjust animation speed

### N-Queens Solver

1. **Choose Board Size**: Select from 4×4 to 10×10 grid
2. **Start Solving**: Click "Start" to begin the backtracking visualization
3. **Control Speed**: Adjust visualization speed with the speed slider
4. **Navigate Solutions**: Use navigation controls to view different solutions
5. **Pause/Resume**: Control the solving process as needed

---

## 🎓 Educational Value

### Learning Objectives

- **Algorithm Understanding**: Visualize how different algorithms explore search spaces
- **Complexity Analysis**: Compare time and space complexities through real examples
- **Problem-Solving**: Understand backtracking and graph traversal techniques
- **Optimization**: Learn when to apply specific algorithms based on problem constraints

### Suitable For

- 📚 **Computer Science Students** learning algorithms and data structures
- 👨‍🏫 **Educators** teaching algorithmic concepts
- 👩‍💻 **Developers** brushing up on fundamental algorithms
- 🧑‍🎓 **Self-learners** exploring computer science concepts

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork the Project**
2. **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Contribution Ideas

- 🔄 Add new algorithms (A*, Greedy Best-First Search)
- 🎨 Improve UI/UX design
- 📱 Enhance mobile responsiveness
- 🐛 Bug fixes and performance improvements
- 📝 Documentation improvements
- 🌐 Internationalization support

---

## 📋 Roadmap

- [ ] **A* Algorithm** implementation
- [ ] **Maze generation** algorithms
- [ ] **Sorting algorithms** visualizer
- [ ] **Mobile app** version
- [ ] **Collaborative learning** features
- [ ] **Algorithm comparison** dashboard
- [ ] **Export visualization** as GIF/Video

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

**Harshit Singh** - Computer Science Student at DTU (Delhi Technological University)

- 📧 Email: harshit.official.281005@gmail.com
- 📱 Phone: +91 8076148313
- 💼 LinkedIn: [Harshit Singh](https://linkedin.com/in/harshit-singh)
- 🐙 GitHub: [HarshitSingh](https://github.com/harshitsingh)

**Project Link**: [https://github.com/yourusername/algo-viz-hub](https://github.com/yourusername/algo-viz-hub)

---

## 🙏 Acknowledgments

- **Delhi Technological University** for providing educational foundation
- **Algorithm visualization community** for inspiration and best practices
- **Open source contributors** who make learning accessible to everyone
- **Vercel** for free hosting and deployment services

---

## 📈 Project Stats

- **Algorithms Implemented**: 5
- **Interactive Features**: 15+
- **Educational Content**: Comprehensive algorithm explanations
- **Browser Compatibility**: All modern browsers
- **Mobile Friendly**: Responsive design

---

*Made with ❤️ for the computer science learning community*

**[⭐ Star this repo](https://github.com/yourusername/algo-viz-hub)** if you found it helpful!
