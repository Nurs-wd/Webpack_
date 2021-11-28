function createAnalytics() {
    let counter = 0;

    const listener = ()=> counter++
    document.addEventListener('click', listener)
    return {
        destroy() {
            document.removeEventListener('click', listener)
            destoyed = true;
        },
        getClicks() {
            if (destoyed) {
                return `Analytics is destoyed. Total clicks = ${counter}`
            }
            return counter;
        }
    }
}

window.analytics = createAnalytics()