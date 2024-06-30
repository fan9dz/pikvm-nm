import { showIpConfigs, showMethod, clean } from './show_configs.js';
import { showWifi } from './show_wifi_list.js';


export function wap() {
    document.addEventListener("DOMContentLoaded", function () {
        var checkbox = document.getElementById("wap-enabled-checkbox");
        checkbox.addEventListener("change", function () {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/net/wap");
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            // 在请求发送之前的回调函数
            xhr.onload = function () {
                if (xhr.status == 204) {
                    console.log("Request successful");
                    // 热点关闭后要等一会儿wifi才会连接，所以sleep3秒
                    setTimeout(function () {
                        clean("wireless");
                        showIpConfigs("wireless");
                        showMethod();
                        showWifi();
                    }, 3000);
                } else {
                    console.error("Request failed");
                }
            };

            if (checkbox.checked) {
                xhr.send(JSON.stringify({ action: "wap_on" }));
            } else {
                xhr.send(JSON.stringify({ action: "wap_off" }));
            }
        });
    });
}
