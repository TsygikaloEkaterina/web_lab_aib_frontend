## Лабораторная работа №1
"HTTP HTTPS и их параметры"
-----------------------------------------------

Запросы осуществлялись к источнику  http://rzd.ru/ в формате:

curl -v http://rzd.ru/ -L --user-agent "yandex"

Ответ получен в следующем формате:
processing: http://rzd.ru/
% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
Dload  Upload   Total   Spent    Left  Speed
0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0*   Trying 212.164.138.124:80...
* Connected to rzd.ru (212.164.138.124) port 80
~~~
> GET / HTTP/1.1 -стартовая строка с методом запроса, адресом внутри сайта и версией протокола
> Host: rzd.ru - заголовок с указанием хоста, где работает веб-сервер
> User-Agent: curl/8.2.1 -пользователь(кто совершил запрос)
> Accept: */* - заголовок, включающий любые сообщения от пользователя и сервера
~~~
< HTTP/1.1 - позволяет загружать множество ресурсов в пределах одного соединения
- 301 Moved Permanently - перенаправление на другую страницу
  < Date: Tue, 12 Sep 2023 07:30:26 GMT - дата осуществления запроса

  < Content-Type: text/html - тип содержимого формата текст

  < Content-Length: 150 - длина содержимого
  
  < Connection: keep-alive -поддержание связи в рабочем состоянии
  
  < Location: https://rzd.ru:443/ - местоположение
~~~
{ [150 bytes data]
100   150  100   150    0     0    814      0 --:--:-- --:--:-- --:--:--   824<html>
<head><title>301 Moved Permanently</title></head>
<body bgcolor="white">
<center><h1>301 Moved Permanently</h1></center>
</body>
</html>

* Connection #0 to host rzd.ru left intact
~~~
curl -v github.ru -L --user-agent "yandex" -I  

`curl` - команда для выполнения HTTP-запросов из командной строки.  

`-v` - флаг, указывающий на вывод подробной информации о запросе и ответе.  

`github.ru` - URL-адрес, к которому будет отправлен запрос  

`--user-agent "yandex"` - опция, указывающая на пользовательский агент, который будет использоваться при отправке запроса.  

`-L` - флаг, указывающий на следование перенаправлениям при запросе.  

`-I` - флаг, указывающий на выполнение только HEAD-запроса для получения только заголовков ответа, без тела ответа.  

| source | code |
|--------|-----|
| 123    | 456 |


 HTTP/1.1 200 OK  
 `Server: GitHub.com` - имя червера, который обрабатывает запрос

 `Date:` Tue, 26 Sep 2023 11:01:04 GMT  

 `Content-Type:` text/html; charset=utf-8  

 `Vary:` X-PJAX, X-PJAX-Container, Turbo-Visit, Turbo-Frame, Accept-Language, Accept-Encoding, Accept, X-Requested-With - указывает на то, какие хаголовки запроса пользователя должны быть учтены при кешировании ответа. Ответ будет отличаться в зависимости от значения заголовка.  
 
`content-language:` en-US - язык контента английский  

 `ETag:` ' W/"0c5e5c9ba26bd701de789f230890a917" - используется для проверки целостности ресурса в кэше пользователя  

 `Cache-Control:` max-age=0, private, must-revalidate - параметры кеширования ответа  

 `Strict-Transport-Security:` max-age=31536000; includeSubdomains; preload - указывает на политику безопасности для защиты от аттак через протокол HTTP< X-Frame-Options: deny - указывает на политику безопасности, запрещающую браузеру встраивание страницы во фреймы.  

 `X-Content-Type-Options:` nosniff - указывает на политику безопасности, запрещающую браузеру интерпритировать тип контента  

 `X-XSS-Protection:` 0 - указывает на политику безопасности, отключающую встроенную защиту от межсайтового скриптинга (XSS)  

 `Referrer-Policy:` origin-when-cross-origin, strict-origin-when-cross-origin - указывает на политику безопасности, определяющую, какие данные о реферере отправляются при переходе на другой сайт  

 `Content-Security-Policy:` default-src 'none'; base-uri 'self'; child-src github.com/assets-cdn/worker/ gist.github.com/assets-cdn/worker/; connect-src 'self' uploads.github.com www.githubstatus.com collector.github.com raw.githubusercontent.com api.githubcopilot.com api.github.com github-cloud.s3.amazonaws.com github-production-repository-file-5c1aeb.s3.amazonaws.com github-production-upload-manifest-file-7fdce7.s3.amazonaws.com github-production-user-asset-6210df.s3.amazonaws.com cdn.optimizely.com logx.optimizely.com/v1/events objects-origin.githubusercontent.com *.actions.githubusercontent.com productionresultssa0.blob.core.windows.net/ productionresultssa1.blob.core.windows.net/ productionresultssa2.blob.core.windows.net/ productionresultssa3.blob.core.windows.net/ productionresultssa4.blob.core.windows.net/ productionresultssa5.blob.core.windows.net/ productionresultssa6.blob.core.windows.net/ productionresultssa7.blob.core.windows.net/ productionresultssa8.blob.core.windows.net/ productionresultssa9.blob.core.windows.net/ wss://*.actions.githubusercontent.com github-production-repository-image-32fea6.s3.amazonaws.com github-production-release-asset-2e65be.s3.amazonaws.com insights.github.com wss://alive.github.com github.githubassets.com; font-src github.githubassets.com; form-action 'self' github.com gist.github.com objects-origin.githubusercontent.com; frame-ancestors 'none'; frame-src viewscreen.githubusercontent.com notebooks.githubusercontent.com support.github.com; img-src 'self' data: github.githubassets.com media.githubusercontent.com camo.githubusercontent.com identicons.github.com avatars.githubusercontent.com github-cloud.s3.amazonaws.com objects.githubusercontent.com secured-user-images.githubusercontent.com/ user-images.githubusercontent.com/ private-user-images.githubusercontent.com opengraph.githubassets.com github-production-user-asset-6210df.s3.amazonaws.com customer-stories-feed.github.com spotlights-feed.github.com objects-origin.githubusercontent.com *.githubusercontent.com; manifest-src 'self'; media-src github.com user-images.githubusercontent.com/ secured-user-images.githubusercontent.com/ private-user-images.githubusercontent.com github.githubassets.com; script-src github.githubassets.com; style-src 'unsafe-inline' github.githubassets.com; upgrade-insecure-requests; worker-src github.com/assets-cdn/worker/ gist.github.com/assets-cdn/worker/ - указывает на политику безопасности, определяющую разрешенные источники контента для разных типов ресурсов.  

 `Set-Cookie:` _gh_sess=4rRb210Vb2I7mBrf1CZIh8zpQ3PT90jaQA2S9uSqylArOXY%2F0o1w5kf4Z%2FBb71L5F7m8NfUhIoZJb3J5PbJczgdp4l8EmL8wgeS6ydZKeGR3sdQHRTyT8LcLi7c5ofz%2BPe41n1yB8L4sMUoKpB1psR6IgL2V7K4z1wHKpRwPesdgXerzHLtiNCiI0RFSyMjymI68U56HEMKOtzfvMEAFTrNNlaPdSDMfWjZkVnKTRpyo4xgL%2FmudA7cR8rMTGIpreariwAGxWZJhJygharpHpg%3D%3D--avKFXyCktzmVu9mk--Z3pLkstiBqXlg0zotX9BuQ%3D%3D; Path=/; HttpOnly; Secure; SameSite=Lax  

 `Set-Cookie:` _octo=GH1.1.459886437.1695726064; Path=/; Domain=github.com; Expires=Thu, 26 Sep 2024 11:01:04 GMT; Secure; SameSite=Lax  

 `Set-Cookie:` logged_in=no; Path=/; Domain=github.com; Expires=Thu, 26 Sep 2024 11:01:04 GMT; HttpOnly; Secure; SameSite=Lax  

 `Accept-Ranges:` bytes - указывает на то, что сервер поддерживает возможность получения частей контента по диапазону байт.  

 `X-GitHub-Request-Id:` 3B43:C1E8:2026464:2084508:6512B9F0 - содержит идентификатор запроса, который может быть использован для отладки или отслеживания запросов на сервере.  

----- Set-Cookie: содержит информацию о установленных куки  

~~~