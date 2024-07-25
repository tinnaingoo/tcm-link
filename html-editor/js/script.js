document.getElementById('editor').addEventListener('input', updateCharCount);

function execCmd(command, value = null) {
    document.execCommand(command, false, value);
}

function updateCharCount() {
    var text = document.getElementById('editor').innerText;
    document.getElementById('char-count').innerText = 'Characters: ' + text.length;
}

function viewSource() {
    var editorContent = document.getElementById('editor').innerHTML;
    var sourceArea = document.getElementById('source');
    sourceArea.value = editorContent;
    sourceArea.style.display = 'block';
}
