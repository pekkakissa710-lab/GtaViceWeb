// Keyboard input handler
const KeyboardInput = (() => {
    const keyState = {};
    
    const keyMap = {
        'w': 'forward',
        'a': 'left',
        's': 'backward',
        'd': 'right',
        ' ': 'jump',
        'shift': 'sprint',
        'control': 'crouch',
        'e': 'enter',
        'f': 'fire',
        'enter': 'confirm',
        'escape': 'menu',
        'arrowup': 'up',
        'arrowdown': 'down',
        'arrowleft': 'left_ui',
        'arrowright': 'right_ui'
    };
    
    document.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();
        keyState[key] = true;
        
        if (window.Module && window.Module._handleKeyDown) {
            const action = keyMap[key];
            if (action) {
                window.Module._handleKeyDown(action);
            }
        }
    });
    
    document.addEventListener('keyup', (e) => {
        const key = e.key.toLowerCase();
        keyState[key] = false;
        
        if (window.Module && window.Module._handleKeyUp) {
            const action = keyMap[key];
            if (action) {
                window.Module._handleKeyUp(action);
            }
        }
    });
    
    return {
        isPressed: (key) => keyState[key] || false,
        getState: () => ({ ...keyState })
    };
})();

// Mouse input handler
const MouseInput = (() => {
    let mouseX = 0, mouseY = 0;
    let deltaX = 0, deltaY = 0;
    let buttonState = {};
    
    const canvas = document.getElementById('canvas');
    if (!canvas) return { getX: () => 0, getY: () => 0 };
    
    document.addEventListener('mousemove', (e) => {
        deltaX = e.movementX || 0;
        deltaY = e.movementY || 0;
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (window.Module && window.Module._handleMouseMove) {
            window.Module._handleMouseMove(deltaX, deltaY);
        }
    });
    
    canvas.addEventListener('mousedown', (e) => {
        buttonState[e.button] = true;
        if (e.button === 0 && window.Module && window.Module._handleMouseDown) {
            window.Module._handleMouseDown();
        }
    });
    
    canvas.addEventListener('mouseup', (e) => {
        buttonState[e.button] = false;
        if (e.button === 0 && window.Module && window.Module._handleMouseUp) {
            window.Module._handleMouseUp();
        }
    });
    
    canvas.addEventListener('click', () => {
        if (canvas.requestPointerLock) {
            canvas.requestPointerLock();
        }
    });
    
    return {
        getX: () => mouseX,
        getY: () => mouseY,
        getDeltaX: () => deltaX,
        getDeltaY: () => deltaY,
        isButtonPressed: (button) => buttonState[button] || false
    };
})();

// Touch input handler for mobile
const TouchInput = (() => {
    const touches = new Map();
    
    const detectMobile = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    
    if (!detectMobile()) return { isMobile: () => false };
    
    // Show mobile controls
    const controls = document.getElementById('mobile-controls');
    if (controls) controls.classList.add('visible');
    
    // Left stick
    const leftStick = document.getElementById('left-stick');
    const stickBg = leftStick?.querySelector('.stick-bg');
    const stickCircle = leftStick?.querySelector('.stick-circle');
    
    if (leftStick && stickBg && stickCircle) {
        leftStick.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = stickBg.getBoundingClientRect();
            handleStickInput(touch.clientX - rect.left - rect.width/2, 
                           touch.clientY - rect.top - rect.height/2,
                           rect.width/2, stickCircle);
        });
        
        leftStick.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = stickBg.getBoundingClientRect();
            handleStickInput(touch.clientX - rect.left - rect.width/2,
                           touch.clientY - rect.top - rect.height/2,
                           rect.width/2, stickCircle);
        });
        
        leftStick.addEventListener('touchend', () => {
            stickCircle.style.transform = 'translate(-50%, -50%)';
            if (window.Module && window.Module._handleMovementInput) {
                window.Module._handleMovementInput(0, 0);
            }
        });
    }
    
    function handleStickInput(x, y, radius, circle) {
        const dist = Math.sqrt(x*x + y*y);
        const angle = Math.atan2(y, x);
        
        let offsetX = x, offsetY = y;
        if (dist > radius) {
            offsetX = Math.cos(angle) * radius;
            offsetY = Math.sin(angle) * radius;
        }
        
        const moveX = offsetX / radius;
        const moveY = offsetY / radius;
        
        circle.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
        
        if (window.Module && window.Module._handleMovementInput) {
            window.Module._handleMovementInput(moveX, moveY);
        }
    }
    
    // Right area for camera
    const rightArea = document.getElementById('right-area');
    if (rightArea) {
        rightArea.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                const lastTouch = touches.get('camera') || {};
                const deltaX = (touch.clientX - (lastTouch.x || touch.clientX)) * 0.5;
                const deltaY = (touch.clientY - (lastTouch.y || touch.clientY)) * 0.5;
                touches.set('camera', { x: touch.clientX, y: touch.clientY });
                
                if (window.Module && window.Module._handleMouseMove) {
                    window.Module._handleMouseMove(deltaX, deltaY);
                }
            }
        });
    }
    
    // Action buttons
    const buttons = document.querySelectorAll('.action-btn, .menu-btn');
    buttons.forEach(btn => {
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const action = btn.id.replace('-btn', '');
            if (window.Module && window.Module._handleActionButton) {
                window.Module._handleActionButton(action);
            }
        });
    });
    
    return {
        isMobile: () => true,
        getTouches: () => Array.from(touches.values())
    };
})();

// Prevent context menu and default behaviors
document.addEventListener('contextmenu', (e) => {
    const canvas = document.getElementById('canvas');
    if (canvas && canvas.contains(e.target)) {
        e.preventDefault();
    }
});

// Prevent scrolling
document.body.style.overflow = 'hidden';
window.addEventListener('wheel', (e) => {
    e.preventDefault();
}, { passive: false });

window.addEventListener('touchmove', (e) => {
    if (document.getElementById('mobile-controls')?.classList.contains('visible')) {
        e.preventDefault();
    }
}, { passive: false });
