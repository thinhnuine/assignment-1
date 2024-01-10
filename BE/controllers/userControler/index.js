const bcrypt = require("bcryptjs");
const variantModel = require("../../models/Variant.js");
const Users = require("../../models/User.js");
const Joi = require("joi");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../middlewares/authenticator.js");
const userModel = require("../../models/User.js");
const { error } = require("../order/validation.js");
const User = require("../../models/User.js");

const login = async (req, res) => {
  try {
    const { password, email } = req.body;

        const emailExist = await Users.findOne({ email })
        const userName = emailExist?.userName;
        if (!emailExist) {
            return res.status(400).json("Người dùng không tồn tại");
        }

        const checkPassword = bcrypt.compareSync(password, emailExist.password)
        if (!checkPassword) {
            return res.status(400).json("Sai mật khẩu");
        }

        //create access token,refresh token
        const accessToken = generateAccessToken(emailExist._id)
        const refreshToken = generateRefreshToken(emailExist._id)

        console.log(accessToken)
        await Users.findByIdAndUpdate(emailExist._id, { refreshToken });
        
        return res.status(201).json({
            id: emailExist._id,
            email: email,
            role: emailExist.role,
            userName: userName,
            accessToken: accessToken,
            refreshToken: refreshToken
        })
    } catch (error) {
        return res.status(400).json({ message: error.message})
    }
  }
const loginAdmin = async (req, res) => {
  try {
    const { password, email } = req.body;

        const emailExist = await Users.findOne({ email })
        const userName = emailExist?.userName;
        if (!emailExist) {
            return res.status(400).json("Người dùng không tồn tại");
        }

        const checkPassword = bcrypt.compareSync(password, emailExist.password)
        if (!checkPassword) {
            return res.status(400).json("Sai mật khẩu");
        }
        const role = emailExist?.role
        console.log(role);
        if (!(role === "admin")) {
            return res.status(400).json("Không phải admin không thể truy cập");
        }

        //create access token,refresh token
        const accessToken = generateAccessToken(emailExist._id)
        const refreshToken = generateRefreshToken(emailExist._id)

        console.log(accessToken)
        await Users.findByIdAndUpdate(emailExist._id, { refreshToken });
        
        return res.status(201).json({
            id: emailExist._id,
            email: email,
            role: emailExist.role,
            userName: userName,
            accessToken: accessToken,
            refreshToken: refreshToken
        })
    } catch (error) {
        return res.status(400).json({ message: error.message})
    }
  }


const register = async (req, res) => {
  try {
    const body = req.body;
    const Schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      username: Joi.string(),
      password: Joi.string()
        .regex(
          /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/ // Mindx123@
        )
        .required(),
      phone: Joi.string()
        .regex(/^[0-9]{10}$/)
        .messages({
          "string.pattern.base": `Phone number must have 10 digits.`,
        }),
      birth_year: Joi.number().integer().min(1900).max(2013),
      shippingAddress: {
        address: Joi.string(),
        district: Joi.string(),
        city: Joi.string(),
      },
    }).unknown(true);

    const { error } = Schema.validate(body);
    if (error) {
      res.status(400);
      console.log(error.message);
      throw new Error("Email hoặc mật khẩu không hợp lệ.");
    }

    const sath = await bcrypt.genSalt(10);
    const newPass = await bcrypt.hash(body.password, sath);

    body.password = newPass;

    const { email } = body;

    const EmailExist = await Users.findOne({ email });
    if (EmailExist) {
      return res.status(400).json("Email đã tồn tại!");
    }

    const newUser = await Users.create(body);

    return res.status(201).json({ "Thêm mới thành công User: \n": newUser });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getAllUser = async (req, res) => {
  try {
    const pageSize = req.query.pageSize || 5;
    const pageIndex = req.query.pageIndex || 1;

    // console.log(pageSize, pageIndex)

    const users = await Users.find({})
      .skip(pageSize * pageIndex - pageSize)
      .limit(pageSize);

    // console.log(users)
    return res.status(200).json({
      user: users,
      countUser: users.length,
    });
  } catch (error) {
    return res.status(400).json({});
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);

    const body = req.body;
    // console.log(body)
    const Schema = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      username: Joi.string(),
      password: Joi.string().regex(
        /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/ // Mindx123@
      ),
      phone: Joi.string()
        .regex(/^[0-9]{10}$/)
        .messages({
          "string.pattern.base": `Phone number must have 10 digits.`,
        }),
      shippingAddress: {
        address: Joi.string(),
      },
      birth_year: Joi.number().integer().min(1900).max(2013),
      shippingAddress: {
        address: Joi.string(),
        district: Joi.string(),
        city: Joi.string(),
      },
    }).unknown(true);

    const { error } = Schema.validate(body);
    if (error) {
      res.status(400);
      console.log(error.message);
      throw new Error("Email hoặc mật khẩu không hợp lệ.");
    }
   
    if( body?.password ) {
      const sath = await bcrypt.genSalt(10);
      const newPass = await bcrypt.hash(body.password, sath);
      body.password = newPass;
    }

    const Result = await userModel.findByIdAndUpdate(id, body, { new: true });

    return res.status(201).json({
      message: " Cập nhật sản phẩm thành công",
      status: "success",
      user: Result,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    })
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const productDeleted = await userModel.findByIdAndDelete(id);

    if (productDeleted) {
      return res.status(200).json({
        message: "Xóa sản phẩm thành công",
        status: "success",
        productDeleted: productDeleted,
      });
    } else {
      return res.status(200).json({
        message: "Sản phẩm đã được xóa trước đó",
        status: "falle",
        productDeleted: productDeleted,
      });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
};

const refeshToken = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id)
    const userExits = await userModel.findById(id);
    const refreshToken = userExits.refreshToken;

    res.status(201).json({
      refreshToken: refreshToken,
      status: "success",
      user: userExits,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

const logOut = async (req, res) => {
  try {
    const id = req.params.id;
    const userExits = await userModel.findById(id);

    const result = await userModel.findByIdAndUpdate(id, {
      ...userExits,
      refreshToken: "",
    });
    return res.status(201).json({
      user: result,
      status: "success",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Users.findById(id);
    return res.status(200).json({
      user: result,
      status: "success",
    });
  } catch (error) {}
};


// Hàm tính tổng tiền từ danh sách sản phẩm trong giỏ hàng
async function calculateTotalPrice(cartDetail) {
  let totalPrice = 0;

  for (const item of cartDetail) {
    // Lấy giá từ variantModel
    const variant = await variantModel.findById(item.variant).select("priceDetail");

    if (!variant.priceDetail.saleRatio) {
      const price = variant.priceDetail.price * item.quantity;
      if (!isNaN(price)) {
        totalPrice += Math.round(price);
      }
    } else {
      const price = variant.priceDetail.priceAfterSale * item.quantity;
      if (!isNaN(price)) {
        totalPrice += Math.round(price / 1000) * 1000;
      }
    }
  }

  return isNaN(totalPrice) ? 0 : totalPrice;
}

const updateCart = async (req, res) => {
  const { _id } = req.user._id;
  const { variant, quantity } = req.body;
  if (!variant) {
    return res.status(200).json({ status: "error", message: "Missing inputs" });
  }

  const variantEle = await variantModel.findById(variant);
  // Check sản phẩm order có nhiều hơn sản phẩm trong kho hay không?
  if (variantEle.countInStock >= quantity) {
    const user = await userModel.findById(_id).select("cart");
    // console.log(user?.cart);
    const alreadyVariant = user?.cart?.cartDetail?.find(
      (ele) => ele.variant.toString() === variant
    );
    // console.log(alreadyVariant);
    if (alreadyVariant) {
      const response = await userModel.findOneAndUpdate(
        { _id, "cart.cartDetail.variant": variant },
        { $set: { "cart.cartDetail.$.quantity": quantity } },
        { new: true }
      );
      
      const totalPrice = await calculateTotalPrice(response.cart.cartDetail);
      response.cart.totalPrice = totalPrice;
      await response.save();

      return res.status(200).json({
        success: response ? true : false,
        mes: response ? response : "something went wrong ",
        totalPrice: totalPrice,
      });
    } else {
      console.log(variant);
      const response = await User.findByIdAndUpdate(
        _id,
        {
          $push: {
            "cart.cartDetail": { variant: variant, quantity: quantity },
          },
        },
        { new: true }
      );

     const totalPrice = await calculateTotalPrice(response.cart.cartDetail);
      response.cart.totalPrice = totalPrice;
      await response.save();
      

      return res.status(200).json({
        success: response ? true : false,
        mes: response ? response : "something went wrong ",
      });
    }
  } else {
    return res
      .status(400)
      .json({ message: "Không thể them quá số lượng sản phẩm có sẵn" });
  }
};

const removeVariantInCart = async (req, res) => {
  const { _id } = req.user;
  const variant = req.params.id;
  if (!variant) {
    res.status(200).json({ mes: "Missing variant, ID" });
  }
  try {
    const user = await userModel.findById(_id).select("cart");
    const alreadyVariant = user?.cart?.cartDetail?.find(
      (ele) => ele.variant.toString() === variant
    );

    if (!alreadyVariant) {
      return res.status(200).json({
        success: true,
        mes: "Không có variant trong cart",
      });
    }

    const response = await userModel.findByIdAndUpdate(
      _id,
      { $pull: { "cart.cartDetail": { variant: variant, } } },
      { new: true }
    );

    // Tính tổng tiền
    const totalPrice = await calculateTotalPrice(response.cart.cartDetail);
    response.cart.totalPrice = totalPrice;
    await response.save();

    return res.status(200).json({
      success: response ? true : false,
      mes: response ? "Variant removed from your cart" : "Something went wrong",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      mes: "Internal server error",
    });
  }
};

const getCurrent = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select('-password -role');
  return res.status(200).json({
    success: user ? true : false,
    rs: user ? user : 'User not found',
  });
};

module.exports = {
  login,
  loginAdmin,
  register,
  getCurrent,
  getAllUser,
  updateUser,
  deleteUser,
  refeshToken,
  logOut,
  getUserById,
  updateCart,
  removeVariantInCart,
};
