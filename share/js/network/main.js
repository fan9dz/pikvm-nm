import { showIpConfigs, showMethod, showWapConfigs, showWapStatus, clean } from './show_configs.js';
import { showWifi } from './show_wifi_list.js';
import { lock, lockByError } from './lock.js';
import { error } from './error.js';
import { refresh } from './refresh.js';
import { detailsExclusive } from './exclusive.js';
import { wap } from './wap.js';


window.onload = function () {
    window.onbeforeunload = null;
    detailsExclusive('net-box');
    showIpConfigs("both");
    showMethod();
    showWapConfigs();
    showWapStatus();

    error("wired-ip-input", 'ipMask')
    error("wired-gateway-input", 'ip')
    error("wired-dns-input", 'ip')
    error("wireless-ip-input", 'ipMask')
    error("wireless-gateway-input", 'ip')
    error("wireless-dns-input", 'ip')
    error("wap-ip-input", 'ip')
    error("wap-ssid-input", 'ssid')
    error("wap-pwd-input", 'wapPwd')

    const configMappings = [
        { tableId: 'wired-configs-table', submitId: 'wired-submit' },
        { tableId: 'wireless-configs-table', submitId: 'wireless-submit' },
        { tableId: 'wap-configs-table', submitId: 'wap-submit' }
    ];

    configMappings.forEach(mapping => {
        lockByError(mapping.tableId, mapping.submitId);
    });
}


document.getElementById("network-button").addEventListener("click", function () {
    var menu = document.getElementById("network-menu");

    setTimeout(function () {
        if (menu.style.visibility === "visible") {
            clean("both");
            showIpConfigs("both");
            showMethod();
            showWapConfigs();
            showWapStatus();
            if (menu.style.visibility === "visible") {
                document.getElementById('wifi-scroll-container').innerHTML = '';
                showWifi();
            }
        }
    }, 0);
});


document.getElementById("network-button").addEventListener("touchstart", function () {
    var menu = document.getElementById("network-menu");

    setTimeout(function () {
        if (menu.style.visibility === "visible") {
            clean("both");
            showIpConfigs("both");
            showMethod();
            showWapConfigs();
            showWapStatus();
            if (menu.style.visibility === "visible") {
                document.getElementById('wifi-scroll-container').innerHTML = '';
                showWifi();
            }
        }
    }, 0);
});


document.getElementById("wired-auto-label").addEventListener("click", function () {
    clean("wired");
    showIpConfigs("wired");
});

document.getElementById("wireless-auto-label").addEventListener("click", function () {
    clean("wireless");
    showIpConfigs("wireless");
});


lock()


refresh("wired-form", "wired");
refresh("wireless-form", "wireless");

wap()
