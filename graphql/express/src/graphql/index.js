const { buildSchema } = require("graphql");
const db = require("../database");

const graphql = { };

// GraphQL.
// Construct a schema, using GraphQL schema language
graphql.schema = buildSchema(`
  # The GraphQL types are declared first.

  # NOTE: The user and review are pseudo-joined; whilst they are related, how they are related is an implementation detail
  # that is NOT exposed in the GraphQL schema. This can be seen with the Review type which has no field linking it to
  # an user. That said an user has many reviews and this is exposed within the GraphQL schema by association.
  # Behind the scenes the database review table has an additional field called username which is a FK to user.
  type User {
    username: String,
    password_hash: String, 
    first_name: String,
    last_name: String,
    joining_date: String, 
    curr_cart: Int, 
    blocked: Boolean,
    reviews: [Review]
  }

  type Product {
    product_id: Int, 
    product_name: String,
    product_price: Float, 
    product_image: String, 
    is_special: Boolean, 
    product_score: Float, 
    num_of_reviews: Int, 
    total_score: Int,  
    reviews: [Review]
  }

  type Review {
    review_id: Int,
    rating: Int, 
    text: String, 
    flagged: Boolean, 
    deleted: Boolean
  }

  # The input type can be used for incoming data.
  input ProductInput {
    product_id: Int, 
    product_name: String,
    product_price: Float, 
    product_image: String, 
    is_special: Boolean, 
    product_score: Float
    num_of_reviews: Int, 
    total_score: Int
  }

  # Queries (read-only operations).
  type Query {
    all_users: [User],
    user(username: String): User,
    user_exists(username: String): Boolean,

    all_products: [Product],
    product(product_id: Int): Product,
    product_exists(product_id: Int): Boolean,

    all_reviews: [Review],
    review(review_id: Int): Review,
    review_exists(review_id: Int): Boolean  
  }

  # Mutations (modify data in the underlying data-source, i.e., the database).
  type Mutation {
    block_user(username: String): Boolean,

    create_product(input: ProductInput): Product,
    update_product(input: ProductInput): Product,
    delete_product(product_id: Int): Boolean,

    delete_review(review_id: Int): Boolean    
  }

`);

// The root provides a resolver function for each API endpoint.
graphql.root = {
  // User Queries.
  all_users: async () => {
    return await db.user.findAll({ include: { model: db.review, as: "reviews" } });
  },
  user: async (args) => {
    return await db.user.findByPk(args.username);
  },
  user_exists: async (args) => {
    const count = await db.user.count({ where: { username: args.username } });

    return count === 1;
  },

  // User Mutations.
  block_user: async (args) => {
    let user = await db.user.findByPk(args.username);
  
    // Update user fields.
    if (user.blocked === false) {
      user.blocked = true;
    } else {
      user.blocked = false;
    }
    
    await user.save();

    return true;
  },  

  // Product Queries.
  all_products: async () => {
    return await db.product.findAll({ include: { model: db.review, as: "reviews" } });
  },
  product: async (args) => {
    return await db.product.findByPk(args.product_id);
  },
  product_exists: async (args) => {
    const count = await db.product.count({ where: { product_id: args.product_id } });
  
    return count === 1;
  },
  
  // Product Mutations.
  create_product: async (args) => {
    const product = await db.product.create(args.input);
  
    return product;
  },
  update_product: async (args) => {
    const product = await db.product.findByPk(args.input.product_id);
    
    // Update product fields.
    product.product_price = args.input.product_price;
  
    await product.save();
  
    return product;
  },
  delete_product: async (args) => {
    const product = await db.product.findByPk(args.product_id);
    
    if(product === null)
      return false;
  
    // First remove all reviews of the prodcut.
    await db.review.destroy({ where: { product_id: product.product_id } });
    await product.destroy();
  
    return true;
  },

  // Review Queries.
  all_reviews: async () => {
    return await db.review.findAll();
  },
  review: async (args) => {
    return await db.review.findByPk(args.review_id);
  },
  review_exists: async (args) => {
    const count = await db.review.count({ where: { review_id: args.review_id } });
  
    return count === 1;
  },
  
  // Review Mutations.
  delete_review: async (args) => {
    const review = await db.review.findByPk(args.review_id);
    
    if (review.deleted === false) {
      review.deleted = true;
    } else {
      review.deleted = false;
    }
  
    // await db.review.destroy({ where: { review_id: review.review_id } });
    await review.save(); 
  
    return true;
  }  
};

module.exports = graphql;