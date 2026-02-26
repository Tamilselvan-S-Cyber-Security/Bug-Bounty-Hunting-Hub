// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const dropdowns = document.querySelectorAll('.dropdown');

if (navToggle && navMenu) {
    // Toggle menu on button click
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Close menu on window resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// Close mobile menu when clicking on a link (except dropdown toggles)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Don't close if this is a dropdown toggle on mobile
        const parentDropdown = link.closest('.dropdown');
        if (parentDropdown && window.innerWidth <= 768) {
            // Let the dropdown handler manage this
            return;
        }
        
        if (navMenu) {
            navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        }
    });
});

// Dropdown toggle for mobile
if (dropdowns && dropdowns.length) {
    dropdowns.forEach(dropdown => {
        const toggleLink = dropdown.querySelector(':scope > a');
        if (toggleLink) {
            toggleLink.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other dropdowns
                    dropdowns.forEach(other => {
                        if (other !== dropdown) {
                            other.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
}

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function ensureChecklistNavLink() {
    const menu = document.getElementById('navMenu');
    if (!menu) return;

    const existing = menu.querySelector('a[href$="checklist.html"]');
    if (existing) return;

    const logoLink = document.querySelector('.nav-logo');
    const homeHref = logoLink ? logoLink.getAttribute('href') : null;
    if (!homeHref) return;

    const checklistHref = homeHref.replace(/index\.html$/i, 'checklist.html');

    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = checklistHref;
    a.className = 'nav-link';
    a.textContent = 'Bug Bounty Checklist';
    li.appendChild(a);

    const aboutLi = Array.from(menu.querySelectorAll('li')).find(item => {
        const link = item.querySelector('a');
        return link && /about\.html$/i.test(link.getAttribute('href') || '');
    });

    if (aboutLi) {
        menu.insertBefore(li, aboutLi);
    } else {
        menu.appendChild(li);
    }
}

function updateActiveNav() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Copy to Clipboard Function
async function safeCopyText(text) {
    if (typeof text !== 'string') return false;

    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        }
    } catch (e) {
        // Fall back below
    }

    try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.top = '-9999px';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        const ok = document.execCommand('copy');
        document.body.removeChild(textarea);
        return ok;
    } catch (e) {
        return false;
    }
}

function copyToClipboard(button) {
    const card = button.closest('.card');
    if (!card) {
        showToast('Nothing to copy.');
        return;
    }
    const codes = card.querySelectorAll('.command-list code');
    const text = Array.from(codes).map(code => code.textContent).join('\n');

    safeCopyText(text).then((ok) => {
        if (!ok) {
            showToast('Failed to copy. Please try again.');
            return;
        }

        showToast('Commands copied to clipboard!');
        
        // Visual feedback on button
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.backgroundColor = '#22C55E';
        button.style.borderColor = '#22C55E';
        button.style.color = '#1B1C22';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
            button.style.borderColor = '';
            button.style.color = '';
        }, 2000);
    });
}

// Copy code block
function copyCodeBlock(button) {
    const codeBlock = button.closest('.code-block');
    if (!codeBlock) {
        showToast('Nothing to copy.');
        return;
    }

    const pre = codeBlock.querySelector('pre');
    const code = pre ? pre.textContent : '';

    safeCopyText(code).then((ok) => {
        if (!ok) {
            showToast('Failed to copy. Please try again.');
            return;
        }

        showToast('Code copied to clipboard!');
        
        button.textContent = 'Copied!';
        button.style.backgroundColor = '#22C55E';
        button.style.color = '#1B1C22';
        
        setTimeout(() => {
            button.textContent = 'Copy';
            button.style.backgroundColor = '';
            button.style.color = '';
        }, 2000);
    });
}

// Add event listeners to all copy buttons in code blocks
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => copyCodeBlock(btn));
});

// Copy individual payload
function copyPayload(element) {
    const text = element.textContent;
    safeCopyText(text).then((ok) => {
        if (ok) {
            showToast('Copied to clipboard!');
        } else {
            showToast('Failed to copy. Please try again.');
        }
    });
}

// Add click listeners to payload codes
document.querySelectorAll('.payload-content code').forEach(code => {
    code.addEventListener('click', () => copyPayload(code));
});

// Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Checklist Progress Tracking
const checkboxes = document.querySelectorAll('.checklist-items input[type="checkbox"]');

// Load saved state from localStorage
checkboxes.forEach((checkbox, index) => {
    const saved = localStorage.getItem(`checklist_${index}`);
    if (saved === 'true') {
        checkbox.checked = true;
    }
    
    checkbox.addEventListener('change', () => {
        localStorage.setItem(`checklist_${index}`, checkbox.checked);
        updateProgress();
    });
});

function updateProgress() {
    const total = checkboxes.length;
    const checked = document.querySelectorAll('.checklist-items input[type="checkbox"]:checked').length;
    const percentage = Math.round((checked / total) * 100);
    
    if (percentage === 100) {
        showToast('🎉 All checklist items completed!');
    }
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Animation on Cards
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for animation
document.querySelectorAll('.card, .vuln-card, .checklist-category, .content-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        if (dropdowns && dropdowns.length) {
            dropdowns.forEach(d => d.classList.remove('active'));
        }
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    ensureChecklistNavLink();
    ensureTestingNavLink();
    ensureCodeDebuggerNavLink();
    updateActiveNav();
    updateProgress();
    updateFooterFormat();
    addSecurityHeaders();
    disableDevTools();
    addFavicon();
    showWelcomePopup();
    
    document.body.classList.add('loaded');
});

// Add favicon dynamically to all pages
function addFavicon() {
    const head = document.head;
    
    // Check if favicon already exists
    if (!head.querySelector('link[rel="icon"]') && !head.querySelector('link[rel="shortcut icon"]')) {
        const favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.type = 'image/png';
        
        // Determine correct path based on current page location
        const path = window.location.pathname;
        if (path.includes('/payloads/') || path.includes('/payloads')) {
            favicon.href = '../logo/logo.png';
        } else {
            favicon.href = 'logo/logo.png';
        }
        
        head.appendChild(favicon);
    }
}

// Add security meta tags dynamically to all pages
function addSecurityHeaders() {
    const head = document.head;
    
    // Security meta tags (only those that work as meta tags)
    const securityTags = [
        { name: 'X-Content-Type-Options', content: 'nosniff' },
        { name: 'X-XSS-Protection', content: '1; mode=block' },
        { name: 'Referrer-Policy', content: 'strict-origin-when-cross-origin' }
    ];
    
    securityTags.forEach(tag => {
        if (!head.querySelector(`meta[http-equiv="${tag.name}"]`)) {
            const meta = document.createElement('meta');
            meta.httpEquiv = tag.name;
            meta.content = tag.content;
            head.appendChild(meta);
        }
    });
    
    // Add referrer meta tag
    if (!head.querySelector('meta[name="referrer"]')) {
        const referrerMeta = document.createElement('meta');
        referrerMeta.name = 'referrer';
        referrerMeta.content = 'strict-origin-when-cross-origin';
        head.appendChild(referrerMeta);
    }
}

// Disable inspect element and download source code
function disableDevTools() {
    // Disable right-click context menu
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });

    // Disable keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // F12 (Developer Tools)
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }

        // Ctrl+Shift+I (Inspect)
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
            e.preventDefault();
            return false;
        }

        // Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
            e.preventDefault();
            return false;
        }

        // Ctrl+Shift+C (Inspect Element)
        if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
            e.preventDefault();
            return false;
        }

        // Ctrl+U (View Source)
        if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
            e.preventDefault();
            return false;
        }

        // Ctrl+S (Save Page)
        if (e.ctrlKey && (e.key === 'S' || e.key === 's')) {
            e.preventDefault();
            return false;
        }

        // Ctrl+P (Print)
        if (e.ctrlKey && (e.key === 'P' || e.key === 'p')) {
            e.preventDefault();
            return false;
        }
    });

    // Detect DevTools opening
    let devtoolsOpen = false;
    const threshold = 160;

    setInterval(() => {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        
        if (widthThreshold || heightThreshold) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                // Clear console or redirect
                console.clear();
                // Optionally redirect
                // window.location.href = 'about:blank';
            }
        } else {
            devtoolsOpen = false;
        }
    }, 1000);
}

// Show welcome popup on page load
function showWelcomePopup() {
    const popup = document.getElementById('welcomePopup');
    if (popup) {
        // Check if user has already seen the popup this session
        if (!sessionStorage.getItem('welcomePopupShown')) {
            setTimeout(() => {
                popup.classList.add('active');
                sessionStorage.setItem('welcomePopupShown', 'true');
            }, 500);
        }
    }
}

// Close welcome popup
function closeWelcomePopup() {
    const popup = document.getElementById('welcomePopup');
    if (popup) {
        popup.classList.remove('active');
    }
}

// Close popup when clicking outside
document.addEventListener('click', (e) => {
    const popup = document.getElementById('welcomePopup');
    if (popup && popup.classList.contains('active')) {
        if (e.target === popup) {
            closeWelcomePopup();
        }
    }
});

// Update footer format dynamically on all pages
function updateFooterFormat() {
    const footers = document.querySelectorAll('.footer');
    footers.forEach(footer => {
        const paragraphs = footer.querySelectorAll('p');
        if (paragraphs.length > 0) {
            // Update first paragraph with year span
            const firstP = paragraphs[0];
            if (firstP.textContent.includes('2026') && !firstP.querySelector('.year')) {
                firstP.innerHTML = '&copy; <span class="year">2026</span> Bug Bounty Hub. Open source security reference.';
            }
            
            // Check if second paragraph exists and update/add ZH5.club link
            if (paragraphs.length > 1) {
                const secondP = paragraphs[1];
                if (secondP.textContent.includes('security community')) {
                    secondP.innerHTML = 'Made with <i class="fas fa-heart"></i> for the <a href="https://zh5.club" target="_blank">ZH5.club</a>';
                }
            } else {
                // Add second paragraph if it doesn't exist
                const newP = document.createElement('p');
                newP.innerHTML = 'Made with <i class="fas fa-heart"></i> for the <a href="https://zh5.club" target="_blank">ZH5.club</a>';
                footer.querySelector('.container').appendChild(newP);
            }
        }

        // Add social media icons to footer if not already present
        let socialDiv = footer.querySelector('.footer-social');
        if (!socialDiv) {
            socialDiv = document.createElement('div');
            socialDiv.className = 'footer-social';
            socialDiv.innerHTML = `
                <a href="https://www.instagram.com/zh5_official/" target="_blank" class="social-icon instagram">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/in/zh5official/" target="_blank" class="social-icon linkedin">
                    <i class="fab fa-linkedin-in"></i>
                </a>
                <a href="https://whatsapp.com/channel/0029Vb7gPitFCCoM116jcb04" target="_blank" class="social-icon whatsapp">
                    <i class="fab fa-whatsapp"></i>
                </a>
                <a href="https://github.com/zh5official/" target="_blank" class="social-icon github">
                    <i class="fab fa-github"></i>
                </a>
            `;
            const container = footer.querySelector('.container');
            if (container) {
                container.appendChild(socialDiv);
            }
        }
    });
}

// Ensure Testing dropdown exists in navigation
function ensureTestingNavLink() {
    const menu = document.getElementById('navMenu');
    if (!menu) return;

    // Check if Testing dropdown already exists - look for any nav-link containing "Testing"
    const allLinks = menu.querySelectorAll('.nav-link');
    for (const link of allLinks) {
        if (link.textContent.includes('Testing')) {
            return; // Testing dropdown already exists
        }
    }

    const logoLink = document.querySelector('.nav-logo');
    const homeHref = logoLink ? logoLink.getAttribute('href') : 'index.html';
    if (!homeHref) return;

    const basePath = homeHref.replace('index.html', '');

    const testingDropdown = document.createElement('li');
    testingDropdown.className = 'dropdown';
    testingDropdown.innerHTML = `
        <a href="#" class="nav-link">Testing <i class="fas fa-chevron-down"></i></a>
        <ul class="dropdown-menu">
            <li><a href="${basePath}testing-and-automations.html"><i class="fas fa-vial"></i> Testing Overview</a></li>
            <li><a href="${basePath}whitebox.html"><i class="fas fa-box-open"></i> White Box Testing</a></li>
            <li><a href="${basePath}blackbox.html"><i class="fas fa-box"></i> Black Box Testing</a></li>
            <li><a href="${basePath}greybox.html"><i class="fas fa-adjust"></i> Grey Box Testing</a></li>
        </ul>
    `;

    // Insert after Vulnerabilities dropdown
    const vulnDropdown = Array.from(menu.querySelectorAll('li.dropdown')).find(item => {
        const link = item.querySelector('a');
        return link && link.textContent.includes('Vulnerabilities');
    });

    if (vulnDropdown && vulnDropdown.nextElementSibling) {
        menu.insertBefore(testingDropdown, vulnDropdown.nextElementSibling);
    } else if (vulnDropdown) {
        menu.appendChild(testingDropdown);
    } else {
        // Insert before About link
        const aboutLi = Array.from(menu.querySelectorAll('li')).find(item => {
            const link = item.querySelector('a');
            return link && /about\.html$/i.test(link.getAttribute('href') || '');
        });
        if (aboutLi) {
            menu.insertBefore(testingDropdown, aboutLi);
        } else {
            menu.appendChild(testingDropdown);
        }
    }
}

// Ensure Code Debugger link exists in Tools dropdown
function ensureCodeDebuggerNavLink() {
    const menu = document.getElementById('navMenu');
    if (!menu) return;

    // Find Tools dropdown
    const toolsDropdown = Array.from(menu.querySelectorAll('li.dropdown')).find(item => {
        const link = item.querySelector('a');
        return link && link.textContent.includes('Tools');
    });

    if (!toolsDropdown) return;

    // Check if Code Debugger link already exists
    const existingLink = toolsDropdown.querySelector('a[href*="code-debugger"]');
    if (existingLink) return;

    const dropdownMenu = toolsDropdown.querySelector('.dropdown-menu');
    if (!dropdownMenu) return;

    // Determine base path
    const logoLink = document.querySelector('.nav-logo');
    const homeHref = logoLink ? logoLink.getAttribute('href') : 'index.html';
    const basePath = homeHref ? homeHref.replace('index.html', '') : '';

    // Create Code Debugger link
    const codeDebuggerLi = document.createElement('li');
    codeDebuggerLi.innerHTML = `<a href="${basePath}code-debugger-website.html"><i class="fas fa-bug"></i> Code Debugger</a>`;

    // Append to dropdown menu
    dropdownMenu.appendChild(codeDebuggerLi);
}

// Console welcome message
console.log('%c🛡️ Bug Bounty Hub', 'font-size: 24px; font-weight: bold; color: #FF8605;');
console.log('%cWelcome to the Bug Bounty Reference!', 'font-size: 14px; color: #FFFFFF;');
console.log('%cHappy Hunting! 🐛', 'font-size: 14px; color: #FF8605;');
