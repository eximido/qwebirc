qwebirc.irc.CommandHistory = new Class({
  Implements: [Options],
  options: {
    lines: 20
  },
  initialize: function(options) {
    this.setOptions(options);
    
    this.data = [];
    this.position = 0;
    this.edited = false;
    this.caretPos = null;
  },
  addLine: function(line, moveUp) {
    if((this.data.length == 0) || (line != this.data[0])) {
      if(moveUp && this.edited && this.data.length) {
        this.data[0] = line; // replace edited but unsent line with new one to have only one unsent item stored in history
      } else {
        this.data.unshift(line);
      }
    }
    if(moveUp) {
      this.position = 0;
      this.edited = true;
    } else {
      this.position = -1;
      this.edited = false;
    }
    
    if(this.data.length > this.options.lines)
      this.data.pop();
  },
  upLine: function() {
    if(this.data.length == 0)
      return null;
      
    if(this.position >= this.data.length)
      return null;
      
    this.position = this.position + 1;
    
    return this.data[this.position];
  },
  downLine: function() {
    if(this.position == -1)
      return null;

    this.position = this.position - 1;

    if(this.position == -1)
      return null;
      
    return this.data[this.position];
  },
  currentLine: function() {
    if(this.position >= this.data.length || this.position == -1)
      return null;
    return this.data[this.position];
  },
  getCaretPos: function() {
    if (this.position === 0 && this.edited === true)
      return this.caretPos;
    else
      return null;
  },
  setCaretPos: function(pos) {
    if (this.position === 0 && this.edited === true)
      this.caretPos = pos;
  }
});
