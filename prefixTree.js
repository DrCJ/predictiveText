


// NEEDS TO BE IMPLMENTED TO RETURN NAMES SORTED BY RANK

// class LinkedListNode {
//   constructor(value) {
//     this.value = value;
//     this.next = null;
//   }
// }

// class LinkedList {
//   constructor() {
//     this.head = null;
//     this.tail = null;
//   }
// }

// class sortedNames {
//   constructor() {
//     this._storage = [];
//   }

//   insert({name, rank, endWord}) {
//     var names = name.split(' ');
//     var first, last, suffix;
//     if (names[0]) { first = names[0]; }
//     if (names[1]) { last = names[1]; }
//     if (names[2]) { suffix = names[2]; }

//     this._storage.push({first, last, suffix, rank});

//     //TO DO - USE BINARY SEARCH TO FIND THE CORRECT INDEX TO INSERT BASED ON RANK
//     //SPLICE IN THE NEW ITEM TO STORAGE

//     // if (this._storage.length === 0) { this._storage.push({first, last, suffix, rank}); }
//     //insert into a sortedArray using binarySearch
//   }

//   binarySearch(rank) {
//     //TO BE IMPLEMENTED LATER

//     // var left = -1;
//     // var right = this._storage.length;
//     // var mid = Math.floor(right - left * 0.5);
//   }

//   getStorage() {
//     return this._storage;
//   }
// }

class PrefixTreeNode {
  constructor(value) {
    this.children = {};
    this.endWord = null;  //this is truthy (sorted array) if the node is the last character of a string
    this.value = value;
  }
}

class PrefixTree extends PrefixTreeNode {
  constructor() {
    super(null);
  }

  addWord(name, rank, fullname) {

    const addWordHelper = (node, str) => {

      var c = str[0];
      var children = node.children[c] || new PrefixTreeNode(c);
      node.children[c] = children;

      if (str.length === 1) {
        children[c].endWord = children[c].endWord || {};
        children[c].endWord[fullname] = rank;
      }

      if (str.length > 1) {
        addWordHelper(children[c], str.slice(1));
      }
    };
    addWordHelper(this, name);
  }

  addName(fullname, rank) {
    var names = fullname.split(' ');
    var that = this;
    names.forEach(name => that.addWord(name, rank, fullname));
  }

  predictWord(string) {
    var getRemainingTree = function(string, tree) {
      var node = tree;
      while (string && node) {
        node = node.children[string[0]];
        string = string.substr(1);
      }
      return node;
    };

    var allWords = [];

    var allWordsHelper = function(stringSoFar, tree) {
      for (let k in tree.children) {
        const child = tree.children[k]
        var newString = stringSoFar + child.value;
        if (child.endWord) {
          allWords.push(newString);
        }
        allWordsHelper(newString, child);
      }
    };

    var remainingTree = getRemainingTree(string, this);
    if (remainingTree) {
      allWordsHelper(string, remainingTree);
    }

    return allWords;
  }

  predictName(string) {
    var getRemainingTree = function(string, tree) {
      var node = tree;
      while (string && node) {
        node = node.children[string[0]];
        string = string.substr(1);
      }
      return node;
    };

    var allNames = {};

    var allNamesHelper = function(stringSoFar, tree) {
      for (let k in tree.children) {
        const child = tree.children[k]
        var newString = stringSoFar + child.value;
        if (child.endWord) {
          console.log('endWord:', child.endWord);
          allNames = Object.assign(allNames, child.endWord);
        }
        allNamesHelper(newString, child);
      }
    };

    var remainingTree = getRemainingTree(string, this);
    if (remainingTree) {
      allNamesHelper(string, remainingTree);
    }

    return allNames;
  }

  logAllWords() {
    console.log('------ ALL WORDS IN PREFIX TREE -----------')
    console.log(this.predictWord(''));
  }

  logAllWords() {
    console.log('------ ALL NAMES IN PREFIX TREE -----------')
    console.log(this.predictName(''));
  }
}


var tree = new PrefixTree();
// tree.addWord('pizza');
// tree.addWord('picasso');
// tree.addWord('bread');
// tree.addWord('apple');
// tree.addWord('pie');


const dummyRankedList = [
  'Antonio Brown',
  'Tom Brady',
  'Andrew Luck',
  'Aaron Rodgers',
  'Todd Gurley',
  'Jay Cutler',
  'Ryan Fitzpatrick',
  'Matt Ryan',
  'Ryan Matthews',
  'Julio Jones',
  'James Jones'
]

dummyRankedList.forEach((name, i) => {
  tree.addName(name, i + 1);
});

// tree.addName('Antonio Brown', 1);
// tree.addName('Carmelo Anthony', 7);


// console.log('All words starting with Ant', tree.predictName('Ant'));
console.log('All words starting with Rya', tree.predictName('Rya'));
// tree.logAllWords();
