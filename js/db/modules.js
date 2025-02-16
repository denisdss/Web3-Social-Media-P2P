import { debug } from "../pages/modules.js";

export const initDB = (dbName, objStore) => {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(dbName);

        request.onsuccess = (event) => {
            // O banco de dados foi aberto com sucesso
            const db = (event.target).result;
            db.close();
            resolve(true);
        };

        request.onerror = (event) => {
            // Ocorreu um erro ao abrir o banco de dados
            // reject(event.target.error);
        };

        request.onupgradeneeded = (event) => {
            const db = request.result;

            objStore.forEach((store) => {
                if (!db.objectStoreNames.contains(store.name)) {
                    db.createObjectStore(store.name, store.attr);
                }
            });

            console.log(`Database ${dbName} created`);
        };

    });
};

// delete table
export async function deleteTable(dbName, storeName) {
    const request = window.indexedDB.open(dbName, await getVersion(dbName) + 1);
    return new Promise((resolve, reject) => {
        request.onupgradeneeded = (event) => {
            const db = (event.target).result;
            // check if table exists
            if (!db.objectStoreNames.contains(storeName)) {
                console.log(`Table ${storeName} does not exist`);
            } else {
                db.deleteObjectStore(storeName);
                console.log(`Table ${storeName} deleted`);
            }
        };
        // change version and force onupgradeneeded
        request.onsuccess = (event) => {
            const db = (event.target).result;
            db.close()
            resolve();
        }
        request.onerror = function (event) {
            console.error('Erro ao abrir o banco de dados:', event.target.error);
        };

        request.onblocked = function (event) {
            console.warn('A atualização foi bloqueada. Feche outras conexões ao banco.');
        };
    });
}
// delete data
export async function deleteData(dbName, storeName, key) {
    const request = window.indexedDB.open(dbName);
    return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
            const db = event.target.result
            let transaction = db.transaction(storeName, "readwrite");
            let store = transaction.objectStore(storeName);
            store.delete(key);
            transaction.oncomplete = function () {
                db.close();
                resolve();
            };
            transaction.onerror = function () {
                reject(transaction.error);
            };
        }
        request.onerror = (event) => {
            reject(event.target.error);
        };
        request.onblocked = function (event) {
            console.warn('A atualização foi bloqueada. Feche outras conexões ao banco.');
        }
    });
}
// edit data
export async function editData(dbName, storeName, data) {
    const request = window.indexedDB.open(dbName);
    return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
            const db = event.target.result
            let transaction = db.transaction(storeName, "readwrite");
            let store = transaction.objectStore(storeName);
            store.put(data);
            transaction.oncomplete = function () {
                db.close();
                resolve();
            };
            transaction.onerror = function () {
                reject(transaction.error);
            };
        }
        request.onerror = (event) => {
            reject(event.target.error);
        };
        request.onblocked = function (event) {
            console.warn('A atualização foi bloqueada. Feche outras conexões ao banco.');
        }
    });
}
// get table keyPath
export async function getKeyPath(dbName, storeName) {
    const request = window.indexedDB.open(dbName);
    return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
            const db = event.target.result
            let transaction = db.transaction(storeName, "readonly");
            let store = transaction.objectStore(storeName);
            db.close()
            resolve(store.keyPath);
        }
        request.onerror = (event) => {
            reject(event.target.error);
        };
        request.onblocked = function (event) {
            console.warn('A atualização foi bloqueada. Feche outras conexões ao banco.');
        }
    });
}
// rename table
export async function renameTable(oldTable, newTable) {
    const request = window.indexedDB.open(dbName, await getVersion(dbName) + 1);
    const keyPath = await getKeyPath(oldTable);
    request.onupgradeneeded = function (event) {
        const db = event.target.result;

        // Verifica se a tabela antiga existe
        if (db.objectStoreNames.contains(oldTable)) {
            // Cria a nova tabela (object store)
            const novaStore = db.createObjectStore(newTable, { keyPath: keyPath });

            // Abre a tabela antiga para copiar os dados
            const transaction = event.target.transaction;
            const oldStore = transaction.objectStore(oldTable);

            // Recupera todos os dados da tabela antiga
            const getAllRequest = oldStore.getAll();

            getAllRequest.onsuccess = function (event) {
                const data = event.target.result;  // Dados recuperados

                // Adiciona os dados na nova tabela
                data.forEach(item => {
                    novaStore.add(item);
                });
            };

            getAllRequest.onerror = function (event) {
                console.error('Erro ao copiar dados:', event.target.error);
            };

            // Remove a tabela antiga após copiar os dados
            db.deleteObjectStore(nomeAntigo);
        } else {
            console.warn('Tabela antiga não existe.');
        }
    };

    request.onsuccess = function () {
        const db = request.result;
        db.close();
        console.log(`Tabela "${nomeAntigo}" renomeada para "${nomeNovo}" com sucesso!`);
    };

    request.onerror = function (event) {
        console.error('Erro ao abrir o banco de dados:', event.target.error);
    };
}

// get version
export async function getVersion(dbName) {
    const request = window.indexedDB.open(dbName);
    return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
            const db = (event.target).result;
            db.close()
            console.log(`Database ${dbName} version: ${db.version}`);
            resolve(db.version);
        };
        request.onerror = (event) => {
            reject(event.target.error);
        };
        request.onblocked = function (event) {
            console.warn('A atualização foi bloqueada. Feche outras conexões ao banco.');
        };
    });
}
// create a new object store
export async function createTable(dbName, storeName, attr) {
    const request = window.indexedDB.open(dbName, await getVersion(dbName) + 1);
    return new Promise((resolve, reject) => {
        request.onupgradeneeded = (event) => {
            const db = (event.target).result;
            // check if table exists
            if (db.objectStoreNames.contains(storeName)) {
                console.log(`Table ${storeName} already exists`);
                return;
            }
            const store = db.createObjectStore(storeName, attr);
            console.log(`Table ${storeName} created`);
        };
        // change version and force onupgradeneeded
        request.onsuccess = (event) => {
            const db = (event.target).result;
            db.close()
            resolve();
        }
        request.onerror = function (event) {
            console.error('Erro ao abrir o banco de dados:', event.target.error);
        };

        request.onblocked = function (event) {
            console.warn('A atualização foi bloqueada. Feche outras conexões ao banco.');
        };
    });
}

export async function addData(dbName, storeName, data) {
    console.log(dbName, storeName, data);
    const request = window.indexedDB.open(dbName);
    return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
            const db = event.target.result
            let transaction = db.transaction(storeName, "readwrite");
            let store = transaction.objectStore(storeName);
            store.add(data);
            transaction.oncomplete = function () {
                db.close();
                resolve(true);
            };
            transaction.onerror = function () {
                reject(transaction.error);
            };
        }
        request.onerror = (event) => {
            reject(event.target.error);
        };
        request.onblocked = function (event) {
            console.warn('A atualização foi bloqueada. Feche outras conexões ao banco.');
        }
    });
}
// add array of data
export async function addBulkData(dbName, storeName, data) {
    const request = window.indexedDB.open(dbName);
    return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
            const db = event.target.result
            let transaction = db.transaction(storeName, "readwrite");
            let store = transaction.objectStore(storeName);
            data.forEach((item) => {
                store.add(item);
            });
            transaction.oncomplete = function () {
                db.close();
                resolve();
            };
            transaction.onerror = function () {
                reject(transaction.error);
            };
        }
        request.onerror = (event) => {
            reject(event.target.error);
        };
        request.onblocked = function (event) {
            console.warn('A atualização foi bloqueada. Feche outras conexões ao banco.');
        }
    });
}

export async function getData(dbName, storeName, key) {
    const request = window.indexedDB.open(dbName);
    return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
            const db = event.target.result
            let transaction = db.transaction(storeName, "readonly");
            let store = transaction.objectStore(storeName);
            let data = store.get(key);
            data.onsuccess = function () {
                db.close();
                resolve(data.result);
            };
            data.onerror = function () {
                reject(data.error);
            };
        }
        request.onerror = (event) => {
            reject(event.target.error);
        };
        request.onblocked = function (event) {
            console.warn('A atualização foi bloqueada. Feche outras conexões ao banco.');
        }
    });
}

// check if table exists
export async function checkTable(dbName, storeName, options) {
    const request = window.indexedDB.open(dbName);
    return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
            const db = event.target.result
            if (db.objectStoreNames.contains(storeName)) {
                console.log(`Table ${storeName} exists`);
                // check if table is empty
                if (options && options.noEmpty) {
                    let transaction = db.transaction(storeName, "readonly");
                    let store = transaction.objectStore(storeName);
                    let data = store.getAll();
                    data.onsuccess = function () {
                        if (data.result.length === 0) {
                            console.log(`Table ${storeName} is empty`);
                            db.close();
                            resolve(false);
                        } else {
                            console.log(`Table ${storeName} is not empty`);
                            db.close();
                            resolve(true);
                        }
                    };
                    data.onerror = function () {
                        reject(data.error);
                    };
                } else {
                    db.close();
                    resolve(true);
                }
            } else {
                console.log(`Table ${storeName} does not exist`);
                db.close();
                resolve(false);
            }
        }
        request.onerror = function (event) {
            reject(event.target.error);
        };
        request.onblocked = function (event) {
            console.warn('A atualização foi bloqueada. Feche outras conexões ao banco.');
        }
    });
}

// get all data from table
export async function getAllData(dbName, storeName) {
    console.log(dbName, storeName);
    const request = window.indexedDB.open(dbName);
    return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
            const db = event.target.result
            let transaction = db.transaction(storeName, "readonly");
            let store = transaction.objectStore(storeName);
            let data = store.getAll();
            data.onsuccess = function () {
                db.close();
                resolve(data.result);
            };
            data.onerror = function () {
                reject(data.error);
            };
        };
        request.onerror = (event) => {
            reject(event.target.error);
        };
        request.onblocked = function (event) {
            console.warn('A atualização foi bloqueada. Feche outras conexões ao banco.');
        }
    });
}