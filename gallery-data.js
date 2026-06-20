const GALLERY_DATA = [
  // PHOTOGRAPHY CATEGORY (10 items)
  {
    id: 1,
    title: "London Rain Portrait",
    prompt: "A dramatic black and white street photograph of a man walking under an umbrella in London, heavy rain, mist, headlights reflecting on wet cobblestones, shot on 35mm film, high contrast --ar 16:9 --v 6.0",
    engine: "midjourney",
    category: "photography",
    image: "images/gallery_photography.png"
  },
  {
    id: 2,
    title: "Forest Dew Macro",
    prompt: "Close-up macro shot of a single dewdrop on a vibrant green autumn leaf, morning sunlight filtering through the background forest creating beautiful circular bokeh, extremely detailed textures, f/2.8 macro lens",
    engine: "sd",
    category: "photography",
    image: "images/gallery_macro.png"
  },
  {
    id: 3,
    title: "Metallic Fashion Shot",
    prompt: "A professional editorial fashion portrait of a model wearing an avant-garde silver metallic puffer jacket, neon lighting, clean studio background, high fashion magazine style, cinematic color grading",
    engine: "dalle",
    category: "photography",
    image: "images/gallery_fashion.png"
  },
  {
    id: 4,
    title: "Tibetan Elder Portrait",
    prompt: "A soulful close-up portrait of an elderly Tibetan woman, deep expressive wrinkles, colorful traditional attire, soft side window lighting, shallow depth of field, captured on 85mm portrait lens --ar 4:3 --v 6.0",
    engine: "midjourney",
    category: "photography",
    image: "images/gallery_elder.png"
  },
  {
    id: 5,
    title: "Icelandic Waterfall",
    prompt: "Long exposure landscape photography of a massive Icelandic waterfall, dark basalt columns, volcanic black sand, emerald green moss, dramatic dark stormy clouds, shot on 24mm wide angle lens",
    engine: "sd",
    category: "photography",
    image: "images/gallery_waterfall.png"
  },
  {
    id: 6,
    title: "Golden Hour Sahara",
    prompt: "Widescreen drone shot of rolling orange sand dunes in the Sahara desert at golden hour, long shadows stretching across the ridges, highly detailed sand ripples, national geographic style",
    engine: "dalle",
    category: "photography",
    image: "images/gallery_desert.png"
  },
  {
    id: 7,
    title: "Moody Coffee Shop",
    prompt: "Cinematic shot of a cozy coffee shop interior on a rainy morning, steam rising from a ceramic mug, warm incandescent lights, window with raindrops looking out to a blurred city street --ar 16:9 --v 6.0",
    engine: "midjourney",
    category: "photography",
    image: "images/gallery_coffee.png"
  },
  {
    id: 8,
    title: "Vintage Sports Car",
    prompt: "Analog film photo of a classic red convertible sports car driving along the Amalfi Coast, sunlit coastal cliffs, blue ocean background, vintage grain, kodachrome 64 style, 1970s aesthetic",
    engine: "sd",
    category: "photography",
    image: "images/gallery_car.png"
  },
  {
    id: 9,
    title: "High-Speed Water Splash",
    prompt: "High-speed strobe photography capturing a single strawberry dropping into a glass of crystal-clear water, exploding droplets suspended in mid-air, dark clean studio backdrop, sharp macro details",
    engine: "dalle",
    category: "photography",
    image: "images/gallery_macro.png"
  },
  {
    id: 10,
    title: "Alaskan Wilderness Cabin",
    prompt: "An atmospheric log cabin in the Alaskan wilderness, surrounded by towering pine trees covered in heavy snow, under a vibrant green aurora borealis night sky, warm light glowing from the windows --ar 16:9 --v 6.0",
    engine: "midjourney",
    category: "photography",
    image: "images/showcase_architecture.webp"
  },

  // ANIME & ILLUSTRATION (10 items)
  {
    id: 11,
    title: "Rooftop Star Gazing",
    prompt: "A stunning digital anime illustration of a girl sitting on a rooftop in Tokyo, holding a glowing magical orb, soft pastel colors, cherry blossom petals flying in the wind, starry night sky with a giant crescent moon, detailed anime background, aesthetic, Makoto Shinkai style, cinematic --ar 16:9 --v 8.1",
    engine: "midjourney",
    category: "anime",
    image: "images/showcase_anime.webp"
  },
  {
    id: 12,
    title: "Mystic Library Study",
    prompt: "A beautiful aesthetic digital anime painting of a girl reading a book in a library filled with glowing magical floating particles and ancient books, warm soft light, Makoto Shinkai vibe, high detail",
    engine: "sd",
    category: "anime",
    image: "images/gallery_anime.png"
  },
  {
    id: 13,
    title: "Cyberpunk Diner Girl",
    prompt: "Anime style artwork of a young girl drinking a glowing soda inside a retro-futuristic cyberpunk neon diner, rain tapping on the window outside, highly detailed, lo-fi aesthetic",
    engine: "dalle",
    category: "anime",
    image: "images/gallery_diner.png"
  },
  {
    id: 14,
    title: "Spirited Forest Spirit",
    prompt: "Studio Ghibli style watercolor illustration of a giant friendly forest spirit standing next to a little child under a mossy oak tree, soft sunlight filtering through leaves, nostalgic hand-drawn feel --ar 4:3 --v 6.0",
    engine: "midjourney",
    category: "anime",
    image: "images/showcase_fantasy.webp"
  },
  {
    id: 15,
    title: "Retro 90s Mech Pilot",
    prompt: "Hand-drawn cel anime key visual of a cool pilot inside a giant robot cockpit, glowing consoles, detailed controls, retro 1990s aesthetic, bold lines, neon accents, dramatic shadows",
    engine: "sd",
    category: "anime",
    image: "images/gallery_mech.png"
  },
  {
    id: 16,
    title: "Floating Sky Train",
    prompt: "Vibrant fantasy anime illustration of a railway track floating above a sea of fluffy white clouds, a train traveling towards a giant sunset sun, flying manta rays, epic scale, magical realism",
    engine: "dalle",
    category: "anime",
    image: "images/gallery_fantasy.png"
  },
  {
    id: 17,
    title: "Cozy Lo-Fi Study Room",
    prompt: "Lo-fi anime style illustration of a cozy bedroom at night, a cat sleeping on the desk next to a glowing laptop, cup of tea, warm fairy lights, window showing city skyline --ar 16:9 --v 6.0",
    engine: "midjourney",
    category: "anime",
    image: "images/gallery_anime.png"
  },
  {
    id: 18,
    title: "Kyoto Autumn Temple",
    prompt: "Kyoto temple in autumn, red maple leaves framing the view, a traditional wooden bridge, quiet pond reflecting the golden pagoda, soft wind blowing, detailed anime background art",
    engine: "sd",
    category: "anime",
    image: "images/showcase_anime.webp"
  },
  {
    id: 19,
    title: "Magical Alchemist Desk",
    prompt: "An alchemist's messy desk full of bubbling colorful potions in glass vials, old open spellbooks, glowing crystal shards, scrolls, inkwells, cute magical fire sprite floating, fantasy anime style",
    engine: "dalle",
    category: "anime",
    image: "images/gallery_anime.png"
  },
  {
    id: 20,
    title: "Undersea Coral Kingdom",
    prompt: "Beautiful digital anime painting of a coral reef mermaid kingdom, bioluminescent plants, schools of glowing fish, underwater sunbeams, majestic coral architecture, mythical scale --ar 16:9 --v 6.0",
    engine: "midjourney",
    category: "anime",
    image: "images/gallery_fantasy.png"
  },

  // FANTASY & SURREALISM (10 items)
  {
    id: 21,
    title: "Floating Cascade Castle",
    prompt: "A magnificent fantasy world landscape with floating islands, waterfalls streaming down to a glowing azure lake, ancient castle perched on a peak, sunset rays, magical realism --ar 16:9 --v 6.0",
    engine: "midjourney",
    category: "fantasy",
    image: "images/gallery_fantasy.png"
  },
  {
    id: 22,
    title: "Tree of Life Portal",
    prompt: "An ancient glowing Tree of Life with roots wrapping around a glowing stone archway, acting as a portal showing another galaxy on the other side, mystical creatures, vibrant magical fantasy style",
    engine: "sd",
    category: "fantasy",
    image: "images/showcase_fantasy.webp"
  },
  {
    id: 23,
    title: "Surreal Hourglass Ocean",
    prompt: "A giant hourglass standing on a desert floor, inside the hourglass is a miniature ocean with sailing ships, surreal Salvador Dali style, melting clocks in the background, dramatic lighting",
    engine: "dalle",
    category: "fantasy",
    image: "images/gallery_fantasy.png"
  },
  {
    id: 24,
    title: "Celestial Oracle Mage",
    prompt: "A celestial oracle wizard draped in glowing starry robes, casting a spell showing a miniature galaxy spinning between his hands, mystical energy swirls, epic fantasy digital painting --ar 4:3 --v 6.0",
    engine: "midjourney",
    category: "fantasy",
    image: "images/gallery_fantasy.png"
  },
  {
    id: 25,
    title: "Lost City of Gold",
    prompt: "An explorer discovering a massive golden temple city hidden inside a colossal cavern, glowing crystals on the cavern ceiling looking like stars, subterranean river, cinematic lighting",
    engine: "sd",
    category: "fantasy",
    image: "images/showcase_fantasy.webp"
  },
  {
    id: 26,
    title: "Dragon of the Volcano",
    prompt: "A majestic ancient dragon perched on the rim of a glowing volcano, molten lava rivers flowing down, dark ash clouds, fire sparks flying, epic detailed fantasy art, dramatic volcanic light",
    engine: "dalle",
    category: "fantasy",
    image: "images/gallery_fantasy.png"
  },
  {
    id: 27,
    title: "Surreal Cloud Whale",
    prompt: "A colossal whale flying gracefully through the clouds at sunset, carrying a small town on its back, glowing lanterns hanging from its fins, fantasy illustration, dreamlike atmosphere --ar 16:9 --v 6.0",
    engine: "midjourney",
    category: "fantasy",
    image: "images/gallery_fantasy.png"
  },
  {
    id: 28,
    title: "Mystical Druid Grove",
    prompt: "A mystical druid grove surrounded by glowing mushrooms and ancient stone runes, a magical white stag glowing with soft light standing in the center, dark fantasy oil painting style",
    engine: "sd",
    category: "fantasy",
    image: "images/showcase_fantasy.webp"
  },
  {
    id: 29,
    title: "Elven Crystal Palace",
    prompt: "A majestic elven palace constructed from white marble and giant glowing crystals, waterfalls flowing into calm reflecting pools, towering forest backdrop, sunrise rays, fantasy architecture",
    engine: "dalle",
    category: "fantasy",
    image: "images/showcase_fantasy.webp"
  },
  {
    id: 30,
    title: "Desert Ruins Portal",
    prompt: "A solitary stone gateway standing in the middle of a barren desert, the gateway acts as a portal revealing a lush tropical jungle inside its frame, surrealism painting style --ar 16:9 --v 6.0",
    engine: "midjourney",
    category: "fantasy",
    image: "images/gallery_desert.png"
  },

  // CYBERPUNK & SCI-FI (10 items)
  {
    id: 31,
    title: "Neon Alley Arcade",
    prompt: "A breathtaking cyberpunk street at night, neon signs glowing in purple and turquoise, rain reflections on the asphalt, highly detailed, photorealistic, cinematic lighting --ar 16:9 --v 6.0",
    engine: "midjourney",
    category: "cyberpunk",
    image: "images/gallery_cyberpunk.png"
  },
  {
    id: 32,
    title: "Cyberpunk Blade Runner City",
    prompt: "Colossal futuristic skyscraper city in the year 2099, holographic ads floating between buildings, flying spinner cars, dark foggy atmosphere, orange and blue neon palette",
    engine: "sd",
    category: "cyberpunk",
    image: "images/showcase_cyberpunk.webp"
  },
  {
    id: 33,
    title: "Sci-Fi Space Hangar",
    prompt: "Interior view of a massive interstellar spaceship hangar, sleek high-tech starfighters parked on platforms, crew working, glowing energy columns, view of a distant planet through the window",
    engine: "dalle",
    category: "cyberpunk",
    image: "images/gallery_space.png"
  },
  {
    id: 34,
    title: "Borg-Style Cybernetic Head",
    prompt: "A high-tech cybernetic human face, intricate circuit boards and wires running under transparent skin, glowing optical sensors, dark mechanical workshop setting, macro photograph --ar 1:1 --v 6.0",
    engine: "midjourney",
    category: "cyberpunk",
    image: "images/gallery_geisha.png"
  },
  {
    id: 35,
    title: "Desert Space Colony",
    prompt: "A futuristic colony dome on Mars, red desert landscape, active terraforming machines, space rovers, dusty orange sky with two moons, retro-futuristic sci-fi illustration style",
    engine: "sd",
    category: "cyberpunk",
    image: "images/gallery_space.png"
  },
  {
    id: 36,
    title: "Neon Cybernetic Geisha",
    prompt: "A portrait of a futuristic cybernetic geisha with glowing fiber optic hair, metallic skin panels, neon makeup, traditional kimono with neon lights, dark Tokyo club background",
    engine: "dalle",
    category: "cyberpunk",
    image: "images/gallery_geisha.png"
  },
  {
    id: 37,
    title: "Deep Space Nebula Station",
    prompt: "A massive sci-fi orbital space station positioned next to a giant swirling purple and gold cosmic nebula, starfields, spaceships docking, epic cinematic lighting, highly detailed --ar 16:9 --v 6.0",
    engine: "midjourney",
    category: "cyberpunk",
    image: "images/gallery_space.png"
  },
  {
    id: 38,
    title: "Retro Steampunk Airship",
    prompt: "A large wooden steampunk airship with brass gears and copper pipes, flying through puffy clouds over a Victorian era city, sunlight gleaming off metal surfaces, cinematic retro art",
    engine: "sd",
    category: "cyberpunk",
    image: "images/gallery_space.png"
  },
  {
    id: 39,
    title: "Cyberpunk Market Stalls",
    prompt: "A crowded cyber-punk street market at night, merchants selling glowing noodle bowls, high-tech components, and synthetic pets, rain slicked streets, neon canopy lights",
    engine: "dalle",
    category: "cyberpunk",
    image: "images/gallery_cyberpunk.png"
  },
  {
    id: 40,
    title: "Abandoned Alien Mech",
    prompt: "A giant rusted military combat mech standing abandoned in a mossy swamp, vines growing over its chassis, sunset rays filtering through trees, soft misty air, hyper-detailed --ar 16:9 --v 6.0",
    engine: "midjourney",
    category: "cyberpunk",
    image: "images/gallery_mech.png"
  },

  // 3D RENDER & GAME ASSETS (10 items)
  {
    id: 41,
    title: "Futuristic Hologram Room",
    prompt: "A 3D render of a futuristic room with holographic computer screens, glowing light accents, clean octane rendering style, architectural digest, isometric view --ar 1:1 --v 6.0",
    engine: "midjourney",
    category: "render",
    image: "images/gallery_render.png"
  },
  {
    id: 42,
    title: "Cozy Autumn Glass Cabin",
    prompt: "A minimalist 3D architectural render of a cozy modern glass cabin in a forest during autumn, warm lights inside, falling yellow leaves, rainy mood, highly detailed octane render",
    engine: "sd",
    category: "render",
    image: "images/showcase_architecture.webp"
  },
  {
    id: 43,
    title: "Isometric Fantasy Island",
    prompt: "An isometric 3D render of a floating fantasy island game level, containing a tiny castle, a winding river, small green pine trees, chest of gold, clean clay render style",
    engine: "dalle",
    category: "render",
    image: "images/gallery_render.png"
  },
  {
    id: 44,
    title: "Cute Alchemist Shop Asset",
    prompt: "A cute 3D isometric game asset of a magical potion workbench, bubbling flasks, glowing crystal stand, wooden desk, clay render, stylized cartoon style, colorful --ar 1:1 --v 6.0",
    engine: "render",
    image: "images/gallery_render.png"
  },
  {
    id: 45,
    title: "Sci-Fi Weapon Asset",
    prompt: "A high-tech sci-fi plasma rifle, weapon game model, custom metallic details, glowing blue energy cells, clean white background studio render, professional asset presentation",
    engine: "sd",
    category: "render",
    image: "images/gallery_render.png"
  },
  {
    id: 46,
    title: "Miniature Bonsai Glass Orb",
    prompt: "A beautiful 3D render of a miniature magical world inside a glass terrarium sphere, containing a glowing cherry blossom tree, tiny cottage, waterfall, octane render, soft light",
    engine: "dalle",
    category: "render",
    image: "images/gallery_render.png"
  },
  {
    id: 47,
    title: "Vaporwave Tech Room",
    prompt: "A stylized 3D render of a retro vaporwave computer room, CRT monitors glowing, pastel pink and purple grid lighting, palm tree outline, low-poly aesthetics --ar 16:9 --v 6.0",
    engine: "midjourney",
    category: "render",
    image: "images/gallery_render.png"
  },
  {
    id: 48,
    title: "Futuristic Glass Car",
    prompt: "A futuristic electric supercar model made of transparent glass and chrome metal, reflecting neon club lights in a dark showroom, highly polished 3D render, raytracing",
    engine: "sd",
    category: "render",
    image: "images/gallery_car.png"
  },
  {
    id: 49,
    title: "Medieval Weapon Display",
    prompt: "A stylized 3D render of a medieval blacksmith forge, containing an anvil, a glowing hot iron sword in coals, weapon racks, low-poly game asset style, warm firelight",
    engine: "dalle",
    category: "render",
    image: "images/gallery_render.png"
  },
  {
    id: 50,
    title: "Cute Toy Robot",
    prompt: "A cute 3D render of a tiny round cleaning robot, big expressive glowing screen eyes, glossy white plastic shell, standing on a clean wooden desk, stylized cartoon render --ar 1:1 --v 6.0",
    engine: "midjourney",
    category: "render",
    image: "images/gallery_render.png"
  }
];
