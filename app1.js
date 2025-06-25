class PathVisualizer {
    constructor() {
        this.canvas = document.getElementById('grid-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.gridWidth = 30;
        this.gridHeight = 20;
        this.cellSize = 20;
        
        this.grid = [];
        this.startNode = { x: 5, y: 10 };
        this.endNode = { x: 24, y: 10 };
        this.isDrawing = false;
        this.isRunning = false;
        this.animationSpeed = 50;
        this.drawingWalls = false;
        
        this.algorithms = {
            'bfs': { name: 'BFS', color: '#3498db', visitedColor: '#85c1e9', pathColor: '#1f4e79' },
            'dijkstra': { name: 'Dijkstra', color: '#f39c12', visitedColor: '#f7dc6f', pathColor: '#b9770e' },
            'bellman-ford': { name: 'Bellman-Ford', color: '#9b59b6', visitedColor: '#d2b4de', pathColor: '#6c3483' },
            'floyd-warshall': { name: 'Floyd-Warshall', color: '#27ae60', visitedColor: '#82e0aa', pathColor: '#1e8449' }
        };
        
        this.cellTypes = {
            empty: '#ffffff',
            wall: '#2c3e50',
            start: '#27ae60',
            end: '#e74c3c',
            negative: '#8e44ad'
        };
        
        this.initializeGrid();
        this.setupEventListeners();
        this.draw();
        this.updateAlgorithmColors();
        this.updateStats(0, 0, 0, 'Ready');
    }
    
    initializeGrid() {
        this.grid = [];
        for (let y = 0; y < this.gridHeight; y++) {
            this.grid[y] = [];
            for (let x = 0; x < this.gridWidth; x++) {
                this.grid[y][x] = {
                    x: x,
                    y: y,
                    type: 'empty',
                    visited: false,
                    distance: Infinity,
                    previous: null,
                    weight: 1
                };
            }
        }
        this.grid[this.startNode.y][this.startNode.x].type = 'start';
        this.grid[this.endNode.y][this.endNode.x].type = 'end';
    }
    
    setupEventListeners() {
        const algorithmSelect = document.getElementById('algorithm-select');
        const startBtn = document.getElementById('start-btn');
        const clearBtn = document.getElementById('clear-btn');
        const resetBtn = document.getElementById('reset-btn');
        const speedSlider = document.getElementById('speed-slider');
        
        algorithmSelect.addEventListener('change', () => {
            this.updateAlgorithmColors();
        });
        
        startBtn.addEventListener('click', () => {
            if (!this.isRunning) {
                this.startVisualization();
            }
        });
        
        clearBtn.addEventListener('click', () => {
            this.clearGrid();
        });
        
        resetBtn.addEventListener('click', () => {
            this.resetPath();
        });
        
        speedSlider.addEventListener('input', (e) => {
            this.animationSpeed = 101 - (e.target.value * 10);
            document.getElementById('speed-value').textContent = e.target.value;
        });
        
        // Canvas mouse events
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', () => this.handleMouseUp());
        this.canvas.addEventListener('mouseleave', () => this.handleMouseUp());
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    
    updateAlgorithmColors() {
        const algorithm = document.getElementById('algorithm-select').value;
        const colors = this.algorithms[algorithm];
        
        document.body.className = `algorithm-${algorithm}`;
        
        const visitedColorEl = document.querySelector('.visited-color');
        const pathColorEl = document.querySelector('.path-color');
        
        if (visitedColorEl) visitedColorEl.style.backgroundColor = colors.visitedColor;
        if (pathColorEl) pathColorEl.style.backgroundColor = colors.pathColor;
    }
    
    getMousePos(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / this.cellSize);
        const y = Math.floor((e.clientY - rect.top) / this.cellSize);
        return { x, y };
    }
    
    handleMouseDown(e) {
        if (this.isRunning) return;
        
        const pos = this.getMousePos(e);
        if (pos.x < 0 || pos.x >= this.gridWidth || pos.y < 0 || pos.y >= this.gridHeight) return;
        
        const cell = this.grid[pos.y][pos.x];
        
        if (e.button === 2) { // Right click - set start
            if (cell.type !== 'end') {
                this.grid[this.startNode.y][this.startNode.x].type = 'empty';
                this.startNode = pos;
                cell.type = 'start';
            }
        } else if (e.ctrlKey || e.metaKey) { // Ctrl + click - set end
            if (cell.type !== 'start') {
                this.grid[this.endNode.y][this.endNode.x].type = 'empty';
                this.endNode = pos;
                cell.type = 'end';
            }
        } else if (e.shiftKey) { // Shift + click - set negative weight
            if (cell.type === 'empty') {
                cell.type = 'negative';
                cell.weight = -2;
            } else if (cell.type === 'negative') {
                cell.type = 'empty';
                cell.weight = 1;
            }
        } else { // Left click - toggle wall
            if (cell.type === 'empty') {
                cell.type = 'wall';
                this.isDrawing = true;
                this.drawingWalls = true;
            } else if (cell.type === 'wall') {
                cell.type = 'empty';
                this.isDrawing = true;
                this.drawingWalls = false;
            } else if (cell.type !== 'start' && cell.type !== 'end') {
                cell.type = 'wall';
                this.isDrawing = true;
                this.drawingWalls = true;
            }
        }
        
        this.draw();
    }
    
    handleMouseMove(e) {
        if (!this.isDrawing || this.isRunning) return;
        
        const pos = this.getMousePos(e);
        if (pos.x < 0 || pos.x >= this.gridWidth || pos.y < 0 || pos.y >= this.gridHeight) return;
        
        const cell = this.grid[pos.y][pos.x];
        if (cell.type !== 'start' && cell.type !== 'end') {
            if (this.drawingWalls && cell.type === 'empty') {
                cell.type = 'wall';
                this.draw();
            } else if (!this.drawingWalls && cell.type === 'wall') {
                cell.type = 'empty';
                this.draw();
            }
        }
    }
    
    handleMouseUp() {
        this.isDrawing = false;
        this.drawingWalls = false;
    }
    
    clearGrid() {
        if (this.isRunning) return;
        
        for (let y = 0; y < this.gridHeight; y++) {
            for (let x = 0; x < this.gridWidth; x++) {
                this.grid[y][x] = {
                    x: x,
                    y: y,
                    type: 'empty',
                    visited: false,
                    distance: Infinity,
                    previous: null,
                    weight: 1
                };
            }
        }
        
        // Reset to default positions
        this.startNode = { x: 5, y: 10 };
        this.endNode = { x: 24, y: 10 };
        this.grid[this.startNode.y][this.startNode.x].type = 'start';
        this.grid[this.endNode.y][this.endNode.x].type = 'end';
        
        this.draw();
        this.updateStats(0, 0, 0, 'Ready');
    }
    
    resetPath() {
        if (this.isRunning) return;
        
        for (let y = 0; y < this.gridHeight; y++) {
            for (let x = 0; x < this.gridWidth; x++) {
                const cell = this.grid[y][x];
                cell.visited = false;
                cell.distance = Infinity;
                cell.previous = null;
                if (cell.type === 'negative') {
                    cell.weight = -2;
                } else {
                    cell.weight = 1;
                }
            }
        }
        
        this.draw();
        this.updateStats(0, 0, 0, 'Ready');
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const algorithm = document.getElementById('algorithm-select').value;
        const colors = this.algorithms[algorithm];
        
        for (let y = 0; y < this.gridHeight; y++) {
            for (let x = 0; x < this.gridWidth; x++) {
                const cell = this.grid[y][x];
                const pixelX = x * this.cellSize;
                const pixelY = y * this.cellSize;
                
                // Cell background
                if (cell.visited && cell.type !== 'start' && cell.type !== 'end') {
                    this.ctx.fillStyle = colors.visitedColor;
                } else {
                    this.ctx.fillStyle = this.cellTypes[cell.type];
                }
                
                this.ctx.fillRect(pixelX, pixelY, this.cellSize, this.cellSize);
                
                // Cell border
                this.ctx.strokeStyle = '#ddd';
                this.ctx.lineWidth = 1;
                this.ctx.strokeRect(pixelX, pixelY, this.cellSize, this.cellSize);
                
                // Distance text for Dijkstra and Bellman-Ford when appropriate
                if ((algorithm === 'dijkstra' || algorithm === 'bellman-ford') && 
                    cell.distance !== Infinity && cell.distance < 99 && cell.visited && 
                    cell.type !== 'start' && cell.type !== 'end') {
                    this.ctx.fillStyle = '#333';
                    this.ctx.font = '8px Arial';
                    this.ctx.textAlign = 'center';
                    this.ctx.fillText(Math.round(cell.distance).toString(), 
                        pixelX + this.cellSize / 2, 
                        pixelY + this.cellSize / 2 + 2);
                }
            }
        }
    }
    
    async startVisualization() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.resetPath();
        
        const algorithm = document.getElementById('algorithm-select').value;
        const startTime = Date.now();
        
        const startBtn = document.getElementById('start-btn');
        startBtn.textContent = 'Running...';
        startBtn.disabled = true;
        this.updateStats(0, 0, 0, 'Running');
        
        let result;
        
        try {
            switch (algorithm) {
                case 'bfs':
                    result = await this.bfs();
                    break;
                case 'dijkstra':
                    result = await this.dijkstra();
                    break;
                case 'bellman-ford':
                    result = await this.bellmanFord();
                    break;
                case 'floyd-warshall':
                    result = await this.floydWarshall();
                    break;
            }
            
            const endTime = Date.now();
            const timeTaken = endTime - startTime;
            
            if (result.path && result.path.length > 0) {
                await this.animatePath(result.path);
                this.updateStats(result.visitedCount, result.path.length, timeTaken, 'Complete');
            } else {
                this.updateStats(result.visitedCount, 0, timeTaken, 'No Path');
            }
            
        } catch (error) {
            console.error('Algorithm error:', error);
            this.updateStats(0, 0, 0, 'Error');
        }
        
        this.isRunning = false;
        startBtn.textContent = 'Start Visualization';
        startBtn.disabled = false;
    }
    
    async bfs() {
        const startCell = this.grid[this.startNode.y][this.startNode.x];
        const endCell = this.grid[this.endNode.y][this.endNode.x];
        const queue = [startCell];
        const visited = new Set();
        let visitedCount = 0;
        
        startCell.distance = 0;
        
        while (queue.length > 0 && this.isRunning) {
            const current = queue.shift();
            const key = `${current.x},${current.y}`;
            
            if (visited.has(key)) continue;
            visited.add(key);
            
            current.visited = true;
            visitedCount++;
            
            this.draw();
            this.updateStats(visitedCount, 0, 0, 'Running');
            
            if (current.x === endCell.x && current.y === endCell.y) {
                return {
                    path: this.reconstructPath(current),
                    visitedCount
                };
            }
            
            await this.sleep(this.animationSpeed);
            
            const neighbors = this.getNeighbors(current);
            for (const neighbor of neighbors) {
                const neighborKey = `${neighbor.x},${neighbor.y}`;
                if (!visited.has(neighborKey) && neighbor.type !== 'wall') {
                    neighbor.distance = current.distance + 1;
                    neighbor.previous = current;
                    if (!queue.includes(neighbor)) {
                        queue.push(neighbor);
                    }
                }
            }
        }
        
        return { path: [], visitedCount };
    }
    
    async dijkstra() {
        const startCell = this.grid[this.startNode.y][this.startNode.x];
        const endCell = this.grid[this.endNode.y][this.endNode.x];
        const unvisited = [];
        let visitedCount = 0;
        
        // Initialize distances
        for (let y = 0; y < this.gridHeight; y++) {
            for (let x = 0; x < this.gridWidth; x++) {
                const cell = this.grid[y][x];
                cell.distance = (x === this.startNode.x && y === this.startNode.y) ? 0 : Infinity;
                if (cell.type !== 'wall') {
                    unvisited.push(cell);
                }
            }
        }
        
        while (unvisited.length > 0 && this.isRunning) {
            // Find node with minimum distance
            unvisited.sort((a, b) => a.distance - b.distance);
            const current = unvisited.shift();
            
            if (current.distance === Infinity) break;
            
            current.visited = true;
            visitedCount++;
            
            this.draw();
            this.updateStats(visitedCount, 0, 0, 'Running');
            
            if (current.x === endCell.x && current.y === endCell.y) {
                return {
                    path: this.reconstructPath(current),
                    visitedCount
                };
            }
            
            await this.sleep(this.animationSpeed);
            
            const neighbors = this.getNeighbors(current);
            for (const neighbor of neighbors) {
                if (!neighbor.visited && neighbor.type !== 'wall') {
                    const alt = current.distance + Math.abs(neighbor.weight);
                    if (alt < neighbor.distance) {
                        neighbor.distance = alt;
                        neighbor.previous = current;
                    }
                }
            }
        }
        
        return { path: [], visitedCount };
    }
    
    async bellmanFord() {
        const startCell = this.grid[this.startNode.y][this.startNode.x];
        const endCell = this.grid[this.endNode.y][this.endNode.x];
        const edges = this.getAllEdges();
        let visitedCount = 0;
        
        // Initialize distances
        for (let y = 0; y < this.gridHeight; y++) {
            for (let x = 0; x < this.gridWidth; x++) {
                const cell = this.grid[y][x];
                cell.distance = (x === this.startNode.x && y === this.startNode.y) ? 0 : Infinity;
            }
        }
        
        // Relax edges V-1 times
        for (let i = 0; i < this.gridWidth * this.gridHeight - 1 && this.isRunning; i++) {
            let updated = false;
            
            for (const edge of edges) {
                const { from, to, weight } = edge;
                if (from.distance !== Infinity && from.distance + weight < to.distance) {
                    to.distance = from.distance + weight;
                    to.previous = from;
                    updated = true;
                }
            }
            
            if (!updated) break;
            
            // Mark visited nodes for visualization
            for (let y = 0; y < this.gridHeight; y++) {
                for (let x = 0; x < this.gridWidth; x++) {
                    const cell = this.grid[y][x];
                    if (cell.distance !== Infinity && cell.type !== 'wall' && !cell.visited) {
                        cell.visited = true;
                        visitedCount++;
                    }
                }
            }
            
            this.draw();
            this.updateStats(visitedCount, 0, 0, 'Running');
            await this.sleep(this.animationSpeed * 2);
        }
        
        return {
            path: endCell.distance !== Infinity ? this.reconstructPath(endCell) : [],
            visitedCount
        };
    }
    
    async floydWarshall() {
        const startCell = this.grid[this.startNode.y][this.startNode.x];
        const endCell = this.grid[this.endNode.y][this.endNode.x];
        let visitedCount = 0;
        
        // Simple implementation for visualization
        const dist = {};
        const prev = {};
        
        // Initialize
        for (let y = 0; y < this.gridHeight; y++) {
            for (let x = 0; x < this.gridWidth; x++) {
                const key = `${x},${y}`;
                dist[key] = {};
                prev[key] = {};
                
                for (let y2 = 0; y2 < this.gridHeight; y2++) {
                    for (let x2 = 0; x2 < this.gridWidth; x2++) {
                        const key2 = `${x2},${y2}`;
                        if (x === x2 && y === y2) {
                            dist[key][key2] = 0;
                        } else if (this.isAdjacent(x, y, x2, y2) && this.grid[y2][x2].type !== 'wall') {
                            dist[key][key2] = this.grid[y2][x2].weight;
                        } else {
                            dist[key][key2] = Infinity;
                        }
                        prev[key][key2] = null;
                    }
                }
            }
        }
        
        // Floyd-Warshall main loop
        for (let ky = 0; ky < this.gridHeight && this.isRunning; ky++) {
            for (let kx = 0; kx < this.gridWidth && this.isRunning; kx++) {
                const k = `${kx},${ky}`;
                if (this.grid[ky][kx].type === 'wall') continue;
                
                this.grid[ky][kx].visited = true;
                visitedCount++;
                
                for (let iy = 0; iy < this.gridHeight; iy++) {
                    for (let ix = 0; ix < this.gridWidth; ix++) {
                        const i = `${ix},${iy}`;
                        if (this.grid[iy][ix].type === 'wall') continue;
                        
                        for (let jy = 0; jy < this.gridHeight; jy++) {
                            for (let jx = 0; jx < this.gridWidth; jx++) {
                                const j = `${jx},${jy}`;
                                if (this.grid[jy][jx].type === 'wall') continue;
                                
                                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                                    dist[i][j] = dist[i][k] + dist[k][j];
                                    prev[i][j] = prev[i][k] || k;
                                }
                            }
                        }
                    }
                }
                
                this.draw();
                this.updateStats(visitedCount, 0, 0, 'Running');
                await this.sleep(this.animationSpeed * 2);
            }
        }
        
        // Reconstruct path
        const startKey = `${startCell.x},${startCell.y}`;
        const endKey = `${endCell.x},${endCell.y}`;
        const path = [];
        
        if (dist[startKey][endKey] !== Infinity) {
            // Simple path reconstruction
            let current = startCell;
            path.push(current);
            
            while (current.x !== endCell.x || current.y !== endCell.y) {
                const neighbors = this.getNeighbors(current);
                let best = null;
                let bestDist = Infinity;
                
                for (const neighbor of neighbors) {
                    if (neighbor.type !== 'wall') {
                        const nKey = `${neighbor.x},${neighbor.y}`;
                        if (dist[nKey][endKey] < bestDist) {
                            bestDist = dist[nKey][endKey];
                            best = neighbor;
                        }
                    }
                }
                
                if (!best) break;
                current = best;
                path.push(current);
                
                if (path.length > 100) break; // Prevent infinite loops
            }
        }
        
        return { path, visitedCount };
    }
    
    isAdjacent(x1, y1, x2, y2) {
        return Math.abs(x1 - x2) + Math.abs(y1 - y2) === 1;
    }
    
    getAllEdges() {
        const edges = [];
        
        for (let y = 0; y < this.gridHeight; y++) {
            for (let x = 0; x < this.gridWidth; x++) {
                const cell = this.grid[y][x];
                if (cell.type === 'wall') continue;
                
                const neighbors = this.getNeighbors(cell);
                for (const neighbor of neighbors) {
                    if (neighbor.type !== 'wall') {
                        edges.push({
                            from: cell,
                            to: neighbor,
                            weight: neighbor.weight
                        });
                    }
                }
            }
        }
        
        return edges;
    }
    
    getNeighbors(cell) {
        const neighbors = [];
        const directions = [
            { x: 0, y: -1 }, // up
            { x: 1, y: 0 },  // right
            { x: 0, y: 1 },  // down
            { x: -1, y: 0 }  // left
        ];
        
        for (const dir of directions) {
            const newX = cell.x + dir.x;
            const newY = cell.y + dir.y;
            
            if (newX >= 0 && newX < this.gridWidth && newY >= 0 && newY < this.gridHeight) {
                neighbors.push(this.grid[newY][newX]);
            }
        }
        
        return neighbors;
    }
    
    reconstructPath(endCell) {
        const path = [];
        let current = endCell;
        
        while (current !== null) {
            path.unshift(current);
            current = current.previous;
        }
        
        return path;
    }
    
    async animatePath(path) {
        const algorithm = document.getElementById('algorithm-select').value;
        const pathColor = this.algorithms[algorithm].pathColor;
        
        for (let i = 0; i < path.length; i++) {
            const cell = path[i];
            if (cell.type !== 'start' && cell.type !== 'end') {
                const pixelX = cell.x * this.cellSize;
                const pixelY = cell.y * this.cellSize;
                
                this.ctx.fillStyle = pathColor;
                this.ctx.fillRect(pixelX, pixelY, this.cellSize, this.cellSize);
                
                this.ctx.strokeStyle = '#ddd';
                this.ctx.lineWidth = 1;
                this.ctx.strokeRect(pixelX, pixelY, this.cellSize, this.cellSize);
            }
            
            await this.sleep(30);
        }
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    updateStats(visitedNodes, pathLength, timeTaken, status) {
        document.getElementById('nodes-visited').textContent = visitedNodes;
        document.getElementById('path-length').textContent = pathLength;
        document.getElementById('time-taken').textContent = `${timeTaken}ms`;
        
        const statusEl = document.getElementById('algorithm-status');
        statusEl.textContent = status;
        statusEl.className = 'stat-value status';
        
        switch (status) {
            case 'Running':
                statusEl.classList.add('status--running');
                break;
            case 'Complete':
                statusEl.classList.add('status--complete');
                break;
            case 'No Path':
                statusEl.classList.add('status--no-path');
                break;
            case 'Error':
                statusEl.classList.add('status--no-path');
                break;
            default:
                statusEl.classList.add('status--info');
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const visualizer = new PathVisualizer();
    
    // Update algorithm info
    const algorithmSelect = document.getElementById('algorithm-select');
    const algorithmInfo = document.getElementById('algorithm-info');
    
    const algorithmDescriptions = {
        'bfs': 'BFS explores nodes level by level, guaranteeing the shortest path in unweighted graphs.',
        'dijkstra': 'Dijkstra\'s algorithm finds the shortest path in weighted graphs with non-negative weights.',
        'bellman-ford': 'Bellman-Ford can handle negative weights and detect negative cycles.',
        'floyd-warshall': 'Floyd-Warshall finds shortest paths between all pairs of nodes.'
    };
    
    function updateAlgorithmInfo() {
        const selected = algorithmSelect.value;
        algorithmInfo.textContent = algorithmDescriptions[selected];
    }
    
    algorithmSelect.addEventListener('change', updateAlgorithmInfo);
    updateAlgorithmInfo();
});