## Ace text editor

```js
var editor = ace.edit('editor');
//
editor.setTheme();
// tell is javascript
editor.getSession().setMode('ace/mode/typescript');
//
editor.selection.on('changeCursor', () => {
  var cursor = editor.getCursorPosition();
  console.log('cursor',cursor); // => {row:number,column:number}
});
//
editor.getSession(); // =>
```
