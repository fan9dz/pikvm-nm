// 显示输入框内ip configs
export function showIpConfigs(type) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/net/show_ip_configs', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var responseData = JSON.parse(xhr.responseText);
                if (type === "wired" || type === "both") {
                    document.getElementById("wired-ip-input").value = responseData.wired_ip;
                    document.getElementById("wired-gateway-input").value = responseData.wired_gateway;
                    document.getElementById("wired-dns-input").value = responseData.wired_dns;
                }
                if (type === "wireless" || type === "both") {
                    document.getElementById("wireless-ip-input").value = responseData.wireless_ip;
                    document.getElementById("wireless-gateway-input").value = responseData.wireless_gateway;
                    document.getElementById("wireless-dns-input").value = responseData.wireless_dns;
                }
            } else {
                console.error('Request failed with status:', xhr.status);
            }
        }
    };
    xhr.send();
}


// 显示dhcp mode
export function showMethod() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/net/show_ip_configs', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var responseData = JSON.parse(xhr.responseText);
                if (responseData.wired_method === "manual") {
                    document.getElementById("wired-manual-radio").checked = true;
                    document.getElementById("wired-configs-table").classList.remove("lock");
                } else if (responseData.wired_method === "auto") {
                    document.getElementById("wired-auto-radio").checked = true;
                    document.getElementById("wired-configs-table").classList.add("lock");
                } else {
                    document.getElementById("wired-manual-radio").checked = false;
                    document.getElementById("wired-auto-radio").checked = false;
                    // 未连接的情况下input table、radio label、submit要lock
                    document.getElementById("wired-configs-table").classList.add("lock");
                    document.getElementById("wired-manual-label").classList.add("lock");
                    document.getElementById("wired-auto-label").classList.add("lock");
                    document.getElementById("wired-submit").classList.add("lock");
                }
                if (responseData.wireless_method === "manual") {
                    document.getElementById("wireless-manual-radio").checked = true;
                    document.getElementById("wireless-configs-table").classList.remove("lock");
                } else if (responseData.wireless_method === "auto") {
                    document.getElementById("wireless-auto-radio").checked = true;
                    document.getElementById("wireless-configs-table").classList.add("lock");
                } else {
                    document.getElementById("wireless-manual-radio").checked = false;
                    document.getElementById("wireless-auto-radio").checked = false;
                    document.getElementById("wireless-configs-table").classList.add("lock");
                    document.getElementById("wireless-manual-label").classList.add("lock");
                    document.getElementById("wireless-auto-label").classList.add("lock");
                    document.getElementById("wireless-submit").classList.add("lock");
                }
            } else {
                console.error('Request failed with status:', xhr.status);
            }
        }
    };
    xhr.send();
}


// 显示wap configs
export function showWapConfigs() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/net/show_wap_configs', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var responseData = JSON.parse(xhr.responseText);
                document.getElementById("wap-ip-input").value = responseData.wap_ip;
                document.getElementById("wap-ssid-input").value = responseData.wap_ssid;
                document.getElementById("wap-pwd-input").value = responseData.wap_pwd;
            } else {
                console.error('Request failed with status:', xhr.status);
            }
        }
    };
    xhr.send();
}


// 显示wap状态
export function showWapStatus() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/net/show_wap_status', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var responseData = JSON.parse(xhr.responseText);
                var wapEnabled = responseData.wap_enabled;
                var wapTable = document.getElementById("wap-configs-table");
                var wapSubmit = document.getElementById("wap-submit");
                document.getElementById('wap-enabled-checkbox').checked = wapEnabled;
                if (wapEnabled) {
                    wapTable.classList.add("lock");
                    wapSubmit.classList.add("lock");
                } else {
                    wapTable.classList.remove("lock");
                    wapSubmit.classList.remove("lock");
                }
            } else {
                console.error('Request failed with status:', xhr.status);
            }
        }
    };
    xhr.send();
}


// 清除text input的error class和submit的lock class
export function clean(type) {
    if (type === "wired" || type === "both") {
        document.getElementById("wired-submit").classList.remove("lock");
        document.getElementById("wired-ip-input").classList.remove("error");
        document.getElementById("wired-gateway-input").classList.remove("error");
        document.getElementById("wired-dns-input").classList.remove("error");
        document.getElementById("wired-manual-label").classList.remove("lock");
        document.getElementById("wired-auto-label").classList.remove("lock");
    }
    if (type === "wireless" || type === "both") {
        document.getElementById("wireless-submit").classList.remove("lock");
        document.getElementById("wireless-ip-input").classList.remove("error");
        document.getElementById("wireless-gateway-input").classList.remove("error");
        document.getElementById("wireless-dns-input").classList.remove("error");
        document.getElementById("wireless-manual-label").classList.remove("lock");
        document.getElementById("wireless-auto-label").classList.remove("lock");
    }
    if (type === "both") {
        document.getElementById("wap-submit").classList.remove("lock");
        document.getElementById("wap-ip-input").classList.remove("error");
        document.getElementById("wap-ssid-input").classList.remove("error");
        document.getElementById("wap-pwd-input").classList.remove("error");
    }
}
