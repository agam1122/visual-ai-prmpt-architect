const fs = require('fs');
const path = require('path');

// 1. Load gallery-data.js by appending Node exports dynamically
const galleryDataPath = path.join(__dirname, 'gallery-data.js');
const rawData = fs.readFileSync(galleryDataPath, 'utf8');
const tempFilePath = path.join(__dirname, 'gallery-data-temp.js');

fs.writeFileSync(tempFilePath, rawData + '\nmodule.exports = { GALLERY_DATA };');
const { GALLERY_DATA } = require(tempFilePath);
fs.unlinkSync(tempFilePath); // Clean up temp file

// 2. Setup output folder
const galleryDir = path.join(__dirname, 'gallery');
if (!fs.existsSync(galleryDir)) {
    fs.mkdirSync(galleryDir, { recursive: true });
}

// 3. Slugify Helper
function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start
        .replace(/-+$/, '');            // Trim - from end
}

// 4. Prompt Parser Helper for Rich SEO specifications
function parsePrompt(prompt, engine) {
    let text = prompt;
    const result = {
        subject: '',
        ar: 'Default (1:1)',
        version: '',
        camera: [],
        lighting: [],
        style: [],
        parameters: []
    };

    // Extract aspect ratio
    const arMatch = text.match(/--ar\s+(\d+:\d+)/i);
    if (arMatch) {
        result.ar = arMatch[1];
        text = text.replace(/--ar\s+\d+:\d+/gi, '');
    }

    // Extract version
    const vMatch = text.match(/--v\s+([0-9.]+)/i);
    if (vMatch) {
        result.version = `v${vMatch[1]}`;
        text = text.replace(/--v\s+[0-9.]+/gi, '');
    }

    // Clean up other midjourney parameters
    const paramsList = text.match(/--[a-z0-9.]+\s+[a-z0-9.]+|--[a-z0-9.]+/gi);
    if (paramsList) {
        paramsList.forEach(p => {
            result.parameters.push(p);
            text = text.replace(p, '');
        });
    }

    // Identify Camera keywords
    const cameraKeywords = ['35mm', '85mm', '24mm', 'macro', 'f/2.8', 'f/1.8', 'bokeh', 'shutter', 'depth of field', 'lens', 'drone', 'analog', 'film', 'octane render', 'blender'];
    cameraKeywords.forEach(keyword => {
        if (prompt.toLowerCase().includes(keyword)) {
            result.camera.push(keyword);
        }
    });

    // Identify Lighting keywords
    const lightingKeywords = ['cinematic', 'volumetric', 'god rays', 'neon', 'sunset', 'golden hour', 'soft', 'side lighting', 'studio lighting', 'high contrast', 'incandescent', 'warm light'];
    lightingKeywords.forEach(keyword => {
        if (prompt.toLowerCase().includes(keyword)) {
            result.lighting.push(keyword);
        }
    });

    // Identify Style keywords
    const styleKeywords = ['photorealistic', 'cyberpunk', 'anime', 'surrealism', 'fantasy', 'watercolor', 'pencil sketch', 'digital painting', 'illustration', 'sketch', 'retro', 'modern'];
    styleKeywords.forEach(keyword => {
        if (prompt.toLowerCase().includes(keyword)) {
            result.style.push(keyword);
        }
    });

    // Get base subject (take characters before the first style modifier or comma)
    const parts = text.split(',');
    result.subject = parts[0].trim();

    return result;
}

// 5. Dynamic text generator for unique SEO descriptions
function generateExplanation(item, parsed) {
    const engineName = item.engine === 'sd' ? 'Stable Diffusion' : item.engine === 'dalle' ? 'DALL-E 3' : 'Midjourney';
    const categoryName = item.category.charAt(0).toUpperCase() + item.category.slice(1);
    
    let explanation = `This page showcases the prompt configurations and parameters used to generate the **${item.title}** artwork. Created for **${engineName}**, this prompt belongs to the **${categoryName}** genre of AI-generated art.`;
    
    explanation += `<br><br>The visual structure of the prompt centers around a core subject: *"${parsed.subject}"*. `;
    
    if (parsed.style.length > 0) {
        explanation += `It layers artistic style modifiers such as **${parsed.style.join(', ')}** to guide the generator's aesthetic direction. `;
    }
    
    if (parsed.lighting.length > 0) {
        explanation += `Lighting plays a key role, utilizing **${parsed.lighting.join(', ')}** to build contrast, highlights, and shadow gradients. `;
    }
    
    if (parsed.camera.length > 0) {
        explanation += `For camera details, the prompt uses references like **${parsed.camera.join(', ')}** to instruct the AI model to mimic specific lens characteristics, focal lengths, or render environments. `;
    }
    
    if (item.engine === 'midjourney' && parsed.ar !== 'Default (1:1)') {
        explanation += `The image aspect ratio has been set to **${parsed.ar}** using the standard Midjourney flag, making it perfect for widescreen displays or specific layout integrations.`;
    } else if (item.engine === 'midjourney') {
        explanation += `The image uses the default square aspect ratio (1:1) standard in Midjourney.`;
    }
    
    return explanation;
}

// 6. Generate individual HTML files
const generatedSlugs = [];

GALLERY_DATA.forEach(item => {
    const slug = slugify(item.title);
    const filename = `${slug}.html`;
    const filepath = path.join(galleryDir, filename);
    
    const parsed = parsePrompt(item.prompt, item.engine);
    const explanation = generateExplanation(item, parsed);
    const engineNameFull = item.engine === 'sd' ? 'Stable Diffusion' : item.engine === 'dalle' ? 'DALL-E 3' : 'Midjourney';
    
    // Prefix image path with ../ since we are inside a sub-directory
    const relativeImagePath = `../${item.image}`;
    
    // Choose correct specialty redirect builder
    let redirectBuilderUrl = '';
    if (item.engine === 'midjourney') {
        redirectBuilderUrl = `../midjourney-prompt-helper.html?prompt=${encodeURIComponent(item.prompt)}`;
    } else if (item.engine === 'sd') {
        redirectBuilderUrl = `../stable-diffusion-prompt-builder.html?prompt=${encodeURIComponent(item.prompt)}`;
    } else {
        redirectBuilderUrl = `../dalle-prompt-generator.html?prompt=${encodeURIComponent(item.prompt)}`;
    }

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Pinterest Domain Verification -->
    <meta name="p:domain_verify" content="30a35da5eaadfcd34c664bdaa6cf87c5"/>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${item.title} - ${engineNameFull} Prompt Example & Settings</title>
    
    <!-- SEO Optimization Meta Tags -->
    <meta name="description" content="Get the perfect visual parameters for ${item.title}. View the copyable ${engineNameFull} prompt, style chips, camera presets, and load it instantly in our visual builder.">
    <meta name="keywords" content="${item.title.toLowerCase()} prompt, ${item.engine} prompt example, AI prompt generator, visual prompt helper, ${item.category} prompt">
    <meta name="author" content="Visual AI Prompt Architect">
    <link rel="canonical" href="https://promptarchitects.online/gallery/${filename}" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://promptarchitects.online/gallery/${filename}">
    <meta property="og:title" content="${item.title} - ${engineNameFull} Prompt Detail">
    <meta property="og:description" content="Copy and customize the visual prompt parameters for ${item.title}. Ready for ${engineNameFull}.">
    <meta property="og:image" content="https://promptarchitects.online/${item.image}">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://promptarchitects.online/gallery/${filename}">
    <meta property="twitter:title" content="${item.title} - ${engineNameFull} Prompt Detail">
    <meta property="twitter:description" content="Copy and customize the visual prompt parameters for ${item.title}. Ready for ${engineNameFull}.">
    <meta property="twitter:image" content="https://promptarchitects.online/${item.image}">

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="../favicon.svg">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Global CSS -->
    <link rel="stylesheet" href="../styles.css">

    <!-- JSON-LD WebPage & ImageObject Schema Markup -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "${item.title} - AI Prompt Detail",
      "description": "Copyable prompt text and visual parameter settings for ${item.title}.",
      "url": "https://promptarchitects.online/gallery/${filename}",
      "isPartOf": {
        "@type": "WebApplication",
        "name": "Visual AI Prompt Architect",
        "url": "https://promptarchitects.online"
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "@id": "https://promptarchitects.online/${item.image}",
        "url": "https://promptarchitects.online/${item.image}",
        "caption": "${item.title} - AI generated prompt example output"
      }
    }
    </script>
    
    <!-- Page Specific Styles override -->
    <style>
        .breadcrumbs-wrapper {
            max-width: 1280px;
            margin: 30px auto 0 auto;
            padding: 0 16px;
        }
        .breadcrumbs {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 8px;
            font-size: 13.5px;
            color: var(--text-muted);
        }
        .breadcrumbs a {
            color: var(--text-muted);
            text-decoration: none;
            transition: var(--transition-fast);
        }
        .breadcrumbs a:hover {
            color: var(--primary);
        }
        .breadcrumbs span {
            color: var(--text-dark);
            user-select: none;
        }
        .details-container {
            max-width: 1280px;
            margin: 20px auto 60px auto;
            padding: 0 16px;
            display: grid;
            grid-template-columns: 1fr 1.3fr;
            gap: 40px;
        }
        @media (max-width: 968px) {
            .details-container {
                grid-template-columns: 1fr;
                gap: 30px;
            }
        }
        .showcase-card {
            background-color: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            box-shadow: var(--glow-shadow);
            backdrop-filter: blur(16px);
        }
        .showcase-image-wrapper {
            position: relative;
            width: 100%;
            border-radius: var(--radius-md);
            overflow: hidden;
            border: 1px solid var(--border-color);
            aspect-ratio: 16/9;
            background-color: rgba(0, 0, 0, 0.2);
        }
        .showcase-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: var(--transition-normal);
        }
        .showcase-image:hover {
            transform: scale(1.02);
        }
        .specs-list {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-top: 10px;
        }
        .spec-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 10px;
            font-size: 14px;
        }
        .spec-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
        }
        .spec-label {
            color: var(--text-muted);
            font-weight: 500;
        }
        .spec-value {
            color: var(--text-main);
            font-weight: 600;
            background: rgba(255, 255, 255, 0.05);
            padding: 4px 10px;
            border-radius: var(--radius-sm);
            border: 1px solid var(--border-color);
        }
        .spec-value.engine-badge {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%);
            border-color: var(--border-active);
            color: #a5b4fc;
        }
        .prompt-details-card {
            background-color: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: 32px;
            display: flex;
            flex-direction: column;
            gap: 24px;
            box-shadow: var(--glow-shadow);
            backdrop-filter: blur(16px);
        }
        .prompt-header-row {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .prompt-title {
            font-family: 'Outfit', sans-serif;
            font-size: 32px;
            font-weight: 800;
            line-height: 1.2;
            background: var(--gradient-text);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .section-subtitle {
            font-size: 15px;
            font-weight: 600;
            color: var(--text-main);
            letter-spacing: 0.05em;
            text-transform: uppercase;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .prompt-box {
            background-color: rgba(6, 8, 20, 0.6);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-md);
            padding: 24px 20px 20px 20px;
            position: relative;
            margin-top: 8px;
        }
        .prompt-text {
            font-size: 16px;
            line-height: 1.6;
            color: var(--text-main);
            font-family: 'Inter', sans-serif;
            word-break: break-word;
            margin-right: 80px;
        }
        .copy-prompt-btn {
            position: absolute;
            top: 18px;
            right: 18px;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: var(--radius-sm);
            color: var(--text-main);
            padding: 6px 12px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: var(--transition-fast);
        }
        .copy-prompt-btn:hover {
            background: rgba(255, 255, 255, 0.18);
            border-color: rgba(255, 255, 255, 0.25);
        }
        .cta-button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 16px 24px;
            background: var(--gradient-primary);
            color: var(--text-main);
            border: none;
            border-radius: var(--radius-md);
            font-family: 'Outfit', sans-serif;
            font-size: 17px;
            font-weight: 700;
            text-decoration: none;
            transition: var(--transition-normal);
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
            text-align: center;
        }
        .cta-button:hover {
            background: var(--gradient-hover);
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
            transform: translateY(-2px);
            color: var(--text-main);
        }
        .prompt-analysis {
            background-color: rgba(255, 255, 255, 0.02);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-md);
            padding: 20px;
        }
        .prompt-explanation {
            color: var(--text-muted);
            font-size: 14.5px;
            line-height: 1.7;
        }
        .prompt-explanation strong {
            color: var(--text-main);
        }
        .specs-chips-group {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 10px;
        }
        .spec-chip {
            background-color: rgba(255, 255, 255, 0.04);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: 4px 12px;
            font-size: 12px;
            color: var(--text-muted);
        }
        .spec-chip.highlight {
            border-color: rgba(168, 85, 247, 0.3);
            color: #d8b4fe;
            background-color: rgba(168, 85, 247, 0.05);
        }
    </style>
</head>
<body>
    <!-- Header Area -->
    <header class="app-header">
        <div class="header-container">
            <div class="logo-area" onclick="window.location.href='../index.html'">
                <svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <span class="logo-text">PROMPT<span class="gradient-text">ARCHITECT</span></span>
            </div>
            <p class="tagline">Craft pixel-perfect prompts for Midjourney & Stable Diffusion visually.</p>
        </div>
    </header>

    <!-- Breadcrumbs navigation -->
    <div class="breadcrumbs-wrapper">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
            <a href="../index.html">Home</a>
            <span>/</span>
            <a href="../index.html#inspiration-gallery">Gallery</a>
            <span>/</span>
            <span style="text-transform: capitalize;">${item.category}</span>
            <span>/</span>
            <span style="color: var(--text-main); font-weight: 500;">${item.title}</span>
        </nav>
    </div>

    <!-- Main Content Workspace -->
    <main class="details-container">
        
        <!-- Left Column: Image Showcase -->
        <section class="showcase-card" aria-label="Showcase preview image and details">
            <div class="showcase-image-wrapper">
                <img src="${relativeImagePath}" alt="${item.title} visual output example" class="showcase-image">
            </div>
            
            <div class="specs-list">
                <div class="spec-item">
                    <span class="spec-label">Target Engine</span>
                    <span class="spec-value engine-badge">${engineNameFull}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Category</span>
                    <span class="spec-value" style="text-transform: capitalize;">${item.category}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Aspect Ratio</span>
                    <span class="spec-value">${parsed.ar}</span>
                </div>
                ${parsed.version ? `
                <div class="spec-item">
                    <span class="spec-label">Engine Version</span>
                    <span class="spec-value">${parsed.version}</span>
                </div>` : ''}
            </div>
        </section>

        <!-- Right Column: Prompt Details & Builder Integration -->
        <section class="prompt-details-card" aria-labelledby="prompt-details-title">
            <div class="prompt-header-row">
                <h1 class="prompt-title" id="prompt-details-title">${item.title}</h1>
            </div>
            
            <!-- Output Codeblock Box -->
            <div>
                <h2 class="section-subtitle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    Compiled Prompt Text
                </h2>
                <div class="prompt-box">
                    <p class="prompt-text" id="target-prompt-text">${item.prompt}</p>
                    <button type="button" class="copy-prompt-btn" id="btn-copy-prompt" aria-label="Copy prompt text to clipboard">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        <span id="copy-btn-label">Copy</span>
                    </button>
                </div>
            </div>

            <!-- Visual Specifications Analysis -->
            <div class="prompt-analysis">
                <h2 class="section-subtitle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    Style Characteristics
                </h2>
                <div class="prompt-explanation">
                    ${explanation}
                </div>
                
                <div class="specs-chips-group">
                    <span class="spec-chip highlight">${engineNameFull}</span>
                    <span class="spec-chip" style="text-transform: capitalize;">${item.category}</span>
                    ${parsed.style.map(s => `<span class="spec-chip" style="text-transform: capitalize;">${s}</span>`).join('')}
                    ${parsed.lighting.map(l => `<span class="spec-chip" style="text-transform: capitalize;">${l}</span>`).join('')}
                    ${parsed.camera.map(c => `<span class="spec-chip" style="text-transform: capitalize;">${c}</span>`).join('')}
                </div>
            </div>

            <!-- Main Redirect CTA Button -->
            <a href="${redirectBuilderUrl}" class="cta-button" aria-label="Load prompt configuration in visual builder">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"></path></svg>
                Open & Edit in Visual Builder
            </a>

        </section>

    </main>

    <!-- Footer Area -->
    <footer class="app-footer">
        <div class="footer-container">
            <p>&copy; 2026 Visual AI Prompt Architect. Open-source under MIT license. Optimize your creative workflow.</p>
            <div class="badges-container" style="margin: 20px 0; display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 20px;">
                <a href="https://www.producthunt.com/products/visual-ai-prompt-architect?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-visual-ai-prompt-architect" target="_blank" rel="noopener noreferrer"><img alt="Visual AI Prompt Architect - Build perfect Midjourney &amp; Stable Diffusion prompts visually | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1173593&amp;theme=light&amp;t=1781717844266"></a>
                <a href="https://dang.ai" target="_blank" rel="dofollow noopener" style="display:inline-block;text-decoration:none;"><img src="https://assets.dang.ai/badges/dang-verified-dark.png" alt="Verified on DANG!" width="150" height="54" style="display:block;width:150px;max-width:100%;height:54px;border:0;outline:none;text-decoration:none;" /></a>
            </div>
            <div class="footer-seo-navigation" style="margin: 15px 0 20px 0; display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; font-size: 13.5px; align-items: center;">
                <span style="color: var(--text-dark); font-weight: 600;">Specialty Builders:</span>
                <a href="../midjourney-prompt-helper.html" style="color: var(--text-muted); text-decoration: none; transition: var(--transition-fast);" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-muted)'">Midjourney Prompt Helper</a>
                <span style="color: var(--border-color);">•</span>
                <a href="../stable-diffusion-prompt-builder.html" style="color: var(--text-muted); text-decoration: none; transition: var(--transition-fast);" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-muted)'">Stable Diffusion Builder</a>
                <span style="color: var(--border-color);">•</span>
                <a href="../dalle-prompt-generator.html" style="color: var(--text-muted); text-decoration: none; transition: var(--transition-fast);" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-muted)'">DALL-E 3 Generator</a>
            </div>
            <div class="footer-links">
                <a href="../index.html">Back to Home</a>
                <span class="separator">|</span>
                <a href="../privacy.html">Privacy Policy</a>
                <span class="separator">|</span>
                <a href="https://docs.midjourney.com" target="_blank" rel="noopener noreferrer">Midjourney Documentation</a>
            </div>
        </div>
    </footer>

    <!-- Copy action helper script -->
    <script>
        const btnCopy = document.getElementById('btn-copy-prompt');
        const copyLabel = document.getElementById('copy-btn-label');
        const promptText = document.getElementById('target-prompt-text').textContent;

        btnCopy.addEventListener('click', () => {
            navigator.clipboard.writeText(promptText).then(() => {
                copyLabel.textContent = 'Copied!';
                btnCopy.style.backgroundColor = 'var(--success)';
                btnCopy.style.borderColor = 'rgba(16, 185, 129, 0.4)';
                
                setTimeout(() => {
                    copyLabel.textContent = 'Copy';
                    btnCopy.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    btnCopy.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    </script>
</body>
</html>`;

    fs.writeFileSync(filepath, htmlContent);
    generatedSlugs.push({ title: item.title, slug: slug, lastmod: '2026-06-22' });
    console.log(`Generated detail page for: ${item.title} -> gallery/${filename}`);
});

// 7. Dynamic sitemap.xml update
const sitemapPath = path.join(__dirname, 'sitemap.xml');
let sitemapRaw = fs.readFileSync(sitemapPath, 'utf8');

// Build sitemap tags for new gallery pages
let gallerySitemapEntries = '';
generatedSlugs.forEach(entry => {
    gallerySitemapEntries += `   <url>\n      <loc>https://promptarchitects.online/gallery/${entry.slug}.html</loc>\n      <lastmod>${entry.lastmod}</lastmod>\n      <changefreq>monthly</changefreq>\n      <priority>0.6</priority>\n   </url>\n`;
});

// We want to insert the entries before the closing </urlset> tag
const closeTagIndex = sitemapRaw.indexOf('</urlset>');
if (closeTagIndex !== -1) {
    // Clear out any previously generated gallery elements first to avoid duplication
    const insertPointMarker = 'dalle-prompt-generator.html</loc>\n      <lastmod>2026-06-20</lastmod>\n      <changefreq>weekly</changefreq>\n      <priority>0.8</priority>\n   </url>';
    const insertIndex = sitemapRaw.indexOf(insertPointMarker);
    
    if (insertIndex !== -1) {
        const headerPart = sitemapRaw.substring(0, insertIndex + insertPointMarker.length);
        const footerPart = '\n</urlset>';
        sitemapRaw = headerPart + '\n' + gallerySitemapEntries + footerPart;
        fs.writeFileSync(sitemapPath, sitemapRaw);
        console.log(`Successfully updated sitemap.xml with ${generatedSlugs.length} gallery detail URLs!`);
    } else {
        console.warn('Could not find insert point marker in sitemap.xml. Appending before urlset closing tag instead.');
        const headerPart = sitemapRaw.substring(0, closeTagIndex);
        sitemapRaw = headerPart + gallerySitemapEntries + '</urlset>';
        fs.writeFileSync(sitemapPath, sitemapRaw);
    }
} else {
    console.error('Could not find closing </urlset> tag in sitemap.xml');
}

console.log('Programmatic SEO generation completed successfully!');
