# PiKVM Network Manager
PiKVM网络设置菜单  
个人练习作品，请谨慎使用
## 环境
Orange Pi Zero 3（1G）  
官方版Ubuntu系统（包含network manager、create_ap、python3.10，如不包含需要手动安装）  
安装PiKVM方法参考 [fruity-pikvm](https://github.com/jacobbar/fruity-pikvm)
## 安装
安装pip
```
sudo apt install python3-pip -y
```
强制升级blinker（要不然装不上flask）
```
pip install --upgrade --ignore-installed blinker
```
安装依赖
```
pip install flask==2.2.5
pip install nmcli==1.3.0
```
安装
```
git clone
cd pikvm-nm
python3 install.py
```
重启
```
reboot
```
启动服务
```
sudo systemctl enable pikvm-nm.service
sudo systemctl start pikvm-nm.service
```
## 关闭
关闭服务
```
sudo systemctl stop pikvm-nm.service
sudo systemctl disable pikvm-nm.service
```
恢复网页文件
```
sudo mv /usr/share/kvmd/web/kvm/index.html.backup /usr/share/kvmd/web/kvm/index.html
```