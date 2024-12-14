function displayLoadTime() {
    window.addEventListener("load", () => {
        const performanceEntries = performance.getEntriesByType("navigation");

        if (performanceEntries.length > 0) {
            const navigationEntry = performanceEntries[0];
            const loadTime = (navigationEntry.loadEventEnd - navigationEntry.startTime).toFixed(2);

            const loadTimeSpan = document.getElementById("load-time");
            if (loadTimeSpan) {
                loadTimeSpan.textContent = `| loading time: ${loadTime} ms`;
            }
        } else {
            const timing = performance.timing;
            const loadTime = (timing.loadEventEnd - timing.navigationStart).toFixed(2);

            const loadTimeSpan = document.getElementById("load-time");
            if (loadTimeSpan) {
                loadTimeSpan.textContent = `| loading time: ${loadTime} ms`;
            }
        }
    });
}

displayLoadTime();
