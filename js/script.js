window.addEventListener('load', () => {
    document.getElementById('preloader').classList.add('fade-out');
    AOS.init({ duration: 800, once: false });
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark Mode
    const toggle = document.querySelector('#checkbox');
    const stored = localStorage.getItem('theme');
    if (stored) {
        document.documentElement.setAttribute('data-theme', stored);
        toggle.checked = stored === 'dark';
    }
    toggle.addEventListener('change', (e) => {
        const theme = e.target.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });

    // 2. CountUp
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = +el.getAttribute('data-target');
                let count = 0;
                const update = () => {
                    const inc = target / 100;
                    if (count < target) {
                        count += inc;
                        el.innerText = Math.ceil(count);
                        setTimeout(update, 15);
                    } else { el.innerText = target.toLocaleString() + "+"; }
                };
                update();
                observer.unobserve(el);
            }
        });
    }, { threshold: 1 });
    counters.forEach(c => observer.observe(c));

    // 3. Chatbot
    const chatBtn = document.getElementById('chatbot-toggle');
    const chatWin = document.getElementById('chatbot-window');
    chatBtn.onclick = () => chatWin.style.display = chatWin.style.display === 'flex' ? 'none' : 'flex';
});