


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

//   insert({name, rank, pointer}) {
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
    this.pointer = null;  //this is truthy (sorted array) if the node is the last character of a string 
    this.value = value;
  }
}

class PrefixTree extends PrefixTreeNode {
  constructor() {
    super(null);
  }

  addWord(string, rank) {
    const addWordHelper = (node, str) => {
      if (!node.children[str[0]]) {
        node.children[str[0]] = new PrefixTreeNode(str[0]);
        if (str.length === 1) {

          node.children[str[0]].pointer = rank || 1;
        }
      } else {
        //word to this point exists.. check for duplicate names?

      }
      if (str.length > 1) {
        addWordHelper(node.children[str[0]], str.slice(1));
      }
    };
    addWordHelper(this, string);
  }

  addName(string, rank) {
    var names = string.split(' ');
    var that = this;
    names.forEach(name => that.addWord(name, rank));
  }

  removeWord(string) {
    //seems like this is not needed
  }

  predictWord(string) {
    var getRemainingTree = function(string, tree) {
      var node = tree;
      while (string) {
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
        if (child.pointer) {
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

  logAllWords() {
    console.log('------ ALL WORDS IN PREFIX TREE -----------')
    console.log(this.predictWord(''));
  }
}


var tree = new PrefixTree();
tree.addWord('pizza');
tree.addWord('picasso');
tree.addWord('bread');
tree.addWord('apple');
tree.addWord('pie');

tree.addName('Antonio Brown');
tree.addName('Carmelo Anthony');


console.log('All words starting with pi', tree.predictWord('pi'));
console.log('All words starting with Ant', tree.predictWord('Ant'));
tree.logAllWords();
