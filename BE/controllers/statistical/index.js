// const OrderModel = require('../../models/Order')
const orderModel = require('../../models/Order.js');
const variantModel = require('../../models/Variant.js');
const userModel = require('../../models/User.js');

const getAllOrder = async (req, res) => { //tất cả order
    try {
        const pageSize = req.query.pageSize || 5;
        const pageIndex = req.query.pageIndex || 1;
        console.log(pageSize, pageIndex);
        const result = await orderModel.find({})
            .populate({ path: "orderedBy", select: ["-refreshToken", "-password", "-__v", "-updatedAt"] })
            .skip(pageSize * pageIndex - pageSize).limit(pageSize)
        return res.status(200).json({
            order: result,
            countOrder: result.length
        })
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}

const getOrdersToday = async (req, res) => {
    try {
        const allOrder = await orderModel.find({})
        const dayNow = new Date().getDate()
        const orderToday = [];

        for (const key in allOrder) {
            if (allOrder[key]?.createdAt.getDate() == dayNow) {
                orderToday.push(allOrder[key]);
            }
        }

        // ==============================
        const variantsValue = await variantModel.find({})
        // console.log(variantsValue)
        let sumTotal = 0;


        for (const value of orderToday) {
            const ListOrder = value.orderDetail
            const status = value?.status

            for (const variantItem of ListOrder) {

                for (const value of variantsValue) {
                    //    console.log(value.id)
                    if (variantItem.variant == value.id && variantItem.quantity && status == 0) {
                        sumTotal += value.price * variantItem.quantity
                    }
                }

            }
        }
        //==========================================

        return res.status(201).json({
            orderToday: orderToday,
            status: 'success',
            today: dayNow,
            sumTotal: sumTotal,
            countOrderToday: orderToday.length,

        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

const getOrderDate = async (req, res) => {
    try {
        const pageSize = req.query.pageSize || 50;
        const pageIndex = req.query.pageIndex || 1;

        const param = req.query
        const date = new Date;
        let day = param?.day;
        let month = param?.month;

        if (!date) {
            date = date.getDate();
        }
        if (!month) {
            month = date.getMonth() + 1;
        }

        const allOrder = await orderModel.find({})
            .populate({ path: "orderedBy" })
            .populate({ path: "orderDetail.variant" })
            .skip(pageSize * pageIndex - pageSize).limit(pageSize)
        const orderToday = [];
        let sumTotal = 0;


        for (const key in allOrder) {
            if (allOrder[key]?.createdAt.getDate() == day && month == date.getMonth() + 1) {
                orderToday.push(allOrder[key]);
            }
        }

        for (const value of orderToday) {
            sumTotal += value.totalPrice;
        }

        // ==============================
        // const variantsValue = await variantModel.find({})
        // console.log(variantsValue)


        // for (const value of orderToday) {
        //     const ListOrder = value.orderDetail
        //     const status = value?.status

        //     for (const variantItem of ListOrder) {

        //         for (const value of variantsValue) {
        //             //    console.log(value.id)
        //             if (variantItem.variant == value.id && variantItem.quantity && status == 0) {
        //                 sumTotal += value.price * variantItem.quantity
        //             }
        //         }

        //     }
        // }
        //==========================================

        return res.status(201).json({
            orderToday: orderToday,
            status: 'success',
            date: date,
            countOrderToday: orderToday.length,
            sumTotal: sumTotal

        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

const getOrderMonth = async (req, res) => {
    try {
        const param = req.query
        let month = param.month;
        const pageSize = req.query.pageSize || 50;
        const pageIndex = req.query.pageIndex || 1;

        const date = new Date()
        if (!month) {
            month = date.getMonth() + 1;
        }
        const allOrder = await orderModel.find({})
            .populate({ path: "orderedBy" })
            .populate({ path: "orderDetail.variant" })
            .skip(pageSize * pageIndex - pageSize)
            .limit(pageSize)

        const orderMonth = [];
        let sumTotal = 0;


        for (const key in allOrder) {
            if (allOrder[key]?.createdAt.getMonth() + 1 == month) {
                orderMonth.push(allOrder[key]);
            }

        }

        for (const order of orderMonth) {
            // console.log(order.totalPrice)
            sumTotal += order.totalPrice
        }

        // //==================================
        // const variantsValue = await variantModel.find({})
        // console.log(variantsValue)
        // console.log(orderMonth)


        // for (const value of orderMonth) {
        //     const ListOrder = value.orderDetail
        //     const status = value?.status

        //     for (const variantItem of ListOrder) {

        //         for (const value of variantsValue) {
        //             //    console.log(value.id)
        //             if (variantItem.variant == value.id && variantItem.quantity && status == 0) {
        //                 sumTotal += value.price * variantItem.quantity;
        //             }
        //         }

        //     }
        // }
        //====================

        return res.status(201).json({
            orderMonth: orderMonth,
            status: 'success',
            month: month,
            countOrderMonth: orderMonth.length,
            sumTotal: sumTotal
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

const getOrderYear = async (req, res) => {
    try {
        const param = req.query
        const pageSize = req.query.pageSize || 50;
        const pageIndex = req.query.pageIndex || 1;

        let year = param.year;
        const date = new Date()

        if (!year) {
            year = date.getFullYear();
        }
        const allOrder = await orderModel.find({})
            .populate({ path: "orderedBy" })
            .populate({ path: "orderDetail.variant" })
            .skip(pageSize * pageIndex - pageSize)
            .limit(pageSize)
        const orderYear = [];
        let sumTotal = 0;



        for (const key in allOrder) {
            if (allOrder[key]?.createdAt.getFullYear() == year) {
                orderYear.push(allOrder[key]);
            }
        }

        for (const value of orderYear) {
            sumTotal += value.totalPrice;
        }

        //================================
        // const variantsValue = await variantModel.find({})
        //     .skip(pageSize * pageIndex - pageSize)
        //     .limit(pageSize)
        // // console.log(variantsValue)


        // for (const value of orderYear) {
        //     const ListOrder = value.orderDetail
        //     const status = value?.status

        //     for (const variantItem of ListOrder) {

        //         for (const value of variantsValue) {
        //             //    console.log(value.id)
        //             if (variantItem.variant == value.id && variantItem.quantity && status == 0) {
        //                 sumTotal += value.price * variantItem.quantity
        //             }
        //         }

        //     }
        // }
        //=====================================

        return res.status(201).json({
            orderYear: orderYear,
            status: 'success',
            year: year,
            countOrderYear: orderYear.length,
            sumTotal: sumTotal
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

// user 

const getNewUserDay = async (req, res) => {
    try {
        const date = new Date();

        let ArrUserNew = [];

        let day = req.query?.day;
        let month = req.query?.month;
        if (!day) {
            day = date.getDate();
        }
        if (!month) {
            month = date.getMonth() + 1;
        }

        const users = await userModel.find({});
        for (const user of users) {

            if (user.createdAt?.getDate() == day && ((user.createdAt?.getMonth()) + 1) == month) {
                ArrUserNew.push(user);
            }
        }
        return res.status(200).json({
            day: day,
            usersNewDay: ArrUserNew,
            countUserNewDay: ArrUserNew.length
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

const getNewUserMonth = async (req, res) => {
    try {
        const pageSize = req.query.pageSize || 30;
        const pageIndex = req.query.pageIndex || 1;
        const date = new Date();

        let ArrUserNew = [];

        let month = req.query?.month;
        if (!month) {
            month = (date.getMonth() + 1);
        }
        console.log(pageSize, pageIndex)

        const users = await userModel.find({})
            .skip(pageSize * pageIndex - pageSize).limit(pageSize)

        for (const user of users) {
            if ((user.createdAt?.getMonth() + 1) == month) {
                ArrUserNew.push(user);
                console.log(user)

            }
        }
        return res.status(200).json({
            month: month,
            newUsersDay: ArrUserNew,
            countNewUsersDay: ArrUserNew.length,
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

const getNewUserYear = async (req, res) => {
    try {
        const date = new Date();
        const pageSize = req.query.pageSize || 30;
        const pageIndex = req.query.pageIndex || 1;
        let ArrUserNew = [];

        let year = req.query?.year;
        if (!year) {
            year = date.getFullYear();
        }
        console.log(year);

        const users = await userModel.find({})
            .skip(pageSize * pageIndex - pageSize).limit(pageSize);
        for (const user of users) {

            if (user.createdAt?.getFullYear() == year) {
                ArrUserNew.push(user);
                // console.log(user)

            }
        }
        return res.status(200).json({
            year: year,
            newUsersDay: ArrUserNew,
            countNewUsersDay: ArrUserNew.length
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}


module.exports = {
    getAllOrder,
    getOrdersToday,
    getOrderDate,
    getOrderMonth,
    getOrderYear,
    getNewUserDay,
    getNewUserMonth,
    getNewUserYear
}