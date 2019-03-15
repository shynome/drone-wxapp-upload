FROM fevergroup/wechat_web_devtools
COPY . /wxapp-ci
RUN chmod +x /wxapp-ci/bin/wxapp-upload
ENTRYPOINT [ "/wxdt/bin/docker-entrypoint.sh" ]
CMD [ "/drone/wxapp-upload" ]
