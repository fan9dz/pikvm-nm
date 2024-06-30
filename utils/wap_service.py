import json
import os
import subprocess


current_dir = os.path.dirname(os.path.abspath(__file__))

settings_file = os.path.join(current_dir, '..', 'configs', 'wap.json')

with open(settings_file, 'r') as file:
    settings = json.load(file)

ip = settings['wap_ip']
ssid = settings['wap_ssid']
pwd = settings['wap_pwd']

command = f"create_ap -m nat wlan0 eth0 {ssid} {pwd} -g {ip} --no-virt"

try:
    subprocess.run(command, shell=True, check=True)
    print("wap on")
except Exception as e:
        print(f"error: {e}")