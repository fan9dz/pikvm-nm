import subprocess


def wap_on():
    enable_command = "systemctl enable wap.service"
    start_command = "systemctl start wap.service"
    
    try:
        subprocess.run(enable_command, shell=True, check=True)
        subprocess.run(start_command, shell=True, check=True)
        print("wap on")
    except Exception as e:
        print(f"error: {e}")


def wap_off():
    disable_command = "systemctl disable wap.service"
    stop_command = "systemctl stop wap.service"
    
    try:
        subprocess.run(disable_command, shell=True, check=True)
        subprocess.run(stop_command, shell=True, check=True)
        print("wap off")
    except Exception as e:
        print(f"error: {e}")
