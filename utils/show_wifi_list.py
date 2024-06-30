import nmcli


# 先建一个类，和nmcli返回来的内容对上
class DeviceWifi: 
    def __init__(self, in_use, ssid, *args, **kwargs): 
        self.in_use = in_use
        self.ssid = ssid


def show_wifi_list():
    devices=nmcli.device.wifi()
    ssid_list = {} 
    try:
        for device in devices:
            # 判断一下，空的就不要了
            if device.ssid != "": 
                if device.ssid in ssid_list: 
                    # 如果遇到重复的情况，有True认True
                    ssid_list[device.ssid] = ssid_list[device.ssid] or device.in_use 
                else:
                    ssid_list[device.ssid] = device.in_use

        return(ssid_list)
    except Exception as e:
        print(f"error: {e}")
