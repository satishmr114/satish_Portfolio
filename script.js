// ============================================================
// script.js – Intersection Observer, Filter Tabs, Button FX
// ============================================================

(function() {
    'use strict';

    // ----- 1. REVEAL ANIMATIONS (Intersection Observer) -----
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -10px 0px' });

    revealElements.forEach(el => observer.observe(el));

    // Force hero to appear after a tiny delay (in case it's already visible)
    setTimeout(() => {
        const hero = document.querySelector('.hero');
        if (hero) hero.classList.add('visible');
    }, 100);

    // ----- 2. PROJECT FILTER TABS -----
    const filterTabs = document.querySelectorAll('.filter-tabs span');
    const projectCards = document.querySelectorAll('.project-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter || 'all';
            projectCards.forEach(card => {
                const category = card.dataset.category || '';
                card.style.display = (filter === 'all' || category === filter) ? 'block' : 'none';
            });
        });
    });

    // ----- 3. BUTTON PRESS EFFECT (micro-interaction) -----
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.96)';
        });
        btn.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // ----- 4. CONTACT FORM CLIENT-SIDE VALIDATION -----
    const form = document.getElementById('contactForm');
    const feedbackDiv = document.getElementById('formFeedback');

    if (form && feedbackDiv) {
        form.addEventListener('submit', function(e) {
            const name = this.querySelector('input[name="name"]').value.trim();
            const email = this.querySelector('input[name="email"]').value.trim();
            const msg = this.querySelector('textarea[name="message"]').value.trim();

            if (!name || !email || !msg) {
                e.preventDefault();
                feedbackDiv.innerHTML = `<div class="msg-feedback error">⚠️ Please fill all fields.</div>`;
            } else {
                // Show sending state (will be replaced by PHP response)
                feedbackDiv.innerHTML = `<div class="msg-feedback" style="background:#1e2a3a; color:#2563eb;">⏳ Sending...</div>`;
            }
        });
    }

    // ----- 5. LOG (optional) -----
    console.log('✨ Dark portfolio – Comic Sans (Comic Neue) headline, blue accent, real icons, JS ready');
})();
