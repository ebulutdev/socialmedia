// Simple Router for Multi-Page Navigation

let currentPlatformData = null;
let currentServiceData = null;
let selectedPackage = null;

// Initialize router
function initRouter() {
    // Handle hash changes
    window.addEventListener('hashchange', handleRoute);
    
    // Handle initial load
    handleRoute();
}

// Handle route changes
function handleRoute() {
    const hash = window.location.hash.slice(1) || 'home';
    const parts = hash.split('/');
    const page = parts[0];

    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    if (page === 'home' || page === '') {
        showHomePage();
    } else if (page === 'platform' && parts[1]) {
        showPlatformPage(parts[1]);
    } else if (page === 'service' && parts[1] && parts[2]) {
        showServicePage(parts[1], parts[2]);
    }
}

// Navigation functions
function goToHome() {
    window.location.hash = 'home';
}

function goToPlatform(platform) {
    window.location.hash = `platform/${platform}`;
}

function goToService(platform, serviceType) {
    window.location.hash = `service/${platform}/${serviceType}`;
}

function goBackToPlatform() {
    if (currentPlatformData) {
        goToPlatform(currentPlatformData.id);
    }
}

// Page display functions
function showHomePage() {
    document.getElementById('homePage').classList.add('active');
}

function showPlatformPage(platform) {
    const page = document.getElementById('platformPage');
    page.classList.add('active');
    
    // Update breadcrumb
    document.getElementById('currentPlatform').textContent = getPlatformName(platform);
    
    // Load platform services
    loadPlatformServices(platform);
}

function showServicePage(platform, serviceType) {
    const page = document.getElementById('servicePage');
    page.classList.add('active');
    
    // Update breadcrumbs
    document.getElementById('breadcrumbPlatform').textContent = getPlatformName(platform);
    document.getElementById('currentService').textContent = getServiceName(serviceType);
    
    // Load service packages
    loadServicePackages(platform, serviceType);
}

// Helper functions
function getPlatformName(platform) {
    const names = {
        'instagram': 'Instagram',
        'twitter': 'Twitter',
        'tiktok': 'TikTok',
        'youtube': 'YouTube',
        'facebook': 'Facebook'
    };
    return names[platform] || platform;
}

function getServiceName(serviceType) {
    const names = {
        'followers': 'Takipçi',
        'likes': 'Beğeni',
        'views': 'İzlenme',
        'subscribers': 'Abone',
        'comments': 'Yorum',
        'retweets': 'Retweet',
        'watchtime': 'İzlenme Saati'
    };
    return names[serviceType] || serviceType;
}

function getPlatformIcon(platform) {
    const icons = {
        'instagram': 'fab fa-instagram',
        'twitter': 'fab fa-twitter',
        'tiktok': 'fab fa-tiktok',
        'youtube': 'fab fa-youtube',
        'facebook': 'fab fa-facebook'
    };
    return icons[platform] || 'fas fa-rocket';
}

function getPlatformColor(platform) {
    const colors = {
        'instagram': 'linear-gradient(135deg, #E4405F, #C13584)',
        'twitter': 'linear-gradient(135deg, #1DA1F2, #0c8bd9)',
        'tiktok': 'linear-gradient(135deg, #000000, #444444)',
        'youtube': 'linear-gradient(135deg, #FF0000, #cc0000)',
        'facebook': 'linear-gradient(135deg, #4267B2, #365899)'
    };
    return colors[platform] || 'linear-gradient(135deg, #667eea, #764ba2)';
}

// Load platform services
function loadPlatformServices(platform) {
    currentPlatformData = { id: platform };
    
    const header = document.getElementById('serviceHeader');
    const icon = document.getElementById('headerIcon');
    const title = document.getElementById('headerTitle');
    const desc = document.getElementById('headerDesc');
    
    // Update header
    icon.className = getPlatformIcon(platform);
    title.textContent = `${getPlatformName(platform)} Hizmetleri`;
    desc.textContent = `Güvenilir, kaliteli ve profesyonel ${getPlatformName(platform)} hizmetleri`;
    header.style.background = getPlatformColor(platform);
    
    // Get services for this platform
    const services = getServicesForPlatform(platform);
    
    // Render services
    const grid = document.getElementById('serviceGrid');
    grid.innerHTML = services.map(service => `
        <div class="service-card" onclick="goToService('${platform}', '${service.type}')">
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <div class="service-info">
                <h3>${service.name}</h3>
                <span class="service-meta">${service.count} Paket</span>
            </div>
            <button class="service-action">
                Paketleri İncele
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `).join('');
}

// Get services for platform
function getServicesForPlatform(platform) {
    const allPackages = [...featuredPackages, ...twitterPackages, ...tiktokPackages, ...youtubePackages, ...facebookPackages];
    
    // Group by platform and service type
    const platformPackages = allPackages.filter(p => p.platform === platform);
    
    // Group by category
    const grouped = {};
    platformPackages.forEach(pkg => {
        const type = getServiceType(pkg.category);
        if (!grouped[type]) {
            grouped[type] = {
                type: type,
                name: pkg.category,
                icon: pkg.icon,
                packages: []
            };
        }
        grouped[type].packages.push(pkg);
    });
    
    // Convert to array
    return Object.values(grouped).map(g => ({
        type: g.type,
        name: g.name,
        icon: 'fas ' + g.icon,
        count: g.packages.length
    }));
}

function getServiceType(category) {
    if (category.includes('Takipçi')) return 'followers';
    if (category.includes('Beğeni')) return 'likes';
    if (category.includes('İzlenme')) return 'views';
    if (category.includes('Abone')) return 'subscribers';
    if (category.includes('Yorum')) return 'comments';
    if (category.includes('Retweet')) return 'retweets';
    if (category.includes('Saat')) return 'watchtime';
    if (category.includes('Görüntülenme')) return 'views';
    return 'other';
}

// Load service packages
function loadServicePackages(platform, serviceType) {
    currentPlatformData = { id: platform };
    currentServiceData = { type: serviceType };
    
    const allPackages = [...featuredPackages, ...twitterPackages, ...tiktokPackages, ...youtubePackages, ...facebookPackages];
    
    // Filter packages
    const packages = allPackages.filter(p => 
        p.platform === platform && 
        getServiceType(p.category) === serviceType
    );
    
    // Update header
    document.getElementById('packageTitle').textContent = 
        `${getPlatformName(platform)} ${getServiceName(serviceType)} Paketleri`;
    document.getElementById('packageDesc').textContent = 
        `En uygun fiyatlı ${getServiceName(serviceType).toLowerCase()} paketleri`;
    
    // Render packages
    const grid = document.getElementById('packageGrid');
    grid.innerHTML = packages.map(pkg => createPackageCard(pkg)).join('');
}

// Create package card (Premium format - No limits)
function createPackageCard(pkg) {
    return `
        <div class="package-card">
            <div class="package-card-header">
                <i class="${getPlatformIcon(pkg.platform)}"></i>
                <h3>${pkg.name}</h3>
            </div>
            <div class="package-card-body">
                <div class="package-features-grid">
                    ${pkg.features.map((f, i) => `
                        <div class="feature-item">
                            <div class="feature-icon">
                                <i class="${getFeatureIcon(i)}"></i>
                            </div>
                            <div class="feature-text">${f}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="package-card-footer">
                <div class="package-options">
                    ${pkg.packages.map(pack => `
                        <button class="package-price-btn" onclick="selectPackageOption(event, '${pkg.id}', ${pack.amount}, ${pack.price})">
                            <span class="amount">${pack.amount >= 1000 ? (pack.amount / 1000) + 'K' : pack.amount}</span>
                            <span class="price">${pack.price.toFixed(2)} ₺</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function getFeatureIcon(index) {
    const icons = ['fa-users', 'fa-gift', 'fa-clock', 'fa-shield-alt', 'fa-lock', 'fa-headset'];
    return 'fas ' + (icons[index] || 'fa-check');
}

// Select package option
function selectPackageOption(event, packageId, amount, price) {
    event.stopPropagation();
    
    // Remove active from all
    document.querySelectorAll('.package-price-btn').forEach(btn => btn.classList.remove('active'));
    
    // Add active to clicked
    event.currentTarget.classList.add('active');
    
    // Store selection
    selectedPackage = { packageId, amount, price };
    
    // Show order modal
    showOrderModal(packageId, amount, price);
}

// Order modal functions
function showOrderModal(packageId, amount, price) {
    const modal = document.getElementById('orderModal');
    modal.classList.add('active');
    
    document.getElementById('quantity').value = amount;
    document.getElementById('orderPrice').textContent = `₺${price.toFixed(2)}`;
    document.getElementById('quantityHint').textContent = `Seçilen: ${amount}`;
}

function closeOrderModal() {
    document.getElementById('orderModal').classList.remove('active');
    document.querySelectorAll('.package-price-btn').forEach(btn => btn.classList.remove('active'));
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRouter);
} else {
    initRouter();
}
