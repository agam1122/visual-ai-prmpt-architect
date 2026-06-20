// Visual AI Prompt Architect - Main Logic

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const basePromptInput = document.getElementById('base-prompt');
    const compiledPromptText = document.getElementById('compiled-prompt');
    
    // Chips & Group Containers
    const arChips = document.querySelectorAll('#aspect-ratio-group .chip');
    const styleChips = document.querySelectorAll('#artistic-style-group .chip');
    const lightingChips = document.querySelectorAll('#lighting-group .chip');
    const cameraChips = document.querySelectorAll('#camera-lens-group .chip');
    const colorChips = document.querySelectorAll('#color-palette-group .chip');
    
    // Sliders
    const stylizeSlider = document.getElementById('param-stylize');
    const stylizeValDisplay = document.getElementById('stylize-val');
    const chaosSlider = document.getElementById('param-chaos');
    const chaosValDisplay = document.getElementById('chaos-val');
    const weirdSlider = document.getElementById('param-weird');
    const weirdValDisplay = document.getElementById('weird-val');
    
    // Radio Buttons
    const versionRadios = document.getElementsByName('mj-version');
    
    // Action Buttons
    const btnCopy = document.getElementById('btn-copy-prompt');
    const btnSave = document.getElementById('btn-save');
    const btnShareLink = document.getElementById('btn-share-link');
    const btnRandomize = document.getElementById('btn-randomize');
    const btnClear = document.getElementById('btn-clear');
    const copyTooltip = document.getElementById('copy-success-tooltip');

    // State Variables
    let state = {
        basePrompt: '',
        aspectRatio: '', // empty means default (1:1)
        styles: [],
        lighting: [],
        camera: [],
        color: [],
        stylize: 100,
        chaos: 0,
        weird: 0,
        version: '--v 8.1',
        engine: 'midjourney', // 'midjourney' | 'dalle' | 'sd'
        dalleStyle: 'vivid', // 'vivid' | 'natural'
        dalleQuality: 'hd', // 'hd' | 'standard'
        cfgScale: 7.0,
        negativeTags: []
    };

    // ----------------------------------------------------------------
    // Core Prompt Compiler Logic
    // ----------------------------------------------------------------
    function compilePrompt() {
        let compiledParts = [];

        // 1. Add core subject text
        const coreText = state.basePrompt.trim();
        if (coreText) {
            compiledParts.push(coreText);
        }

        // 2. Add visual components (styles, lighting, camera, colors)
        if (state.styles.length > 0) compiledParts.push(state.styles.join(', '));
        if (state.lighting.length > 0) compiledParts.push(state.lighting.join(', '));
        if (state.camera.length > 0) compiledParts.push(state.camera.join(', '));
        if (state.color.length > 0) compiledParts.push(state.color.join(', '));

        // Join core prompt segments with a comma and clean spacing
        let promptText = compiledParts.join(', ');
        
        // Remove duplicate commas or extra spaces that could occur
        promptText = promptText.replace(/,\s*,/g, ',').trim();
        if (promptText.startsWith(',')) {
            promptText = promptText.substring(1).trim();
        }

        const btnRaw = document.getElementById('mode-raw');
        const btnHd = document.getElementById('mode-hd');
        const isRawActive = btnRaw && btnRaw.classList.contains('active');
        const isHdActive = btnHd && btnHd.classList.contains('active');

        // If nothing is written or selected, show placeholder
        const isDefaultState = !promptText && !state.aspectRatio && state.stylize === 100 && state.chaos === 0 && state.weird === 0 && !isRawActive && !isHdActive && state.negativeTags.length === 0;

        if (isDefaultState) {
            compiledPromptText.textContent = "A futuristic astronaut walking through a mystical purple glowing forest...";
            document.getElementById('char-count').textContent = '0';
            document.getElementById('word-count').textContent = '0';
            return;
        }

        // 3. Platform/Engine Specific Compilation
        if (state.engine === 'midjourney') {
            let parameterParts = [];

            // Aspect ratio parameter
            if (state.aspectRatio) {
                parameterParts.push(state.aspectRatio);
            }

            // Stylize parameter (append only if it differs from default 100)
            if (parseInt(state.stylize) !== 100) {
                parameterParts.push(`--s ${state.stylize}`);
            }

            // Chaos parameter (append only if greater than 0)
            if (parseInt(state.chaos) > 0) {
                parameterParts.push(`--c ${state.chaos}`);
            }

            // Weird parameter (append only if greater than 0)
            if (parseInt(state.weird) > 0) {
                parameterParts.push(`--w ${state.weird}`);
            }

            // Raw Mode style tag
            if (isRawActive) {
                parameterParts.push('--style raw');
            }

            // Native HD rendering tag
            if (isHdActive) {
                parameterParts.push('--hd');
            }

            // Version parameter (always append version tag)
            if (state.version) {
                parameterParts.push(state.version);
            }

            // Combine base prompt text and engine parameters
            if (parameterParts.length > 0) {
                promptText += (promptText ? ' ' : '') + parameterParts.join(' ');
            }
        }
        else if (state.engine === 'dalle') {
            // DALL-E 3 uses descriptive natural text instead of raw parameters
            let dalleDetails = [];

            if (state.aspectRatio === '--ar 16:9') {
                dalleDetails.push('widescreen 16:9 aspect ratio');
            } else if (state.aspectRatio === '--ar 9:16') {
                dalleDetails.push('portrait 9:16 aspect ratio');
            }

            if (state.dalleStyle === 'vivid') {
                dalleDetails.push('vivid aesthetic style');
            } else if (state.dalleStyle === 'natural') {
                dalleDetails.push('natural photography styling');
            }

            if (state.dalleQuality === 'hd') {
                dalleDetails.push('highly detailed HD quality');
            }

            if (dalleDetails.length > 0) {
                promptText += (promptText ? ', ' : '') + dalleDetails.join(', ');
            }
        }
        else if (state.engine === 'sd') {
            // Stable Diffusion formatting (clean prompt tags, dimensions set on webui)
            if (state.aspectRatio === '--ar 16:9') {
                promptText += (promptText ? ', ' : '') + 'wide aspect';
            } else if (state.aspectRatio === '--ar 9:16') {
                promptText += (promptText ? ', ' : '') + 'portrait aspect';
            }
        }

        compiledPromptText.textContent = promptText;

        // Update real-time word and character counters
        document.getElementById('char-count').textContent = promptText.length;
        const words = promptText.trim().split(/\s+/).filter(w => w.length > 0);
        document.getElementById('word-count').textContent = words.length;
    }

    // ----------------------------------------------------------------
    // Setup Event Listeners
    // ----------------------------------------------------------------

    // Base Prompt Input Listener
    basePromptInput.addEventListener('input', (e) => {
        state.basePrompt = e.target.value;
        compilePrompt();
    });

    // Single Select: Aspect Ratio Chips
    arChips.forEach(chip => {
        chip.addEventListener('click', () => {
            arChips.forEach(c => {
                c.classList.remove('active');
                c.setAttribute('aria-checked', 'false');
            });
            chip.classList.add('active');
            chip.setAttribute('aria-checked', 'true');
            state.aspectRatio = chip.getAttribute('data-value');
            compilePrompt();
        });
    });

    // Multi-Select: Helper for tag lists
    function setupMultiSelectGroup(chips, stateKey) {
        chips.forEach(chip => {
            // Set initial ARIA accessibility state
            chip.setAttribute('aria-pressed', 'false');
            
            chip.addEventListener('click', () => {
                const val = chip.getAttribute('data-value');
                chip.classList.toggle('active');
                
                const isActive = chip.classList.contains('active');
                chip.setAttribute('aria-pressed', isActive ? 'true' : 'false');
                
                if (isActive) {
                    if (!state[stateKey].includes(val)) {
                        state[stateKey].push(val);
                    }
                } else {
                    state[stateKey] = state[stateKey].filter(item => item !== val);
                }
                compilePrompt();
            });
        });
    }

    setupMultiSelectGroup(styleChips, 'styles');
    setupMultiSelectGroup(lightingChips, 'lighting');
    setupMultiSelectGroup(cameraChips, 'camera');
    setupMultiSelectGroup(colorChips, 'color');

    // Engine Tabs switcher
    const engineTabs = document.querySelectorAll('.engine-tab');
    const enginePanels = document.querySelectorAll('.engine-panel');
    const negativePromptWrapper = document.getElementById('negative-prompt-wrapper');

    engineTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const selectedEngine = tab.getAttribute('data-engine');
            state.engine = selectedEngine;

            // Update tab UI
            engineTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update panels UI
            enginePanels.forEach(panel => {
                panel.classList.remove('active-panel');
                panel.style.display = 'none';
            });
            const targetPanel = document.getElementById(`panel-${selectedEngine}`);
            if (targetPanel) {
                targetPanel.style.display = 'block';
                // Force repaint
                targetPanel.offsetHeight;
                targetPanel.classList.add('active-panel');
            }

            // Toggle Negative Prompt Box display
            if (selectedEngine === 'sd') {
                negativePromptWrapper.style.display = 'block';
            } else {
                negativePromptWrapper.style.display = 'none';
            }

            compilePrompt();
        });
    });

    // DALL-E 3 Parameters handlers
    const dalleStyleChips = document.querySelectorAll('#dalle-style-group .chip');
    const dalleQualityChips = document.querySelectorAll('#dalle-quality-group .chip');

    dalleStyleChips.forEach(chip => {
        chip.addEventListener('click', () => {
            dalleStyleChips.forEach(c => {
                c.classList.remove('active');
                c.setAttribute('aria-pressed', 'false');
            });
            chip.classList.add('active');
            chip.setAttribute('aria-pressed', 'true');
            state.dalleStyle = chip.getAttribute('data-value');
            compilePrompt();
        });
    });

    dalleQualityChips.forEach(chip => {
        chip.addEventListener('click', () => {
            dalleQualityChips.forEach(c => {
                c.classList.remove('active');
                c.setAttribute('aria-pressed', 'false');
            });
            chip.classList.add('active');
            chip.setAttribute('aria-pressed', 'true');
            state.dalleQuality = chip.getAttribute('data-value');
            compilePrompt();
        });
    });

    // Stable Diffusion Guidance (CFG) Scale slider
    const cfgSlider = document.getElementById('param-cfg');
    const cfgValDisplay = document.getElementById('cfg-val');
    if (cfgSlider) {
        cfgSlider.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value).toFixed(1);
            state.cfgScale = val;
            cfgValDisplay.textContent = val + (val == 7.0 ? " (Default)" : "");
            compilePrompt();
        });
    }

    // Stable Diffusion Negative Tag presets
    const sdNegativeChips = document.querySelectorAll('#sd-negative-presets .chip');
    const compiledNegativeText = document.getElementById('compiled-negative-prompt');

    sdNegativeChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const val = chip.getAttribute('data-value');
            chip.classList.toggle('active');
            const isActive = chip.classList.contains('active');
            chip.setAttribute('aria-pressed', isActive ? 'true' : 'false');

            if (isActive) {
                if (!state.negativeTags.includes(val)) {
                    state.negativeTags.push(val);
                }
            } else {
                state.negativeTags = state.negativeTags.filter(item => item !== val);
            }
            compileNegativePrompt();
        });
    });

    function compileNegativePrompt() {
        if (state.negativeTags.length === 0) {
            compiledNegativeText.textContent = "blurry, low quality, deformed...";
            compiledNegativeText.style.color = "var(--text-muted)";
            return;
        }
        const negStr = state.negativeTags.join(', ');
        compiledNegativeText.textContent = negStr;
        compiledNegativeText.style.color = "var(--text-main)";
    }

    // Copy Negative Prompt Action
    const btnCopyNegative = document.getElementById('btn-copy-negative');
    if (btnCopyNegative) {
        btnCopyNegative.addEventListener('click', () => {
            const negText = compiledNegativeText.textContent;
            if (negText !== "blurry, low quality, deformed...") {
                copyTextToClipboard(negText);
            } else {
                alert('Select some negative presets first!');
            }
        });
    }

    // Slider Listeners
    stylizeSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        state.stylize = val;
        stylizeValDisplay.textContent = val + (val == 100 ? " (Default)" : "");
        compilePrompt();
    });

    chaosSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        state.chaos = val;
        let suffix = " (Low)";
        if (val > 70) suffix = " (Very High)";
        else if (val > 40) suffix = " (Moderate)";
        else if (val > 0) suffix = " (Low)";
        else suffix = " (Off)";
        
        chaosValDisplay.textContent = val + suffix;
        compilePrompt();
    });

    weirdSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        state.weird = val;
        let suffix = " (Off)";
        if (val > 2000) suffix = " (Crazy)";
        else if (val > 1000) suffix = " (Strange)";
        else if (val > 0) suffix = " (Subtle)";
        
        weirdValDisplay.textContent = val + suffix;
        compilePrompt();
    });

    // Radio Listeners: Version
    versionRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.checked) {
                state.version = e.target.value;
                compilePrompt();
            }
        });
    });

    // Render Modes listeners (Raw & HD)
    const modeRawChip = document.getElementById('mode-raw');
    const modeHdChip = document.getElementById('mode-hd');
    [modeRawChip, modeHdChip].forEach(c => {
        if (c) {
            c.addEventListener('click', () => {
                c.classList.toggle('active');
                c.setAttribute('aria-pressed', c.classList.contains('active') ? 'true' : 'false');
                compilePrompt();
            });
        }
    });

    // ----------------------------------------------------------------
    // Custom Tags Creator Utility
    // ----------------------------------------------------------------
    function setupCustomChipAdder(inputId, btnId, containerId, stateKey) {
        const input = document.getElementById(inputId);
        const btn = document.getElementById(btnId);
        const container = document.querySelector(`#${containerId} .chips-container`);
        
        const addTag = () => {
            const val = input.value.trim();
            if (!val) return;
            
            // Create unique ID for custom DOM node representation
            const chipId = `custom-${stateKey}-${Date.now()}`;
            
            const newChip = document.createElement('button');
            newChip.type = 'button';
            newChip.className = 'chip active';
            newChip.id = chipId;
            newChip.setAttribute('data-type', stateKey);
            newChip.setAttribute('data-value', val);
            newChip.setAttribute('aria-pressed', 'true');
            newChip.textContent = val;
            
            container.appendChild(newChip);
            state[stateKey].push(val);
            compilePrompt();
            
            newChip.addEventListener('click', () => {
                newChip.classList.toggle('active');
                const isActive = newChip.classList.contains('active');
                newChip.setAttribute('aria-pressed', isActive ? 'true' : 'false');
                
                if (isActive) {
                    if (!state[stateKey].includes(val)) {
                        state[stateKey].push(val);
                    }
                } else {
                    state[stateKey] = state[stateKey].filter(item => item !== val);
                }
                compilePrompt();
            });
            
            input.value = '';
        };

        btn.addEventListener('click', addTag);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addTag();
            }
        });
    }

    setupCustomChipAdder('add-style-input', 'btn-add-style', 'artistic-style-group', 'styles');
    setupCustomChipAdder('add-lighting-input', 'btn-add-lighting', 'lighting-group', 'lighting');
    setupCustomChipAdder('add-camera-input', 'btn-add-camera', 'camera-lens-group', 'camera');
    setupCustomChipAdder('add-color-input', 'btn-add-color', 'color-palette-group', 'color');

    // ----------------------------------------------------------------
    // Action Buttons
    // ----------------------------------------------------------------

    // Clipboard Copy Action
    function copyTextToClipboard(text, successMsg = "Prompt copied to clipboard!") {
        navigator.clipboard.writeText(text).then(() => {
            copyTooltip.textContent = successMsg;
            copyTooltip.classList.remove('hidden');
            setTimeout(() => {
                copyTooltip.classList.add('hidden');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            // Fallback for older browsers and iOS Safari security restrictions
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.left = '-9999px'; // Move off-screen
            document.body.appendChild(textarea);
            textarea.select();
            textarea.setSelectionRange(0, 99999); // Mobile Safari safety selection range
            try {
                document.execCommand('copy');
                copyTooltip.textContent = successMsg;
                copyTooltip.classList.remove('hidden');
                setTimeout(() => {
                    copyTooltip.classList.add('hidden');
                }, 2000);
            } catch (fallbackErr) {
                alert('Could not copy text, please copy manually.');
            }
            document.body.removeChild(textarea);
        });
    }

    btnCopy.addEventListener('click', () => {
        const textToCopy = compiledPromptText.textContent;
        copyTextToClipboard(textToCopy);
    });

    if (btnShareLink) {
        btnShareLink.addEventListener('click', () => {
            const url = new URL(window.location.origin + window.location.pathname);
            
            // Set base prompt
            if (state.basePrompt.trim()) {
                url.searchParams.set('prompt', state.basePrompt.trim());
            }
            
            // Set engine
            if (state.engine) {
                url.searchParams.set('engine', state.engine);
            }
            
            // Set aspect ratio
            if (state.aspectRatio) {
                url.searchParams.set('ar', state.aspectRatio);
            }
            
            // Set styles (standard IDs vs custom values)
            const activeStyleIds = [];
            const activeCustomStyles = [];
            document.querySelectorAll('#artistic-style-group .chip').forEach(chip => {
                if (chip.classList.contains('active')) {
                    if (chip.id && !chip.id.startsWith('custom-')) {
                        activeStyleIds.push(chip.id);
                    } else {
                        const val = chip.getAttribute('data-value');
                        if (val) activeCustomStyles.push(val);
                    }
                }
            });
            if (activeStyleIds.length > 0) {
                url.searchParams.set('styles', activeStyleIds.join(','));
            }
            if (activeCustomStyles.length > 0) {
                url.searchParams.set('cust_styles', activeCustomStyles.join('|'));
            }

            // Set lighting
            const activeLightIds = [];
            const activeCustomLighting = [];
            document.querySelectorAll('#lighting-group .chip').forEach(chip => {
                if (chip.classList.contains('active')) {
                    if (chip.id && !chip.id.startsWith('custom-')) {
                        activeLightIds.push(chip.id);
                    } else {
                        const val = chip.getAttribute('data-value');
                        if (val) activeCustomLighting.push(val);
                    }
                }
            });
            if (activeLightIds.length > 0) {
                url.searchParams.set('lighting', activeLightIds.join(','));
            }
            if (activeCustomLighting.length > 0) {
                url.searchParams.set('cust_lighting', activeCustomLighting.join('|'));
            }

            // Set camera
            const activeCamIds = [];
            const activeCustomCamera = [];
            document.querySelectorAll('#camera-lens-group .chip').forEach(chip => {
                if (chip.classList.contains('active')) {
                    if (chip.id && !chip.id.startsWith('custom-')) {
                        activeCamIds.push(chip.id);
                    } else {
                        const val = chip.getAttribute('data-value');
                        if (val) activeCustomCamera.push(val);
                    }
                }
            });
            if (activeCamIds.length > 0) {
                url.searchParams.set('camera', activeCamIds.join(','));
            }
            if (activeCustomCamera.length > 0) {
                url.searchParams.set('cust_camera', activeCustomCamera.join('|'));
            }

            // Set color
            const activeColorIds = [];
            const activeCustomColor = [];
            document.querySelectorAll('#color-palette-group .chip').forEach(chip => {
                if (chip.classList.contains('active')) {
                    if (chip.id && !chip.id.startsWith('custom-')) {
                        activeColorIds.push(chip.id);
                    } else {
                        const val = chip.getAttribute('data-value');
                        if (val) activeCustomColor.push(val);
                    }
                }
            });
            if (activeColorIds.length > 0) {
                url.searchParams.set('color', activeColorIds.join(','));
            }
            if (activeCustomColor.length > 0) {
                url.searchParams.set('cust_color', activeCustomColor.join('|'));
            }

            // Midjourney parameters
            if (state.engine === 'midjourney') {
                if (parseInt(state.stylize) !== 100) {
                    url.searchParams.set('s', state.stylize);
                }
                if (parseInt(state.chaos) > 0) {
                    url.searchParams.set('c', state.chaos);
                }
                if (parseInt(state.weird) > 0) {
                    url.searchParams.set('w', state.weird);
                }
                const btnRaw = document.getElementById('mode-raw');
                const btnHd = document.getElementById('mode-hd');
                if (btnRaw && btnRaw.classList.contains('active')) {
                    url.searchParams.set('raw', '1');
                }
                if (btnHd && btnHd.classList.contains('active')) {
                    url.searchParams.set('hd', '1');
                }
                if (state.version) {
                    url.searchParams.set('v', state.version);
                }
            } else if (state.engine === 'dalle') {
                if (state.dalleStyle) {
                    url.searchParams.set('ds', state.dalleStyle);
                }
                if (state.dalleQuality) {
                    url.searchParams.set('dq', state.dalleQuality);
                }
            } else if (state.engine === 'sd') {
                if (state.cfgScale && parseFloat(state.cfgScale) !== 7.0) {
                    url.searchParams.set('cfg', state.cfgScale);
                }
                // Save SD active negative tags
                const activeNegValues = [];
                document.querySelectorAll('#sd-negative-presets .chip').forEach(chip => {
                    if (chip.classList.contains('active')) {
                        const val = chip.getAttribute('data-value');
                        if (val) activeNegValues.push(val);
                    }
                });
                if (activeNegValues.length > 0) {
                    url.searchParams.set('neg', activeNegValues.join(','));
                }
            }

            copyTextToClipboard(url.toString(), "Share link copied to clipboard!");
        });
    }

    // Gallery Copy Actions (Static version removed, handled dynamically by gallery logic below)

    // ----------------------------------------------------------------
    // LocalStorage Saved Prompts Management
    // ----------------------------------------------------------------
    function loadSavedPrompts() {
        const savedListContainer = document.getElementById('saved-prompts-list');
        const saved = JSON.parse(localStorage.getItem('ai_architect_saved') || '[]');
        
        if (saved.length === 0) {
            savedListContainer.innerHTML = '<p class="empty-list-msg">No prompts saved yet. Create a prompt and click "Save" to build your library.</p>';
            return;
        }
        
        savedListContainer.innerHTML = '';
        saved.forEach((prompt, index) => {
            const item = document.createElement('div');
            item.className = 'saved-prompt-item';
            
            const textSpan = document.createElement('span');
            textSpan.className = 'saved-prompt-text';
            textSpan.textContent = prompt;
            item.appendChild(textSpan);
            
            const actions = document.createElement('div');
            actions.className = 'saved-item-actions';
            
            // Copy Option
            const copyBtn = document.createElement('button');
            copyBtn.type = 'button';
            copyBtn.className = 'btn-saved-action action-copy';
            copyBtn.setAttribute('aria-label', 'Copy saved prompt');
            copyBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
            `;
            copyBtn.addEventListener('click', () => {
                copyTextToClipboard(prompt);
                
                // Copy success badge inside drawer
                copyBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                `;
                setTimeout(() => {
                    copyBtn.innerHTML = `
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                        </svg>
                    `;
                }, 1500);
            });
            actions.appendChild(copyBtn);
            
            // Delete Option
            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'button';
            deleteBtn.className = 'btn-saved-action action-delete';
            deleteBtn.setAttribute('aria-label', 'Delete saved prompt');
            deleteBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    <line x1="10" y1="11" x2="10" y2="17"/>
                    <line x1="14" y1="11" x2="14" y2="17"/>
                </svg>
            `;
            deleteBtn.addEventListener('click', () => {
                deletePrompt(index);
            });
            actions.appendChild(deleteBtn);
            
            item.appendChild(actions);
            savedListContainer.appendChild(item);
        });
    }

    function savePrompt(prompt) {
        const trimmed = prompt.trim();
        if (!trimmed) return;
        
        const saved = JSON.parse(localStorage.getItem('ai_architect_saved') || '[]');
        
        if (saved.includes(trimmed)) {
            // Already Saved banner feedback
            const originalText = copyTooltip.textContent;
            copyTooltip.textContent = 'Prompt is already saved in your library!';
            copyTooltip.style.backgroundColor = 'var(--primary)';
            copyTooltip.classList.remove('hidden');
            setTimeout(() => {
                copyTooltip.classList.add('hidden');
                setTimeout(() => {
                    copyTooltip.textContent = originalText;
                    copyTooltip.style.backgroundColor = 'var(--success)';
                }, 300);
            }, 2000);
            return;
        }
        
        saved.unshift(trimmed);
        localStorage.setItem('ai_architect_saved', JSON.stringify(saved));
        loadSavedPrompts();
        
        // Success save banner feedback
        const originalText = copyTooltip.textContent;
        copyTooltip.textContent = 'Prompt successfully saved!';
        copyTooltip.style.backgroundColor = 'var(--success)';
        copyTooltip.classList.remove('hidden');
        setTimeout(() => {
            copyTooltip.classList.add('hidden');
            setTimeout(() => {
                copyTooltip.textContent = originalText;
            }, 300);
        }, 2000);
    }

    function deletePrompt(index) {
        const saved = JSON.parse(localStorage.getItem('ai_architect_saved') || '[]');
        saved.splice(index, 1);
        localStorage.setItem('ai_architect_saved', JSON.stringify(saved));
        loadSavedPrompts();
    }

    btnSave.addEventListener('click', () => {
        const activePrompt = compiledPromptText.textContent;
        savePrompt(activePrompt);
    });

    // ----------------------------------------------------------------
    // Social Sharing Integrations
    // ----------------------------------------------------------------
    document.getElementById('share-twitter').addEventListener('click', () => {
        const prompt = compiledPromptText.textContent;
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent('Created a prompt with the Visual AI Prompt Architect: \n\n"' + prompt + '"')}`;
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
    });

    document.getElementById('share-reddit').addEventListener('click', () => {
        const prompt = compiledPromptText.textContent;
        const shareUrl = `https://www.reddit.com/submit?title=${encodeURIComponent('Curated a prompt with the Visual AI Prompt Architect')}&text=${encodeURIComponent(prompt)}`;
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
    });

    // ----------------------------------------------------------------
    // Dashboard Reset & Randomization
    // ----------------------------------------------------------------

    // Clear All Action
    btnClear.addEventListener('click', () => {
        // Reset state object
        state = {
            basePrompt: '',
            aspectRatio: '',
            styles: [],
            lighting: [],
            camera: [],
            color: [],
            stylize: 100,
            chaos: 0,
            weird: 0,
            version: '--v 8.1',
            engine: 'midjourney',
            dalleStyle: 'vivid',
            dalleQuality: 'hd',
            cfgScale: 7.0,
            negativeTags: []
        };

        // Reset Textarea
        basePromptInput.value = '';

        // Reset Chips
        arChips.forEach(c => {
            c.classList.remove('active');
            c.setAttribute('aria-checked', 'false');
        });
        document.getElementById('ar-default').classList.add('active');
        document.getElementById('ar-default').setAttribute('aria-checked', 'true');

        const allMultiChips = [...styleChips, ...lightingChips, ...cameraChips, ...colorChips];
        allMultiChips.forEach(c => {
            c.classList.remove('active');
            c.setAttribute('aria-pressed', 'false');
        });

        // Reset Render Mode chips
        const renderModeChips = [document.getElementById('mode-raw'), document.getElementById('mode-hd')];
        renderModeChips.forEach(c => {
            if (c) {
                c.classList.remove('active');
                c.setAttribute('aria-pressed', 'false');
            }
        });

        // Remove custom chips from DOM
        const customChips = document.querySelectorAll('.chip[id^="custom-"]');
        customChips.forEach(c => c.remove());

        // Reset Sliders
        stylizeSlider.value = 100;
        stylizeValDisplay.textContent = '100 (Default)';
        
        chaosSlider.value = 0;
        chaosValDisplay.textContent = '0 (Off)';
        
        weirdSlider.value = 0;
        weirdValDisplay.textContent = '0 (Off)';

        // Reset Version Radio
        document.getElementById('ver-8-1').checked = true;

        // Reset Engine switch UI
        engineTabs.forEach(t => t.classList.remove('active'));
        document.querySelector('.engine-tab[data-engine="midjourney"]').classList.add('active');
        enginePanels.forEach(panel => {
            panel.classList.remove('active-panel');
            panel.style.display = 'none';
        });
        document.getElementById('panel-midjourney').style.display = 'block';
        document.getElementById('panel-midjourney').classList.add('active-panel');
        negativePromptWrapper.style.display = 'none';

        // Reset DALL-E and SD specific UI states
        dalleStyleChips.forEach(c => {
            c.classList.remove('active');
            c.setAttribute('aria-pressed', 'false');
        });
        document.querySelector('[data-type="dalle-style"][data-value="vivid"]').classList.add('active');
        document.querySelector('[data-type="dalle-style"][data-value="vivid"]').setAttribute('aria-pressed', 'true');

        dalleQualityChips.forEach(c => {
            c.classList.remove('active');
            c.setAttribute('aria-pressed', 'false');
        });
        document.querySelector('[data-type="dalle-quality"][data-value="hd"]').classList.add('active');
        document.querySelector('[data-type="dalle-quality"][data-value="hd"]').setAttribute('aria-pressed', 'true');

        if (cfgSlider) {
            cfgSlider.value = 7.0;
            cfgValDisplay.textContent = '7.0 (Default)';
        }

        sdNegativeChips.forEach(c => {
            c.classList.remove('active');
            c.setAttribute('aria-pressed', 'false');
        });
        compileNegativePrompt();

        compilePrompt();
    });

    // Surprise Me (Randomizer) Action
    const randomSubjects = [
        "A mystical cat wizard casting a cosmic fire spell in a library of giant spellbooks",
        "An ancient steampunk airship navigating between floating glowing crystal mountains",
        "A futuristic glass greenhouse filled with bioluminescent alien flowers on Mars",
        "A hidden sanctuary stone temple nested behind a giant waterfall in a tropical jungle",
        "A mechanical clockwork owl with intricate gold gears perched on a cosmic branch",
        "A cyberpunk street food vendor serving glowing noodles in a rainy futuristic Tokyo alley",
        "A majestic mythological deer with crystal antlers walking across a lake of starlight reflection",
        "A cozy explorer cabin inside a hollow ancient redwood tree, warm light spilling from windows",
        "An underwater coral city built by futuristic deep-sea explorers, glowing submarines passing by"
    ];

    btnRandomize.addEventListener('click', () => {
        // 1. Pick a random subject
        const randomSubject = randomSubjects[Math.floor(Math.random() * randomSubjects.length)];
        state.basePrompt = randomSubject;
        basePromptInput.value = randomSubject;

        // Clear existing multi-select arrays
        state.styles = [];
        state.lighting = [];
        state.camera = [];
        state.color = [];

        // Deactivate all chips first and reset ARIA tags
        const allMultiChips = [...styleChips, ...lightingChips, ...cameraChips, ...colorChips];
        allMultiChips.forEach(c => {
            c.classList.remove('active');
            c.setAttribute('aria-pressed', 'false');
        });

        // Remove custom chips from DOM during randomization
        const customChips = document.querySelectorAll('.chip[id^="custom-"]');
        customChips.forEach(c => c.remove());

        // Reset parameters and version to default in state and UI
        state.stylize = 100;
        state.chaos = 0;
        state.weird = 0;
        state.version = '--v 8.1';
        state.negativeTags = [];

        stylizeSlider.value = 100;
        stylizeValDisplay.textContent = '100 (Default)';
        chaosSlider.value = 0;
        chaosValDisplay.textContent = '0 (Off)';
        weirdSlider.value = 0;
        weirdValDisplay.textContent = '0 (Off)';
        document.getElementById('ver-8-1').checked = true;

        // Reset DALL-E and SD UI element selections
        if (cfgSlider) {
            cfgSlider.value = 7.0;
            cfgValDisplay.textContent = '7.0 (Default)';
        }

        sdNegativeChips.forEach(c => {
            c.classList.remove('active');
            c.setAttribute('aria-pressed', 'false');
        });
        compileNegativePrompt();

        // Reset Render Mode chips
        const renderModeChips = [document.getElementById('mode-raw'), document.getElementById('mode-hd')];
        renderModeChips.forEach(c => {
            if (c) {
                c.classList.remove('active');
                c.setAttribute('aria-pressed', 'false');
            }
        });

        // Helper to select random chip from group without picking duplicates
        function selectRandomChip(chips, stateKey) {
            const inactiveChips = Array.from(chips).filter(c => !c.classList.contains('active'));
            if (inactiveChips.length === 0) return;
            const randomIndex = Math.floor(Math.random() * inactiveChips.length);
            const chosenChip = inactiveChips[randomIndex];
            chosenChip.classList.add('active');
            chosenChip.setAttribute('aria-pressed', 'true');
            state[stateKey].push(chosenChip.getAttribute('data-value'));
        }

        // Randomly decide to add 1-2 styles, 1 lighting, 1 camera/lens, and 0-1 color
        selectRandomChip(styleChips, 'styles');
        if (Math.random() > 0.6) selectRandomChip(styleChips, 'styles'); // Layer a second style occasionally
        
        selectRandomChip(lightingChips, 'lighting');
        selectRandomChip(cameraChips, 'camera');
        
        if (Math.random() > 0.4) {
            selectRandomChip(colorChips, 'color');
        }

        // Set aspect ratio randomly
        arChips.forEach(c => {
            c.classList.remove('active');
            c.setAttribute('aria-checked', 'false');
        });
        const randomArIndex = Math.floor(Math.random() * arChips.length);
        const chosenAr = arChips[randomArIndex];
        chosenAr.classList.add('active');
        chosenAr.setAttribute('aria-checked', 'true');
        state.aspectRatio = chosenAr.getAttribute('data-value');

        // Compile prompt
        compilePrompt();

        // Visual scroll to compiled prompt area on mobile so users see what happened
        if (window.innerWidth < 1024) {
            document.getElementById('compiled-prompt-box').scrollIntoView({ behavior: 'smooth' });
        }
    });

    function addCustomChipProgrammatically(containerId, stateKey, value) {
        const container = document.querySelector(`#${containerId} .chips-container`);
        if (!container) return;

        // Check if a chip with this value already exists
        const existing = container.querySelector(`[data-value="${value}"]`);
        if (existing) {
            existing.classList.add('active');
            existing.setAttribute('aria-pressed', 'true');
            if (!state[stateKey].includes(value)) {
                state[stateKey].push(value);
            }
            return;
        }

        const chipId = `custom-${stateKey}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        
        const newChip = document.createElement('button');
        newChip.type = 'button';
        newChip.className = 'chip active';
        newChip.id = chipId;
        newChip.setAttribute('data-type', stateKey);
        newChip.setAttribute('data-value', value);
        newChip.setAttribute('aria-pressed', 'true');
        newChip.textContent = value;
        
        container.appendChild(newChip);
        if (!state[stateKey].includes(value)) {
            state[stateKey].push(value);
        }
        
        newChip.addEventListener('click', () => {
            newChip.classList.toggle('active');
            const isActive = newChip.classList.contains('active');
            newChip.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            
            if (isActive) {
                if (!state[stateKey].includes(value)) {
                    state[stateKey].push(value);
                }
            } else {
                state[stateKey] = state[stateKey].filter(item => item !== value);
            }
            compilePrompt();
        });
    }

    function loadFromUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        if (!urlParams.has('prompt') && window.location.search.length <= 1) {
            return; // No parameters to load
        }

        const hasDetailedParams = urlParams.has('engine') || urlParams.has('styles') || urlParams.has('lighting') || urlParams.has('camera') || urlParams.has('color') || urlParams.has('ar');

        if (hasDetailedParams) {
            // Detailed loading mode (reconstructs state exactly from searchParams)
            const promptVal = urlParams.get('prompt') || '';
            state.basePrompt = promptVal;
            basePromptInput.value = promptVal;

            const engineVal = urlParams.get('engine');
            if (engineVal && ['midjourney', 'dalle', 'sd'].includes(engineVal)) {
                state.engine = engineVal;
                // Update UI engine tab
                engineTabs.forEach(t => {
                    if (t.getAttribute('data-engine') === engineVal) {
                        t.classList.add('active');
                    } else {
                        t.classList.remove('active');
                    }
                });
                // Update panels
                enginePanels.forEach(panel => {
                    panel.classList.remove('active-panel');
                    panel.style.display = 'none';
                });
                const targetPanel = document.getElementById(`panel-${engineVal}`);
                if (targetPanel) {
                    targetPanel.style.display = 'block';
                    targetPanel.classList.add('active-panel');
                }
                // Toggle Negative Prompt Box display
                if (engineVal === 'sd') {
                    negativePromptWrapper.style.display = 'block';
                } else {
                    negativePromptWrapper.style.display = 'none';
                }
            }

            const arVal = urlParams.get('ar');
            if (arVal) {
                state.aspectRatio = arVal;
                arChips.forEach(chip => {
                    if (chip.getAttribute('data-value') === arVal) {
                        chip.classList.add('active');
                        chip.setAttribute('aria-checked', 'true');
                    } else {
                        chip.classList.remove('active');
                        chip.setAttribute('aria-checked', 'false');
                    }
                });
            }

            // Clear defaults in state first
            state.styles = [];
            state.lighting = [];
            state.camera = [];
            state.color = [];

            // Deactivate all standard chips first to start with a clean state
            document.querySelectorAll('#artistic-style-group .chip, #lighting-group .chip, #camera-lens-group .chip, #color-palette-group .chip').forEach(c => {
                c.classList.remove('active');
                c.setAttribute('aria-pressed', 'false');
            });

            // Activate standard chips by ID
            const activateChipsById = (paramName, stateKey) => {
                const ids = urlParams.get(paramName);
                if (ids) {
                    ids.split(',').forEach(id => {
                        const chip = document.getElementById(id.trim());
                        if (chip) {
                            chip.classList.add('active');
                            chip.setAttribute('aria-pressed', 'true');
                            const val = chip.getAttribute('data-value');
                            if (val && !state[stateKey].includes(val)) {
                                state[stateKey].push(val);
                            }
                        }
                    });
                }
            };

            activateChipsById('styles', 'styles');
            activateChipsById('lighting', 'lighting');
            activateChipsById('camera', 'camera');
            activateChipsById('color', 'color');

            // Restore custom chips by value
            const restoreCustomChips = (paramName, containerId, stateKey) => {
                const custVals = urlParams.get(paramName);
                if (custVals) {
                    custVals.split('|').forEach(val => {
                        if (val.trim()) {
                            addCustomChipProgrammatically(containerId, stateKey, val.trim());
                        }
                    });
                }
            };

            restoreCustomChips('cust_styles', 'artistic-style-group', 'styles');
            restoreCustomChips('cust_lighting', 'lighting-group', 'lighting');
            restoreCustomChips('cust_camera', 'camera-lens-group', 'camera');
            restoreCustomChips('cust_color', 'color-palette-group', 'color');

            // Restore engine specific sliders and states
            if (state.engine === 'midjourney') {
                const sVal = urlParams.get('s');
                if (sVal !== null) {
                    state.stylize = parseInt(sVal);
                    if (stylizeSlider) {
                        stylizeSlider.value = state.stylize;
                        stylizeValDisplay.textContent = state.stylize + (state.stylize == 100 ? " (Default)" : "");
                    }
                }
                const cVal = urlParams.get('c');
                if (cVal !== null) {
                    state.chaos = parseInt(cVal);
                    if (chaosSlider) {
                        chaosSlider.value = state.chaos;
                        chaosValDisplay.textContent = state.chaos + (state.chaos == 0 ? " (Default)" : "");
                    }
                }
                const wVal = urlParams.get('w');
                if (wVal !== null) {
                    state.weird = parseInt(wVal);
                    if (weirdSlider) {
                        weirdSlider.value = state.weird;
                        weirdValDisplay.textContent = state.weird + (state.weird == 0 ? " (Default)" : "");
                    }
                }
                const rawVal = urlParams.get('raw');
                const btnRaw = document.getElementById('mode-raw');
                if (rawVal === '1' && btnRaw) {
                    btnRaw.classList.add('active');
                    btnRaw.setAttribute('aria-pressed', 'true');
                } else if (btnRaw) {
                    btnRaw.classList.remove('active');
                    btnRaw.setAttribute('aria-pressed', 'false');
                }
                const hdVal = urlParams.get('hd');
                const btnHd = document.getElementById('mode-hd');
                if (hdVal === '1' && btnHd) {
                    btnHd.classList.add('active');
                    btnHd.setAttribute('aria-pressed', 'true');
                } else if (btnHd) {
                    btnHd.classList.remove('active');
                    btnHd.setAttribute('aria-pressed', 'false');
                }
                const vVal = urlParams.get('v');
                if (vVal) {
                    state.version = vVal;
                    versionRadios.forEach(radio => {
                        if (radio.value === vVal) {
                            radio.checked = true;
                        }
                    });
                }
            } else if (state.engine === 'dalle') {
                const dsVal = urlParams.get('ds');
                if (dsVal) {
                    state.dalleStyle = dsVal;
                    dalleStyleChips.forEach(c => {
                        if (c.getAttribute('data-value') === dsVal) {
                            c.classList.add('active');
                            c.setAttribute('aria-pressed', 'true');
                        } else {
                            c.classList.remove('active');
                            c.setAttribute('aria-pressed', 'false');
                        }
                    });
                }
                const dqVal = urlParams.get('dq');
                if (dqVal) {
                    state.dalleQuality = dqVal;
                    dalleQualityChips.forEach(c => {
                        if (c.getAttribute('data-value') === dqVal) {
                            c.classList.add('active');
                            c.setAttribute('aria-pressed', 'true');
                        } else {
                            c.classList.remove('active');
                            c.setAttribute('aria-pressed', 'false');
                        }
                    });
                }
            } else if (state.engine === 'sd') {
                const cfgVal = urlParams.get('cfg');
                if (cfgVal !== null) {
                    state.cfgScale = parseFloat(cfgVal);
                    if (cfgSlider) {
                        cfgSlider.value = state.cfgScale;
                        cfgValDisplay.textContent = state.cfgScale + (state.cfgScale == 7.0 ? " (Default)" : "");
                    }
                }
                const negVal = urlParams.get('neg');
                if (negVal) {
                    state.negativeTags = [];
                    // Deactivate all SD negative preset chips first
                    document.querySelectorAll('#sd-negative-presets .chip').forEach(c => c.classList.remove('active'));
                    negVal.split(',').forEach(v => {
                        const val = v.trim();
                        const chip = document.querySelector(`#sd-negative-presets .chip[data-value="${val}"]`);
                        if (chip) {
                            chip.classList.add('active');
                            state.negativeTags.push(val);
                        }
                    });
                    if (compiledNegativeText) {
                        compiledNegativeText.textContent = state.negativeTags.join(', ') || 'blurry, low quality, deformed...';
                    }
                }
            }
        } else {
            // Smart Parsing Mode (handles simple query strings e.g. prompt=A+futuristic+cyberpunk+cat+--ar+16:9)
            let promptText = urlParams.get('prompt') || '';
            
            // 1. Detect aspect ratios (Midjourney flags)
            const arMatches = promptText.match(/--ar\s+(\d+:\d+)/i);
            if (arMatches) {
                const arString = `--ar ${arMatches[1]}`;
                state.aspectRatio = arString;
                arChips.forEach(chip => {
                    if (chip.getAttribute('data-value') === arString) {
                        chip.classList.add('active');
                        chip.setAttribute('aria-checked', 'true');
                    } else {
                        chip.classList.remove('active');
                        chip.setAttribute('aria-checked', 'false');
                    }
                });
                promptText = promptText.replace(/--ar\s+\d+:\d+/gi, '');
                state.engine = 'midjourney';
            } else {
                // Check if DALL-E or SD aspect ratio keywords are in the prompt
                if (promptText.toLowerCase().includes('widescreen 16:9 aspect ratio') || promptText.toLowerCase().includes('wide aspect')) {
                    state.aspectRatio = '--ar 16:9';
                    const targetChip = document.getElementById('ar-16-9');
                    if (targetChip) {
                        arChips.forEach(c => c.classList.remove('active'));
                        targetChip.classList.add('active');
                        targetChip.setAttribute('aria-checked', 'true');
                    }
                } else if (promptText.toLowerCase().includes('portrait 9:16 aspect ratio') || promptText.toLowerCase().includes('portrait aspect')) {
                    state.aspectRatio = '--ar 9:16';
                    const targetChip = document.getElementById('ar-9-16');
                    if (targetChip) {
                        arChips.forEach(c => c.classList.remove('active'));
                        targetChip.classList.add('active');
                        targetChip.setAttribute('aria-checked', 'true');
                    }
                }
            }

            // 2. Detect Midjourney Version
            const versionMatch = promptText.match(/--v\s+([0-9.]+)/i);
            if (versionMatch) {
                const vString = `--v ${versionMatch[1]}`;
                state.version = vString;
                versionRadios.forEach(radio => {
                    if (radio.value === vString) {
                        radio.checked = true;
                    }
                });
                promptText = promptText.replace(/--v\s+[0-9.]+/gi, '');
                state.engine = 'midjourney';
            }

            // 3. Detect Style Raw & HD
            if (promptText.toLowerCase().includes('--style raw')) {
                const btnRaw = document.getElementById('mode-raw');
                if (btnRaw) {
                    btnRaw.classList.add('active');
                    btnRaw.setAttribute('aria-pressed', 'true');
                }
                promptText = promptText.replace(/--style raw/gi, '');
                state.engine = 'midjourney';
            }
            if (promptText.toLowerCase().includes('--hd')) {
                const btnHd = document.getElementById('mode-hd');
                if (btnHd) {
                    btnHd.classList.add('active');
                    btnHd.setAttribute('aria-pressed', 'true');
                }
                promptText = promptText.replace(/--hd/gi, '');
                state.engine = 'midjourney';
            }

            // 4. Detect Midjourney Sliders
            const sMatch = promptText.match(/--s\s+(\d+)/i);
            if (sMatch) {
                state.stylize = parseInt(sMatch[1]);
                if (stylizeSlider) {
                    stylizeSlider.value = state.stylize;
                    stylizeValDisplay.textContent = state.stylize + (state.stylize == 100 ? " (Default)" : "");
                }
                promptText = promptText.replace(/--s\s+\d+/gi, '');
            }
            const cMatch = promptText.match(/--c\s+(\d+)/i);
            if (cMatch) {
                state.chaos = parseInt(cMatch[1]);
                if (chaosSlider) {
                    chaosSlider.value = state.chaos;
                    chaosValDisplay.textContent = state.chaos + (state.chaos == 0 ? " (Default)" : "");
                }
                promptText = promptText.replace(/--c\s+\d+/gi, '');
            }
            const wMatch = promptText.match(/--w\s+(\d+)/i);
            if (wMatch) {
                state.weird = parseInt(wMatch[1]);
                if (weirdSlider) {
                    weirdSlider.value = state.weird;
                    weirdValDisplay.textContent = state.weird + (state.weird == 0 ? " (Default)" : "");
                }
                promptText = promptText.replace(/--w\s+\d+/gi, '');
            }

            // 5. Scan and activate standard visual chips by data-value
            state.styles = [];
            state.lighting = [];
            state.camera = [];
            state.color = [];

            // Deactivate all standard chips first to start with a clean state
            document.querySelectorAll('#artistic-style-group .chip, #lighting-group .chip, #camera-lens-group .chip, #color-palette-group .chip').forEach(c => {
                c.classList.remove('active');
                c.setAttribute('aria-pressed', 'false');
            });

            const scanGroupChips = (chips, stateKey) => {
                chips.forEach(chip => {
                    const val = chip.getAttribute('data-value');
                    if (val && promptText.toLowerCase().includes(val.toLowerCase())) {
                        chip.classList.add('active');
                        chip.setAttribute('aria-pressed', 'true');
                        if (!state[stateKey].includes(val)) {
                            state[stateKey].push(val);
                        }
                        const escapedVal = val.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                        const regex = new RegExp('(,\\s*)?' + escapedVal + '(\\s*,)?', 'gi');
                        promptText = promptText.replace(regex, '');
                    }
                });
            };

            scanGroupChips(styleChips, 'styles');
            scanGroupChips(lightingChips, 'lighting');
            scanGroupChips(cameraChips, 'camera');
            scanGroupChips(colorChips, 'color');

            // 6. Clean up residual commas/spaces from prompt text
            promptText = promptText.replace(/,\s*,/g, ',').trim();
            promptText = promptText.replace(/^,\s*/, '').replace(/,\s*$/, '').trim();

            state.basePrompt = promptText;
            basePromptInput.value = promptText;

            if (state.engine !== 'midjourney') {
                if (promptText.toLowerCase().includes('vivid') || promptText.toLowerCase().includes('natural')) {
                    state.engine = 'dalle';
                }
            }

            engineTabs.forEach(t => {
                if (t.getAttribute('data-engine') === state.engine) {
                    t.classList.add('active');
                } else {
                    t.classList.remove('active');
                }
            });
            enginePanels.forEach(panel => {
                panel.classList.remove('active-panel');
                panel.style.display = 'none';
            });
            const targetPanel = document.getElementById(`panel-${state.engine}`);
            if (targetPanel) {
                targetPanel.style.display = 'block';
                targetPanel.classList.add('active-panel');
            }
            if (state.engine === 'sd') {
                negativePromptWrapper.style.display = 'block';
            } else {
                negativePromptWrapper.style.display = 'none';
            }
        }
    }

    // Automatically set the engine based on current page pathname
    function detectPageEngine() {
        const path = window.location.pathname.toLowerCase();
        let targetEngine = 'midjourney'; // default fallback

        if (path.includes('stable-diffusion')) {
            targetEngine = 'sd';
        } else if (path.includes('dalle') || path.includes('dall-e')) {
            targetEngine = 'dalle';
        } else if (path.includes('midjourney')) {
            targetEngine = 'midjourney';
        } else {
            return; // on general index.html, leave default
        }

        state.engine = targetEngine;

        // Update tab UI
        engineTabs.forEach(t => {
            if (t.getAttribute('data-engine') === targetEngine) {
                t.classList.add('active');
            } else {
                t.classList.remove('active');
            }
        });

        // Update panels UI
        enginePanels.forEach(panel => {
            panel.classList.remove('active-panel');
            panel.style.display = 'none';
        });
        const targetPanel = document.getElementById(`panel-${targetEngine}`);
        if (targetPanel) {
            targetPanel.style.display = 'block';
            targetPanel.classList.add('active-panel');
        }

        // Toggle Negative Prompt Box display
        if (targetEngine === 'sd') {
            negativePromptWrapper.style.display = 'block';
        } else {
            negativePromptWrapper.style.display = 'none';
        }
    }

    // ==========================================
    // PROMPT GALLERY INTERACTIVE LOGIC
    // ==========================================
    const galleryGrid = document.getElementById('dynamic-gallery-grid');
    const gallerySearchInput = document.getElementById('gallery-search');
    const galleryFilterChips = document.querySelectorAll('.filter-chip');
    const galleryLoadMoreBtn = document.getElementById('gallery-load-more-btn');
    const galleryPaginationRow = document.getElementById('gallery-pagination-row');

    let currentCategory = 'all';
    let searchQuery = '';
    let visibleItemsCount = 12; // Load 12 items initially

    function getFilteredPrompts() {
        if (typeof GALLERY_DATA === 'undefined') return [];
        return GALLERY_DATA.filter(item => {
            const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
            const matchesSearch = item.title.toLowerCase().includes(searchQuery) || 
                                  item.prompt.toLowerCase().includes(searchQuery);
            return matchesCategory && matchesSearch;
        });
    }

    function renderGallery() {
        if (!galleryGrid) return;
        
        const filtered = getFilteredPrompts();
        const itemsToDisplay = filtered.slice(0, visibleItemsCount);
        
        galleryGrid.innerHTML = '';
        
        if (itemsToDisplay.length === 0) {
            galleryGrid.innerHTML = `
                <div class="gallery-empty-state">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                    <p>No prompts found matching your criteria. Try adjusting your search or filters.</p>
                </div>
            `;
            if (galleryPaginationRow) galleryPaginationRow.style.display = 'none';
            return;
        }

        itemsToDisplay.forEach(item => {
            const card = document.createElement('div');
            card.className = 'gallery-item';
            
            card.innerHTML = `
                <img src="${item.image}" alt="${item.title} prompt example" loading="lazy" class="gallery-img">
                <div class="gallery-overlay">
                    <div class="gallery-item-engine">${item.engine === 'sd' ? 'Stable Diffusion' : item.engine === 'dalle' ? 'DALL-E 3' : 'Midjourney'}</div>
                    <div class="gallery-item-title">${item.title}</div>
                    <p class="gallery-prompt-text">"${item.prompt}"</p>
                    <div class="gallery-item-actions">
                        <button type="button" class="gallery-copy-btn" data-prompt="${item.prompt.replace(/"/g, '&quot;')}" aria-label="Copy prompt">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            Copy
                        </button>
                        <button type="button" class="gallery-edit-btn" data-prompt="${item.prompt.replace(/"/g, '&quot;')}" data-engine="${item.engine}" aria-label="Load in builder">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"></path></svg>
                            Edit
                        </button>
                    </div>
                </div>
            `;
            
            galleryGrid.appendChild(card);
        });

        // Toggle "Load More" button visibility
        if (galleryPaginationRow) {
            if (filtered.length > visibleItemsCount) {
                galleryPaginationRow.style.display = 'flex';
            } else {
                galleryPaginationRow.style.display = 'none';
            }
        }

        // Attach event handlers for actions inside overlay
        attachGalleryActions();
    }

    function attachGalleryActions() {
        // Copy button handlers
        const copyBtns = galleryGrid.querySelectorAll('.gallery-copy-btn');
        copyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const text = btn.getAttribute('data-prompt');
                copyTextToClipboard(text);
            });
        });

        // Edit/Load in builder handlers
        const editBtns = galleryGrid.querySelectorAll('.gallery-edit-btn');
        editBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const text = btn.getAttribute('data-prompt');
                const engine = btn.getAttribute('data-engine');
                
                // 1. Set text inside base prompt
                const basePrompt = document.getElementById('base-prompt');
                if (basePrompt) {
                    basePrompt.value = text;
                    basePrompt.dispatchEvent(new Event('input'));
                }
                
                // 2. Select appropriate engine tab if it differs from current
                if (engine) {
                    let targetEngine = engine;
                    const tabBtn = document.querySelector(`.engine-tab[data-engine="${targetEngine}"]`);
                    if (tabBtn) {
                        tabBtn.click();
                    }
                }
                
                // 3. Visual scroll up to builder workspace
                const workspace = document.querySelector('.workspace-container');
                if (workspace) {
                    workspace.scrollIntoView({ behavior: 'smooth' });
                }
                
                // 4. Trigger Toast/Notice
                showSuccessNotice('Prompt loaded into workspace!');
            });
        });
    }

    function showSuccessNotice(msg) {
        if (copyTooltip) {
            const originalText = copyTooltip.textContent;
            const originalBg = copyTooltip.style.backgroundColor;
            
            copyTooltip.textContent = msg;
            copyTooltip.style.backgroundColor = 'var(--primary)';
            copyTooltip.classList.remove('hidden');
            
            setTimeout(() => {
                copyTooltip.classList.add('hidden');
                setTimeout(() => {
                    copyTooltip.textContent = originalText;
                    copyTooltip.style.backgroundColor = originalBg;
                }, 200);
            }, 2000);
        }
    }

    // Search input handler
    if (gallerySearchInput) {
        gallerySearchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            visibleItemsCount = 12; // Reset pagination offset on new search queries
            renderGallery();
        });
    }

    // Filter chip selectors
    galleryFilterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            galleryFilterChips.forEach(c => {
                c.classList.remove('active');
                c.setAttribute('aria-selected', 'false');
            });
            chip.classList.add('active');
            chip.setAttribute('aria-selected', 'true');
            
            currentCategory = chip.getAttribute('data-category');
            visibleItemsCount = 12; // Reset pagination offset on category changes
            renderGallery();
        });
    });

    // Load more pagination button
    if (galleryLoadMoreBtn) {
        galleryLoadMoreBtn.addEventListener('click', () => {
            visibleItemsCount += 12; // load next 12 items
            renderGallery();
        });
    }

    // Initial load: fetch items from localStorage database and build prompt preview
    detectPageEngine();
    loadSavedPrompts();
    loadFromUrlParams();
    compilePrompt();
    renderGallery();
});
