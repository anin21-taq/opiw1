function spawnSparkles(){

    const sparkleSymbols = ['✨','💫','⭐'];

    for(let i=0;i<10;i++){

        const s = document.createElement("div");

        s.className = "sparkle";

        s.textContent = sparkleSymbols[Math.floor(Math.random()*sparkleSymbols.length)];

        const angle = Math.random()*Math.PI*2;
        const dist = 60 + Math.random()*60;

        const x = Math.cos(angle)*dist;
        const y = Math.sin(angle)*dist;

        s.style.left = "50%";
        s.style.top = "50%";

        lovePhoto.appendChild(s);

        requestAnimationFrame(()=>{

            s.style.transform =
            `translate(${x}px,${y}px) scale(1.3)`;

            s.style.opacity = "1";

        });

        setTimeout(()=>{

            s.style.opacity="0";

        },700);

        setTimeout(()=>{

            s.remove();

        },1500);

    }

}