# Домашнее задание по PhoneGap
Изучив выбранные фреймворки и библиотеки, решил, что хочу поиграться с компонентами и переходами экранов, сделав приложение наиболее похожим внешне на нативное. Решил не переделывать какие то свои старые, а написать новое - маленькое приложение для заметок.

Выбран для этих целей был фреймворк http://goratchet.com . Он предоставляет простые компоненты и like-native переходы между экранами с помощью библиотеки push.js. Показался лучшим вариантом, т.к. достаточно прост в освоении свежо выглядит и имеет нужный для меня функционал.

Для хранения данных выбрал indexedDB, не только потому что она была предложена, как пример, но и потому, что я никогда ей не пользовался и было интересно попробовать. Для использования ее на Ios нужен полифилл. Для этих целей запланировал использовать [cordova-plugin-indexeddb-async]('https://github.com/ABB-Austin/cordova-plugin-indexeddb-async')

Много проблем возникло на этапе запуска всего этого дела. Связка Macbook - Iphone5s на удивление долго не хотела работать и запускаться. Затем, настроив среду и на тестовом примере изучив, как собирать и запускать проекты и начал писать приложение.

Разрабатывал и отлаживал приложение с помощью десктопного хрома, совершенно потеряв счет времени, когда я начал запускать приложение в Ios, то обнаружилось, что полифилл на indexedDB неккоректно работает и у него есть свои нюансы, потратив кучу времени на поиск нюансов я подошел к дедлайну и, к сожалению, не смог их разрешить.

Приложение добавляет/удаляет записи с названием и описанием, используя indexedDB, при этом, выглядя нативно. Реализованы иконки и сплешскрин.

Скриншоты интерефейса из chrome:
![alt text](https://urkass.github.io/task4_phonegap/screenshots/scrn1.png "Screenshot 1")
![alt text](https://urkass.github.io/task4_phonegap/screenshots/scrn2.png "Screenshot 2")
![alt text](https://urkass.github.io/task4_phonegap/screenshots/scrn3.png "Screenshot 3")
Установлено на ios (note в правом нижнем углу):
![alt text](https://urkass.github.io/task4_phonegap/screenshots/scrn4.jpg "Screenshot 4")


Итого:
* рабочее приложение на desktop
* приложения на ios и android (apk в корне проекта), которые не работают из-за нерешенных мною проблем с полифиллом.
* Изучен процесс создания приложений на Phonegap (добавление плагинов, иконок, сплэшскрина) В процессе разработки попробовал эмулятор для ios XCode и эмулятор SDK-tools. Приложение поставлено на iPhone.
* По поводу http://goratchet.com - он давно не поддерживается, что не идет ему на пользу. Некоторые визуальные компоненты устарели.