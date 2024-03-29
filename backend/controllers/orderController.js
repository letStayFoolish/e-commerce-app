import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { calcPrice } from "../utils/calcPrice.js";

// @desc    Create New Order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(404);
    throw new Error("No order items");
  } else {
    // NOTE: here we must assume that the prices from our client are incorrect.
    // We must only trust the price of the item as it exists in
    // our DB. This prevents a user paying whatever they want by hacking our client
    // side code - https://gist.github.com/bushblade/725780e6043eaf59415fbaf6ca7376ff

    // get the ordered items from our DB:
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((i) => i._id) },
    });

    // map over the order items and use the price from our items from database
    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemOnDB = itemsFromDB.find(
        (x) => x._id.toString() === itemFromClient._id
      );

      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemOnDB.price,
        _id: undefined,
      };
    });

    // calculate prices
    const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
      calcPrice(dbOrderItems);

    const order = new Order({
      // create Order items mapping through orderItems from localStorage, and defining flag product: item._id,
      // to have the same ID as item, but also need to escape doubling IDs, by setting default _id to undefined
      orderItems: dbOrderItems,
      user,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save();

    res.status(200).json(createOrder);
  }
});

// @desc    Get Current (logged in) User Orders
// @route   GET /api/orders/mine
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(404);
    throw new Error("You do not have any orders.");
  }
});

// @desc    Get Order By ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderByID = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update Order To Paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id); // url: .../order/:id

    if (order) {
      (order.isPaid = true), (order.paidAt = Date.now());
      // If you are using PayPal API:
      // (order.paymentResult = {
      //   id: req.body.id,
      //   status: req.body.status,
      //   update_time: req.body.update_time,
      //   email_address: req.body.user.email_address,
      // });

      const updateOrder = await order.save();

      res.status(200).json(updateOrder);
    } else {
      res.status(404);
      throw new Error(`Order not found`);
    }
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
});

// @desc    Update Order To Delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updateOrder = await order.save();

    res.status(200).json(updateOrder);
  } else {
    res.status(404);

    throw new Error("Order not found");
  }
});

// @desc    Get All Orders
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;
  const totalItems = await Order.countDocuments({});

  const orders = await Order.find({})
    .limit(pageSize)
    .skip((page - 1) * pageSize);

  if (orders) {
    res
      .status(200)
      .json({
        orders,
        page,
        pageSize,
        pages: Math.ceil(totalItems / pageSize),
      });
  } else {
    res.status(404);
    throw new Error("Order list is empty");
  }
});
