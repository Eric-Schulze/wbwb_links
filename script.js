async function loadLinks() {
    try {
        const response = await fetch('links.json');
        if (!response.ok) {
            throw new Error('Failed to load links configuration');
        }
        
        const data = await response.json();
        
        // Update profile information
        updateProfile(data.profile);
        
        // Apply theme
        applyTheme(data.profile.theme || 'dark');
        
        // Render links (support both old format and new sections format)
        if (data.sections) {
            renderSections(data.sections);
        } else if (data.links) {
            renderLinks(data.links);
        }
        
    } catch (error) {
        console.error('Error loading links:', error);
        showErrorMessage();
    }
}

function updateProfile(profile) {
    const nameElement = document.getElementById('profile-name');
    const bioElement = document.getElementById('profile-bio');
    const avatarElement = document.getElementById('avatar');
    const titleElement = document.getElementById('page-title');
    
    if (nameElement) nameElement.textContent = profile.name || 'Your Name';
    if (bioElement) bioElement.textContent = profile.bio || 'Your bio here';
    if (avatarElement) avatarElement.src = profile.avatar || 'https://via.placeholder.com/150';
    if (titleElement) titleElement.textContent = `${profile.name || 'Your Name'} - Links`;
}

function applyTheme(theme) {
    document.body.className = theme === 'light' ? 'light' : 'dark';
}

function renderSections(sections) {
    const container = document.getElementById('links-container');
    
    if (!container) {
        console.error('Links container not found');
        return;
    }
    
    container.innerHTML = '';
    let linkIndex = 0;
    
    sections.forEach(section => {
        // Create section header
        const sectionHeader = document.createElement('div');
        sectionHeader.className = 'section-header';
        let headerContent = `<h2>${escapeHtml(section.title)}</h2>`;
        if (section.description) {
            headerContent += `<p class="section-description">${escapeHtml(section.description)}</p>`;
        }
        sectionHeader.innerHTML = headerContent;
        container.appendChild(sectionHeader);
        
        // Create section container
        const sectionContainer = document.createElement('div');
        sectionContainer.className = 'section-links';
        
        section.links.forEach(link => {
            const linkElement = createLinkElement(link, linkIndex);
            sectionContainer.appendChild(linkElement);
            linkIndex++;
        });
        
        container.appendChild(sectionContainer);
    });
}

function renderLinks(links) {
    const container = document.getElementById('links-container');
    
    if (!container) {
        console.error('Links container not found');
        return;
    }
    
    container.innerHTML = '';
    
    links.forEach((link, index) => {
        const linkElement = createLinkElement(link, index);
        container.appendChild(linkElement);
    });
}

function createLinkElement(link, index) {
    const linkElement = document.createElement('a');
    linkElement.href = link.url;
    linkElement.className = 'link-item';
    linkElement.target = '_blank';
    linkElement.rel = 'noopener noreferrer';
    linkElement.style.animationDelay = `${index * 0.1}s`;
    
    // Add click tracking
    linkElement.addEventListener('click', () => {
        trackLinkClick(link.title, link.url);
    });
    
    linkElement.innerHTML = `
        <div class="link-content">
            <div class="link-icon">${link.icon || '🔗'}</div>
            <div class="link-text">
                <div class="link-title">${escapeHtml(link.title)}</div>
                ${link.description ? `<div class="link-description">${escapeHtml(link.description)}</div>` : ''}
            </div>
        </div>
    `;
    
    return linkElement;
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function trackLinkClick(title, url) {
    // Simple click tracking - can be extended with analytics
    console.log(`Link clicked: ${title} -> ${url}`);
    
    // You can add Google Analytics, Plausible, or other tracking here
    // Example: gtag('event', 'link_click', { 'link_title': title, 'link_url': url });
}

function showErrorMessage() {
    const container = document.getElementById('links-container');
    if (container) {
        container.innerHTML = `
            <div class="link-item" style="text-align: center; cursor: default;">
                <div class="link-content">
                    <div class="link-icon">⚠️</div>
                    <div class="link-text">
                        <div class="link-title">Error Loading Links</div>
                        <div class="link-description">Please check your links.json file</div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    const links = document.querySelectorAll('.link-item');
    const currentFocus = document.activeElement;
    const currentIndex = Array.from(links).indexOf(currentFocus);
    
    if (e.key === 'ArrowDown' && currentIndex < links.length - 1) {
        e.preventDefault();
        links[currentIndex + 1].focus();
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        e.preventDefault();
        links[currentIndex - 1].focus();
    } else if (e.key === 'Enter' && currentFocus.classList.contains('link-item')) {
        currentFocus.click();
    }
});

// Make links focusable for keyboard navigation
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .link-item:focus {
            outline: 2px solid rgba(255, 255, 255, 0.8);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
});

// Load links when the page loads
document.addEventListener('DOMContentLoaded', loadLinks);

// Reload links if the JSON file is updated (for development)
if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    let lastModified = null;
    
    setInterval(async () => {
        try {
            const response = await fetch('links.json', { method: 'HEAD' });
            const modified = response.headers.get('last-modified');
            
            if (lastModified && modified !== lastModified) {
                console.log('Links file updated, reloading...');
                loadLinks();
            }
            
            lastModified = modified;
        } catch (error) {
            // Ignore errors in development mode
        }
    }, 2000);
}