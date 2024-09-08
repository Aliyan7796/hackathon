document.addEventListener('DOMContentLoaded', () => {
    const toggleSkillsImage = document.querySelector('.toggleSkills') as HTMLImageElement;
    const skillContent = document.querySelector('.skillContent') as HTMLDivElement;

    if (toggleSkillsImage && skillContent) {
        toggleSkillsImage.addEventListener('click', () => {
            skillContent.classList.toggle('visible');
            toggleSkillsImage.classList.toggle('expand');
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    
    const toggleCertificateImage = document.querySelector('.toggleCertificate') as HTMLImageElement;
    const certificateContent = document.querySelector('.certificateContent') as HTMLDivElement;

    if (toggleCertificateImage && certificateContent) {
        
        toggleCertificateImage.addEventListener('click', () => {
            
            certificateContent.classList.toggle('visible');
            toggleCertificateImage.classList.toggle('expand');

        });
    }
});
