// Audio handler for browser Web Audio API
const AudioHandler = (() => {
    let audioContext = null;
    let isInitialized = false;
    let isMuted = false;
    
    const init = async () => {
        try {
            // Create audio context on first user interaction
            if (!audioContext) {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            
            // Resume if suspended (browsers require user interaction)
            if (audioContext.state === 'suspended') {
                await audioContext.resume();
            }
            
            isInitialized = true;
            console.log('Audio context initialized');
            return true;
        } catch (e) {
            console.warn('Audio initialization failed:', e);
            return false;
        }
    };
    
    // Try to initialize on first user interaction
    const initOnInteraction = () => {
        document.addEventListener('click', init, { once: true });
        document.addEventListener('keydown', init, { once: true });
        document.addEventListener('touchstart', init, { once: true });
    };
    
    initOnInteraction();
    
    return {
        init: init,
        isInitialized: () => isInitialized,
        getContext: () => audioContext,
        isMuted: () => isMuted,
        setMuted: (muted) => { isMuted = muted; }
    };
})();

// Hook for emscripten audio initialization
window.initAudioSystem = async () => {
    return await AudioHandler.init();
};

window.getAudioContext = () => {
    return AudioHandler.getContext();
};

window.isAudioInitialized = () => {
    return AudioHandler.isInitialized();
};
