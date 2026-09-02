// Bootstrap and initialization
window.gameStarted = false;
window.loadingProgress = 0;

const setLoadingProgress = (progress, status) => {
    window.loadingProgress = Math.min(progress, 100);
    const fill = document.getElementById('progress-fill');
    const text = document.getElementById('status-text');
    if (fill) fill.style.width = window.loadingProgress + '%';
    if (text && status) text.textContent = status;
};

const showError = (message) => {
    const loadingScreen = document.getElementById('loading-screen');
    const errorScreen = document.getElementById('error-screen');
    if (loadingScreen) loadingScreen.style.display = 'none';
    if (errorScreen) {
        errorScreen.style.display = 'flex';
        document.getElementById('error-message').textContent = message;
    }
    console.error('Game Error:', message);
};

const hideLoadingScreen = () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
};

// Emscripten module setup
var Module = {
    canvas: document.getElementById('canvas'),
    onRuntimeInitialized: () => {
        console.log('WASM runtime initialized');
        setLoadingProgress(90, 'Starting game...');
        window.gameStarted = true;
        
        if (window.Module._main) {
            window.Module._main();
        }
        hideLoadingScreen();
    },
    setStatus: (text) => {
        if (text) setLoadingProgress(50, text);
    },
    monitorRunDependencies: (left) => {
        if (left === 0) {
            setLoadingProgress(85, 'Initializing game engine...');
        }
    }
};

// Handle Emscripten errors
window.onerror = (event) => {
    showError('Runtime error: ' + event);
};

// Handle unhandled promise rejections
window.onunhandledrejection = (event) => {
    showError('Unhandled promise rejection: ' + event.reason);
};

// Check browser capabilities
const checkBrowserSupport = () => {
    const issues = [];
    
    if (!window.WebAssembly) {
        issues.push('WebAssembly is not supported');
    }
    
    const canvas = document.getElementById('canvas');
    try {
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        if (!gl) {
            issues.push('WebGL is not supported');
        }
    } catch (e) {
        issues.push('WebGL initialization failed');
    }
    
    if (!navigator.gamepadData && !navigator.getGamepads) {
        console.warn('Gamepad API not available');
    }
    
    if (!window.AudioContext && !window.webkitAudioContext) {
        console.warn('Web Audio API not available');
    }
    
    return issues;
};

const issues = checkBrowserSupport();
if (issues.length > 0) {
    showError('Browser compatibility issues:\n' + issues.join('\n'));
} else {
    setLoadingProgress(10, 'Loading WebAssembly...');
}

// Initialize audio on first user interaction
document.addEventListener('click', () => {
    AudioHandler.init();
}, { once: true });

document.addEventListener('keydown', () => {
    AudioHandler.init();
}, { once: true });

// Prevent accidental page navigation
window.addEventListener('beforeunload', (e) => {
    if (window.gameStarted) {
        e.preventDefault();
        e.returnValue = '';
    }
});
