document.addEventListener("DOMContentLoaded", () => {
    fetch('data/dev_projects.json')
        .then(response => response.json())
        .then(data => renderDevProjects(data));
});

function renderDevProjects(projects) {
    const container = document.getElementById('dev-projects-list');
    
    projects.forEach(project => {
        const row = document.createElement('div');
        row.className = 'dev-project-row';
        row.innerHTML = `
            <div class="dev-project-header">
                <div class="dev-project-info">
                    <span class="dev-category-tag">${project.category} / ${project.year}</span>
                    <h3>${project.title}</h3>
                </div>
                <div class="dev-status">
                    <small class="text-turquesa">${project.status}</small>
                </div>
            </div>
            <div class="dev-project-content">
                <div class="dev-grid-details">
                    <div class="dev-tech-info">
                        <p class="small text-muted">${project.short_description}</p>
                        <div class="tech-pill-container">
                            ${project.tech_stack.map(tech => `<span class="tech-pill">${tech}</span>`).join('')}
                        </div>
                        <ul class="small mt-3" style="list-style-type: '→ '; padding-left: 15px;">
                            ${project.key_features.map(feat => `<li class="mb-2">${feat}</li>`).join('')}
                        </ul>
                        <div class="dev-actions">
                            <a href="${project.github_url}" target="_blank" class="btn btn-outline-light btn-sm">Repo GitHub</a>
                            <a href="${project.live_url}" target="_blank" class="btn btn-outline-info btn-sm">Demo / Release</a>
                        </div>
                    </div>
                    <div class="dev-preview">
                        <img src="${project.preview_img}" class="img-fluid rounded border border-secondary" alt="Preview">
                        <p class="text-center small text-muted mt-2">Deployment: ${project.deployment}</p>
                    </div>
                </div>
            </div>
        `;

        row.addEventListener('click', () => {
            // Cerrar otros si se abre este
            document.querySelectorAll('.dev-project-row').forEach(r => {
                if (r !== row) r.classList.remove('active');
            });
            row.classList.toggle('active');
        });

        container.appendChild(row);
    });
}