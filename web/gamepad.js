// Gamepad input handler
const GamepadInput = (() => {
    let gamepads = [];
    const deadzone = 0.15;
    
    const getGamepads = () => {
        return navigator.getGamepads ? navigator.getGamepads() : [];
    };
    
    const pollGamepads = () => {
        gamepads = getGamepads();
        gamepads.forEach((gamepad, index) => {
            if (!gamepad) return;
            
            // Left stick for movement
            const moveX = Math.abs(gamepad.axes[0]) > deadzone ? gamepad.axes[0] : 0;
            const moveY = Math.abs(gamepad.axes[1]) > deadzone ? gamepad.axes[1] : 0;
            
            if (window.Module && window.Module._handleMovementInput) {
                window.Module._handleMovementInput(moveX, moveY);
            }
            
            // Right stick for camera
            const camX = Math.abs(gamepad.axes[2]) > deadzone ? gamepad.axes[2] * 5 : 0;
            const camY = Math.abs(gamepad.axes[3]) > deadzone ? gamepad.axes[3] * 5 : 0;
            
            if ((camX !== 0 || camY !== 0) && window.Module && window.Module._handleMouseMove) {
                window.Module._handleMouseMove(camX, camY);
            }
            
            // Buttons
            gamepad.buttons.forEach((button, buttonIndex) => {
                if (button.pressed) {
                    handleGamepadButton(buttonIndex);
                }
            });
            
            // Triggers
            if (gamepad.axes[4] > deadzone && window.Module && window.Module._handleActionButton) {
                window.Module._handleActionButton('fire');
            }
            if (gamepad.axes[5] > deadzone && window.Module && window.Module._handleActionButton) {
                window.Module._handleActionButton('sprint');
            }
        });
    };
    
    function handleGamepadButton(index) {
        const buttonMap = {
            0: 'fire',      // A
            1: 'menu',      // B
            2: 'enter',     // X
            3: 'jump',      // Y
            4: 'sprint',    // LB
            5: 'crouch',    // RB
            6: 'menu',      // Back
            7: 'confirm',   // Start
            12: 'up',       // D-Pad Up
            13: 'down',     // D-Pad Down
            14: 'left_ui',  // D-Pad Left
            15: 'right_ui'  // D-Pad Right
        };
        
        const action = buttonMap[index];
        if (action && window.Module && window.Module._handleActionButton) {
            window.Module._handleActionButton(action);
        }
    }
    
    // Poll gamepads continuously
    setInterval(pollGamepads, 50);
    
    // Listen for gamepad connection
    window.addEventListener('gamepadconnected', (e) => {
        console.log('Gamepad connected:', e.gamepad.id);
    });
    
    window.addEventListener('gamepaddisconnected', (e) => {
        console.log('Gamepad disconnected:', e.gamepad.id);
    });
    
    return {
        getGamepads: () => gamepads,
        isConnected: () => gamepads.some(gp => gp !== null && gp !== undefined)
    };
})();
