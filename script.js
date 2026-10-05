document.addEventListener('DOMContentLoaded',()=>{
  const path=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a').forEach(a=>{ if(a.getAttribute('href')===path) a.classList.add('active'); });

  const progress=document.querySelector('.progress');
  const setProgress=()=>{ if(!progress) return; const h=document.documentElement.scrollHeight-innerHeight; progress.style.transform=`scaleX(${h>0?scrollY/h:0})`; };
  addEventListener('scroll',setProgress,{passive:true}); setProgress();

  const io=new IntersectionObserver(entries=>entries.forEach(e=>e.isIntersecting&&e.target.classList.add('visible')),{threshold:.1});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  document.querySelectorAll('.acc-btn').forEach(btn=>btn.addEventListener('click',()=>{
    const item=btn.closest('.acc-item'); const box=item.querySelector('.acc-content'); const open=item.classList.toggle('open');
    box.style.maxHeight=open?box.scrollHeight+'px':'0px';
  }));

  document.querySelectorAll('.time-btn').forEach(btn=>btn.addEventListener('click',()=>btn.closest('.time-item').classList.toggle('open')));

  const wave=document.querySelector('#wavePath');
  const freq=document.querySelector('#freq'); const freqValue=document.querySelector('#freqValue');
  function drawWave(){
    if(!wave) return; const f=Number(freq?.value||2); const pts=[]; for(let x=0;x<=760;x+=4){const y=110-72*Math.sin((x/760)*Math.PI*2*f);pts.push(`${x},${y}`)} wave.setAttribute('d','M '+pts.join(' L ')); if(freqValue)freqValue.textContent=f.toFixed(1)+' Hz';
  }
  freq?.addEventListener('input',drawWave); drawWave();

  const rotator=document.querySelector('#rotatorScene'); const rotBtn=document.querySelector('#rotatorToggle');
  if(rotator&&rotBtn){ let on=true; rotBtn.addEventListener('click',()=>{on=!on; rotator.querySelector('.rotor').style.animationPlayState=on?'running':'paused'; rotBtn.textContent=on?'Pausar rotação':'Continuar rotação';}); }

  document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
    const filter=btn.dataset.filter; document.querySelectorAll('[data-scientist]').forEach(card=>{card.style.display=(filter==='todos'||card.dataset.scientist===filter)?'block':'none'});
  }));

  document.querySelectorAll('.quiz button').forEach(btn=>btn.addEventListener('click',()=>{
    const q=btn.closest('.quiz'); const feedback=q.querySelector('.quiz-feedback'); q.querySelectorAll('button').forEach(b=>b.classList.remove('correct','wrong'));
    if(btn.dataset.correct==='true'){btn.classList.add('correct');feedback.textContent='✓ Exatamente. Você captou a ideia central.'}else{btn.classList.add('wrong');feedback.textContent='Ainda não. Repare em como o campo variável liga eletricidade e magnetismo.'}
  }));
});
