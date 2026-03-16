const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    item.classList.toggle('active');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const leadForm = document.getElementById('lead-form');
if (leadForm) {
  leadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(leadForm);
    const name = data.get('name')?.toString().trim();
    const phone = data.get('phone')?.toString().trim();
    const email = data.get('email')?.toString().trim();
    const message = data.get('message')?.toString().trim();
    const status = document.getElementById('form-status');

    if (!name || !phone || !email || !message) {
      if (status) status.textContent = 'Будь ласка, заповніть усі поля.';
      return;
    }

    const subject = encodeURIComponent(`Заявка з сайту AXIS від ${name}`);
    const body = encodeURIComponent(
`Ім'я: ${name}\nКонтакт: ${phone}\nEmail: ${email}\n\nЗадача:\n${message}`
    );

    if (status) status.textContent = 'Відкриваємо ваш email-клієнт для відправки заявки.';
    window.location.href = `mailto:alex.metelskiy@gmail.com?subject=${subject}&body=${body}`;
  });
}
