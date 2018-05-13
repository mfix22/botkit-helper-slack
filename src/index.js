// .------..------..------..------..------.     .------..------..------..------..------.
// |S.--. ||L.--. ||A.--. ||C.--. ||K.--. |.-.  |S.--. ||T.--. ||Y.--. ||L.--. ||E.--. |
// | :/\: || :/\: || (\/) || :/\: || :/\: ((5)) | :/\: || :/\: || (\/) || :/\: || (\/) |
// | :\/: || (__) || :\/: || :\/: || :\/: |'-.-.| :\/: || (__) || :\/: || (__) || :\/: |
// | '--'S|| '--'L|| '--'A|| '--'C|| '--'K| ((1)) '--'S|| '--'T|| '--'Y|| '--'L|| '--'E|
// `------'`------'`------'`------'`------'  '-'`------'`------'`------'`------'`------'

function _capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function get(key) {
  var helperStrings = {
    bullet : '•',
    here : '<!here|here>',
    channel : '<!channel>',
    group : '<!group>',
    everyone : "<!everyone>"
  }
  return helperStrings[key];
}

var __functions = {
  // emphasis
  italic : function() {
    return new SS("_" + this.s + "_").s;
  },
  bold : function() {
    return new SS("*" + this.s + "*").s;
  },
  code : function() {
    return new SS("`" + this.s + "`").s;
  },
  pre : function() {
    return new SS("```" + this.s + "```").s;
  },
  strike : function() {
    return new SS("~" + this.s + "~").s;
  },
  quote : function() {
    return new SS("> " + this.s).s;
  },
  paragraph : function() {
    return new SS('>>> ' + this.s).s;
  },
  emoji : function () {
    return new SS(":" + this.s.toLowerCase().split(' ').join('_').trim() + ":").s;
  },

  date : function(options) {
    options = options || {};
    var time = this.s, format = options.format || "{date}";

    if(!Number.isNaN(+time)) {
      time = new Date(time * 1000);
    }
    else if(typeof time === "string") {
      time = Date.parse(time);
      if(!time) throw new Error("Parameter '" + this.s + "' cannot be turned into a Date.");
      time = new Date(time);
    }

    var seconds = Math.floor(time.getTime() / 1000);

    var code = "<!date^" + seconds + "^" + format;
    if(options.link) code += "^" + options.link;

    return code + "|" + (options.fallback || time.toUTCString()) + ">";
  },

  // types of selectors
  //e.g. <@U123456>
  user : function() {
    return new SS("<@" + this.s.trim() + ">").s;
  },
  // basically a alias for user
  channel : function() {
    return new SS("<@" + this.s.trim() + ">").s;
  },
  //e.g. <!subteam^123456|sub-team>
  subteam : function (handle) {
    if (!handle) throw Error('Parameter "handle" is required for function subteam().')
    return new SS('<!subteam^' + this.s.trim() + '|' + handle + '>').s;
  },

  // links
  url : function(handle) {
    if (handle) return new SS("<" + this.s.trim() + '|' + handle + ">").s;
    return new SS("<" + this.s.trim() + ">").s;
  },
  //e.g. <mailto:test@email.com|test>
  email : function (handle) {
    if (handle) return new SS("<mailto:" + this.s.trim() + '|' + handle + ">").s;
    return new SS("<mailto:" + this.s.trim() + ">").s;
  },

  // variables
  atHere : function() {
    return get('here');
  },
  atEveryone : function() {
    return get('everyone');
  },
  atGroup : function() {
    return get('group');
  },
  atChannel : function() {
    return get('channel');
  },

  html : function() {
    return new SS(this.s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')).s;
  }
}
Object.freeze(__functions)


function extendPrototype() {
  for (var name in __functions) {
    (function(name){
      var func = __functions[name];
        var name = 'slack' + _capitalize(name);
        if (!String.prototype.hasOwnProperty(name)) {
          String.prototype[name] = function() {
            String.prototype.s = this;
            return func.apply(this, arguments);
          }
        }
    })(name);
  }
  return this;
}

// SS = 'SLACK STYLE'
function SS(s) {
  this.s = s;
}
// SS('my').italic() = '_my_'
for (var i in __functions) {
  if (__functions.hasOwnProperty(i)) {
    SS.prototype[i] = __functions[i];
  }
}

module.exports = function(s) {
  return new SS(s);
}
module.exports.extendPrototype = extendPrototype;
module.exports.get = get;
