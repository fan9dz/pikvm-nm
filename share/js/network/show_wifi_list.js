import { refresh } from './refresh.js';
import { detailsExclusive } from './exclusive.js';


// 显示wifi列表
export function showWifi() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/net/show_wifi_list', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var container = document.getElementById('wifi-scroll-container');
                // 有时候点太快了，上一次还没反应过来呢，下一次又触发了，所以这里也要清空一下
                container.innerHTML = '';
                var responseData = JSON.parse(xhr.responseText);

                var trueItems = [];
                var falseItems = [];

                for (var ssid in responseData) {
                    if (responseData.hasOwnProperty(ssid)) {
                        var wifiItem = document.createElement('div');
                        wifiItem.className = 'wifi-item';
                        var htmlContent;

                        if (responseData[ssid] === false) {
                            htmlContent = `
                                <form method="post" action="/net/connect_wifi" class="wifi-connect-form" autocomplete="off">
                                    <details class="wifi-item-details">
                                        <summary>
                                            <img src="/share/svg/wifi.svg">
                                            <input type="text" class="wifi-ssid" name="wifi-ssid" value="${ssid}">
                                        </summary>
                                        <table>
                                            <tr>
                                                <td><input type="password" name="wifi-pwd" placeholder="type password"></td>
                                                <td><input type="submit" value="&bull; Connect"></td>
                                            </tr>
                                        </table>
                                    </details>
                                </form>
                            `;
                            wifiItem.innerHTML = htmlContent;
                            falseItems.push(wifiItem);
                        } else {
                             htmlContent = `
                                <form method="post" action="/net/disconnect_wifi" class="wifi-disconnect-form" autocomplete="off">
                                        <img src="/share/svg/wifi.svg">
                                        <input type="text" class="wifi-ssid" name="wifi-ssid" value="${ssid}">

                                    <table style="margin-left: 153px;">
                                        <tr>
                                            <td><input type="submit" value="&bull; Disconnect"></td>
                                        </tr>
                                    </table>
                                </form>
                            `;
                            wifiItem.innerHTML = htmlContent;
                            trueItems.push(wifiItem);
                        }
                    }
                }

                // true的放前面false的放后面
                trueItems.forEach(function (item) {
                    container.appendChild(item);
                    var hr = document.createElement('hr');
                    container.appendChild(hr);
                });
                falseItems.forEach(function (item) {
                    container.appendChild(item);
                    var hr = document.createElement('hr');
                    container.appendChild(hr);
                });

                refresh("wifi-connect-form", "wireless");
                refresh("wifi-disconnect-form", "wireless");

                detailsExclusive("wifi-item-details");
            } else {
                console.error('Request failed with status:', xhr.status);
            }
        }
    };
    xhr.send();
}
