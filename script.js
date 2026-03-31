// ========== NAVIGATION ==========
function toggleMenu() {
    document.querySelector('.nav-menu').classList.toggle('active');
}

function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        document.querySelector('.nav-menu').classList.remove('active');
    }
}

// ========== IMAGE MODAL ==========
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const caption = document.getElementById('caption');

function openImage(type) {
    modal.style.display = 'block';
    if (type === 'profile') {
        modalImg.src = 'https://via.placeholder.com/800x800/007bff/ffffff?text=Your+Name';
        caption.innerHTML = 'Your Name - Web Developer';
    }
}

function closeModal() {
    modal.style.display = 'none';
}

// ========== SKILLS ==========
function showSkillDetails(skill) {
    const details = {
        'HTML5': 'HTML5: Structure of web pages. 90% expertise.',
        'CSS3': 'CSS3: Styling and animations. 85% expertise.',
        'JavaScript': 'JavaScript: Interactive features. 80% expertise.',
        'React': 'React: Frontend library. 75% expertise.'
    };
    showToast(details[skill] || `Skill: ${skill}`);
}

// ========== PROJECTS ==========
function openProject(project) {
    const projects = {
        'project1': 'https://project1-demo.netlify.app',
        'project2': 'https://project2-demo.netlify.app',
        'project3': 'https://project3-demo.netlify.app'
    };
    window.open(projects[project], '_blank');
}

function openGitHub(project) {
    const github = {
        'project1': 'https://github.com/yourusername/project1',
        'project2': 'https://github.com/yourusername/project2',
        'project3': 'https://github.com/yourusername/project3'
    };
    window.open(github[project], '_blank');
}

function openDemo(project) {
    const demos = {
        'project1': 'https://project1-demo.netlify.app',
        'project2': 'https://project2-demo.netlify.app',
        'project3': 'https://project3-demo.netlify.app'
    };
    window.open(demos[project], '_blank');
}

// ========== CONTACT ==========
function openMap() {
    window.open('https://www.google.com/maps/place/Your+City', '_blank');
}

function handleSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    console.log('Form submitted:', { name, email, subject, message });
    
    // Show success message
    showToast('Message sent successfully! I will reply soon.');
    
    // Clear form
    event.target.reset();
}

// ========== SOCIAL LINKS ==========
function openSocial(platform) {
    const urls = {
        'github': 'https://github.com/yourusername',
        'linkedin': 'https://linkedin.com/in/yourusername',
        'twitter': 'https://twitter.com/yourusername'
    };
    window.open(urls[platform], '_blank');
}

// ========== TOAST NOTIFICATION ==========
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ========== ACTIVE LINK HIGHLIGHT ==========
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========== NAVBAR SCROLL EFFECT ==========
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.background = '#fff';
    }
});

// ========== CLOSE MODAL WITH ESC KEY ==========
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// ========== CLOSE MENU WHEN CLICKING OUTSIDE ==========
document.addEventListener('click', (e) => {
    const menu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (!menu.contains(e.target) && !hamburger.contains(e.target) && menu.classList.contains('active')) {
        menu.classList.remove('active');
    }
});