const sumTotal = async () => {

    const orderMonth = [];

    const variantsValue = await variantModel.find({})
    // console.log(variantsValue)
    let sumTotal = 0;


    for (const value of orderMonth) {
        const ListOrder = value.orderDetail
        for (const variantItem of ListOrder) { // lấy variant trong bảng order thống kê

            for (const value of variantsValue) { // lấy ra tất cả item variant
                //    console.log(value.id)
                if (variantItem.variant == value.id) {
                    sumTotal += value.price
                }
            }

        }
    }
    return sumTotal
}

module.exports = {
    sumTotal
}