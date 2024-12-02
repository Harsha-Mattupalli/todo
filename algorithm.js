function twoSum(nums, target) {

    if (nums.length < 2) {
        throw new Error("Array must contain at least two elements.");
    }
    const map = new Map()

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i]; 
        if (map.has(complement)) {
            return [map.get(complement), i];
        }

        map.set(nums[i], i);
    }
    throw new Error("No solution found.");
}


db.sales.aggregate([
  {
    $unwind: "$items"
  },
  {
    $project: {
      store: 1,
      date: 1,
      quantity: "$items.quantity",
      price: "$items.price",
      month: { $month: "$date" },  
      year: { $year: "$date" }
    }
  },
  {
    $group: {
      _id: { store: "$store", year: "$year", month: "$month" },
      totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } },
      avgPrice: { $avg: "$price" }   
    }
  },
  {
    $sort: { "_id.store": 1, "_id.year": 1, "_id.month": 1 }
  },
  
  {
    $project: {
      store: "$_id.store",
      year: "$_id.year",
      month: "$_id.month",
      totalRevenue: 1,
      avgPrice: 1,
      _id: 0
    }
  }
]);
