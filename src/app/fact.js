async function getRandomFact() {
    try {
        const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
        const fact = await response.json();
        document.getElementById('output').textContent = ` | incredibly fascinating fact: ${fact.text}`;
    } catch (error) {
        console.error("Error fetching fact:", error);
    }
}