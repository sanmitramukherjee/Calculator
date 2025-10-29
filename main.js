// const container = document.getElementById('calc-container');
// const navBtns = document.querySelectorAll('.nav-btn');
// let currentMode = localStorage.getItem('mode') || 'standard';
// loadModule(currentMode);
// highlightNav(currentMode);

// navBtns.forEach(btn => {
//   btn.addEventListener('click', () => {
//     const mode = btn.dataset.mode;
//     localStorage.setItem('mode', mode);
//     highlightNav(mode);
//     loadModule(mode);
//   });
// });

// function highlightNav(mode){
//   navBtns.forEach(b=>b.classList.toggle('active', b.dataset.mode===mode));
// }

// async function loadModule(mode){
//   try{
//     const mod = await import(`./modules/${mode}.js`);
//     container.innerHTML = '';
//     mod.render(container);
//   }catch(e){
//     container.innerHTML = `<div style="padding:20px;color:#f88">Error loading ${mode} calculator</div>`;
//     console.error(e);
//   }
// }

// // --- Splash Screen ---
// window.addEventListener('load',()=>{
//   setTimeout(()=> document.getElementById('splash').classList.add('hidden'), 2000);
// });

// // --- Ambient Background ---
// const canvas = document.getElementById('ambient');
// const ctx = canvas.getContext('2d');
// let w,h,particles=[];
// function resize(){ w=canvas.width=innerWidth; h=canvas.height=innerHeight; }
// addEventListener('resize', resize); resize();
// for(let i=0;i<80;i++)
//   particles.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*2,dx:(Math.random()-0.5)*0.5,dy:(Math.random()-0.5)*0.5});
// function draw(){
//   ctx.clearRect(0,0,w,h);
//   ctx.fillStyle='rgba(0,255,200,0.15)';
//   particles.forEach(p=>{
//     p.x+=p.dx; p.y+=p.dy;
//     if(p.x<0||p.x>w) p.dx*=-1;
//     if(p.y<0||p.y>h) p.dy*=-1;
//     ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
//   });
//   requestAnimationFrame(draw);
// }
// draw();

// // --- Streak Counter ---
// let streak = parseInt(localStorage.getItem('streak') || 0);
// const last = localStorage.getItem('lastUsed');
// const today = new Date().toDateString();
// if (last !== today) {
//   streak++;
//   localStorage.setItem('streak', streak);
//   localStorage.setItem('lastUsed', today);
// }
// document.getElementById('streak').textContent = `🔥 ${streak}-day streak`;

// // --- Service Worker (PWA) ---
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('./service-worker.js');
// }
const container = document.getElementById('calc-container');
const calcTitle = document.getElementById('calc-title');
const navBtns = document.querySelectorAll('.nav-btn');
let currentMode = localStorage.getItem('mode') || 'standard';

// --- Load saved mode on startup ---
loadModule(currentMode);
highlightNav(currentMode);

// --- Handle mode switching ---
navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const mode = btn.dataset.mode;
    localStorage.setItem('mode', mode);
    highlightNav(mode);
    loadModule(mode);
  });
});

// --- Highlight Active Button ---
function highlightNav(mode) {
  navBtns.forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
}

// --- Dynamically load calculator modules ---
async function loadModule(mode) {
  try {
    const mod = await import(`./modules/${mode}.js`);
    container.innerHTML = '';

    // ✅ Dynamic title update
    const modeNames = {
      standard: "Standard Calculator",
      scientific: "Scientific Calculator",
      programmer: "Programmer Calculator",
      dateCalc: "Date Calculator",
      graphing: "Graphing Calculator"
    };
    calcTitle.textContent = modeNames[mode] || "NeoCalc";

    mod.render(container);
  } catch (e) {
    container.innerHTML = `
      <div style="padding:20px;color:#f88">
        Error loading <b>${mode}</b> calculator
      </div>
    `;
    console.error(e);
  }
}

// --- Splash Screen ---
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('splash').classList.add('hidden'), 2000);
});

// --- Ambient Background Animation ---
const canvas = document.getElementById('ambient');
const ctx = canvas.getContext('2d');
let w, h, particles = [];

function resize() {
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
}
addEventListener('resize', resize);
resize();

for (let i = 0; i < 80; i++)
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  });

function draw() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = 'rgba(0,255,200,0.15)';
  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > w) p.dx *= -1;
    if (p.y < 0 || p.y > h) p.dy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(draw);
}
draw();

// --- Streak Counter ---
let streak = parseInt(localStorage.getItem('streak') || 0);
const last = localStorage.getItem('lastUsed');
const today = new Date().toDateString();
if (last !== today) {
  streak++;
  localStorage.setItem('streak', streak);
  localStorage.setItem('lastUsed', today);
}
document.getElementById('streak').textContent = `🔥 ${streak}-day streak`;

// --- Register PWA Service Worker ---
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js');
}
