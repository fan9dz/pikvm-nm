export function detailsExclusive(className) {
    const detailsElements = document.querySelectorAll(`details.${className}`);

    detailsElements.forEach((details) => {
        details.addEventListener('toggle', (event) => {
            if (details.open) {
                // 关闭其他details标签
                detailsElements.forEach((otherDetails) => {
                    if (otherDetails !== details) {
                        otherDetails.open = false;
                    }
                });
            }
        });
    });
}
