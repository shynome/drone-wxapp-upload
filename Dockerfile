# 精简了一些不必要的包
FROM shynome/wechat_web_devtools@sha256:9dcc4dd3fe95ad28084ecc383e628c21add2f67bb54c3c0e1d4a003f5b1e94b7
COPY rootfs /
RUN chmod +x /wxapp-ci/bin/*
ENTRYPOINT [ "/wxdt/bin/docker-entrypoint.sh" ]
CMD [ "/wxapp-ci/bin/wxapp-upload" ]
