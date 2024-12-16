(function () {
    window.addEventListener("load", () => {
        const timing = performance.timing;
        const loadTime = (timing.domContentLoadedEventEnd - timing.navigationStart) / 1000;

        const span = document.getElementById("load-time");
        if (span) {
            span.textContent = `| loading time: ${loadTime.toFixed(2) * 1000} ms`;
        }
    });

    const navLinks = document.querySelectorAll("#tag-list a");
    const currentPage = window.location.pathname.split("/").pop();

    navLinks.forEach((link) => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
})();
