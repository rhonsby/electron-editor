const { ipcRenderer } = require('electron');
const monacoLoader = require('monaco-loader');
const fs = require('fs');


document.addEventListener('DOMContentLoaded', () => {
    let currentFilePath;

    monacoLoader().then(() => {
        let editor = monaco.editor.create(document.getElementById('container'), {
            language: 'javascript',
            theme: 'vs-dark',
            automaticLayout: true,
        });

        ipcRenderer.on('navigate', (e, url) => {
            url = url.slice(7);
            fs.readFile(url, 'utf8', (error, result) => {
                if (error) {
                    console.log(`File error load failed: ${error}`)
                    return;
                }

                editor.setModel(monaco.editor.createModel(result, 'javascript'));
                currentFilePath = url;
            });
        });

        ipcRenderer.on('ping', (e, command) => {
            if (command === 'save') {
                ipcRenderer.send('async', 'save', {
                    url: currentFilePath,
                    data: editor.getValue()
                });
            }
        });
    });
});
