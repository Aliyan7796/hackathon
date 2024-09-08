document.addEventListener('DOMContentLoaded', function () {
    var toggleSkillsImage = document.querySelector('.toggleSkills');
    var skillContent = document.querySelector('.skillContent');
    if (toggleSkillsImage && skillContent) {
        toggleSkillsImage.addEventListener('click', function () {
            skillContent.classList.toggle('visible');
            toggleSkillsImage.classList.toggle('expand');
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {
    var toggleCertificateImage = document.querySelector('.toggleCertificate');
    var certificateContent = document.querySelector('.certificateContent');
    if (toggleCertificateImage && certificateContent) {
        toggleCertificateImage.addEventListener('click', function () {
            certificateContent.classList.toggle('visible');
            toggleCertificateImage.classList.toggle('expand');
        });
    }
});
