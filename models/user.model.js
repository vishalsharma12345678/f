import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const addressSchema = new Schema(
  {
    street: {
      type: String,
      required: [true, "Street is required!!!"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required!!!"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required!!!"],
      trim: true,
    },
    postal: {
      type: String,
      required: [true, "Postal is required!!!"],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required!!!"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const cartItems = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required!!!"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required!!!"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!!!"],
    },
    first: {
      type: String,
      required: [true, "First is required!!!"],
      lowercase: true,
      trim: true,
    },
    last: {
      type: String,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    billing: {
      addressSchema,
    },
    shipping: {
      addressSchema,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    payments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Payment",
      },
    ],
    cart: [cartItems],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    refreshToken: {
      type: String,
    },
    role: {
      type: String,
      enum: ["customer", "seller"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      first: this.first,
      last: this.last,
    },
    "process.env.ACCESS_TOKEN_SECRET",
    {
      expiresIn: 1000 * 60 * 60,
    }
  );
};

userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
    },
    "process.env.REFRESH_TOKEN_SECRET",
    {
      expiresIn: 1000 * 60 * 60,
    }
  );
};

const User = mongoose.model("User", userSchema);

export default User;
