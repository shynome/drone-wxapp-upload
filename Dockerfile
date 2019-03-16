# 精简了一些不必要的包
FROM shynome/wechat_web_devtools
COPY rootfs /
RUN chmod +x /wxapp-ci/bin/*
ENTRYPOINT [ "/wxdt/bin/docker-entrypoint.sh" ]
CMD [ "/wxapp-ci/bin/wxapp-upload" ]
