

(function () {
    'use strict';
  
    const els = {
      s: initElements('s'),
      m: initElements('m'),
      h: initElements('h'),
      d: initElements('d'),
    };
  
    function initElements(type) {
      const els = [{}, {}];
  
      if (!['s', 'm', 'h', 'd'].includes(type)) return els;
  
      const target = document.querySelector(`.flip-clock-${type}`);
  
      if (!target) return els;
  
      let el;
  
      el = els[0];
      el.digit = target.querySelector('.digit-left');
      el.card = el.digit.querySelector('.card');
      el.cardFaces = el.card.querySelectorAll('.card-face');
      el.cardFaceA = el.cardFaces[0];
      el.cardFaceB = el.cardFaces[1];
  
      el = els[1];
      el.digit = target.querySelector('.digit-right');
      el.card = el.digit.querySelector('.card');
      el.cardFaces = el.card.querySelectorAll('.card-face');
      el.cardFaceA = el.cardFaces[0];
      el.cardFaceB = el.cardFaces[1];
  
      return els;
    }
  
    (function runClock() {
      if (!document.hidden) {
        const endDate = "19 December 2022 10:39:00 AM"
        const end = new Date(endDate)
        const date = new Date();
        const diff = (end - date) / 1000;
        const now = {
          d: Math.floor((diff/3600)/24),  
          h: Math.floor(diff / 3600) % 24,
          m: Math.floor(diff / 60) % 60,
          s: Math.floor(diff) % 60
        };
        now.d = now.d < 10 ? `0${now.d}` : `${now.d}`;
        now.h = now.h < 10 ? `0${now.h}` : `${now.h}`;
        now.m = now.m < 10 ? `0${now.m}` : `${now.m}`;
        now.s = now.s < 10 ? `0${now.s}` : `${now.s}`;
        now.d0 = now.d[0];
        now.d1 = now.d[1];
        now.h0 = now.h[0];
        now.h1 = now.h[1];
        now.m0 = now.m[0];
        now.m1 = now.m[1];
        now.s0 = now.s[0];
        now.s1 = now.s[1];
        console.log(`${now.h0}${now.h1}:${now.m0}${now.m1}:${now.s0}${now.s1}`);
  
        for (const t of Object.keys(els)) {
          for (const i of ['0', '1']) {
            const curr = now[`${t}${i}`];
            // let next = +curr ==0?+curr+9: +curr - 1;
            let next = +curr -1
            if (t === 'd') {
                if (i === '0') next = next <= 2 ? `${(next==-1)?next=2:next}` : '0';
                if (i === '1') next = next <= 3 ? `${(next==-1)?next=3:next}` : '0';
              }
            if (t === 'h') {
              if (i === '0') next = next <= 2 ? `${(next==-1)?next=2:next}` : '0';
              if (i === '1') next = next <= 3 ? `${(next==-1)?next=3:next}` : '0';
            }
            if (t === 'm') {
              if (i === '0') next = next <= 5 ? `${(next==-1)?next=5:next}` : '0';
              if (i === '1') next = next <= 9 ? `${(next==-1)?next=9:next}` : '0';
            }
            if (t === 's') {
              if (i === '0') next = next <= 5 ? `${(next==-1)?next=5:next}` : '0';
              if (i === '1') next = next <= 9 ? `${(next==-1)?next=9:next}` : '0';
            }
            const el = els[t][i];
            if (el && el.digit) {
              if (!el.digit.dataset.digitBefore) {
                el.digit.dataset.digitBefore = curr;
                el.cardFaceA.textContent = el.digit.dataset.digitBefore;
                el.digit.dataset.digitAfter = next;
                el.cardFaceB.textContent = el.digit.dataset.digitAfter;
              } else if (el.digit.dataset.digitBefore !== curr) {
                el.card.addEventListener('transitionend', function () {
                  el.digit.dataset.digitBefore = curr;
                  el.cardFaceA.textContent = el.digit.dataset.digitBefore;
  
                  const cardClone = el.card.cloneNode(true);
                  cardClone.classList.remove('flipped');
                  el.digit.replaceChild(cardClone, el.card);
                  el.card = cardClone;
                  el.cardFaces = el.card.querySelectorAll('.card-face');
                  el.cardFaceA = el.cardFaces[0];
                  el.cardFaceB = el.cardFaces[1];
  
                  el.digit.dataset.digitAfter = next;
                  el.cardFaceB.textContent = el.digit.dataset.digitAfter;
                }, { once: true });
                if (!el.card.classList.contains('flipped')) {
                  el.card.classList.add('flipped');
                }
              }
            }
          }
        }
      }
      setTimeout(runClock, 1000);
    })();
  })();