import nmcli
import json
import os
import subprocess


def get_connection_info(device):
    try:
        connection_info = nmcli.device.show(device, "GENERAL.CONNECTION")
        if connection_info["GENERAL.CONNECTION"] == None:
            return {
                "ip": "Disconnected",
                "gateway": "Disconnected",
                "dns": "Disconnected",
                "method": "None"
            }
        else:
            configs = nmcli.device.show(device, "IP4.ADDRESS,IP4.GATEWAY,IP4.DNS")
            method = nmcli.connection.show(connection_info["GENERAL.CONNECTION"])
            return {
                "ip": configs.get("IP4.ADDRESS[1]", "Disconnected"),
                "gateway": configs.get("IP4.GATEWAY", "Disconnected"),
                "dns": configs.get("IP4.DNS[1]", "Disconnected"),
                "method": method.get("ipv4.method", "None")
            }
    except Exception as e:
        print(f"error: {e}")
        return {
            "ip": "Disconnected",
            "gateway": "Disconnected",
            "dns": "Disconnected",
            "method": "None"
        }


def show_ip_configs():
    wired_info = get_connection_info("eth0")
    wireless_info = get_connection_info("wlan0")
    
    return {
        "wired_ip": wired_info["ip"],
        "wired_gateway": wired_info["gateway"],
        "wired_dns": wired_info["dns"],
        "wired_method": wired_info["method"],
        "wireless_ip": wireless_info["ip"],
        "wireless_gateway": wireless_info["gateway"],
        "wireless_dns": wireless_info["dns"],
        "wireless_method": wireless_info["method"]
    }


def show_wap_configs():
    try:
        # 获取当前脚本文件所在的目录
        current_dir = os.path.dirname(os.path.abspath(__file__))
        # 构建JSON文件的完整路径
        settings_file = os.path.join(current_dir, '..', 'configs', 'wap.json')
        with open(settings_file, 'r') as file:
            settings = json.load(file)
            return settings
    except Exception as e:
        print(f"error: {e}")
    

def show_wap_status():
    try:
        # 使用 pgrep 命令检查 create_ap 进程是否在运行
        result = subprocess.run(['pgrep', 'create_ap'], capture_output=True, text=True)
        # 检查命令输出，如果有任何进程ID返回，则表示进程正在运行
        running_processes = result.stdout.strip()
        if running_processes:
            return {'wap_enabled': True}            
        else:
            return {'wap_enabled': False}           
    except Exception as e:
        print(f"error: {e}")
