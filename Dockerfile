FROM fevergroup/wechat_web_devtools
COPY . /
RUN chmod +x /drone/wxapp-upload
ENTRYPOINT [ "/wxdt/bin/docker-entrypoint.sh" ]
CMD [ "/drone/wxapp-upload" ]