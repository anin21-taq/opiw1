// ================= BACKGROUND =================

const symbols = ["💗", "🌸", "💕", "🌷", "✨"];

for (let i = 0; i < 16; i++) {

    const el = document.createElement("div");

    el.className = "bg-heart";

    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    el.style.left = Math.random() * 100 + "vw";

    el.style.fontSize = (1 + Math.random() * 1.2) + "rem";

    const duration = 9 + Math.random() * 9;

    el.style.animationDuration = duration + "s";

    el.style.animationDelay = Math.random() * duration + "s";

    document.body.appendChild(el);
}

// ================= ELEMENT =================

const playBtn = document.getElementById("playBtn");
const introScreen = document.getElementById("introScreen");
const bgMusic = document.getElementById("bgMusic");

const slides = [...document.querySelectorAll(".slide")];

const progressWrap = document.getElementById("progressWrap");

const skipText = document.getElementById("skipText");

const stage = document.getElementById("stage");

const boxStage = document.getElementById("boxStage");

const tapLabel = document.getElementById("tapLabel");

const revealCaption = document.getElementById("revealCaption");

const lovePhoto = document.querySelector(".love-photo");

let current = 0;

let timer = null;

let opened = false;

let segFills = [];

// ================= PROGRESS =================

slides.forEach(() => {

    const seg = document.createElement("div");

    seg.className = "progress-seg";

    const fill = document.createElement("div");

    fill.className = "progress-seg-fill";

    seg.appendChild(fill);

    progressWrap.appendChild(seg);

    segFills.push(seg);

});

// ================= SLIDE =================

function goToSlide(index){

    clearTimeout(timer);

    if(index >= slides.length){

        index = slides.length - 1;

    }

    slides.forEach((slide,i)=>{

        slide.classList.toggle("active",i===index);

    });

    segFills.forEach((seg,i)=>{

        const fill = seg.querySelector(".progress-seg-fill");

        fill.style.transition = "none";

        if(i<index){

            fill.style.width="100%";

            seg.classList.add("done");

        }else{

            fill.style.width="0%";

            seg.classList.remove("done");

        }

    });

    current=index;

    const duration=parseInt(slides[index].dataset.duration);

    if(duration>0){

        const fill=segFills[index].querySelector(".progress-seg-fill");

        requestAnimationFrame(()=>{

            fill.style.transition=`width ${duration}ms linear`;

            fill.style.width="100%";

        });

        timer=setTimeout(()=>{

            goToSlide(current+1);

        },duration);

    }

    skipText.style.display =
        current===slides.length-1 ? "none":"block";

}

// ================= MULAI =================

playBtn.addEventListener("click",()=>{

    introScreen.classList.add("hide");

    bgMusic.play().catch(()=>{});

    goToSlide(0);

});

// ================= SKIP =================

skipText.addEventListener("click",()=>{

    goToSlide(slides.length-1);

});

// ================= TAP NEXT =================

stage.addEventListener("click",(e)=>{

    if(e.target.closest("#boxStage")) return;

    if(current<slides.length-1){

        goToSlide(current+1);

    }

});

// ================= KADO =================

boxStage.addEventListener("click",(e)=>{

    e.stopPropagation();

    if(opened) return;

    opened=true;

    boxStage.classList.add("opened");

    tapLabel.style.display="none";

    setTimeout(()=>{

        lovePhoto.classList.add("show");

        spawnSparkles();

    },500);

    setTimeout(()=>{

        revealCaption.classList.add("show");

    },900);

});

// ================= SPARKLE =================

function spawnSparkles(){

    const sparkleSymbols=["✨","💫","⭐"];

    for(let i=0;i<12;i++){

        const s=document.createElement("div");

        s.className="sparkle";

        s.textContent=sparkleSymbols[
            Math.floor(Math.random()*sparkleSymbols.length)
        ];

        const angle=Math.random()*Math.PI*2;

        const dist=60+Math.random()*80;

        const x=Math.cos(angle)*dist;

        const y=Math.sin(angle)*dist;

        s.style.left="50%";

        s.style.top="50%";

        lovePhoto.appendChild(s);

        requestAnimationFrame(()=>{

            s.style.transform=
            `translate(${x}px,${y}px) scale(1.3)`;

            s.style.opacity="1";

        });

        setTimeout(()=>{

            s.style.opacity="0";

        },700);

        setTimeout(()=>{

            s.remove();

        },1500);

    }

}

// ================= INIT =================

slides.forEach(slide=>slide.classList.remove("active"));