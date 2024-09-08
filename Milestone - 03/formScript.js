document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dataForm');
    const saveButton = document.getElementById('saveDataBtn');
    const skillsContainer = document.getElementById('skillsContainer');

    // Load existing data if available
    loadData();

    // Event listener to save data
    saveButton.addEventListener('click', () => {
        const data = {
            name: document.getElementById('nameInput').value,
            profession: document.getElementById('professionInput').value,
            gender: document.getElementById('genderInput').value,
            dob: document.getElementById('dobInput').value,
            phone: document.getElementById('phoneInput').value,
            email: document.getElementById('emailInput').value,
            website: document.getElementById('websiteInput').value,
            location: document.getElementById('locationInput').value,
            skills: getSkillsData(),
            // certificate: document.getElementById('certificateInput').value,
            summary: document.getElementById('summaryInput').value,
            educationUniversity: document.getElementById('educationUniversityInput').value,
            educationUniversityDetails: document.getElementById('educationUniversityDetailsInput').value,
            educationCollege: document.getElementById('educationCollegeInput').value,
            educationCollegeDetails: document.getElementById('educationCollegeDetailsInput').value,
            educationSchool: document.getElementById('educationSchoolInput').value,
            educationSchoolDetails: document.getElementById('educationSchoolDetailsInput').value,
            experienceCompany1: document.getElementById('experienceCompany1Input').value,
            experiencePosition1: document.getElementById('experiencePosition1Input').value,
            experienceCompany2: document.getElementById('experienceCompany2Input').value,
            experiencePosition2: document.getElementById('experiencePosition2Input').value
        };

        localStorage.setItem('resumeData', JSON.stringify(data));
        alert('Data saved successfully!');
    });

    function loadData() {
        const data = JSON.parse(localStorage.getItem('resumeData'));
    
        if (data) {
            const elementIds = [
                'nameInput', 'professionInput', 'genderInput', 'dobInput', 'phoneInput',
                'emailInput', 'websiteInput', 'locationInput', 'certificateInput',
                'summaryInput', 'educationUniversityInput', 'educationUniversityDetailsInput',
                'educationCollegeInput', 'educationCollegeDetailsInput', 'educationSchoolInput',
                'educationSchoolDetailsInput', 'experienceCompany1Input', 'experiencePosition1Input',
                'experienceCompany2Input', 'experiencePosition2Input'
            ];
    
            elementIds.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    element.value = data[id.replace('Input', '')] || '';
                } else {
                    console.warn(`Element with ID ${id} not found.`);
                }
            });
    
            // loadSkillsData(data.skills || []);
        }
    }
    
    function getSkillsData() {
        const skillsData = [];
        const skillEntries = skillsContainer.getElementsByClassName('skill-entry');
        for (let skillEntry of skillEntries) {
            const skill = skillEntry.querySelector('.skillInput').value;
            const tags = [];
            for (let i = 1; i <= 3; i++) {
                const tagInput = skillEntry.querySelector(`#skillTagInput${i}`);
                if (tagInput) {
                    tags.push(tagInput.value);
                }
            }
            skillsData.push({ skill, tags });
        }
        return skillsData;
    }

    function loadSkillsData(skills) {
        skillsContainer.innerHTML = ''; // Clear existing skills
    
        skills.forEach((skillData, index) => {
            // Create a new skill entry container
            const skillEntry = document.createElement('div');
            skillEntry.classList.add('skill-entry');
            skillEntry.innerHTML = `
                <
                <ul class="skill-tags m-l p-1" id="skillTags${index + 1}">
                    ${skillData.tags.map((tag, tagIndex) => `
                        <li class="m-l"><span class="p-r" id="">${tag || ''}</span></li>
                    `).join('')}
                </ul>
            `;
            // Append the new skill entry to the container
            skillsContainer.appendChild(skillEntry);
        });
    }
    
    
    

    document.getElementById('addSkillBtn').addEventListener('click', () => {
        const skillCount = skillsContainer.getElementsByClassName('skill-entry').length;
        if (skillCount < 3) {
            const skillEntry = document.createElement('div');
            skillEntry.classList.add('skill-entry');
            skillEntry.innerHTML = `
                <label for="skillInput${skillCount + 1}">Skill ${skillCount + 1}:</label>
                <input type="text" id="skillInput${skillCount + 1}" class="skillInput">
                <div class="tags-container" id="skillTagsContainer${skillCount + 1}">
                    <label for="skillTagInput${skillCount + 1}-1">Skill Tags:</label>
                    <input type="text" id="skillTagInput${skillCount + 1}-1" class="tagInput">
                    <input type="text" id="skillTagInput${skillCount + 1}-2" class="tagInput">
                    <input type="text" id="skillTagInput${skillCount + 1}-3" class="tagInput">
                </div>
            `;
            skillsContainer.appendChild(skillEntry);
        } else {
            alert('You can only add up to 3 skills.');
        }
    });
});
