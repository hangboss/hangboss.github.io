const longStr =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima corporis neque porro explicabo odio, exercitationem consectetur veritatis in vel accusantium reiciendis hic, molestias quasi placeat ratione et sunt animi dolorem.'
const app = Vue.createApp({
  data() {
    return {
      currentLang: 'en',
      title: window.i18n.en.title,
      platform: this.detectPlatform(),
      started: false,
      currentStepIndex: 0,
      activeKeys: [],
      showQuickJump: false,
      showLanguageDropdown: false,
      steps: window.i18n.en.steps,
      targetElements: [], // Store currently generated target elements
    }
  },
  computed: {
    currentStep() {
      return this.steps[this.currentStepIndex]
    },
    progress() {
      return (this.currentStepIndex / (this.steps.length - 1)) * 100
    },
    t() {
      return window.i18n[this.currentLang]
    },
  },
  methods: {
    toggleFullscreen() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      }
    },
    detectPlatform() {
      const platform = navigator.platform.toLowerCase() ?? ''
      const userAgent = navigator.userAgent.toLowerCase()

      // Detect macOS
      if (
        platform.includes('mac') ||
        userAgent.includes('mac') ||
        userAgent.includes('darwin')
      ) {
        return 'macos'
      }

      // Default to Windows
      return 'windows'
    },
    toggleLanguageDropdown() {
      this.showLanguageDropdown = !this.showLanguageDropdown
    },
    selectLanguage(lang) {
      if (this.currentLang === lang) return
      this.currentLang = lang
      this.title = this.t.title
      this.steps = this.t.steps
      this.setupPracticeArea()
      this.showLanguageDropdown = false
    },
    handleClickOutside(event) {
      const dropdown = this.$refs.langDropdown
      const button = this.$refs.langButton
      if (
        dropdown &&
        button &&
        !dropdown.contains(event.target) &&
        !button.contains(event.target)
      ) {
        this.showLanguageDropdown = false
      }
    },
    toggleLanguage() {
      this.currentLang = this.currentLang === 'en' ? 'zh' : 'en'
      this.title = this.t.title
      this.steps = this.t.steps
      this.setupPracticeArea()
    },
    updateUrlStepId(stepId) {
      // Update URL without refreshing page using history API
      const url = new URL(window.location)
      url.searchParams.set('step', stepId)
      window.history.pushState({}, '', url)
    },
    getStepIdFromUrl() {
      const urlParams = new URLSearchParams(window.location.search)
      return urlParams.get('step')
    },
    setStepById(stepId) {
      if (!stepId) return false

      const stepIndex = this.steps.findIndex((step) => step.id === stepId)
      if (stepIndex !== -1) {
        this.currentStepIndex = stepIndex
        return true
      }

      return false
    },
    startTutorial() {
      this.started = true

      // Try to load step from URL
      const stepId = this.getStepIdFromUrl()
      if (!this.setStepById(stepId)) {
        this.currentStepIndex = 0
      }

      this.setupPracticeArea()
    },
    toggleQuickJump() {
      this.showQuickJump = !this.showQuickJump
    },
    jumpToStep(stepId) {
      const index = this.steps.findIndex((step) => step.id === stepId)
      if (index !== -1) {
        this.currentStepIndex = index
        this.updateUrlStepId(stepId)
        this.setupPracticeArea()
        this.showQuickJump = false
      }
    },
    prevStep() {
      if (this.currentStepIndex > 0) {
        this.currentStepIndex--
        this.updateUrlStepId(this.currentStep.id)
        this.setupPracticeArea()
      }
    },
    nextStep() {
      if (this.currentStepIndex < this.steps.length - 1) {
        this.currentStepIndex++
        this.updateUrlStepId(this.currentStep.id)
        this.setupPracticeArea()
      }
    },
    restartTutorial() {
      this.currentStepIndex = 0
      this.updateUrlStepId(this.currentStep.id)
      this.setupPracticeArea()
    },
    setupPracticeArea() {
      // Set up practice area content based on current step
      const practiceArea = this.$refs.practiceArea
      if (!practiceArea) {
        console.warn('Practice area not found, retrying...')
        // If practiceArea doesn't exist yet, retry after delay
        setTimeout(() => this.setupPracticeArea(), 100)
        return
      }

      practiceArea.innerHTML = `<div class="practice-instruction">${this.currentStep.practice}</div>`

      // Update URL
      this.updateUrlStepId(this.currentStep.id)

      // Clear all previous target elements
      this.targetElements = []

      // If this is the basic movement and mouse click step, generate random target elements
      if (this.currentStep.id === 'basic-movement-click') {
        // Default configuration
        const config = {
          count: 3, // Number of target elements
          minDistance: 15, // Minimum distance between target elements (percentage)
          sizeRange: [40, 80], // Element size range (pixels)
        }

        // Ensure DOM is updated before generating elements
        setTimeout(() => {
          this.generateTargetElements(practiceArea, config)
        }, 50)
      }
      // If this is the scroll step, add scrollable content
      else if (this.currentStep.id === 'scroll') {
        const scrollHtml = `
                    <div style="height: 400px;" class="w-full overflow-auto border-2 border-dashed border-gray-300 rounded-xl">
                        <div class="p-4" style="min-width:200%; min-height:1000px">
                            <div class="flex mb-8">
                                ${Array(15).fill(longStr).join(' ')}
                            </div>
                            ${Array(10)
                              .fill(
                                `<div class="my-4 p-4 bg-gray-200 rounded">${longStr}</div>`
                              )
                              .join('')}
                        </div>
                    </div>
                `

        // Clear and add new content
        practiceArea.innerHTML = scrollHtml
      }
      // If this is the area positioning step, generate target elements at specific positions
      else if (this.currentStep.id === 'area-position') {
        // Delay element generation to ensure DOM is updated
        setTimeout(() => {
          console.log('Generating area-position targets')

          // Clear all target elements
          const existingTargets =
            practiceArea.querySelectorAll('.target-element')
          existingTargets.forEach((el) => el.remove())
          this.targetElements = []

          // Top-left position (Q)
          this.generateTargetElements(practiceArea, {
            count: 1,
            sizeRange: [60, 60],
            position: { x: 15.5, y: 3 },
            label: 'Q+W',
            labelSize: 14,
          })
          console.log('After Q:', this.targetElements.length)

          // Bottom-left position (Z)
          this.generateTargetElements(practiceArea, {
            count: 1,
            sizeRange: [60, 60],
            position: { x: 4.5, y: 81.5 },
            label: 'Z+A',
            labelSize: 14,
            append: true,
          })
          console.log('After Z:', this.targetElements.length)

          // Bottom-right position (C)
          this.generateTargetElements(practiceArea, {
            count: 1,
            sizeRange: [60, 60],
            position: { x: 82.3, y: 81.2 },
            label: 'C',
            append: true,
          })
          console.log('After C:', this.targetElements.length)

          // Confirm all target elements have been added
          console.log('Final targets:', this.targetElements.length)
          const finalTargets = practiceArea.querySelectorAll('.target-element')
          console.log('DOM targets:', finalTargets.length)
        }, 100)
      } else if (this.currentStep.id === 'grid-position') {
        // Default configuration
        const config = {
          count: 5, // Number of target elements
          minDistance: 15, // Minimum distance between target elements (percentage)
          sizeRange: [40, 80], // Element size range (pixels)
        }

        // Ensure DOM is updated before generating elements
        setTimeout(() => {
          this.generateTargetElements(practiceArea, config)
        }, 50)
      }
    },

    // Generate random target elements
    generateTargetElements(container, config) {
      // If container doesn't exist, do nothing
      if (!container) {
        console.warn('Target container not found')
        return
      }

      const colors = [
        'rgba(255, 0, 0, 0.6)', // Semi-transparent red
        'rgba(0, 0, 255, 0.6)', // Semi-transparent blue
        'rgba(0, 128, 0, 0.6)', // Semi-transparent green
        'rgba(128, 0, 128, 0.6)', // Semi-transparent purple
        'rgba(255, 165, 0, 0.6)', // Semi-transparent orange
        'rgba(255, 192, 203, 0.6)', // Semi-transparent pink
      ]

      // Use provided configuration or default configuration
      const targetCount = config.count || 5
      const minDistance = config.minDistance || 15 // Minimum spacing (percentage)
      const minSize = config.sizeRange ? config.sizeRange[0] : 40 // Minimum size (pixels)
      const maxSize = config.sizeRange ? config.sizeRange[1] : 70 // Maximum size (pixels)
      // Fixed position setting
      const fixedPosition = config.position || null // If position is provided, all elements will be generated at that position
      // Whether to append to existing elements
      const append = config.append === true

      // First get container dimensions
      const containerRect = container.getBoundingClientRect()
      const containerWidth = containerRect.width
      const containerHeight = containerRect.height

      // If not append mode, remove all existing target elements
      if (!append) {
        const existingTargets = container.querySelectorAll('.target-element')
        existingTargets.forEach((el) => el.remove())

        // Clear target element array
        this.targetElements = []
      }

      // If container dimensions are 0, it might be because container hasn't fully rendered, retry after delay
      if (containerWidth === 0 || containerHeight === 0) {
        console.warn('Container has zero dimensions, retrying...')
        setTimeout(() => this.generateTargetElements(container, config), 100)
        return
      }

      // Store generated target positions for distance check
      const targetPositions = this.targetElements.map((el) => {
        const rect = el.getBoundingClientRect()
        return {
          x: parseFloat(el.style.left),
          y: parseFloat(el.style.top),
          size: rect.width,
          pxSize: rect.width,
        }
      })

      // Create new target elements
      for (let i = 0; i < targetCount; i++) {
        // Random size (pixels)
        const size = Math.floor(minSize + Math.random() * (maxSize - minSize))

        // Calculate element size as percentage of container
        const sizePercentW = (size / containerWidth) * 100
        const sizePercentH = (size / containerHeight) * 100

        // Random position (percentage)
        let xPercent, yPercent

        if (fixedPosition) {
          // If position is provided
          xPercent = fixedPosition.x
          yPercent = fixedPosition.y
        } else {
          // Try to find a suitable position
          let isValidPosition
          let attempts = 0
          const maxAttempts = 20 // Maximum number of attempts

          do {
            // Random position (percentage) - Consider element size and container boundaries
            xPercent = Math.random() * (100 - sizePercentW)
            yPercent = Math.random() * (100 - sizePercentH)

            // Check if position is too close to existing targets
            isValidPosition = this.checkTargetPosition(
              xPercent,
              yPercent,
              size,
              targetPositions,
              minDistance,
              containerWidth,
              containerHeight
            )
            attempts++
          } while (!isValidPosition && attempts < maxAttempts)

          // If multiple attempts still don't find a suitable position, reduce minimum distance requirement
          if (!isValidPosition && attempts >= maxAttempts) {
            const reducedDistance = minDistance / 2
            isValidPosition = this.checkTargetPosition(
              xPercent,
              yPercent,
              size,
              targetPositions,
              reducedDistance,
              containerWidth,
              containerHeight
            )
          }
        }

        // Record this position
        targetPositions.push({
          x: xPercent,
          y: yPercent,
          size: size,
          pxSize: size, // Store pixel size for distance calculation
        })

        // Create element
        const targetElement = document.createElement('div')
        targetElement.className = 'target-element'
        targetElement.style.position = 'absolute'
        targetElement.style.left = `${xPercent}%`
        targetElement.style.top = `${yPercent}%`
        targetElement.style.width = `${size}px`
        targetElement.style.height = `${size}px`
        targetElement.style.borderRadius = '50%'
        targetElement.style.backgroundColor = colors[i % colors.length]
        targetElement.style.display = 'flex'
        targetElement.style.alignItems = 'center'
        targetElement.style.justifyContent = 'center'
        targetElement.style.color = 'white'
        targetElement.style.fontWeight = 'bold'
        targetElement.style.userSelect = 'none'
        targetElement.style.fontSize = `${Math.max(14, size / 3)}px` // Adjust font size based on element size
        targetElement.style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.5)' // Add text shadow for readability
        targetElement.style.zIndex = '100' // Ensure element is on top layer

        // If label is provided, use it
        if (config.label) {
          targetElement.textContent = config.label
          if (config.labelSize) {
            targetElement.style.fontSize = `${config.labelSize}px`
          }
        } else {
          targetElement.textContent = i + 1
        }

        // Store the target ID for event handling
        targetElement.dataset.targetId = this.targetElements.length

        // Add click event
        targetElement.addEventListener('click', this.handleTargetClick)

        // Add element to container
        container.appendChild(targetElement)

        // Store element reference
        this.targetElements.push(targetElement)

        // Add animation
        setTimeout(() => {
          targetElement.style.transition =
            'all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28)'
          targetElement.style.transform = 'scale(1)'
          targetElement.style.opacity = '1'
        }, 10)
      }
    },

    // Check if target position is too close to existing targets
    checkTargetPosition(
      xPercent,
      yPercent,
      size,
      existingPositions,
      minDistance,
      containerWidth,
      containerHeight
    ) {
      // Convert percentage to pixels for precise distance calculation
      const x = (xPercent / 100) * containerWidth
      const y = (yPercent / 100) * containerHeight

      // Loop through existing positions
      for (const pos of existingPositions) {
        // Convert existing positions to pixels
        const posX = (pos.x / 100) * containerWidth
        const posY = (pos.y / 100) * containerHeight

        // Calculate distance between two circle centers
        const distance = Math.sqrt(
          Math.pow(x - posX, 2) + Math.pow(y - posY, 2)
        )

        // If distance is less than sum of two element radii plus minimum spacing, position is invalid
        // Convert minimum spacing percentage to pixels
        const minDistancePx =
          (minDistance / 100) * Math.min(containerWidth, containerHeight)
        const minRequiredDistance = (size + pos.pxSize) / 2 + minDistancePx

        if (distance < minRequiredDistance) {
          return false
        }
      }

      return true
    },

    // Handle target element click
    handleTargetClick(event) {
      const targetElement = event.currentTarget
      const targetId = parseInt(targetElement.dataset.targetId)

      // Add animation effect
      targetElement.style.transform = 'scale(0.1)'
      targetElement.style.opacity = '0'

      // Remove element
      setTimeout(() => {
        if (targetElement.parentNode) {
          targetElement.parentNode.removeChild(targetElement)

          // Remove element from array
          const index = this.targetElements.indexOf(targetElement)
          if (index !== -1) {
            this.targetElements.splice(index, 1)
          }
        }
      }, 300)
    },
    handleKeyDown(event) {
      // Don't process key events for form elements
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) {
        return
      }

      let key = event.key.toUpperCase()
      // Special key handling
      if (key === 'ESCAPE') key = 'ESC'
      if (key === ' ') key = 'SPACE'
      if (key === 'CAPSLOCK') key = 'CAPSLOCK'

      if (key === 'ENTER') {
        // If quick jump popup is open, press Enter to close
        if (this.showQuickJump) {
          event.preventDefault()
          this.showQuickJump = false
        }
        return
      }

      // Handle direction keys
      if (key === 'ARROWRIGHT') {
        event.preventDefault()
        this.nextStep()
        return
      } else if (key === 'ARROWLEFT') {
        event.preventDefault()
        this.prevStep()
        return
      } else if (key === 'ARROWUP') {
        event.preventDefault()
        this.toggleQuickJump()
        return
      } else if (key === 'ARROWDOWN') {
        event.preventDefault()
        this.restartTutorial()
        return
      }

      // Check current step keys
      if (this.currentStep.isGrid) {
        const keyObj = this.currentStep.keys.find((k) => k.key === key)
        if (keyObj) {
          this.activeKeys = [key]
          return
        }
      } else if (this.currentStep.isCombo) {
        // Special handling for key combinations
      } else if (this.currentStep.keys && this.currentStep.keys.includes(key)) {
        if (!this.activeKeys.includes(key)) {
          this.activeKeys.push(key)
        }
      }
    },
    handleKeyUp(event) {
      let key = event.key.toUpperCase()
      // Special key handling
      if (key === 'ESCAPE') key = 'ESC'
      if (key === ' ') key = 'SPACE'

      const index = this.activeKeys.indexOf(key)
      if (index !== -1) {
        this.activeKeys.splice(index, 1)
      }
    },
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keyup', this.handleKeyUp)
    document.addEventListener('click', this.handleClickOutside)

    // Handle browser forward/back buttons
    window.addEventListener('popstate', () => {
      const stepId = this.getStepIdFromUrl()
      if (stepId) {
        this.setStepById(stepId)
        this.setupPracticeArea()
      }
    })

    // Check if URL has step ID, if so, directly enter that step
    const stepId = this.getStepIdFromUrl()
    if (stepId) {
      if (this.setStepById(stepId)) {
        this.started = true

        // Delay setupPracticeArea execution to ensure DOM elements have rendered
        setTimeout(() => {
          this.setupPracticeArea()
        }, 100)
      }
    }
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
    document.removeEventListener('keyup', this.handleKeyUp)
    document.removeEventListener('click', this.handleClickOutside)
    window.removeEventListener('popstate', () => {})
  },
})

app.mount('#app')
