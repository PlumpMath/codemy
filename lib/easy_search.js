//search
EasySearch.createSearchIndex('posts', {
  'use' : 'mongo-db',
  'reactive': false,
  'field' : ['title', 'author'],  // required, searchable field(s)
  'collection' : Posts,      // required, Mongo Collection
  'limit' : 10,    // not required, default is 10
  'sort': function() {
        return { 'votes': -1, 'submitted': -1};
    }
  
});
