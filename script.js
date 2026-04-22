// ── Hamburger menu ──
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// ── Internship detail popup ──
function openIntern(role, company, date, type, points) {
    document.getElementById('im-role').textContent = role;
    document.getElementById('im-company').textContent = company;
    document.getElementById('im-date').textContent = date;

    const badge = document.getElementById('im-badge');
    badge.textContent = type === 'current' ? 'Current' : 'Completed';
    badge.className = 'internship-badge ' + type;

    const ul = document.getElementById('im-points');
    ul.innerHTML = points.map(p => `<li>${p}</li>`).join('');

    document.getElementById('intern-backdrop').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeIntern() {
    document.getElementById('intern-backdrop').classList.remove('active');
    document.body.style.overflow = '';
}

// ── Education card expand ──
function openEdu(title, body, url) {
    document.getElementById('edu-modal-title').innerHTML = title;
    document.getElementById('edu-modal-body').innerHTML = body;
    document.getElementById('edu-modal-btn').onclick = function() { window.open(url); };
    document.getElementById('edu-backdrop').classList.add('active');
}

function closeEdu() {
    document.getElementById('edu-backdrop').classList.remove('active');
}

// ── Skills accordion ──
function toggleSkill(btn) {
    const group = btn.closest('.skill-group');
    group.classList.toggle('open');
}

// ── Rotating roles ──
(function () {
    const roles = [
        'Web Developer', 'Frontend Developer', 'Backend Developer',
        'Full Stack Developer', 'Software Developer',
        'Technical Coordinator', 'Tester'
    ];
    const el = document.getElementById('rotating-role');
    if (!el) return;
    let i = 0;
    el.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
    setInterval(() => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(8px)';
        setTimeout(() => {
            i = (i + 1) % roles.length;
            el.textContent = roles[i];
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 350);
    }, 2200);
})();

// ── Contact form — Web3Forms (no backend needed) ──
function sendMail(e) {
    e.preventDefault();
    const btn    = e.target.querySelector('.form-submit-btn');
    const status = document.getElementById('form-status');

    const data = {
        access_key: 'YOUR_WEB3FORMS_KEY',
        name:    document.getElementById('cf-name').value.trim(),
        email:   document.getElementById('cf-email').value.trim(),
        phone:   document.getElementById('cf-phone').value.trim() || 'Not provided',
        message: document.getElementById('cf-message').value.trim(),
        subject: 'Portfolio Contact from ' + document.getElementById('cf-name').value.trim(),
        from_name: 'Sowmya Portfolio'
    };

    btn.textContent = 'Sending...';
    btn.disabled = true;
    status.textContent = '';

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            status.textContent = '✅ Message sent! I\'ll get back to you soon.';
            status.style.color = '#06b6d4';
            e.target.reset();
        } else {
            throw new Error(res.message);
        }
    })
    .catch(() => {
        status.textContent = '❌ Failed to send. Please email directly: 14sowmyashetty23@gmail.com';
        status.style.color = '#f87171';
    })
    .finally(() => {
        btn.textContent = 'Send Message ➤';
        btn.disabled = false;
    });
}

// ── Particle background ──
(function () {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-bg';
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);

    function rand(min, max) { return Math.random() * (max - min) + min; }
    const COLORS = ['rgba(139,92,246,', 'rgba(236,72,153,', 'rgba(6,182,212,'];

    function createParticle() {
        return { x: rand(0, W), y: rand(0, H), r: rand(1, 2.5), dx: rand(-0.3, 0.3), dy: rand(-0.5, -0.15), alpha: rand(0.3, 0.7), color: COLORS[Math.floor(Math.random() * COLORS.length)] };
    }

    for (let i = 0; i < 70; i++) particles.push(createParticle());

    function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color + p.alpha + ')';
            ctx.fill();
            p.x += p.dx; p.y += p.dy; p.alpha -= 0.001;
            if (p.y < -10 || p.alpha <= 0) Object.assign(p, createParticle(), { y: H + 10, alpha: rand(0.3, 0.7) });
        });
        requestAnimationFrame(draw);
    }
    draw();
})();

// ── Scroll reveal ──
(function () {
    const targets = document.querySelectorAll(
        'section, .details-containers, .about-containers, article, .section_pic-container, .section_text, .internship-card'
    );
    targets.forEach(el => el.classList.add('reveal'));

    function checkVisible() {
        targets.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 40)
                el.classList.add('visible');
        });
    }
    checkVisible();
    window.addEventListener('scroll', checkVisible, { passive: true });
    window.addEventListener('load', checkVisible);
})();

// ── Active nav highlight ──
(function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 200) current = sec.getAttribute('id'); });
        navLinks.forEach(a => { a.style.color = a.getAttribute('href') === '#' + current ? '#c4b5fd' : ''; });
    });
})();
