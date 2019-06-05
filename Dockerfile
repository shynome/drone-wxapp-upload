# 精简了一些不必要的包
FROM shynome/wechat_web_devtools@sha256:1668cd52a8f5bdc09f3a95003f624eee3f909287817a5aa9e6a255a5497db061
COPY rootfs /
RUN chmod +x /wxapp-ci/bin/*
ENTRYPOINT [ "/wxdt/bin/docker-entrypoint.sh" ]
CMD [ "/wxapp-ci/bin/wxapp-upload" ]
