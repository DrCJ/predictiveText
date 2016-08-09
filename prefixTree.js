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
        children.endWord = children.endWord || {};
        children.endWord[fullname] = rank;
      }

      if (str.length > 1) {
        addWordHelper(children, str.slice(1));
      }
    };
    addWordHelper(this, name);
  }

  addName(fullname, rank) {
    var names = fullname.split(' ');
    var that = this;
    names.forEach(name => that.addWord(name, rank, fullname));
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

    var allNamesHelper = function(tree) {
      var children = tree.children;

      for (let key in children) {
        const child = children[key];

        if (child.endWord) {
          allNames = Object.assign(allNames, child.endWord);
        }

        allNamesHelper(child);
      }
    };

    var remainingTree = getRemainingTree(string, this);
    if (remainingTree) {
      allNamesHelper(remainingTree);
    }

    var sortedNames = [];
    for(let key in allNames) {
      sortedNames.push({key: key, rank: allNames[key]});
    }

    sortedNames.sort(function(a, b) {
      if(a.rank > b.rank) {
        return 1;
      } else if(a.rank < b.rank) {
        return -1;
      }

      return 0;
    });

    return sortedNames;
  }
}


var tree = new PrefixTree();
// tree.addWord('pizza');
// tree.addWord('picasso');
// tree.addWord('bread');
// tree.addWord('apple');
// tree.addWord('pie');


const dummyRankedList = [
  'Tom Brady',
  'Andrew Luck',
  'Aaron Rodgers',
  'Todd Gurley',
  'Jay Cutler',
  'Ryan Fitzpatrick',
  'Matt Ryan',
  'Ryan Matthews',
  'Julio Jones',
  'James Jones',
  'Antonio Brown',
]

dummyRankedList.forEach((name, i) => {
  tree.addName(name, i + 1);
});

// tree.addName('Antonio Brown', 1);
// tree.addName('Carmelo Anthony', 7);


// console.log('All words starting with Ant', tree.predictName('Ant'));
console.log('All words starting with Rya', tree.predictName('Rya'));
// tree.logAllWords();
