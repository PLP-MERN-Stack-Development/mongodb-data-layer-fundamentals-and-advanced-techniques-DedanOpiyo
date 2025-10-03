// Import MongoDB client
const { MongoClient } = require('mongodb');
require('dotenv').config();

// Connection URI (replace with your MongoDB connection string if using Atlas)
const uri = process.env.MONGO_URI // 'mongodb://localhost:27017';

// Database and collection names
const dbName = 'plp_bookstore';
const collectionName = 'books';

// Function to run MongoDB queries
async function runQueries() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB server');

    // Get database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Task 2: Basic CRUD Operations
    console.log('\nTask 2: Basic CRUD Operations');

    // 1. Find all books in a specific genre:
    const gothicFictionBooks = await collection.find({ genre: "Gothic Fiction"});
    console.log(`All books in the "Gothic Fiction" genre: `);
    if (gothicFictionBooks) {
        for await (book of gothicFictionBooks) {
            console.log(book);
        }
    }

    // 2. Find books published after a certain year
    const bookPublishedAfterFortySeven = await collection.find({ published_year: {$gt: 1847}})
    // console.log(`Books published after 1847: `, bookPublishedAfterFortySeven);

    // 3. Find books by a specific author
    const booksPublishedByJRRTolkien = await collection.find({ author: "J.R.R. Tolkien"})
    // console.log(`Books published by J.R.R. Tolkien: `, booksPublishedByJRRTolkien);

    // 4. Update the price of a specific book
    const updateBookPrice = await collection.updateOne({ _id: ObjectId('68dea3c4b513760d7d5eee97')}, { $set: {price: 20.99} })
    // console.log(`Book ${ObjectId('68dea3c4b513760d7d5eee97')} :  `, updateBookPrice);

    // 5. Delete a book by its title
    const deleteBookByTitle = await collection.deleteOne({title: 'The Great Gatsby'})
    // console.log(`The Great Gatsby deleted: `, deleteBookByTitle);

    // Task 3: Advanced Queries
    // console.log('\nTask 3: Advanced Queries');

    // 1. Find books that are both in stock and published after 2010
    const booksInStockPublishedAfterTwentyTen = await collection.find({in_stock: true, published_year: {$gt: 2010}})
    // console.log(`Books that are both in stock and published after 2010: `, booksInStockPublishedAfterTwentyTen);

    // 2. Use projection to return only the title, author, and price fields in your queries
    const onlyIncludeSpecificFields = await collection.find({in_stock: true, published_year: {$lt: 2010}})
    // console.log(`Specify fields needed in the final query result: `, onlyIncludeSpecificFields);

    // 3. Implement sorting to display books by price (both ascending and descending)
    // a)
    const booksSortedByPriceAsc = await collection.find().sort({price: 1})
    // console.log(`Books in ascending order (Sorted by price): `, booksSortedByPriceAsc);
    // b)
    const booksSortedByPriceDesc = await collection.find().sort({price: -1})
    // console.log(`Books in descending order (Sorted by price): `, booksSortedByPriceDesc);

    // 4. Use the `limit` and `skip` methods to implement pagination (5 books per page)
    const page = 1;
    const booksPerPage = 5;
    const paginatedBooks = await collection.find().skip((page - 1) * booksPerPage).limit(booksPerPage)
    // console.log(`Showing books in page ${page}: `, paginatedBooks);

    // Task 4: Aggregation Pipeline
    // console.log('\nTask 4: Aggregation Pipeline');

    // 1. Create an aggregation pipeline to calculate the average price of books by genre
    const avgPriceOfBook = await collection.aggregate([
      {
        $group: {
        _id: "$genre",                    // Group by the genre field
        averagePrice: { $avg: "$price" }  // Calculate average price
        }
      }
    ]);
    // console.log('Average price of books by genre')
    // console.log(avgPriceOfBook)

    // 2. Create an aggregation pipeline to find the author with the most books in the collection
    const authorWithMostBooks = await collection.aggregate([
      {
        $group: {
        _id: "$author",               // Group by author
        bookCount: { $sum: 1 }        // Count the number of books per author
        },
      },
      {
            $sort: { bookCount: -1 }  // Sort by book count, descending
      },
      {
            $limit: 1                 // Get only the top author
      }
    ]);
    // console.log('Author with the most books in the collection')
    // console.log(authorWithMostBooks)

    // 3. Implement a pipeline that groups books by publication decade and counts them
    const booksByPublicationDecadeCount = await collection.aggregate([
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
    // console.log('Groups books by publication decade and counts them')
    // console.log(booksByPublicationDecadeCount)


    // Task 5: Indexing
    // console.log('\nTask 5: Indexing');

    // 1. Create an index on the `title` field for faster searches
    const indexTitleField = await collection.createIndex({ title: 1 });
    // console.log('Indexed title field: ', indexTitleField);
    
    // 2. Create a compound index on `author` and `published_year`
    const compoundIndexOnFields = await collection.createIndex({ author: 1, published_year: 1 });
    // console.log('Compound index on `author` and `published_year`: ', compoundIndexOnFields);

    // 3. Use the `explain()` method to demonstrate the performance improvement with your indexes
    const explainResult = await collection.find({ author: "Paulo Coelho", published_year: 1988 }).explain("executionStats");
    // console.log(explainResult.executionStats);

    // console.log('If we drop the index and rerun the same querry...')

    await collection.dropIndex("author_1_published_year_1");
    const explainResultII = await collection.find({ author: "Paulo Coelho", published_year: 1988 }).explain("executionStats");
    // console.log(explainResultII.executionStats);

    // With index totalDocsExamined reducees from 11 -> 1 (efficiency gain, especially for large datasets)
    // executionTimeMillis appear faster because this is a small dataset. It would probably optimize and cache the queries, making it more reliable.


  } catch (err) {
    console.error('Error during MongoDB operations:', err);
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}

// Run the function
runQueries().catch(console.error);
