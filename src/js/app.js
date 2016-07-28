export default class App {
    constructor() {
        window.addEventListener('push', checkPage);
        // 'global' variable to store reference to the database
        // Some global variables (database, references to key UI elements)
        var db, form;
        // полифилл indexedDB
        // window.shimIndexedDB.__useShim();
        var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

        databaseOpen(checkPage);
        // window.addEventListener('push', checkPage);

        function checkPage() {
            var fileName = location.href.split("/").slice(-1);
            fileName = fileName[0];
            if (fileName === 'add.html') {
                form = document.querySelector('.form');
                form.addEventListener('submit', onSubmitSave);
            } else if (fileName === 'edit.html') {
              let id = localStorage.getItem('noteToEdit')
                form = document.querySelector('.form');
                form.addEventListener('submit', onSubmitDelete);
                databaseGet(parseInt(id, 10), (item) => {
                  // console.log(item);
                  form.querySelector('.form__title').value = item.result.name;
                  form.querySelector('.form__description').value = item.result.description;
                })
            } else {
                databaseTodosGet(function(todos) {
                    console.log(todos);
                    var ul = document.createElement('ul');
                    ul.className = 'table-view';
                    var div = '';
                    todos.forEach(function(elem) {
                        div += `<li class="table-view-cell"><a id="${elem.timeStamp}" href="edit.html" data-transition="slide-in" class="note__item push-right"><strong>${elem.name}</strong></a></li>`;
                    });
                    ul.innerHTML = div;
                    document.querySelector('.card').appendChild(ul);
                    let items = document.querySelectorAll('.note__item');
                    let slicedItems = [].slice.call(items);
                    slicedItems.forEach(function(item) {
                        item.addEventListener('touchstart', function() {
                            // self._showContent(idx);
                            // console.log(this.id);
                            localStorage.setItem("noteToEdit", this.id);
                        });
                    });

                    // .onclick = function() {
                    //         console.log(this);
                    //     }
                    // addEventListener('hover', function(e) {
                    //   console.log(this);
                    //   // localStorage.setItem("noteToEdit", "John");
                    // });;

                });
            }
        }

        function onSubmitSave(e) {
            e.preventDefault();
            databaseTodosAdd(function() {
                form.querySelector('.form__title').value = '';
                form.querySelector('.form__description').value = '';
                pushRedirectTo('index.html');
            });
        }

        function pushRedirectTo(path) {
            var new_path = window.location.href.split('/');
            new_path.pop();
            path.replace('/', '');
            new_path.push(path);
            new_path = new_path.join('/');
            //alert('p: ' + new_path);
            PUSH({
                url: new_path,
                transition: 'fade'
            });
        }

        function onSubmitDelete(e) {
            e.preventDefault();
            let id = localStorage.getItem('noteToEdit');
            databaseTodosDelete(parseInt(id, 10), () => {
                pushRedirectTo('index.html');
            });
        }

        function databaseTodosDelete(id, callback) {
            var transaction = db.transaction(['todo'], 'readwrite');
            var store = transaction.objectStore('todo');
            var request = store.delete(id);
            transaction.oncomplete = function(e) {
                callback();
            };
            request.onerror = databaseError;
        }

        function databaseGet(id, callback) {
            var transaction = db.transaction(['todo'], 'readwrite');
            var store = transaction.objectStore('todo');
            var item = store.get(id);
            transaction.oncomplete = function(e) {
                callback(item);
            };
            // request.onerror = databaseError;
        }

        function databaseTodosGet(callback) {
            var transaction = db.transaction(['todo'], 'readonly');
            var store = transaction.objectStore('todo');

            // Get everything in the store
            var keyRange = IDBKeyRange.lowerBound(0);
            var cursorRequest = store.openCursor(keyRange);

            // This fires once per row in the store. So, for simplicity,
            // collect the data in an array (data), and pass it in the
            // callback in one go.
            var data = [];
            cursorRequest.onsuccess = function(e) {
                var result = e.target.result;

                // If there's data, add it to array
                if (result) {
                    data.push(result.value);
                    result.continue();

                    // Reach the end of the data
                } else {
                    callback(data);
                }
            };
        }

        function databaseOpen(callback) {
            // Open a database, specify the name and version
            var version = 1;
            var request = indexedDB.open('todos', version);

            // Run migrations if necessary
            request.onupgradeneeded = function(e) {
                db = e.target.result;
                e.target.transaction.onerror = databaseError;
                db.createObjectStore('todo', {
                    keyPath: 'timeStamp'
                });
            };

            request.onsuccess = function(e) {
                db = e.target.result;
                callback();
            };
            request.onerror = databaseError;
        }

        function databaseError(e) {
            console.error('An IndexedDB error has occurred', e);
        }

        function databaseTodosAdd(callback) {
            var transaction = db.transaction(['todo'], 'readwrite');
            var store = transaction.objectStore('todo');
            var request = store.put({
                name: form.querySelector('.form__title').value,
                description: form.querySelector('.form__description').value,
                timeStamp: Date.now()
            });

            transaction.oncomplete = function(e) {
                callback();
            };
            request.onerror = databaseError;
        }
    }
}
