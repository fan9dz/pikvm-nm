import { showIpConfigs, showMethod, clean } from './show_configs.js';
import { showWifi } from './show_wifi_list.js';


export function refresh(className, type) {
    var forms = document.querySelectorAll(`.${className}`);
    
    forms.forEach(function (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // 阻止form提交
            var xhr = new XMLHttpRequest();
            xhr.open('POST', this.action, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 204) {
                        setTimeout(function () {
                            clean(type);
                            showIpConfigs(type);
                            showMethod();
                            showWifi();
                        }, 0);
                    } else {
                        console.error('Request failed with status:', xhr.status);
                    }
                }
            };
            xhr.send(new FormData(this));
        });
    });
}
