document.addEventListener("DOMContentLoaded", function() {
    fetch('content.json')
    .then(response => response.json())
    .then(data => {
        const mainContent = document.getElementById('main-content');
        data.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            if ((index + 1) % 4 === 0) {
                postElement.classList.add('fourth');
            }
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p class="description">${post.description}</p>
                <img src="${post.image}" alt="${post.title}">
                <button class="show-description">Show Description</button>
                <button class="close">Close</button>
            `;
            mainContent.appendChild(postElement);
        });

        const showDescriptionButtons = document.querySelectorAll('.show-description');
        const closeButtons = document.querySelectorAll('.close');

        showDescriptionButtons.forEach((button, index) => {
            button.addEventListener('click', function() {
                const descriptions = document.querySelectorAll('.description');
                descriptions.forEach(description => {
                    if (description !== descriptions[index]) {
                        description.style.display = 'none';
                    }
                });
                button.style.display = 'none';
                closeButtons[index].style.display = 'block';
            });
        });

        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const descriptions = document.querySelectorAll('.description');
                descriptions.forEach(description => {
                    description.style.display = 'block';
                });
                showDescriptionButtons.forEach(showButton => {
                    showButton.style.display = 'block';
                });
                button.style.display = 'none';
            });
        });
    })
    .catch(error => console.error('Error fetching data:', error));
});
