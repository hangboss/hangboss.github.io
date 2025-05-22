window.i18n = {
  en: {
    title: 'Mouseless Playground',
    platform: {
      windows: 'Windows',
      macos: 'MacOS',
    },
    welcome: {
      title: 'Welcome to Mouseless Playground',
      description:
        'Here, you will learn how to control your computer with keyboard.',
      startButton: 'Start Learning',
      shortcutTip: 'Tip: Press ↑ to quickly jump to any tutorial',
      preparation: 'Before we start',
      step1: 'Launch Mouseless application (if not already running)',
      step2: 'We recommend using the default settings for best experience',
      step3: 'For the best experience, use full screen mode',
    },
    steps: [
      {
        id: 'trigger-exit',
        title: 'Trigger & Exit',
        description:
          'Double-click CapsLock to activate Mouseless, use Esc or Space to exit. After activation, you can control the mouse with keyboard, press Esc or Space anytime to exit.',
        keys: ['CAPSLOCK', 'ESC', 'SPACE'],
        practice:
          'Practice: Double-click CapsLock to activate, then press Esc or Space to exit',
      },
      {
        id: 'quick-trigger',
        title: 'Quick Activation',
        description:
          'Besides double-clicking CapsLock, you can use CapsLock + Function key combinations to quickly activate Mouseless and trigger the corresponding function. For example: CapsLock + I will activate and move the mouse upward.',
        keys: ['CAPSLOCK + I', 'CAPSLOCK + K', 'CAPSLOCK + J', 'CAPSLOCK + L'],
        practice:
          'Practice: Try using CapsLock + I/K/J/L to quickly activate and move the mouse',
        isCombo: true,
      },
      {
        id: 'basic-movement-click',
        title: 'Basic Movement & Mouse Click',
        description:
          'Use I/K/J/L keys to control mouse movement (I for up, K for down, J for left, L for right). And use N for left click, M for right click, B for left button hold.',
        keys: ['I', 'K', 'J', 'L', 'N', 'M', 'B'],
        practice:
          'Practice: Use Mouseless to move the cursor to the colored circles and click them. The circles will disappear when clicked.',
      },
      {
        id: 'grid-position',
        title: 'Grid Mode',
        description:
          'Make sure Quick Positioning Mode is set to Grid Mode. MacOS will support this feature in the future.',
        practice:
          'Practice: Activate Mouseless, press the key combinations shown in the corresponding grid to move the mouse, Click on the target circles to close them.',
        isGrid: true,
      },
      {
        id: 'area-position',
        title: 'Area Mode',
        description:
          'Make sure Quick Positioning Mode is set to Area Mode, use Q/W/E/A/S/D/Z/X/C to quickly position to 9 areas of the screen.',
        keys: [
          { key: 'Q', position: 'top-left' },
          { key: 'W', position: 'top-center' },
          { key: 'E', position: 'top-right' },
          { key: 'A', position: 'middle-left' },
          { key: 'S', position: 'middle-center' },
          { key: 'D', position: 'middle-right' },
          { key: 'Z', position: 'bottom-left' },
          { key: 'X', position: 'bottom-center' },
          { key: 'C', position: 'bottom-right' },
        ],
        practice:
          'Practice: Activate Mouseless, then try quickly move to different areas of the screen. Click on the target circles to close them.',
        isGrid: true,
      },
      {
        id: 'scroll',
        title: 'Scrolling',
        description:
          'Use U/O for vertical scrolling, Y/P for horizontal scrolling.',
        keys: ['U', 'O', 'Y', 'P'],
        practice: 'Practice: Try scrolling in different directions',
      },
      {
        id: 'screen-switch',
        title: 'Screen Switch',
        description:
          'Use keys 1/2/3 to quickly move mouse to the center of different screens.',
        keys: ['1', '2', '3'],
        practice: 'Practice: Try switching between different screens',
      },
      {
        id: 'shortcuts-overview',
        title: 'Shortcuts Overview',
        description:
          "Congratulations on completing all tutorials! Here's an overview of all shortcuts. Remember: Double-click CapsLock to activate, or use CapsLock + Function key for quick trigger.",
        sections: [
          {
            title: 'Basic Movement (CapsLock + Key)',
            keys: ['I', 'K', 'J', 'L'],
            desc: 'Move mouse up/down/left/right',
          },
          {
            title: 'Screen Switch (CapsLock + Key)',
            keys: ['1', '2', '3'],
            desc: 'Quick move to different screen centers',
          },
          {
            title: 'Area Position (CapsLock + Key)',
            keys: ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'],
            desc: 'Quick position to 9 screen areas',
            isGrid: true,
          },
          {
            title: 'Scrolling (CapsLock + Key)',
            keys: ['U', 'O', 'Y', 'P'],
            desc: 'U/O vertical scroll, Y/P horizontal scroll',
          },
          {
            title: 'Mouse Click (CapsLock + Key)',
            keys: ['N', 'M', 'B'],
            desc: 'N left click, M right click, B left hold',
          },
          {
            title: 'Exit Operations',
            keys: ['ESC', 'SPACE'],
            desc: 'Press these keys anytime to exit',
          },
        ],
        isOverview: true,
        practice:
          'You can take a screenshot of this overview, or press ↑ to quickly come back and check.',
      },
    ],
    controls: {
      prev: 'Previous',
      next: 'Next',
      restart: 'Restart',
      quickJump: 'Quick Jump',
      language: 'Language',
      closePopup: 'Press Enter to close',
      enterFullscreen: 'Enter Fullscreen',
      exitFullscreen: 'Exit Fullscreen',
      fullscreenButton: 'Fullscreen',
    },
  },
}
