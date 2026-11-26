/* ══════════════════════════════════════════════════════════════
   MAGIC STORIES - Interactive Storybook for Kids
   Complete JavaScript (Frontend with Standalone Fallback)
   ══════════════════════════════════════════════════════════════ */

const API_BASE = '';

// ─── Magic Fallback Data (For Standalone Mode) ──────────────
const MAGIC_FALLBACK = {
    "users": { "kid": "magic", "admin": "password123" },
    "stories": {
        "forest": {
            "title": "The Magic Forest",
            "theme_color": "#1a472a",
            "lines": [
                { "text": "Welcome to the Whispering Woods, where every tree has a secret to tell.", "character": "owl", "animation": "fade-in", "duration": 5000 },
                { "text": "Suddenly, Barnaby the Bunny hopped into the clearing with a bright blue map!", "character": "bunny", "animation": "hop-in", "duration": 6000 },
                { "text": "'Look!' Barnaby squeaked. 'I found the way to the Golden Carrot!'", "character": "bunny", "animation": "wiggle", "duration": 5000 },
                { "text": "The magic trees rustled their leaves, pointing the way deeper into the forest.", "character": "trees", "animation": "rustle", "duration": 6000 },
                { "text": "They tiptoed past the sleeping bear and found a river made of starlight.", "character": "bunny", "animation": "float", "duration": 6000 },
                { "text": "At the end of the rainbow river, the Golden Carrot glowed like the sun!", "character": "owl", "animation": "glow", "duration": 5000 },
                { "text": "Barnaby shared the carrot with all his forest friends. The End!", "character": "all", "animation": "zoom-out", "duration": 5000 }
            ]
        },
        "space": {
            "title": "Galaxy Quest",
            "theme_color": "#0a0a2e",
            "lines": [
                { "text": "In the furthest corner of the stars, Commander Starlight prepared for blast-off.", "character": "commander", "animation": "stars-twinkle", "duration": 5000 },
                { "text": "3... 2... 1... LIFT OFF! The Rocket zoomed past the moon!", "character": "rocket", "animation": "rocket-launch", "duration": 7000 },
                { "text": "They met a friendly robot named Beep-Boop who was sitting on a shiny asteroid.", "character": "robot", "animation": "float", "duration": 6000 },
                { "text": "'Want some space-cookies?' asked Beep-Boop with a robotic wink.", "character": "robot", "animation": "wink", "duration": 5000 },
                { "text": "They discovered a planet made entirely of cotton candy clouds!", "character": "commander", "animation": "bounce", "duration": 6000 },
                { "text": "A baby alien waved at them from behind a rainbow nebula.", "character": "rocket", "animation": "wiggle", "duration": 5000 },
                { "text": "Together, they flew into the great unknown of the Milky Way. The End!", "character": "rocket", "animation": "warp-speed", "duration": 6000 }
            ]
        },
        "ocean": {
            "title": "Deep Sea Discovery",
            "theme_color": "#003b5c",
            "lines": [
                { "text": "Deep beneath the waves, Finny the Fish was playing hide-and-seek in the coral.", "character": "finny", "animation": "bubbles", "duration": 5000 },
                { "text": "He found a sparkly treasure chest hidden behind a giant purple jellyfish.", "character": "chest", "animation": "glow", "duration": 6000 },
                { "text": "The jellyfish wiggled happily. 'It's a chest of magic bubbles!' it sang.", "character": "jellyfish", "animation": "wobble", "duration": 6000 },
                { "text": "A seahorse named Swirl joined them for an underwater dance party!", "character": "finny", "animation": "float", "duration": 5000 },
                { "text": "They swam through a tunnel of glowing anemones that tickled their fins.", "character": "jellyfish", "animation": "wiggle", "duration": 6000 },
                { "text": "Finny opened the chest, and the whole ocean started to glow with golden light.", "character": "chest", "animation": "radiate", "duration": 7000 },
                { "text": "What a wonderful day under the sea! The End!", "character": "finny", "animation": "swirl", "duration": 5000 }
            ]
        },
        "superhero": {
            "title": "The City Hero",
            "theme_color": "#b91c1c",
            "lines": [
                { "text": "In a busy city of tall buildings, a young hero discovered a secret power.", "character": "hero", "animation": "hover", "duration": 5000 },
                { "text": "With super speed and strength, he helped people in danger every day.", "character": "hero", "animation": "dash", "duration": 6000 },
                { "text": "One day, a giant robot with glowing red eyes attacked the city center!", "character": "robot", "animation": "shake", "duration": 6000 },
                { "text": "“Not on my watch!” shouted the hero, charging his lightning fist.", "character": "hero", "animation": "lightning", "duration": 5000 },
                { "text": "ZAP! The hero bravely stopped the robot and saved everyone in the city.", "character": "hero", "animation": "pop", "duration": 6000 },
                { "text": "The people cheered for their brave protector under the golden sun.", "character": "all", "animation": "glow", "duration": 5000 },
                { "text": "A hero's work is never done. The End!", "character": "hero", "animation": "zoom-out", "duration": 5000 }
            ]
        },
        "jungle": {
            "title": "Jungle Adventure",
            "theme_color": "#064e3b",
            "lines": [
                { "text": "Deep inside the jungle, a curious monkey named Milo loved adventures.", "character": "monkey", "animation": "swing", "duration": 5000 },
                { "text": "He met a wise elephant and a playful parrot sitting on a giant leaf.", "character": "elephant", "animation": "float", "duration": 6000 },
                { "text": "“We are searching for the hidden waterfall!” squawked the parrot.", "character": "parrot", "animation": "wiggle", "duration": 5000 },
                { "text": "They pushed through the thick vines, hearing the sound of drums in the distance.", "character": "monkey", "animation": "rustle", "duration": 6000 },
                { "text": "Finally, they found it—the waterfall made of liquid emeralds!", "character": "elephant", "animation": "glow", "duration": 6000 },
                { "text": "Together, they found a magical jungle treasure hidden behind the water.", "character": "monkey", "animation": "zoom-in", "duration": 5000 },
                { "text": "What a wonderful day in the wild jungle! The End!", "character": "monkey", "animation": "bounce", "duration": 5000 }
            ]
        }
    }
};

let isLocalMode = false;

// ─── Background Particle & Effect Generation ────────────────
function createParticles() {
    const container = document.querySelector('.particles');
    if (!container) return;
    container.innerHTML = '';
    const count = window.innerWidth < 600 ? 30 : 60;
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        star.style.animationDelay = (Math.random() * 3) + 's';
        container.appendChild(star);
    }
}

function createBubbles() {
    const container = document.getElementById('particles-story');
    if (!container) return;
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            const size = Math.random() * 40 + 10;
            bubble.style.width = size + 'px';
            bubble.style.height = size + 'px';
            bubble.style.left = Math.random() * 100 + '%';
            bubble.style.animationDuration = (Math.random() * 4 + 4) + 's';
            container.appendChild(bubble);
            setTimeout(() => bubble.remove(), 8000);
        }, i * 300);
    }
}

function createLeaves() {
    const container = document.getElementById('particles-story');
    if (!container) return;
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const leaf = document.createElement('i');
            leaf.className = 'fas fa-leaf leaf-effect';
            leaf.style.left = Math.random() * 100 + '%';
            leaf.style.animationDuration = (Math.random() * 5 + 5) + 's';
            leaf.style.fontSize = (Math.random() * 1 + 1) + 'rem';
            container.appendChild(leaf);
            setTimeout(() => leaf.remove(), 10000);
        }, i * 500);
    }
}

function createLightning() {
    const overlay = document.getElementById('story-bg-overlay');
    if (!overlay) return;
    overlay.style.filter = 'brightness(3)';
    setTimeout(() => {
        overlay.style.filter = 'brightness(1)';
    }, 100);
}

// ══════════════════════════════════════════════════════════════
//  AUTHENTICATION
// ══════════════════════════════════════════════════════════════

async function handleLogin(event) {
    event.preventDefault();
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMsg = document.getElementById('error-msg');
    const loginBtn = document.getElementById('login-btn');

    if (!usernameInput || !passwordInput) return;
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        showError(errorMsg, 'Please fill in all fields! ✏️');
        return;
    }

    loginBtn.disabled = true;
    loginBtn.querySelector('.btn-text').textContent = 'Entering...';

    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            loginSuccess(username);
        } else {
            const data = await response.json();
            showError(errorMsg, data.message || 'Invalid username or password! 🔒');
            loginBtn.disabled = false;
            loginBtn.querySelector('.btn-text').textContent = 'Enter World';
        }
    } catch (err) {
        console.warn("Backend unreachable, switching to Standalone Magic Mode ✨");
        isLocalMode = true;
        if (MAGIC_FALLBACK.users[username] === password) {
            loginSuccess(username);
        } else {
            showError(errorMsg, 'Invalid username or password! (Standalone Mode) 🔒');
            loginBtn.disabled = false;
            loginBtn.querySelector('.btn-text').textContent = 'Enter World';
        }
    }
}

function loginSuccess(username) {
    sessionStorage.setItem('user', username);
    const card = document.getElementById('login-card');
    if (card) {
        card.style.transition = 'all 0.5s ease';
        card.style.transform = 'scale(0.9) translateY(-20px)';
        card.style.opacity = '0';
    }
    setTimeout(() => {
        window.location.href = 'menu.html';
    }, 400);
}

function showError(el, message) {
    if (!el) return;
    el.textContent = message;
    el.style.display = 'block';
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = 'shake 0.5s ease';
}

// ══════════════════════════════════════════════════════════════
//  MENU PAGE
// ══════════════════════════════════════════════════════════════

function goToStory(storyType) {
    const card = document.getElementById('card-' + storyType);
    if (card) {
        card.style.transition = 'all 0.3s ease';
        card.style.transform = 'scale(0.95)';
        card.style.opacity = '0.7';
    }
    setTimeout(() => {
        window.location.href = `story.html?type=${storyType}`;
    }, 250);
}

// ══════════════════════════════════════════════════════════════
//  STORY ENGINE
// ══════════════════════════════════════════════════════════════

let currentStoryData = null;
let currentLineIndex = 0;
let isPlaying = false;
let autoPlayTimer = null;
let isMuted = false;
let currentVolume = 0.8;
const synth = window.speechSynthesis;

async function loadStory() {
    const params = new URLSearchParams(window.location.search);
    const storyType = params.get('type');
    if (!storyType) {
        window.location.href = 'menu.html';
        return;
    }

    setStoryBackground(storyType);

    try {
        const response = await fetch(`${API_BASE}/story/${storyType}`);
        if (!response.ok) throw new Error('Not Found');
        const data = await response.json();
        setupStory(data);
    } catch (err) {
        console.warn("Backend unreachable, using Standalone Story Mode ✨");
        if (MAGIC_FALLBACK.stories[storyType]) {
            setupStory(MAGIC_FALLBACK.stories[storyType]);
            showMagicToast("Magic Standalone Mode Active ✨");
        } else {
            document.getElementById('story-text').textContent = 'Story not found in magic memory! 🪄';
        }
    }
}

function setupStory(data) {
    currentStoryData = data;
    document.title = `Magic Stories - ${data.title}`;
    document.getElementById('story-title').textContent = data.title;
    updateLineCounter();
    displayCurrentLine();
}

function showMagicToast(msg) {
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '100px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = 'rgba(124, 58, 237, 0.8)';
    toast.style.color = 'white';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '20px';
    toast.style.zIndex = '1000';
    toast.style.fontSize = '0.9rem';
    toast.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function setStoryBackground(storyType) {
    const overlay = document.getElementById('story-bg-overlay');
    if (!overlay) return;
    const themes = {
        forest: 'linear-gradient(135deg, #064e3b, #166534, #14532d)',
        space:  'linear-gradient(135deg, #0f0a2e, #1e1b4b, #312e81)',
        ocean:  'linear-gradient(135deg, #0c4a6e, #075985, #0369a1)',
        superhero: 'linear-gradient(135deg, #b91c1c, #dc2626, #facc15)',
        jungle: 'linear-gradient(135deg, #064e3b, #15803d, #854d0e)'
    };
    overlay.style.background = themes[storyType] || themes.forest;
    
    if (storyType === 'ocean') {
        setInterval(createBubbles, 5000);
        createBubbles();
    } else if (storyType === 'jungle') {
        setInterval(createLeaves, 4000);
        createLeaves();
    }
}

function displayCurrentLine() {
    if (!currentStoryData || !currentStoryData.lines) return;
    const line = currentStoryData.lines[currentLineIndex];
    const textBox = document.getElementById('story-text');
    const stage = document.getElementById('character-stage');

    textBox.style.opacity = '0';
    textBox.style.transform = 'translateY(8px)';
    textBox.classList.remove('text-highlight');

    setTimeout(() => {
        textBox.textContent = line.text;
        textBox.style.opacity = '1';
        textBox.style.transform = 'translateY(0)';
        if (isPlaying) textBox.classList.add('text-highlight');
    }, 300);

    const iconMap = {
        'owl': 'fas fa-dove', 'bunny': 'fas fa-paw', 'trees': 'fas fa-tree',
        'commander': 'fas fa-user-astronaut', 'rocket': 'fas fa-rocket', 'robot': 'fas fa-robot',
        'finny': 'fas fa-fish', 'chest': 'fas fa-gem', 'jellyfish': 'fas fa-disease',
        'ocean': 'fas fa-water', 'hero': 'fas fa-mask', 'monkey': 'fas fa-hippo', // Closest jungle/hero match
        'elephant': 'fas fa-elephant', 'parrot': 'fas fa-feather-pointed',
        'all': 'fas fa-star'
    };

    if (line.animation === 'lightning') createLightning();

    stage.innerHTML = `<i class="${iconMap[line.character] || 'fas fa-star'}"></i>`;
    stage.style.animation = 'none';
    void stage.offsetWidth;
    stage.style.animation = 'bounce-character 3s infinite ease-in-out';

    updateProgress();
    updateLineCounter();
    if (isPlaying) speakText(line.text, line.duration);
}

function updateProgress() {
    if (!currentStoryData) return;
    const bar = document.getElementById('story-progress-bar');
    if (bar) bar.style.width = ((currentLineIndex + 1) / currentStoryData.lines.length) * 100 + '%';
}

function updateLineCounter() {
    const counter = document.getElementById('line-counter');
    if (counter && currentStoryData) counter.textContent = `Page ${currentLineIndex + 1} of ${currentStoryData.lines.length}`;
}

// ─── Text-to-Speech ──────────────────────────────────────────
function speakText(text, duration) {
    if (!synth || isMuted) {
        scheduleNextLine(duration);
        return;
    }
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85; utterance.pitch = 1.15; utterance.volume = currentVolume;

    const voices = synth.getVoices();
    const preferred = voices.find(v => v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Female'));
    if (preferred) utterance.voice = preferred;

    utterance.onend = () => { if (isPlaying) scheduleNextLine(1500); };
    utterance.onerror = () => { if (isPlaying) scheduleNextLine(duration || 4000); };
    synth.speak(utterance);
    scheduleNextLine(duration || 5000);
}

function scheduleNextLine(delay) {
    if (autoPlayTimer) clearTimeout(autoPlayTimer);
    autoPlayTimer = setTimeout(() => { if (isPlaying) nextLine(); }, delay);
}

// ─── Controls ────────────────────────────────────────────────
function togglePlay() {
    isPlaying = !isPlaying;
    const playBtn = document.getElementById('play-btn');
    if (isPlaying) {
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        playBtn.classList.add('active');
        displayCurrentLine();
    } else {
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        playBtn.classList.remove('active');
        synth.cancel();
        if (autoPlayTimer) clearTimeout(autoPlayTimer);
        const textBox = document.getElementById('story-text');
        if (textBox) textBox.classList.remove('text-highlight');
    }
}

function nextLine() {
    if (!currentStoryData) return;
    synth.cancel();
    if (autoPlayTimer) clearTimeout(autoPlayTimer);
    if (currentLineIndex < currentStoryData.lines.length - 1) {
        currentLineIndex++;
        displayCurrentLine();
    } else {
        isPlaying = false;
        const playBtn = document.getElementById('play-btn');
        playBtn.innerHTML = '<i class="fas fa-rotate-right"></i>';
        playBtn.classList.remove('active');
        document.getElementById('story-text').textContent = '🎉 The End! ✨';
        document.getElementById('story-text').classList.remove('text-highlight');
        document.getElementById('character-stage').innerHTML = '<i class="fas fa-heart" style="color:#f472b6;"></i>';
        currentLineIndex = 0;
        updateProgress();
        updateLineCounter();
    }
}

function toggleMute() {
    isMuted = !isMuted;
    const btn = document.getElementById('mute-btn');
    btn.innerHTML = isMuted ? '<i class="fas fa-volume-xmark"></i>' : '<i class="fas fa-volume-high"></i>';
    if (isMuted) synth.cancel();
}

function changeVolume(v) {
    currentVolume = parseFloat(v);
    const btn = document.getElementById('mute-btn');
    isMuted = currentVolume === 0;
    btn.innerHTML = isMuted ? '<i class="fas fa-volume-xmark"></i>' : (currentVolume < 0.4 ? '<i class="fas fa-volume-low"></i>' : '<i class="fas fa-volume-high"></i>');
}

function exitStory() {
    synth.cancel();
    if (autoPlayTimer) clearTimeout(autoPlayTimer);
    window.location.href = 'menu.html';
}

// ─── Initialization ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    if (synth && synth.onvoiceschanged !== undefined) synth.onvoiceschanged = () => synth.getVoices();
    const loginForm = document.getElementById('login-form');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    const storyText = document.getElementById('story-text');
    if (storyText) {
        if (!sessionStorage.getItem('user')) { window.location.href = 'login.html'; return; }
        loadStory();
    }
});
