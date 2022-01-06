FROM node:12.10.0

RUN apt-get update && \
    apt-get install -y \
        curl

WORKDIR /

CMD ["npm", "run", "build"]
