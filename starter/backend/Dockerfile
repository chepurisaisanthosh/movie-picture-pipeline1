FROM public.ecr.aws/docker/library/python:3.10-alpine3.17

WORKDIR /app

RUN apk add --no-cache build-base linux-headers libffi-dev

COPY Pipfile* /app/

RUN pip install --upgrade pip pipenv && \
    pipenv install --system --deploy

COPY . /app/

EXPOSE 5000

CMD ["uwsgi", "--ini", "uwsgi.ini"]
