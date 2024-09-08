document.addEventListener('DOMContentLoaded', () => {
    // Toggle Skills Section
    const toggleSkillsImage = document.querySelector('.toggleSkills');
    const skillContent = document.querySelector('.skillContent');
    
    if (toggleSkillsImage && skillContent) {
        // Set initial state: expanded
        skillContent.classList.add('visible');
        toggleSkillsImage.classList.add('expand');

        toggleSkillsImage.addEventListener('click', () => {
            skillContent.classList.toggle('invisible');
            skillContent.classList.toggle('visible');
            toggleSkillsImage.classList.toggle('expand');
        });
    }

    // Toggle Certificates Section
    const toggleCertificateImage = document.querySelector('.toggleCertificate');
    const certificateContent = document.querySelector('.certificateContent');
    
    if (toggleCertificateImage && certificateContent) {
        // Set initial state: expanded
        certificateContent.classList.add('visible');
        toggleCertificateImage.classList.add('expand');

        toggleCertificateImage.addEventListener('click', () => {
            certificateContent.classList.toggle('invisible');
            certificateContent.classList.toggle('visible');
            toggleCertificateImage.classList.toggle('expand');
        });
    }

    // Display Data from Local Storage
    const data = JSON.parse(localStorage.getItem('resumeData'));
    
    if (data) {
        document.getElementById('name').textContent = data.name || 'N/A';
        document.getElementById('profession').textContent = data.profession || 'N/A';
        document.getElementById('gender').textContent = data.gender || 'N/A';
        document.getElementById('dob').textContent = data.dob || 'N/A';
        document.getElementById('phone').textContent = data.phone || 'N/A';
        document.getElementById('email').textContent = data.email || 'N/A';
        document.getElementById('website').textContent = data.website || 'N/A';
        document.getElementById('location').textContent = data.location || 'N/A';

        // Display Skills
        const skillsContainer = document.getElementById('skillsContainer');
        skillsContainer.innerHTML = '';
        (data.skills || []).forEach((skillData, index) => {
            const skillEntry = document.createElement('div');
            skillEntry.classList.add('skill-entry');
            skillEntry.innerHTML = `
                <strong>Skill ${index + 1}:</strong> ${skillData.skill || 'N/A'}
                <div class="tags-container">
                    ${skillData.tags.map((tag, i) => `<div>Tag ${i + 1}: ${tag || 'N/A'}</div>`).join('')}
                </div>
            `;
            skillsContainer.appendChild(skillEntry);
        });

        document.getElementById('summary-text').textContent = data.summary || 'N/A';
        document.getElementById('education-university').textContent = data.educationUniversity || 'N/A';
        document.getElementById('education-university-details').textContent = data.educationUniversityDetails || 'N/A';
        document.getElementById('education-college').textContent = data.educationCollege || 'N/A';
        document.getElementById('education-college-details').textContent = data.educationCollegeDetails || 'N/A';
        document.getElementById('education-school').textContent = data.educationSchool || 'N/A';
        document.getElementById('education-school-details').textContent = data.educationSchoolDetails || 'N/A';
        document.getElementById('experience-company-1').textContent = data.experienceCompany1 || 'N/A';
        document.getElementById('experience-position-1').textContent = data.experiencePosition1 || 'N/A';
        document.getElementById('experience-company-2').textContent = data.experienceCompany2 || 'N/A';
        document.getElementById('experience-position-2').textContent = data.experiencePosition2 || 'N/A';
    }

    // Toggle Edit Mode
    const editButton = document.getElementById('editBtn');
    let isEditing = false;

    editButton.addEventListener('click', () => {
        isEditing = !isEditing;
        toggleEditMode();
    });

    function toggleEditMode() {
        const editableElements = document.querySelectorAll('[id]');
        editableElements.forEach(el => {
            if (isEditing) {
                if (['H1', 'H3', 'P', 'SPAN'].includes(el.tagName)) {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = el.innerText;
                    input.classList.add('edit-input');
                    input.dataset.originalTag = el.tagName.toLowerCase();
                    el.replaceWith(input);
                }
            } else {
                const inputs = document.querySelectorAll('.edit-input');
                inputs.forEach(input => {
                    const tag = input.dataset.originalTag.toUpperCase();
                    const newElement = document.createElement(tag);
                    newElement.innerText = input.value;
                    input.replaceWith(newElement);
                });
            }
        });
    }

    // Display Data from URL Parameters
    const queryParams = new URLSearchParams(window.location.search);

    // Display data from query parameters
    document.getElementById('nameDisplay').textContent = queryParams.get('name') || '';
    document.getElementById('professionDisplay').textContent = queryParams.get('profession') || '';
    document.getElementById('genderDisplay').textContent = queryParams.get('gender') || '';
    document.getElementById('dobDisplay').textContent = queryParams.get('dob') || '';
    document.getElementById('phoneDisplay').textContent = queryParams.get('phone') || '';
    document.getElementById('emailDisplay').textContent = queryParams.get('email') || '';
    document.getElementById('websiteDisplay').textContent = queryParams.get('website') || '';
    document.getElementById('locationDisplay').textContent = queryParams.get('location') || '';

    // Assuming skills are serialized as a JSON string in the query parameters
    const skillsJson = queryParams.get('skills');
    if (skillsJson) {
        try {
            const skills = JSON.parse(skillsJson);
            const skillsContainer = document.getElementById('skillsContainer');
            skills.forEach((skillData, index) => {
                const skillEntry = document.createElement('div');
                skillEntry.classList.add('skill-entry');
                skillEntry.innerHTML = `
                    <label>Skill ${index + 1}:</label>
                    <input type="text" class="skillInput" value="${skillData.skill}">
                    <div class="tags-container">
                        <label>Skill Tags:</label>
                        ${skillData.tags.map((tag, tagIndex) => `
                            <input type="text" class="tagInput" value="${tag}">
                        `).join('')}
                    </div>
                `;
                skillsContainer.appendChild(skillEntry);
            });
        } catch (e) {
            console.error('Error parsing skills data:', e);
        }
    }
});
