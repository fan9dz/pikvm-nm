function validateInput(input, type) {
    const regexMap = {
        'ipMask': /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/(3[0-2]|[12]?[0-9])$/,
        'ip': /^((25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])$/,
        'ssid': /^[\x20-\x7E]{1,32}$/,
        'wapPwd': /^[\x20-\x7E]{8,63}$/
    };
    const regex = regexMap[type];
    if (regex.test(input.value)) {
        input.classList.remove("error");
    } else {
        input.classList.add("error");
    }
}


export function error (inputId, type) {
    var ipInput = document.getElementById(inputId);
    ipInput.addEventListener('input', function() {
        validateInput(this, type);
    });
};
