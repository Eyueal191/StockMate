/*
stage - 1 row data
[
  { "_id": ObjectId("a1"), "name": "Laptop", "price": 6000 },
  { "_id": ObjectId("a2"), "name": "Smartphone", "price": 5000 },
  { "_id": ObjectId("a3"), "name": "Headphones", "price": 1000 }
]
  and 
  [
  { "_id": 1, "item": ObjectId("a1"), "quantity": 2, "seller": "Alice", "date": "2025-11-21" },
  { "_id": 2, "item": ObjectId("a2"), "quantity": 1, "seller": "Bob", "date": "2025-11-21" },
  { "_id": 3, "item": ObjectId("a1"), "quantity": 3, "seller": "Alice", "date": "2025-11-20" },
  { "_id": 4, "item": ObjectId("a3"), "quantity": 5, "seller": "Charlie", "date": "2025-11-21" }
]

stage - 2 two $lookup at item and normalize it
so anatomy of $lookup?
{$lookup:{from:<refereneced entity model nam>, localField:fk-storing field, foreignField:"_id", as:field we store the Joined field}}
 
*/