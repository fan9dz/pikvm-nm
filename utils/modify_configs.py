import nmcli
import json
import os


def modify_ip_configs(dev,ip,gateway,dns,method):
    con = nmcli.device.show(dev, 'GENERAL.CONNECTION')
    con_name = con['GENERAL.CONNECTION']

    try:
        if method == "1":
            nmcli.connection.modify(con_name, {
                'ipv4.addresses': ip,
                'ipv4.gateway': gateway,
                'ipv4.dns': dns,
                'ipv4.method': 'manual'
                })
        else: 
            nmcli.connection.modify(con_name, {
                'ipv4.addresses': "",
                'ipv4.gateway': "",
                'ipv4.dns': "",
                'ipv4.method': 'auto'
                })
        
        #reload有时候有问题，所以down up
        nmcli.connection.down(con_name)
        nmcli.connection.up(con_name)

        print(f"ip configs changed")
    except Exception as e:
        print(f"error: {e}")


def modify_wap_configs(ip, ssid, pwd):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    settings_file = os.path.join(current_dir, '..', 'configs', 'wap.json')

    try:
        with open(settings_file, 'r') as file:
            settings = json.load(file)
        
        settings['wap_ip'] = ip
        settings['wap_ssid'] = ssid
        settings['wap_pwd'] = pwd
        
        with open(settings_file, 'w') as file:
            json.dump(settings, file, indent=4)
        
        print(f"wap configs changed")
    except Exception as e:
        print(f"error: {e}")
