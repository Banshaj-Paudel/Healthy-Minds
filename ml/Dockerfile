FROM python:3.7-slim-buster

ARG POETRY_VERSION=1.1.12

ENV PYTHONUNBUFFERED=1

RUN pip install "poetry==$POETRY_VERSION" && poetry config virtualenvs.create false

WORKDIR /app

COPY poetry.lock pyproject.toml /app/

COPY . /app
RUN ["poetry", "install", "--no-interaction", "--no-ansi"]

