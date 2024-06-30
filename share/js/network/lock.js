// 输入错误导致的按钮锁定
export function lock(){
    var wiredAutoRadio = document.getElementById("wired-auto-radio");
    var wiredManualRadio = document.getElementById("wired-manual-radio");
    var wiredTable = document.getElementById("wired-configs-table");
    wiredAutoRadio.addEventListener("change", function() {
        if (wiredAutoRadio.checked) {
            wiredTable.classList.add("lock");
        } else {
            wiredTable.classList.remove("lock");
        }
    });
    wiredManualRadio.addEventListener("change", function() {
        if (wiredManualRadio.checked) {
            wiredTable.classList.remove("lock");
        } else {
            wiredTable.classList.add("lock");
        }
    });
    
    
    var wirelessAutoRadio = document.getElementById("wireless-auto-radio");
    var wirelessManualRadio = document.getElementById("wireless-manual-radio");
    var wirelessTable = document.getElementById("wireless-configs-table");
    wirelessAutoRadio.addEventListener("change", function() {
        if (wirelessAutoRadio.checked) {
            wirelessTable.classList.add("lock");
        } else {
            wirelessTable.classList.remove("lock");
        }
    });
    wirelessManualRadio.addEventListener("change", function() {
        if (wirelessManualRadio.checked) {
            wirelessTable.classList.remove("lock");
        } else {
            wirelessTable.classList.add("lock");
        }
    });
    
    
    var wapEnabledSwitch = document.getElementById("wap-enabled-checkbox");
    var wapTable = document.getElementById("wap-configs-table");
    var wapSubmit = document.getElementById("wap-submit");
    wapEnabledSwitch.addEventListener("change", function() {
        if (wapEnabledSwitch.checked) {
            wapTable.classList.add("lock");
            wapSubmit.classList.add("lock");
        } else {
            wapTable.classList.remove("lock");
            wapSubmit.classList.remove("lock");
        }
    });
}


// 输入错误导致的按钮锁定
// 检测逻辑
function checkErrors(tableId, submitId) {
    const configsTable = document.getElementById(tableId);
    const submitButton = document.getElementById(submitId);
    const hasError = configsTable.querySelector('.error') !== null;
    if (hasError) {
        submitButton.classList.add('lock');
    } else {
        submitButton.classList.remove('lock');
    }
}

// 添加输入事件监听器
export function lockByError(tableId, submitId) {
    const inputs = document.querySelectorAll(`#${tableId} input`);
    inputs.forEach(input => {
        input.addEventListener('input', () => checkErrors(tableId, submitId));
    });
}

