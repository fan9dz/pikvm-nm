from flask import Flask, render_template, request, jsonify, Response
from utils.show_configs import show_ip_configs, show_wap_configs, show_wap_status
from utils.show_wifi_list import show_wifi_list
from utils.modify_configs import modify_ip_configs, modify_wap_configs
from utils.connect_wifi import connect_wifi, disconnect_wifi
from utils.wap import wap_on, wap_off


app = Flask(__name__, static_folder='share')


# @app.route('/', methods=['GET'])
# def demo_page():
#     return render_template('index.html')


@app.route('/net/show_ip_configs', methods=['POST'])
def ShowIpConfigs():
    return jsonify(show_ip_configs())


@app.route('/net/show_wap_configs', methods=['POST'])
def ShowWapConfigs():
    return(show_wap_configs())


@app.route('/net/show_wap_status', methods=['POST'])
def ShowWapStatus():
    return jsonify(show_wap_status())


@app.route('/net/show_wifi_list', methods=['POST'])
def ShowWifiList():
    return jsonify(show_wifi_list())


@app.route('/net/modify_ip_configs', methods=['POST'])
def ModifyIpConfigs():
    if "wired-ip" in request.form:
        dev = "eth0"
        ip = request.form.get("wired-ip")
        gateway = request.form.get("wired-gateway")
        dns = request.form.get("wired-dns")
        method = request.form.get("wired-method")

    elif "wireless-ip" in request.form:
        dev = "wlan0"
        ip = request.form.get("wireless-ip")
        gateway = request.form.get("wireless-gateway")
        dns = request.form.get("wireless-dns")
        method = request.form.get("wireless-method")

    modify_ip_configs(dev,ip,gateway,dns,method)
    return Response(status=204)


@app.route('/net/modify_wap_configs', methods=['POST'])
def ModifyWapConfigs():
    ip = request.form.get("wap-ip")
    ssid = request.form.get("wap-ssid")
    pwd = request.form.get("wap-pwd")

    modify_wap_configs(ip, ssid, pwd)
    return Response(status=204)


@app.route('/net/wap', methods=['POST'])
def Wap():
    data = request.get_json()

    if data.get("action") == "wap_on":
        wap_on()
    elif data.get("action") == "wap_off":
        wap_off()
    return Response(status=204)


@app.route('/net/connect_wifi', methods=['POST'])
def ConnectWifi():
    ssid = request.form.get("wifi-ssid")
    pwd = request.form.get("wifi-pwd")

    connect_wifi(ssid,pwd)
    return Response(status=204)


@app.route('/net/disconnect_wifi', methods=['POST'])
def DisconnectWifi():
    disconnect_wifi()
    return Response(status=204)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='8001')
