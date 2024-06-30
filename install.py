import os
import shutil


# 定义文件路径
project_directory = os.path.dirname(os.path.abspath(__file__))
source_file_path = os.path.join(project_directory, 'templates', 'index.html')
target_file_path = '/usr/share/kvmd/web/kvm/index.html'
backup_file_path = target_file_path + '.backup'

# 定义要复制的文件和目录路径
source_css_file = os.path.join(project_directory, 'share', 'css', 'network.css')
target_css_directory = '/usr/share/kvmd/web/share/css'

source_js_directory = os.path.join(project_directory, 'share', 'js', 'network')
target_js_directory = '/usr/share/kvmd/web/share/js/network'

source_svg_directory = os.path.join(project_directory, 'share', 'svg')
target_svg_directory = '/usr/share/kvmd/web/share/svg'

source_app_file = os.path.join(project_directory, 'app.py')
target_app_file = '/srv/pikvm-nm/app.py'
target_app_directory = '/srv/pikvm-nm'

source_utils_directory = os.path.join(project_directory, 'utils')
target_utils_directory = os.path.join(target_app_directory, 'utils')

source_configs_directory = os.path.join(project_directory, 'configs')
target_configs_directory = os.path.join(target_app_directory, 'configs')

source_service_directory = os.path.join(project_directory, 'service')
target_service_directory = '/etc/systemd/system'

nginx_conf_file = '/etc/kvmd/nginx/kvmd.ctx-server.conf'
nginx_config_content = """
location /net {
    proxy_pass http://localhost:8001;
}
"""


# 备份文件
def backup_file(target_file_path, backup_file_path):
    if not os.path.exists(backup_file_path):
        shutil.copy2(target_file_path, backup_file_path)
    else:
        print(f"{backup_file_path} exist")


# 提取注释之间的内容
def extract_content_between_comments(file_path, start_comment, end_comment):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
        
    start_index = content.find(start_comment)
    end_index = content.find(end_comment) + len(end_comment)
    
    if start_index == -1 or end_index == -1:
        raise ValueError("tag not found")
    
    return content[start_index:end_index]


# 更新文件内容
def update_file(target_file_path, content_to_insert, css_line, js_line):
    with open(target_file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    content_inserted = False

    if content_to_insert not in ''.join(lines):
        insertion_index = next((i + 3 for i, line in enumerate(lines)
                                if '<li class="right feature-disabled" id="gpio-dropdown">' in line), None)
        if insertion_index:
            lines.insert(insertion_index, content_to_insert + '\n')
            content_inserted = True

    if css_line not in ''.join(lines):
        lines.insert(next((i + 1 for i, line in enumerate(lines)
                           if '<link rel="stylesheet" href="/share/css/user.css">' in line), len(lines)), css_line)
        content_inserted = True

    if js_line not in ''.join(lines):
        lines.insert(next((i for i, line in enumerate(lines) if '</body>' in line), len(lines)), js_line)
        content_inserted = True

    if content_inserted:
        with open(target_file_path, 'w', encoding='utf-8') as file:
            file.writelines(lines)
    else:
        print("menu exist")


# 更新nginx配置文件
def update_nginx_config_file():
    if os.path.exists(nginx_conf_file):
        with open(nginx_conf_file, 'r', encoding='utf-8') as file:
            content = file.read()
        
        if nginx_config_content.strip() not in content:
            with open(nginx_conf_file, 'a', encoding='utf-8') as file:
                file.write(nginx_config_content)
        else:
            print("config exist")
    else:
        print(f"{nginx_conf_file} not found")


# 复制文件和目录
def copy_files_and_directories():
    def copy_file_or_directory(source, target):
        if os.path.isdir(source):
            shutil.copytree(source, target, dirs_exist_ok=True)
        else:
            shutil.copy2(source, target)

    # 确保目标目录存在
    os.makedirs(target_css_directory, exist_ok=True)
    os.makedirs(target_js_directory, exist_ok=True)
    os.makedirs(target_svg_directory, exist_ok=True)
    os.makedirs(target_app_directory, exist_ok=True)
    os.makedirs(target_utils_directory, exist_ok=True)
    os.makedirs(target_configs_directory, exist_ok=True)
    os.makedirs(target_service_directory, exist_ok=True)

    copy_file_or_directory(source_css_file, target_css_directory)
    copy_file_or_directory(source_js_directory, target_js_directory)
    copy_file_or_directory(source_svg_directory, target_svg_directory)
    copy_file_or_directory(source_app_file, target_app_file)
    copy_file_or_directory(source_utils_directory, target_utils_directory)
    copy_file_or_directory(source_configs_directory, target_configs_directory)
    copy_file_or_directory(source_service_directory, target_service_directory)


if __name__ == "__main__":
    try:
        backup_file(target_file_path, backup_file_path)
        
        content = extract_content_between_comments(source_file_path, '<!-- nm start -->', '<!-- nm end -->')
        css_line = '<link rel="stylesheet" href="/share/css/network.css">\n'
        js_line = '<script type="module" src="/share/js/network/main.js"></script>\n'
        
        update_file(target_file_path, content, css_line, js_line)
        
        copy_files_and_directories()
        
        update_nginx_config_file()
    except Exception as e:
        print(f"error: {e}")
