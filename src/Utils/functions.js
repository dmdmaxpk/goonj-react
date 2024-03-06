export const trackEvent = (category, action, label) => {
    window.gtag('event', action, {
            category: category,
            label: label
        });
}