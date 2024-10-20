# wordle backend

Вместо url вставляется shh-ключ репозитория. Далее заходим в проект или через терминал, или через какое-либо UI приложение.
## 1. Создание мини приложения вк
Создать приложение:
```
https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/intro/start-page
```
Домен и урл для редиректа указать: 
```
http://localhost/api/auth/login/oauth2/code/vk
localhost
```
Создать файл ``compose.local.yaml``, скопировать в него содержимое ``compose.yaml`` и указать правильные значение
для ``SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_VK_CLIENTID`` и ``SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_VK_CLIENTSECRET``

## 2. Сборка проекта
Сборка из локального композа:
```
docker-compose -f compose.local.yaml up -d --build

```

## 3. Миграции
Накатываются сам ;)


## 4. Документация
Ссылка на сваггер:

```
http://localhost/swagger-ui.html
```
