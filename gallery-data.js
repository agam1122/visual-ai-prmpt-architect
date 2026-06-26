const GALLERY_DATA = [
  // PHOTOGRAPHY CATEGORY (10 items)
  {
    id: 1,
    title: "Moody Boat Portrait",
    prompt: "A cinematic black and white portrait of a man standing on a wooden boat at sea, morning mist rising from the dark water, dramatic side lighting, high contrast photography, shot on 35mm film --ar 16:9 --v 6.0",
    engine: "midjourney",
    category: "photography",
    image: "images/gallery_photography.webp"
  },
  {
    id: 2,
    title: "Forest Dew Macro",
    prompt: "Close-up macro shot of a single dewdrop on a vibrant green autumn leaf, morning sunlight filtering through the background forest creating beautiful circular bokeh, extremely detailed textures, f/2.8 macro lens",
    engine: "sd",
    category: "photography",
    image: "images/gallery_macro.webp"
  },
  {
    id: 3,
    title: "Metallic Fashion Shot",
    prompt: "A professional editorial fashion portrait of a model wearing an avant-garde silver metallic puffer jacket, neon lighting, clean studio background, high fashion magazine style, cinematic color grading",
    engine: "dalle",
    category: "photography",
    image: "images/gallery_fashion.webp"
  },
  {
    id: 4,
    title: "Tibetan Elder Portrait",
    prompt: "A soulful close-up portrait of an elderly Tibetan woman, deep expressive wrinkles, colorful traditional attire, soft side window lighting, shallow depth of field, captured on 85mm portrait lens --ar 4:3 --v 6.0",
    engine: "midjourney",
    category: "photography",
    image: "images/gallery_elder.webp"
  },
  {
    id: 5,
    title: "Icelandic Waterfall",
    prompt: "Long exposure landscape photography of a massive Icelandic waterfall, dark basalt columns, volcanic black sand, emerald green moss, dramatic dark stormy clouds, shot on 24mm wide angle lens",
    engine: "sd",
    category: "photography",
    image: "images/gallery_waterfall.webp"
  },
  {
    id: 6,
    title: "Golden Hour Sahara",
    prompt: "Widescreen drone shot of rolling orange sand dunes in the Sahara desert at golden hour, long shadows stretching across the ridges, highly detailed sand ripples, national geographic style",
    engine: "dalle",
    category: "photography",
    image: "images/gallery_desert.webp"
  },
  {
    id: 7,
    title: "Moody Coffee Shop",
    prompt: "Cinematic shot of a cozy coffee shop interior on a rainy morning, steam rising from a ceramic mug, warm incandescent lights, window with raindrops looking out to a blurred city street --ar 16:9 --v 6.0",
    engine: "midjourney",
    category: "photography",
    image: "images/gallery_coffee.webp"
  },
  {
    id: 8,
    title: "Vintage Sports Car",
    prompt: "Analog film photo of a classic red convertible sports car driving along the Amalfi Coast, sunlit coastal cliffs, blue ocean background, vintage grain, kodachrome 64 style, 1970s aesthetic",
    engine: "sd",
    category: "photography",
    image: "images/gallery_car.webp"
  },
  {
    id: 9,
    title: "Raindrop Leaf Macro",
    prompt: "A highly detailed macro photograph of a fresh green leaf covered in tiny translucent water droplets after rain, soft morning light illuminating the veins of the leaf, green natural background, gorgeous bokeh",
    engine: "dalle",
    category: "photography",
    image: "images/gallery_macro.webp"
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
    image: "images/gallery_anime.webp"
  },
  {
    id: 13,
    title: "Cyberpunk Diner Girl",
    prompt: "Anime style artwork of a young girl drinking a glowing soda inside a retro-futuristic cyberpunk neon diner, rain tapping on the window outside, highly detailed, lo-fi aesthetic",
    engine: "dalle",
    category: "anime",
    image: "images/gallery_diner.webp"
  },
  {
    id: 14,
    title: "Anime Portal Tree",
    prompt: "Beautiful digital anime watercolor painting of a giant magical tree acting as a celestial portal, glowing ancient roots, floating spores, dreamlike watercolor textures, Ghibli style, soft atmospheric light",
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
    image: "images/gallery_mech.webp"
  },
  {
    id: 16,
    title: "Floating Sky Palace",
    prompt: "Vibrant fantasy anime illustration of a majestic white palace built on a floating mountain island, water cascades streaming down into clouds, birds flying around the peaks, epic scale, magical realism",
    engine: "dalle",
    category: "anime",
    image: "images/gallery_fantasy.webp"
  },
  {
    id: 17,
    title: "Cozy Lo-Fi Library Room",
    prompt: "Lo-fi anime style illustration of a magical library room, books floating in mid-air, a sleepy cat napping on a desk next to a glowing crystal orb, warm candlelight, quiet and cozy aesthetic --ar 16:9 --v 6.0",
    engine: "midjourney",
    category: "anime",
    image: "images/gallery_anime.webp"
  },
  {
    id: 18,
    title: "Tokyo Starry Rooftop",
    prompt: "A beautiful digital anime illustration of a lone girl gazing at a giant crescent moon from a Tokyo rooftop at night, glowing starfield, aesthetic skyline, cherry blossom petals, Makoto Shinkai style",
    engine: "sd",
    category: "anime",
    image: "images/showcase_anime.webp"
  },
  {
    id: 19,
    title: "Alchemist Library Desk",
    prompt: "An alchemist's workspace desk inside a grand magical library, scrolls, open old spellbooks, glowing crystal shards, watercolor anime style, soft light filtering through high library windows",
    engine: "dalle",
    category: "anime",
    image: "images/gallery_anime.webp"
  },
  {
    id: 20,
    title: "Bioluminescent Sky Palace",
    prompt: "Beautiful digital anime painting of a floating castle island at dusk, glowing bioluminescent waterfalls, magical sky beams, majestic towers, mythical fantasy scale --ar 16:9 --v 6.0",
    engine: "midjourney",
    category: "anime",
    image: "images/gallery_fantasy.webp"
  },

  // FANTASY & SURREALISM (10 items)
  {
    id: 21,
    title: "Floating Cascade Castle",
    prompt: "A magnificent fantasy world landscape with floating islands, waterfalls streaming down to a glowing azure lake, ancient castle perched on a peak, sunset rays, magical realism --ar 16:9 --v 6.0",
    engine: "midjourney",
    category: "fantasy",
    image: "images/gallery_fantasy.webp"
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
    title: "Surreal Floating Arches",
    prompt: "A surreal landscape of floating castle towers connected by ancient stone arches, giant water streams falling upwards into a starry purple sky, dreamlike style, high detail octane render",
    engine: "dalle",
    category: "fantasy",
    image: "images/gallery_fantasy.webp"
  },
  {
    id: 24,
    title: "Celestial Floating Temple",
    prompt: "A celestial floating temple under a starry sky, glowing constellation pathways, waterfalls cascading into the dark galaxy below, epic digital painting, detailed architecture --ar 4:3 --v 6.0",
    engine: "midjourney",
    category: "fantasy",
    image: "images/gallery_fantasy.webp"
  },
  {
    id: 25,
    title: "Cosmic Root Gateway",
    prompt: "A cosmic portal framed by glowing ancient tree roots, a stone path leading into a bright galaxy visible inside the portal frame, magical fantasy concept art, high detail",
    engine: "sd",
    category: "fantasy",
    image: "images/showcase_fantasy.webp"
  },
  {
    id: 26,
    title: "Castle and White Dragon",
    prompt: "A majestic white dragon soaring around a floating island castle, waterfalls cascading down into misty clouds, epic fantasy style, dramatic golden sunset light",
    engine: "dalle",
    category: "fantasy",
    image: "images/gallery_fantasy.webp"
  },
  {
    id: 27,
    title: "Colossal Cloud Island",
    prompt: "A colossal floating island carrying a majestic white castle, waterfalls streaming down from the peaks into fluffy white clouds below, dreamlike fantasy illustration --ar 16:9 --v 6.0",
    engine: "midjourney",
    category: "fantasy",
    image: "images/gallery_fantasy.webp"
  },
  {
    id: 28,
    title: "Forest Stone Portal",
    prompt: "A glowing stone portal gate inside a mystical forest, light beams shining through ancient tree roots, floating bioluminescent spores, magical fantasy style",
    engine: "sd",
    category: "fantasy",
    image: "images/showcase_fantasy.webp"
  },
  {
    id: 29,
    title: "Galaxy Tree Gateway",
    prompt: "A giant mystical tree forming a round portal gateway, showing a vibrant spinning galaxy on the other side, magical sparkles, epic detailed fantasy digital painting",
    engine: "dalle",
    category: "fantasy",
    image: "images/showcase_fantasy.webp"
  },
  {
    id: 30,
    title: "Desert Ruins Gateway",
    prompt: "A solitary stone archway in a vast desert, golden hour light casting long shadows across the sand ripples, dreamlike surrealism style --ar 16:9 --v 6.0",
    engine: "midjourney",
    category: "fantasy",
    image: "images/gallery_desert.webp"
  },

  // CYBERPUNK & SCI-FI (10 items)
  {
    id: 31,
    title: "Neon Alley Arcade",
    prompt: "A breathtaking cyberpunk street at night, neon signs glowing in purple and turquoise, rain reflections on the asphalt, highly detailed, photorealistic, cinematic lighting --ar 16:9 --v 6.0",
    engine: "midjourney",
    category: "cyberpunk",
    image: "images/gallery_cyberpunk.webp"
  },
  {
    id: 32,
    title: "Cyberpunk Skyscraper City",
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
    image: "images/gallery_space.webp"
  },
  {
    id: 34,
    title: "Cyber Geisha Portrait",
    prompt: "A high-tech portrait of a cybernetic geisha with glowing fiber optic hair, metallic skin faceplates, optical sensors, dark mechanical cyberpunk workshop setting --ar 1:1 --v 6.0",
    engine: "midjourney",
    category: "cyberpunk",
    image: "images/gallery_geisha.webp"
  },
  {
    id: 35,
    title: "Starship Hangar Cargo",
    prompt: "A futuristic starship cargo vessel inside a massive planetary base hangar bay, industrial sci-fi style, bright floodlights, heavy machinery, orange light accents",
    engine: "sd",
    category: "cyberpunk",
    image: "images/gallery_space.webp"
  },
  {
    id: 36,
    title: "Neon Cybernetic Geisha",
    prompt: "A portrait of a futuristic cybernetic geisha with glowing fiber optic hair, metallic skin panels, neon makeup, traditional kimono with neon lights, dark Tokyo club background",
    engine: "dalle",
    category: "cyberpunk",
    image: "images/gallery_geisha.webp"
  },
  {
    id: 37,
    title: "Orbital Hangar Bay",
    prompt: "A massive sci-fi spaceship hangar inside an orbital station, spaceships entering through glowing forcefield doors, nebula background visible outside --ar 16:9 --v 6.0",
    engine: "midjourney",
    category: "cyberpunk",
    image: "images/gallery_space.webp"
  },
  {
    id: 38,
    title: "Steampunk Hangar Station",
    prompt: "A retro-futuristic steampunk hangar bay, brass gears, steam pipes, mechanical flyer crafts parked, warm gas lamp lighting, vintage industrial atmosphere",
    engine: "sd",
    category: "cyberpunk",
    image: "images/gallery_space.webp"
  },
  {
    id: 39,
    title: "Cyberpunk Market Stalls",
    prompt: "A crowded cyber-punk street market at night, merchants selling glowing noodle bowls, high-tech components, and synthetic pets, rain slicked streets, neon canopy lights",
    engine: "dalle",
    category: "cyberpunk",
    image: "images/gallery_cyberpunk.webp"
  },
  {
    id: 40,
    title: "Abandoned Alien Mech",
    prompt: "A giant rusted military combat mech standing abandoned in a mossy swamp, vines growing over its chassis, sunset rays filtering through trees, soft misty air, hyper-detailed --ar 16:9 --v 6.0",
    engine: "midjourney",
    category: "cyberpunk",
    image: "images/gallery_mech.webp"
  },

  // 3D RENDER & GAME ASSETS (10 items)
  {
    id: 41,
    title: "Futuristic Hologram Room",
    prompt: "A 3D render of a futuristic room with holographic computer screens, glowing light accents, clean octane rendering style, architectural digest, isometric view --ar 1:1 --v 6.0",
    engine: "midjourney",
    category: "render",
    image: "images/gallery_render.webp"
  },
  {
    id: 42,
    title: "Cozy Log Cabin Render",
    prompt: "A beautiful 3D architectural render of a cozy log cabin in snow, glowing windows, giant green aurora borealis in the night sky, octane style render, scenic landscape",
    engine: "sd",
    category: "render",
    image: "images/showcase_architecture.webp"
  },
  {
    id: 43,
    title: "Isometric Cyber Station",
    prompt: "A 3D isometric render of a futuristic cyberpunk workstation, multiple glowing holographic screens, sleek modern chair, pastel purple lighting, clean Blender model style",
    engine: "dalle",
    category: "render",
    image: "images/gallery_render.webp"
  },
  {
    id: 44,
    title: "Command Console Render",
    prompt: "A cute 3D render of a futuristic tech command console room, glowing computer control stations, low-poly tech asset style, clay render, stylized cartoon style, colorful --ar 1:1 --v 6.0",
    engine: "midjourney",
    category: "render",
    image: "images/gallery_render.webp"
  },
  {
    id: 45,
    title: "Terminal Interface Model",
    prompt: "A sleek sci-fi computer terminal render, glowing blue interface, holographic keyboard, isometric 3D asset presentation, clean white studio background octane render",
    engine: "sd",
    category: "render",
    image: "images/gallery_render.webp"
  },
  {
    id: 46,
    title: "Holographic Cyber Deck",
    prompt: "A 3D render of a futuristic cyber-deck workstation, circular holographic display, low-poly tech room octane style, neon blue highlights, clean render model",
    engine: "dalle",
    category: "render",
    image: "images/gallery_render.webp"
  },
  {
    id: 47,
    title: "Neon Server Room Render",
    prompt: "A stylized 3D render of a futuristic server room, neon grid lines, glowing cooling pipes, pink and cyan vaporwave aesthetic, clean octane rendering --ar 16:9 --v 6.0",
    engine: "midjourney",
    category: "render",
    image: "images/gallery_render.webp"
  },
  {
    id: 48,
    title: "Vintage Red Car Render",
    prompt: "A highly polished 3D render of a vintage red sports car parked on a scenic coastal road, high-fidelity car asset, sunset reflections, glossy paint, octane style render",
    engine: "sd",
    category: "render",
    image: "images/gallery_car.webp"
  },
  {
    id: 49,
    title: "Hologram Weapon Rack",
    prompt: "A 3D render of a futuristic weapon display console, glowing hologram rifle model, low-poly tech asset render style, clean studio background render",
    engine: "dalle",
    category: "render",
    image: "images/gallery_render.webp"
  },
  {
    id: 50,
    title: "Stylized Robot Console",
    prompt: "A stylized 3D render of a futuristic robot console, round metallic body, glowing circular eye screen, pastel octane render, clean product model --ar 1:1 --v 6.0",
    engine: "midjourney",
    category: "render",
    image: "images/gallery_render.webp"
  },
  {
    id: 51,
    title: "Audi RSQ Concept Car",
    prompt: "An analog film photograph of a sleek, black retro-futuristic concept supercar from the 1990s, side-profile view, parked in an empty city plaza with tall buildings in the background, moody overcast lighting, fine grain film texture, premium aesthetics, extremely realistic --ar 16:9 --v 6.0",
    engine: "midjourney",
    category: "photography",
    image: "images/gallery_rsq_concept.webp"
  },
  {
    id: 52,
    title: "Vintage Concept Car with Model",
    prompt: "An analog film photograph of a sleek black retro-futuristic concept supercar from the 1990s, three-quarter front view, parked next to a beautiful blonde model wearing a black outfit and black gloves in an empty city plaza, overcast sky, retro film grain, cinematic composition --ar 16:9 --v 6.0",
    engine: "midjourney",
    category: "photography",
    image: "images/gallery_rsq_model.webp"
  }
];

// Browser Compatibility Export
if (typeof window !== 'undefined') {
  window.GALLERY_DATA = GALLERY_DATA;
}
