FROM public.ecr.aws/lambda/nodejs:12 AS build

ARG FUNCTION_DIR="/var/task"
RUN mkdir -p ${FUNCTION_DIR}

COPY package.json ${FUNCTION_DIR}
COPY package-lock.json ${FUNCTION_DIR}
COPY tsconfig.json ${FUNCTION_DIR}
COPY src ${FUNCTION_DIR}/src

RUN npm install
RUN npm run build

FROM public.ecr.aws/lambda/nodejs:12

ARG FUNCTION_DIR="/var/task"
RUN mkdir -p ${FUNCTION_DIR}

COPY --from=build ${FUNCTION_DIR}/package.json ${FUNCTION_DIR}
COPY --from=build ${FUNCTION_DIR}/package-lock.json ${FUNCTION_DIR}
COPY --from=build ${FUNCTION_DIR}/dist ${FUNCTION_DIR}/src

RUN npm install --production

CMD [ "src.handler" ]
