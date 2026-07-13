(function(){
  "use strict";

  document.getElementById('year').textContent = new Date().getFullYear();

  var toggle = document.getElementById('navToggle');
  var navlinks = document.getElementById('navlinks');
  toggle.addEventListener('click', function(){
    var isOpen = navlinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  navlinks.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click', function(){
      navlinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  var roles = ["Full Stack Developer", "Problem Solver", "Lifelong Learner", "Detail-Oriented Builder"];
  var roleEl = document.getElementById('heroRole');
  var cursorEl = roleEl.querySelector('.cursor');
  var roleIndex = 0, charIndex = 0, deleting = false;

  function typeLoop(){
    var current = roles[roleIndex];
    if (!deleting){
      charIndex++;
      if (charIndex > current.length){
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      charIndex--;
      if (charIndex < 0){
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        charIndex = 0;
      }
    }
    roleEl.firstChild.textContent = current.slice(0, charIndex);
    setTimeout(typeLoop, deleting ? 35 : 65);
  }
  roleEl.innerHTML = "" ;
  var textNode = document.createTextNode(roles[0]);
  roleEl.appendChild(textNode);
  roleEl.appendChild(cursorEl);
  charIndex = 0;
  setTimeout(typeLoop, 900);

  var meters = document.querySelectorAll('.meter-fill');
  var meterObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting){
        var el = entry.target;
        el.style.width = el.dataset.level + '%';
        meterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  meters.forEach(function(m){ meterObserver.observe(m); });

  var projectList = document.getElementById('projectList');
  projectList.querySelectorAll('.project-head').forEach(function(btn){
    btn.addEventListener('click', function(){
      var card = btn.closest('.project-card');
      var body = card.querySelector('.project-body');
      var isOpen = card.classList.contains('open');

      projectList.querySelectorAll('.project-card').forEach(function(c){
        c.classList.remove('open');
        c.querySelector('.project-body').style.maxHeight = null;
        c.querySelector('.project-head').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen){
        card.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

})();
