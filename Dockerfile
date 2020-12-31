FROM public.ecr.aws/lambda/nodejs:12

ARG FUNCTION_DIR="/var/task"
RUN mkdir -p ${FUNCTION_DIR}

COPY package.json ${FUNCTION_DIR}
COPY package-lock.json ${FUNCTION_DIR}
COPY dist ${FUNCTION_DIR}/src

RUN npm install --production

CMD [ "src.handler" ]
