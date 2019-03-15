FROM fevergroup/wechat_web_devtools
COPY . /wxapp-ci
RUN chmod +x /wxapp-ci/bin/*
ENTRYPOINT [ "/wxdt/bin/docker-entrypoint.sh" ]
CMD [ "/wxapp-ci/bin/wxapp-upload" ]
