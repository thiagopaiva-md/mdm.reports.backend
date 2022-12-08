FROM node:18.12.1-slim

RUN apt update

RUN apt install git -y

USER node

WORKDIR /home/thiago/mdm/mdm-reports/backend

CMD ["sh", "-c", "tail -f /dev/null"]