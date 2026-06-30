
  const symbols = ['💗','🌸','💕','🌷','✨'];
  for(let i=0;i<16;i++){
    const el = document.createElement('div');
    el.className = 'bg-heart';
    el.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    el.style.left = Math.random()*100 + 'vw';
    el.style.fontSize = (1 + Math.random()*1.2) + 'rem';
    const duration = 9 + Math.random()*9;
    el.style.animationDuration = duration + 's';
    el.style.animationDelay = (Math.random()*duration) + 's';
    document.body.appendChild(el);
  }

  const slides = Array.from(document.querySelectorAll('.slide'));
  const progressWrap = document.getElementById('progressWrap');
  const skipText = document.getElementById('skipText');
  let current = 0;
  let timer = null;
  let segFills = [];

  slides.forEach(() => {
    const seg = document.createElement('div');
    seg.className = 'progress-seg';
    const fill = document.createElement('div');
    fill.className = 'progress-seg-fill';
    seg.appendChild(fill);
    progressWrap.appendChild(seg);
    segFills.push(seg);
  });

  function goToSlide(index){
    if(index >= slides.length) index = slides.length - 1;
    clearTimeout(timer);

    slides.forEach((s, i) => s.classList.toggle('active', i === index));

    segFills.forEach((seg, i) => {
      seg.classList.remove('done');
      const fill = seg.querySelector('.progress-seg-fill');
      fill.style.transition = 'none';
      fill.style.width = i < index ? '100%' : '0%';
      if(i < index) seg.classList.add('done');
    });

    current = index;

    const duration = parseInt(slides[index].dataset.duration, 10);
    if(duration > 0){
      const seg = segFills[index];
      const fill = seg.querySelector('.progress-seg-fill');
      requestAnimationFrame(()=>{
        fill.style.transition = `width ${duration}ms linear`;
        fill.style.width = '100%';
      });
      timer = setTimeout(() => goToSlide(current + 1), duration);
    }

    if(index === slides.length - 1){
      skipText.style.display = 'none';
    }
  }

  skipText.addEventListener('click', () => goToSlide(slides.length - 1));

  document.getElementById('stage').addEventListener('click', (e) => {
    if(e.target.closest('#boxStage')) return;
    if(current < slides.length - 1) goToSlide(current + 1);
  });


const boxStage = document.getElementById("boxStage");
const tapLabel = document.getElementById("tapLabel");
const revealCaption = document.getElementById("revealCaption");
const lovePhoto = document.querySelector(".love-photo");

let opened = false;

boxStage.addEventListener("click",(e)=>{

    e.stopPropagation();

    if(opened) return;

    opened = true;

    boxStage.classList.add("opened");

    tapLabel.style.display = "none";

    setTimeout(()=>{
        lovePhoto.classList.add("show");
        spawnSparkles();
    },350);

    setTimeout(()=>{
        revealCaption.classList.add("show");
    },900);

});