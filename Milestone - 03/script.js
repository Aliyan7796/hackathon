document.addEventListener('DOMContentLoaded', function () {
    // Toggle Skills Section
    var toggleSkillsImage = document.querySelector('.toggleSkills');
    var skillContent = document.querySelector('.skillContent');
    
    if (toggleSkillsImage && skillContent) {
        // Set initial state: expanded
        skillContent.classList.add('visible');
        toggleSkillsImage.classList.add('expand');

        toggleSkillsImage.addEventListener('click', function () {
            skillContent.classList.toggle('invisible');
            skillContent.classList.toggle('visible');
            toggleSkillsImage.classList.toggle('expand');
        });
    }

    // Toggle Certificates Section
    var toggleCertificateImage = document.querySelector('.toggleCertificate');
    var certificateContent = document.querySelector('.certificateContent');
    
    if (toggleCertificateImage && certificateContent) {
        // Set initial state: expanded
        certificateContent.classList.add('visible');
        toggleCertificateImage.classList.add('expand');

        toggleCertificateImage.addEventListener('click', function () {
            certificateContent.classList.toggle('invisible');
            certificateContent.classList.toggle('visible');
            toggleCertificateImage.classList.toggle('expand');
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
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

        // document.getElementById('certificate').textContent = data.certificate || 'N/A';
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
});

function printDocument() {
    // Create a new window for printing
    const printWindow = window.open('', '', 'height=800,width=600');
    
    // Define the path to your CSS files
    const cssFiles = [
        'style.css',    // Main CSS file
        'utility.css'   // Any additional CSS files
    ];

    // Create the CSS link elements
    const cssLinks = cssFiles.map(file => `<link rel="stylesheet" href="${file}">`).join('\n');

    // Print styles with margin
    const printStyles = `
        <style>
            @media print {
                @page {
                    size: A4;
                    margin: 0;
                }
                body {
                    margin: 20px;
                    /* Optional: If you need to ensure that print-specific styles are applied */
                    font-family: Arial, sans-serif;
                    font-size: 12pt;
                }
                .no-print {
                    display: none; /* Hide elements with 'no-print' class */
                }
            }
        </style>
    `;

    // Construct the print HTML
    const printContent = `
        <html>
        <head>
            <title>Print Document</title>
            ${cssLinks}
            ${printStyles}
        </head>
        <body>
            ${document.documentElement.innerHTML}
        </body>
        </html>
    `;

    // Write the content to the new window and trigger print
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();

    // Optional: Add a short delay before printing to ensure content is fully loaded
    setTimeout(() => {
        printWindow.print();
    }, 500);
}
