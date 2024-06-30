import nmcli


def connect_wifi(ssid, pwd):
    try:
        nmcli.device.wifi_connect(ssid = ssid,password = pwd)

        print(f"wifi connected")
    except Exception as e:
        print(f"error: {e}")


def disconnect_wifi():
    try:
        nmcli.device.disconnect(ifname = "wlan0")

        print(f"wifi disconnected")
    except Exception as e:
        print(f"error: {e}")
