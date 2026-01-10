document.addEventListener('DOMContentLoaded', () => {
    const gridElement = document.getElementById('card-grid');
    const DATA_URL = './data.json';

    fetchProfiles();

    async function fetchProfiles() {
        try {
            const response = await fetch(DATA_URL);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const profiles = await response.json();

            // Sort profiles by name (ascending)
            profiles.sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));

            renderProfiles(profiles);

        } catch (error) {
            console.error('Error fetching data:', error);
            showError('프로필 데이터를 불러오는 도중 오류가 발생했습니다.<br>잠시 후 다시 시도해주세요.');
        }
    }

    function renderProfiles(profiles) {
        // Clear loading message
        gridElement.innerHTML = '';

        profiles.forEach(profile => {
            const card = createProfileCard(profile);
            gridElement.appendChild(card);
        });
    }

    function createProfileCard(profile) {
        const article = document.createElement('article');
        article.className = 'profile-card';

        // Major Badge Logic
        let badgeClass = 'badge-neutral'; // Default
        let badgeText = '확인필요';

        if (profile.is_major === true || profile.is_major === '전공') {
            badgeClass = 'badge-major';
            badgeText = '전공';
        } else if (profile.is_major === false || profile.is_major === '비전공') {
            badgeClass = 'badge-non-major';
            badgeText = '비전공';
        } else if (profile.is_major) {
            // Fallback for other truthy strings if any, or keep default 'check required' for specific string
            if (profile.is_major !== '확인필요') {
                badgeText = profile.is_major;
            }
        }

        // Tech Stack Logic
        const techStackHtml = profile.tech_stack
            .map(tech => `<span class="tech-pill">${escapeHtml(tech)}</span>`)
            .join('');

        // Contact Logic
        let contactHtml = '';
        const contacts = profile.contacts || {};

        // Check legacy 'contact' field if exists (backward compatibility or user error)
        if (profile.contact && typeof profile.contact === 'string') {
            // Attempt to guess type if not in new format
            const type = profile.contact.includes('@') ? 'email' : 'link';
            contacts[type] = profile.contact;
        }

        const iconMap = {
            email: 'fa-solid fa-envelope',
            github: 'fa-brands fa-github',
            linkedin: 'fa-brands fa-linkedin',
            instagram: 'fa-brands fa-instagram',
            x: 'fa-brands fa-x-twitter',
            twitter: 'fa-brands fa-twitter',
            blog: 'fa-solid fa-rss',
            website: 'fa-solid fa-globe',
            default: 'fa-solid fa-link'
        };

        const contactKeys = Object.keys(contacts);
        if (contactKeys.length > 0) {
            contactHtml = '<div class="contact-buttons">';
            for (const [key, value] of Object.entries(contacts)) {
                if (!value) continue;

                let iconClass = iconMap[key.toLowerCase()] || iconMap.default;
                // Dynamic check for keys not in map but value implies type? 
                // (Simplified: rely on key or fall back to default)

                const href = key === 'email' ? `mailto:${value}` : value;
                const title = key.charAt(0).toUpperCase() + key.slice(1);

                contactHtml += `<a href="${escapeHtml(href)}" class="contact-icon" target="_blank" title="${title}"><i class="${iconClass}"></i></a>`;
            }
            contactHtml += '</div>';
        }

        // Default avatar if missing
        const profileImage = profile.profile_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=random`;

        article.innerHTML = `
            <div class="card-header-image">
                <img src="${escapeHtml(profileImage)}" alt="${escapeHtml(profile.name)}의 프로필 사진" class="profile-img">
            </div>
            <div class="card-content">
                <div class="card-title-row">
                    <h2>${escapeHtml(profile.name)}</h2>
                    <span class="badge ${badgeClass}">${badgeText}</span>
                </div>
                
                <div class="card-body">
                    <div class="info-group">
                        <span class="info-label">주력 기술 스택</span>
                        <div class="tech-stack-container">
                            ${techStackHtml}
                        </div>
                    </div>
                    
                    <div class="info-group">
                        <span class="info-label">관심 분야</span>
                        <div class="info-content">${escapeHtml(profile.interest)}</div>
                    </div>
                    
                    <div class="info-group">
                        <span class="info-label">경력 / 경험</span>
                        <div class="info-content">${escapeHtml(profile.experience)}</div>
                    </div>
                    
                    ${profile.intro ? `
                    <div class="info-group">
                        <div class="intro-text">"${escapeHtml(profile.intro)}"</div>
                    </div>` : ''}

                    ${profile.memo ? `
                    <div class="info-group">
                        <span class="info-label">특이사항</span>
                        <div class="info-content memo-text">${escapeHtml(profile.memo)}</div>
                    </div>` : ''}
                </div>
                <div class="card-footer">
                    ${contactHtml}
                </div>
            </div>
        `;

        return article;
    }

    function showError(message) {
        gridElement.innerHTML = `<div class="error-message">${message}</div>`;
    }

    // Basic XSS protection
    function escapeHtml(text) {
        if (!text) return '';
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
});
