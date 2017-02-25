const monacoLoader = require('monaco-loader');


document.addEventListener('DOMContentLoaded', () => {
    monacoLoader().then(() => {
        monaco.editor.create(document.getElementById('container'), {
            language: 'javascript',
            theme: 'vs-dark',
            automaticLayout: true,
        });
    });
});
