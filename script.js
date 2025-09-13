// Typing animation for the roles
const nameElement = document.getElementById('typing-name');
const names = ["Backend Developer", "Aspiring Software Engineer", "Python Developer"];
let nameIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentName = names[nameIndex];
    if (isDeleting) {
        nameElement.textContent = currentName.substring(0, charIndex - 1);
        charIndex--;
    } else {
        nameElement.textContent = currentName.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentName.length) {
        setTimeout(() => isDeleting = true, 2000); // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        nameIndex = (nameIndex + 1) % names.length;
        setTimeout(typeEffect, 500); // Pause before typing next name
        return;
    }

    const typingSpeed = isDeleting ? 70 : 150;
    setTimeout(typeEffect, typingSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
    setupIntersectionObserver(); // Initialize scroll animations
    setupProjectFiltering(); // Initialize project filtering
    enhanceProjectCardAnimations(); // Initialize enhanced project card animations
    setupExperienceInteractions(); // Initialize experience section interactions
    setupProgressBarAnimation(); // Initialize progress bar animations
    setupSkillsSectionInteractions(); // Initialize skills section interactions
});

// Scroll to top button functionality
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

// When the user clicks on the button, scroll to the top of the document
scrollToTopBtn.addEventListener("click", function() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});

// Intersection Observer for scroll animations
function setupIntersectionObserver() {
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Observe elements that should animate
    document.querySelectorAll('.animate-on-scroll, .animate-from-left, .animate-from-right, .animate-scale-in, .section-heading').forEach(element => {
        observer.observe(element);
    });
}

// Project Filtering System
function setupProjectFiltering() {
    const filterTags = document.querySelectorAll('.filter-tag');
    const projectCards = document.querySelectorAll('.project-card');

    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Remove active class from all tags
            filterTags.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tag
            tag.classList.add('active');

            const filterValue = tag.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Project Details Modal System
const projectData = {
    'schedule-life-ai': {
        title: 'Schedule-life AI',
        duration: 'Jun 2025 - July 2025',
        icon: 'fas fa-robot',
        description: 'A sophisticated conversational AI assistant designed to intelligently schedule appointments and manage calendar events through natural language processing.',
        features: [
            'Natural language appointment scheduling with intuitive queries',
            'Seamless Google Calendar integration with OAuth 2.0 security',
            'Advanced NLP pipeline using SpaCy for intent recognition',
            'Robust conversation flow management with Lang Graph',
            'Smart date and time parsing from free-text input',
            'Secure credential management for API authentication'
        ],
        technologies: ['FastAPI', 'Python', 'SpaCy', 'Lang Graph', 'Google Calendar API', 'OAuth 2.0', 'NLP', 'Date Parser'],
        githubUrl: 'https://github.com/ankitkumar/schedule-life-ai',
        demoUrl: '#'
    },
    'scrap-force': {
        title: 'Scrap Force',
        duration: 'July 2024 - Sep 2024',
        icon: 'fas fa-spider',
        description: 'An intelligent web scraping system specifically designed for competitive programming platforms, providing real-time performance analytics and insights.',
        features: [
            'Automated data extraction from Codeforces contests',
            'Real-time performance metrics and statistics',
            'Advanced error handling with 30% improved accuracy',
            'Terminal-based analytics dashboard',
            'Automated data processing and cleaning',
            'Performance tracking and historical analysis'
        ],
        technologies: ['Python', 'Beautiful Soup', 'Requests', 'Pandas', 'Web Scraping', 'Data Processing', 'Terminal UI'],
        githubUrl: 'https://github.com/ankitkumar/scrap-force',
        demoUrl: '#'
    }
};

function showProjectDetails(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    // Update modal content
    document.getElementById('modalProjectIcon').className = project.icon + ' text-4xl text-teal-400 mr-4';
    document.getElementById('modalProjectTitle').textContent = project.title;
    document.getElementById('modalProjectDuration').textContent = project.duration;
    document.getElementById('modalProjectDesc').innerHTML = `<p>${project.description}</p>`;

    // Update features
    const featuresList = project.features.map(feature => `<li class="mb-2">${feature}</li>`).join('');
    document.getElementById('modalProjectFeatures').innerHTML = `<ul class="list-disc list-inside space-y-2">${featuresList}</ul>`;

    // Update technologies
    const techBadges = project.technologies.map(tech => 
        `<span class="tech-badge">${tech}</span>`
    ).join('');
    document.getElementById('modalProjectTechnologies').innerHTML = techBadges;

    // Update links
    document.getElementById('modalProjectGitHub').href = project.githubUrl;
    document.getElementById('modalProjectDemo').href = project.demoUrl;

    // Show modal
    document.getElementById('projectDetailsModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('projectDetailsModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('projectDetailsModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Enhanced scroll animations for project cards
function enhanceProjectCardAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        
        // Add staggered animation on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = `slideInUp 0.8s ease forwards`;
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(card);
    });
}

// Experience Section Interactive Features
function setupExperienceInteractions() {
    const experienceCards = document.querySelectorAll('.experience-card');
    const skillItems = document.querySelectorAll('.skill-item');
    const achievementItems = document.querySelectorAll('.achievement-item');
    
    // Experience card hover effects
    experienceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 188, 212, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Skill items interactive effects
    skillItems.forEach(item => {
        item.addEventListener('click', () => {
            // Add pulse effect
            item.style.animation = 'pulse 0.6s ease';
            setTimeout(() => {
                item.style.animation = '';
            }, 600);
            
            // Show skill description tooltip
            showSkillTooltip(item);
        });
        
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Achievement items staggered animation
    achievementItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        
        item.addEventListener('click', () => {
            // Toggle highlight effect
            item.classList.toggle('achievement-highlighted');
        });
    });
}

// Progress Bar Animation
function setupProgressBarAnimation() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                entry.target.classList.add('progress-animated');
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Experience Details Modal
function showExperienceDetails(experienceId) {
    const experienceData = {
        'intern': {
            title: 'Software Developer Intern',
            company: 'YugaYatra Retail (OPC) Pvt. Ltd.',
            duration: 'July 2025 - Sep 2025',
            description: 'Worked as a Software Developer Intern focusing on web development, AI integration, and cloud deployment. Successfully delivered multiple production websites and optimized development workflows.',
            achievements: [
                'Developed 3+ production websites including divorce.in, 12thfail, and LinkCab',
                'Enhanced user accessibility and client reach through innovative web solutions',
                'Reduced release time by 30% using modern cloud tools and AI assistance',
                'Designed user-friendly interfaces using collaborative design tools'
            ],
            technologies: ['Web Development', 'Cursor AI', 'Vercel', 'Firebase', 'Canva', 'HTML/CSS', 'JavaScript'],
            skills: ['Frontend Development', 'AI Tools Integration', 'Cloud Deployment', 'UI/UX Design', 'Project Management'],
            impact: 'Successfully contributed to multiple client projects, improving development efficiency and user experience across all delivered websites.'
        }
    };
    
    const experience = experienceData[experienceId];
    if (!experience) return;
    
    // Create modal content dynamically
    const modalContent = `
        <div class="experience-modal-content">
            <div class="modal-header">
                <h3 class="text-3xl font-bold text-teal-400 mb-2">${experience.title}</h3>
                <p class="text-gray-300 mb-2">${experience.company}</p>
                <p class="text-gray-400 text-sm mb-4">${experience.duration}</p>
            </div>
            
            <div class="modal-body">
                <div class="mb-6">
                    <h4 class="text-xl font-semibold text-teal-300 mb-3">Role Description</h4>
                    <p class="text-gray-300">${experience.description}</p>
                </div>
                
                <div class="mb-6">
                    <h4 class="text-xl font-semibold text-teal-300 mb-3">Key Achievements</h4>
                    <ul class="list-disc list-inside space-y-2 text-gray-300">
                        ${experience.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="mb-6">
                    <h4 class="text-xl font-semibold text-teal-300 mb-3">Technologies Used</h4>
                    <div class="flex flex-wrap gap-2">
                        ${experience.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="mb-6">
                    <h4 class="text-xl font-semibold text-teal-300 mb-3">Skills Developed</h4>
                    <div class="flex flex-wrap gap-2">
                        ${experience.skills.map(skill => `<span class="tech-badge">${skill}</span>`).join('')}
                    </div>
                </div>
                
                <div class="mb-6">
                    <h4 class="text-xl font-semibold text-teal-300 mb-3">Impact</h4>
                    <p class="text-gray-300">${experience.impact}</p>
                </div>
            </div>
        </div>
    `;
    
    // Show modal (reuse existing modal structure)
    const modal = document.getElementById('projectDetailsModal');
    modal.querySelector('.modal-content').innerHTML = modalContent;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Toggle Achievements Visibility
function toggleAchievements() {
    const achievementsSection = document.querySelector('.achievements-section');
    const achievementsList = document.querySelector('.achievements-list');
    
    if (achievementsList.style.display === 'none') {
        achievementsList.style.display = 'block';
        achievementsSection.querySelector('h4 i').className = 'fas fa-trophy mr-2';
    } else {
        achievementsList.style.display = 'none';
        achievementsSection.querySelector('h4 i').className = 'fas fa-eye-slash mr-2';
    }
}

// Skill Tooltip Function
function showSkillTooltip(skillItem) {
    const skillName = skillItem.querySelector('span').textContent;
    const tooltipData = {
        'Web Development': 'Frontend and backend development using modern frameworks and technologies',
        'AI Tools': 'Integration and utilization of AI-powered development tools for enhanced productivity',
        'Cloud Platforms': 'Deployment and management of applications on cloud infrastructure',
        'UI/UX Design': 'Creating intuitive and engaging user interfaces and experiences'
    };
    
    const tooltip = document.createElement('div');
    tooltip.className = 'skill-tooltip';
    tooltip.textContent = tooltipData[skillName] || 'Skill description not available';
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        z-index: 1000;
        max-width: 200px;
        text-align: center;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const rect = skillItem.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    // Show tooltip
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);
    
    // Remove tooltip after delay
    setTimeout(() => {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(tooltip);
        }, 300);
    }, 2000);
}

// Enhanced Achievement Highlighting
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS for achievement highlighting
    const style = document.createElement('style');
    style.textContent = `
        .achievement-highlighted {
            background: rgba(0, 188, 212, 0.1) !important;
            border-left-color: #00BCD4 !important;
            transform: translateX(8px) !important;
        }
        
        .skill-tooltip {
            animation: tooltipFadeIn 0.3s ease;
        }
        
        @keyframes tooltipFadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});

// Skills Section Interactive Features - Isolated to Skills Section Only
function setupSkillsSectionInteractions() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;
    
    const skillCards = skillsSection.querySelectorAll('.card');
    const skillItems = skillsSection.querySelectorAll('li[data-skill]');
    
    // Skill card hover effects
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 188, 212, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Skill item interactions
    skillItems.forEach(item => {
        item.addEventListener('click', () => {
            const skillName = item.textContent.trim();
            const skillLevel = item.getAttribute('data-level');
            showSkillTooltipForSkillsSection(item, skillName, skillLevel);
            
            // Add pulse effect
            item.style.animation = 'pulse 0.6s ease';
            setTimeout(() => {
                item.style.animation = '';
            }, 600);
        });
        
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(8px)';
            item.style.borderLeftColor = '#00BCD4';
            item.style.background = 'rgba(255, 255, 255, 0.08)';
            item.style.color = '#FFFFFF';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
            item.style.borderLeftColor = 'transparent';
            item.style.background = 'rgba(255, 255, 255, 0.05)';
            item.style.color = '#E0E0E0';
        });
    });
    
    // Add skill level animations
    animateSkillLevels();
}

// Skill tooltip function specifically for skills section
function showSkillTooltipForSkillsSection(skillItem, skillName, skillLevel) {
    const skillData = {
        'leadership': {
            description: 'Strong leadership skills developed through leading coding competitions and technical events. Experienced in managing teams and coordinating group projects.',
            experience: '2+ years of leadership experience in academic and technical settings',
            projects: ['Schedule-life AI Project Lead', 'Scrap Force Team Coordination', 'Academic Project Management']
        },
        'collaboration': {
            description: 'Excellent collaboration skills with experience working in diverse teams. Strong communication and coordination abilities.',
            experience: '3+ years of collaborative development experience',
            projects: ['Multi-developer Web Projects', 'Academic Group Projects', 'Open Source Contributions']
        },
        'problem-solving': {
            description: 'Strong analytical and problem-solving skills with experience in complex algorithm design and debugging.',
            experience: '4+ years of problem-solving in competitive programming and development',
            projects: ['Competitive Programming Solutions', 'Algorithm Optimization', 'Complex Bug Resolution']
        },
        'visual-design': {
            description: 'Good understanding of visual design principles with experience in creating user-friendly interfaces.',
            experience: '1+ year of design experience in web projects',
            projects: ['Website UI Design', 'User Interface Mockups', 'Visual Asset Creation']
        },
        'python': {
            description: 'Advanced Python programming skills with extensive experience in web development, AI/ML, and automation.',
            experience: '3+ years of Python development experience',
            projects: ['Schedule-life AI', 'Scrap Force', 'Web Applications', 'Automation Scripts']
        },
        'git': {
            description: 'Proficient in version control and collaborative development workflows.',
            experience: '2+ years of Git/GitHub experience',
            projects: ['Project Version Control', 'Collaborative Development', 'Code Repository Management']
        },
        'fastapi': {
            description: 'Modern Python web framework expertise for building high-performance APIs.',
            experience: '1+ year of FastAPI development experience',
            projects: ['Schedule-life AI Backend', 'RESTful API Development', 'High-Performance Web Services']
        },
        'spacy': {
            description: 'Natural Language Processing library expertise for text processing and analysis.',
            experience: '1+ year of NLP development experience',
            projects: ['Schedule-life AI NLP Pipeline', 'Text Processing Applications', 'Language Model Integration']
        },
        'flask': {
            description: 'Lightweight Python web framework for rapid application development.',
            experience: '1+ year of Flask development experience',
            projects: ['Web Application Development', 'Microservice Architecture', 'Rapid Prototyping']
        },
        'streamlit': {
            description: 'Rapid web app development framework for data science applications.',
            experience: '1+ year of Streamlit development experience',
            projects: ['Data Science Dashboards', 'ML Model Deployment', 'Interactive Visualizations']
        },
        'mysql': {
            description: 'Database management and querying with SQL.',
            experience: '6+ months of database experience',
            projects: ['Database Design', 'Query Optimization', 'Data Analysis']
        },
        'tkinter': {
            description: 'Python GUI application development for desktop applications.',
            experience: '1+ year of GUI development experience',
            projects: ['Desktop Applications', 'GUI Tools', 'User Interface Development']
        },
        'dsa': {
            description: 'Strong foundation in data structures and algorithms for efficient problem-solving.',
            experience: '3+ years of DSA experience',
            projects: ['Competitive Programming', 'Algorithm Optimization', 'Complex Problem Solving']
        },
        'html': {
            description: 'Web content structuring and semantic markup expertise.',
            experience: '2+ years of HTML development experience',
            projects: ['Website Development', 'Responsive Layouts', 'Semantic Markup']
        },
        'css': {
            description: 'Styling and responsive web design with modern CSS techniques.',
            experience: '2+ years of CSS development experience',
            projects: ['Responsive Web Design', 'CSS Animations', 'Layout Development']
        },
        'english': {
            description: 'Fluent communication and technical writing in English.',
            experience: 'Native-level proficiency',
            projects: ['Technical Documentation', 'Project Presentations', 'Professional Communication']
        },
        'hindi': {
            description: 'Native language proficiency with excellent communication skills.',
            experience: 'Native speaker',
            projects: ['Local Communication', 'Cultural Projects', 'Regional Development']
        }
    };
    
    const skill = skillData[skillName.toLowerCase().replace(/\s+/g, '-').replace('&', '')];
    if (!skill) return;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'skill-tooltip';
    tooltip.innerHTML = `
        <div style="margin-bottom: 8px;">
            <strong style="color: #00BCD4;">${skillName}</strong>
            <span style="background: ${getLevelColor(skillLevel)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; margin-left: 8px;">${skillLevel.toUpperCase()}</span>
        </div>
        <div style="font-size: 12px; margin-bottom: 6px;">${skill.description}</div>
        <div style="font-size: 11px; color: #B0B0B0; margin-bottom: 4px;">${skill.experience}</div>
        <div style="font-size: 10px; color: #00BCD4;">Projects: ${skill.projects.join(', ')}</div>
    `;
    
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const rect = skillItem.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    // Show tooltip
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);
    
    // Remove tooltip after delay
    setTimeout(() => {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(tooltip)) {
                document.body.removeChild(tooltip);
            }
        }, 300);
    }, 3000);
}

// Get level color for skill badges
function getLevelColor(level) {
    const colors = {
        'expert': '#22C55E',
        'advanced': '#3B82F6',
        'intermediate': '#F59E0B',
        'basic': '#9CA3AF'
    };
    return colors[level] || '#9CA3AF';
}

// Animate skill levels on scroll
function animateSkillLevels() {
    const skillLevels = document.querySelectorAll('#skills .skill-level');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'pulse 1s ease-in-out';
                setTimeout(() => {
                    entry.target.style.animation = '';
                }, 1000);
            }
        });
    }, { threshold: 0.5 });
    
    skillLevels.forEach(level => {
        observer.observe(level);
    });
}
