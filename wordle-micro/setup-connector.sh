#!/bin/bash

while ! nc -z kafka-connect 8083; do
  sleep 1 # Ждем 1 секунду перед повторной проверкой
done

curl -X POST -H "Content-Type: application/json" --data '{
  "name": "postgres-source",
  "config": {
    "connector.class": "io.confluent.connect.jdbc.JdbcSourceConnector",
    "tasks.max": "1",
    "connection.url": "jdbc:postgresql://auth_db:5432/auth_db?user=postgres&password=postgres",
    "topic.prefix": "auth_",
    "poll.interval.ms": "1000",
    "mode": "incrementing",
    "incrementing.column.name": "id",
    "table.whitelist": "users"
  }
}' http://localhost:8083/connectors