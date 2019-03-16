### 使用方法

```sh
docker run --rm \
  -v save_your_wechat_login_info_volume:/root/.config/wechat_web_devtools/Default/ \
  -v /root/your_weapp_dir:/root/weapp \
  --workdir /root/weapp \
  -e REPORT_HOOK='your_dingtalk_bot_token_url' \
  shynome/drone-wxapp-upload
```

### drone 0.8 示例

```yaml
pipeline:
  wxapp_upload:
    image:  shynome/drone-wxapp-upload
    # 存储登录凭据
    volumes: [ 'wechat_web_devtools_shynome:/root/.config/wechat_web_devtools/Default/' ]
    # Dingtalk bot url
    secrets: [ report_hook ]
    commands:
    - /wxdt/bin/docker-entrypoint.sh /wxapp-ci/bin/wxapp-upload
```

### 命令执行过程

```yaml
try:
  - cli --upload project
catch:
  # 使用钉钉通知这个项目上传需要登录
  - curl dingtalk_bot_url 
  # 在命令行上输出登录二维码
  # 因为 drone ci 在网页输出的时候二维码颜色反了, 所以需要使用 qt-reverse 反转一次二维码的颜色
  - cli --login | qr-reverse
  - cli --upload project
```

