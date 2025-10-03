# 🗄️ Week 1: MongoDB – Data Layer Fundamentals and Advanced Techniques

## 🚀 Objective
Learn the fundamentals of MongoDB, including installation, creating collections, performing CRUD operations, using aggregation pipelines, and implementing indexing for performance optimization.

## 📂 Tasks

### Task 1: MongoDB Setup
- Install MongoDB on your local machine OR set up a free MongoDB Atlas cluster
- Create a new database called `plp_bookstore`
- Create a collection called `books`

### Task 2: Basic CRUD Operations
- Use the provided `insert_books.js` script to insert at least 10 book documents into your collection
- Each book should have the following fields:
  - `title` (string)
  - `author` (string)
  - `genre` (string)
  - `published_year` (number)
  - `price` (number)
  - `in_stock` (boolean)
  - `pages` (number)
  - `publisher` (string)
- Write MongoDB queries to:
  - Find all books in a specific genre
  - Find books published after a certain year
  - Find books by a specific author
  - Update the price of a specific book
  - Delete a book by its title

#### MongoDB queries
1. Find all books in a specific genre:
- ```bash db.books.find({ genre: "Gothic Fiction"}) ```
Result:
```bash
plp_bookstore> db.books.find({ genre: "Gothic Fiction"})
[
  {
    _id: ObjectId('68dea3c4b513760d7d5eee9b'),
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    genre: 'Gothic Fiction',
    published_year: 1847,
    price: 9.99,
    in_stock: true,
    pages: 342,
    publisher: 'Thomas Cautley Newby'
  }
]
plp_bookstore>
```

2. Find books published after a certain year
- ```bash db.books.find({ published_year: {$gt: 1847}}) ```
Result:
```bash
plp_bookstore> db.books.find({ published_year: {$gt: 1847}})
[
  {
    _id: ObjectId('68dea3c4b513760d7d5eee90'),
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    published_year: 1960,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: 'J. B. Lippincott & Co.'
  }, ...
  {
    ...
  }
]
```

3. Find books by a specific author
- ```bash db.books.find({ author: "J.R.R. Tolkien"}) ```
Result:
```bash
plp_bookstore> db.books.find({ author: "J.R.R. Tolkien"})
[
  {
    _id: ObjectId('68dea3c4b513760d7d5eee94'),
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: 'George Allen & Unwin'
  },
  {
    _id: ObjectId('68dea3c4b513760d7d5eee97'),
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    ...
  }
]
plp_bookstore>
```

4. Update the price of a specific book
- ```bash db.books.updateOne({ _id: ObjectId('68dea3c4b513760d7d5eee97')}, { $set: {price: 20.99} }) ```
Result:
```bash
plp_bookstore> db.books.updateOne({ _id: ObjectId('68dea3c4b513760d7d5eee97')}, { $set: {price: 20.99} })
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
plp_bookstore>
```
To confirm that the price of the book is updated:
```bash
plp_bookstore> db.books.findOne({_id: ObjectId('68dea3c4b513760d7d5eee97')})
{
  _id: ObjectId('68dea3c4b513760d7d5eee97'),
  title: 'The Lord of the Rings',
  author: 'J.R.R. Tolkien',
  genre: 'Fantasy',
  published_year: 1954,
  price: 20.99,
  in_stock: true,
  pages: 1178,
  publisher: 'Allen & Unwin'
}
plp_bookstore>
```

5. Delete a book by its title
- ```bash db.books.deleteOne({title: 'The Great Gatsby'}) ```
Result:
```bash
plp_bookstore> db.books.deleteOne({title: 'The Great Gatsby'})
{ acknowledged: true, deletedCount: 1 }
plp_bookstore>
```

### Task 3: Advanced Queries
- Write a query to find books that are both in stock and published after 2010
- Use projection to return only the title, author, and price fields in your queries
- Implement sorting to display books by price (both ascending and descending)
- Use the `limit` and `skip` methods to implement pagination (5 books per page)

#### MongoDB queries
1. Find books that are both in stock and published after 2010
- ```bash db.books.find({in_stock: true, published_year: {$gt: 2010}}) ```
Result:
```bash
plp_bookstore> db.books.find({in_stock: true, published_year: {$gt: 2010}})

plp_bookstore>
```

2. Use projection to return only the title, author, and price fields in your queries
- ```bash db.books.find({in_stock: true, published_year: {$gt: 2010}}, {title: 1, author: 1, genre: 1, price: 1, _id: 0}) ```
Result:
```bash
plp_bookstore> db.books.find({in_stock: true, published_year: {$gt: 2010}}, {title: 1, author: 1, genre: 1, price: 1, _id: 0})

plp_bookstore>
```
To test with existing data:
```bash
plp_bookstore> db.books.find({in_stock: true, published_year: {$lt: 2010}}, {title: 1, author: 1, genre: 1, price: 1, _id: 0})
[
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    price: 12.99
  },
  ...
]
```

3. Implement sorting to display books by price (both ascending and descending)
 **Ascending**
- ```bash db.books.find().sort({price: 1}) ```
Result:
```bash
plp_bookstore> db.books.find().sort({price: 1})
[
  {
    _id: ObjectId('68dea3c4b513760d7d5eee96'),
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: 'T. Egerton, Whitehall'
  },
  {
    _id: ObjectId('68dea3c4b513760d7d5eee98'),
    title: 'Animal Farm',
    author: 'George Orwell',
    genre: 'Political Satire',
    published_year: 1945,
    price: 8.5,
    in_stock: false,
    pages: 112,
    publisher: 'Secker & Warburg'
  },
  ...
]
```

 **Descending**
- ```bash db.books.find().sort({price: -1}) ```

4. Use the `limit` and `skip` methods to implement pagination (5 books per page)
- ```bash db.books.find().sort({price: 1}).skip(0).limit(5) ```
Result:
```bash
plp_bookstore> db.books.find().sort({price: 1}).skip(0).limit(5)
[
  {
    _id: ObjectId('68dea3c4b513760d7d5eee96'),
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: 'T. Egerton, Whitehall'
  },
  ...
]

plp_bookstore>
```


### Task 4: Aggregation Pipeline
- Create an aggregation pipeline to calculate the average price of books by genre
- Create an aggregation pipeline to find the author with the most books in the collection
- Implement a pipeline that groups books by publication decade and counts them

#### MongoDB queries
1. Create an aggregation pipeline to calculate the average price of books by genre
- ```bash db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" }
    }
  }
]);
 ```
Result:
```bash
plp_bookstore> db.books.aggregate([
...   {
...     $group: {
...       _id: "$genre",                    // Group by the genre field
...       averagePrice: { $avg: "$price" }  // Calculate average price
...     }
...   }
... ]);
[
  { _id: 'Romance', averagePrice: 7.99 },
  { _id: 'Fantasy', averagePrice: 17.99 },
  { _id: 'Fiction', averagePrice: 10.99 },
  { _id: 'Dystopian', averagePrice: 11.245000000000001 },
  { _id: 'Adventure', averagePrice: 12.5 },
  { _id: 'Gothic Fiction', averagePrice: 9.99 },
  { _id: 'Political Satire', averagePrice: 8.5 }
]
plp_bookstore>
```

2. Create an aggregation pipeline to find the author with the most books in the collection
- ```bash db.books.aggregate([
  {
    $group: {
      _id: "$author",
      bookCount: { $sum: 1 }
    }
  },
  {
    $sort: { bookCount: -1 }
  },
  {
     $limit: 1    
  }
]);
 ```
Result:
```bash
plp_bookstore> db.books.aggregate([
...   {
...     $group: {
...       _id: "$author",         // Group by author
...       bookCount: { $sum: 1 }  // Count the number of books per author
...     }
...   }
... ]);                                                                                                                                       
[
  { _id: 'Herman Melville', bookCount: 1 },
  { _id: 'J.R.R. Tolkien', bookCount: 2 },
  { _id: 'George Orwell', bookCount: 2 },
  { _id: 'Harper Lee', bookCount: 1 },
  { _id: 'Aldous Huxley', bookCount: 1 },
  { _id: 'Jane Austen', bookCount: 1 },
  { _id: 'J.D. Salinger', bookCount: 1 },
  { _id: 'Paulo Coelho', bookCount: 1 },
  { _id: 'Emily Brontë', bookCount: 1 }
]
plp_bookstore>
```

```bash
plp_bookstore> db.books.aggregate([                                                                                                           
...     {
...         $group: {
...         _id: "$author",               // Group by author
...         bookCount: { $sum: 1 }        // Count the number of books per author
...         },
...     },
...     {
...         $sort: { bookCount: -1 }  // Sort by book count, descending
...     },
...     {
...         $limit: 1                 // Get only the top author
...     }
...  ]);
[ { _id: 'George Orwell', bookCount: 2 } ]
plp_bookstore>
```

We could rename Rename fields for cleaner output:
```bash
plp_bookstore> db.books.aggregate([
...   {
...     $group: {
...       _id: "$author",
...       bookCount: { $sum: 1 }
...     }
...   },
...   {
...     $sort: { bookCount: -1 }
...   },
...   {
...     $limit: 1
...   },
...   {
...     $project: {
...       _id: 0,
...       author: "$_id",
...       bookCount: 1
...     }
...   }
... ]);
...
[ { bookCount: 2, author: 'J.R.R. Tolkien' } ]
plp_bookstore>
```

3. Implement a pipeline that groups books by publication decade and counts them
- ```bash db.books.aggregate([
  {
    $project: {
      decade: {
        $multiply: [
          { $floor: { $divide: ["$published_year", 10] } },
          10
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      bookCount: { $sum: 1 }
    }
  }
]);
 ```
Result:
```bash
plp_bookstore> db.books.aggregate([
...   {
...     $project: {
...       decade: {
...         $multiply: [
...           { $floor: { $divide: ["$published_year", 10] } },
...           10
...         ]
...       }
...     }
...   },
...   {
...     $group: {
...       _id: "$decade",
...       bookCount: { $sum: 1 }
...     }
...   }
... ]);
[
  { _id: 1950, bookCount: 2 },
  { _id: 1930, bookCount: 2 },
  { _id: 1960, bookCount: 1 },
  { _id: 1940, bookCount: 2 },
  { _id: 1810, bookCount: 1 },
  { _id: 1850, bookCount: 1 },
  { _id: 1980, bookCount: 1 },
  { _id: 1840, bookCount: 1 }
]
plp_bookstore>
```
We could sort the decades in ascending order for example:
```bash
plp_bookstore> db.books.aggregate([
...   {
...     $project: {
...       decade: {
...         $multiply: [
...           { $floor: { $divide: ["$published_year", 10] } },
...           10
...         ]
...       }
...     }
...   },
...   {
...     $group: {
...       _id: "$decade",
...       bookCount: { $sum: 1 }
...     }
...   },
...   {
...     $sort: { _id: 1 } // Sort by decade (ascending)
...   }
... ]);
...
[
  { _id: 1810, bookCount: 1 },
  { _id: 1840, bookCount: 1 },
  { _id: 1850, bookCount: 1 },
  { _id: 1930, bookCount: 2 },
  { _id: 1940, bookCount: 2 },
  { _id: 1950, bookCount: 2 },
  { _id: 1960, bookCount: 1 },
  { _id: 1980, bookCount: 1 }
]
plp_bookstore>
```
**Explanation:**

- `$project:`

  - Extracts the decade by dividing the published_year by 10, flooring it (e.g., 199 -> 199), and multiplying by 10 (→ 1990).

- `$group:`

  - Groups by the calculated decade.

  - Uses $sum: 1 to count how many books are in each decade.

- `$sort:`

  - Sorts results by decade in ascending order.

### Task 5: Indexing
- Create an index on the `title` field for faster searches
- Create a compound index on `author` and `published_year`
- Use the `explain()` method to demonstrate the performance improvement with your indexes

1. Create an index on the `title` field for faster searches
```bash
db.books.createIndex({ title: 1 });
```
result:
```bash
plp_bookstore> db.books.createIndex({ title: 1})
title_1
plp_bookstore>
```

2. Create a compound index on `author` and `published_year`
```bash
db.books.createIndex({ author: 1, published_year: 1 });
```
Result:
```bash
plp_bookstore> db.books.createIndex({ author: 1, published_year: 1 });
author_1_published_year_1
plp_bookstore>
```
We cab go agead to filter books by author and published year
```bash
plp_bookstore> db.books.find({ author: "Paulo Coelho", published_year: 1988 })
[
  {
    _id: ObjectId('68dea3c4b513760d7d5eee99'),
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: 'HarperOne'
  }
]
plp_bookstore>
```

3. Use the `explain()` method to demonstrate the performance improvement with your indexes
```bash
db.books.find({ author: "Paulo Coelho", published_year: 1988 }).explain("executionStats");
```
```bash
  executionStats: {
    executionSuccess: true,
    nReturned: 1,
    executionTimeMillis: 2,
    totalKeysExamined: 1,
    totalDocsExamined: 1,
    ...
  }
```

Dropping the index and running the same query
```bash
db.books.dropIndex("author_1_published_year_");
db.books.find({ author: "Paulo Coelho", published_year: 1988 }).explain("executionStats");
```

Result:
```bash
plp_bookstore> db.books.dropIndex("author_1_published_year_1");
{ nIndexesWas: 3, ok: 1 }

plp_bookstore> db.books.find({ author: "Paulo Coelho", published_year: 1988 }).explain("executionStats");
```
```bash
  executionStats: {
    executionSuccess: true,
    nReturned: 1,
    executionTimeMillis: 0,
    totalKeysExamined: 0,
    totalDocsExamined: 11,
    ...
```

It appears for this specific query, indexing the book title and published_year result in slight query time
aldhough less documments are looked up. The indexing could be beneficial for large data sets other than small ones:

**Interpratation Note**
- `totalDocsExamined` was reduced from 11 → 1 when the index was used — this is a clear efficiency gain, especially in large datasets.

- `executionTimeMillis` may appear faster without the index (0 ms), but:

  - This is misleading in small datasets.

  - MongoDB often optimizes and caches queries.

  - With larger collections, indexes drastically reduce cost and increase scalability.

## 🧪 Expected Outcome
- A functioning MongoDB database with properly structured data
- A set of MongoDB queries that demonstrate your understanding of CRUD operations
- Advanced queries showing filtering, projection, and sorting capabilities
- Aggregation pipelines that transform and analyze the data
- Properly implemented indexes with performance analysis

## 🛠️ Setup
1. Install MongoDB Community Edition or set up a MongoDB Atlas account
2. Use the provided `insert_books.js` script to populate your database
3. Use MongoDB Shell (mongosh) or MongoDB Compass to interact with your database
4. Save all your queries in a file called `queries.js`

## ✅ Submission Instructions
1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Add the following files to your repository:
   - `insert_books.js` (with your modifications if any)
   - `queries.js` (containing all your MongoDB queries)
   - A `README.md` file explaining how to run your scripts
   - A screenshot of your MongoDB Compass or Atlas showing your collections and sample data
4. Commit and push your changes to GitHub
5. Your submission will be automatically graded based on the criteria in the autograding configuration
6. The instructor will review your submission after the autograding is complete 