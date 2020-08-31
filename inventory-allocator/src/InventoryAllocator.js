/**
 * This function computes the optimal quantity of items from different warehouses
 * to complete a shipping order.
 * @param requiredItems An object of items required by the order
 * @param inventoryList The complete list of items available at each warehouse
 * @returns {*|[]} An array of items from each warehouse that makes up the shipping
 * order.
 *
 */
function allocator(requiredItems, inventoryList) {
    // The final list of shipment order
    let resultList = []
    // To store the inventory from each warehouse
    let inventory = {}
    // To store the name of each warehouse
    let name = ''
    for (const item of inventoryList) {
        name = item.name
        inventory = Object.create(inventory)
        for (const [key, value] of Object.entries(requiredItems)) {
            if (item.inventory[key] !== undefined && requiredItems[key] > 0) {
                if (item.inventory[key] >= requiredItems[key]) {
                    inventory[key] = requiredItems[key]
                    item.inventory[key] -= requiredItems[key]
                    requiredItems[key] = 0

                } else {
                    inventory[key] = item.inventory[key]
                    requiredItems[key] -= item.inventory[key]
                    item.inventory[key] = 0

                }
            }
            if (requiredItems[key] === 0) {
                delete requiredItems[key]
            }
        }

        if (Object.keys(inventory).length !== 0) {
            resultList = [...resultList, {[name]: inventory}]
        }
    }
    resultList = removeUnfulfilledEntries(requiredItems, resultList)
    resultList = removeEmptyArrayElements(resultList)
    return resultList
}

// This function removes any partially complete items from the final list
function removeUnfulfilledEntries(requiredItems, resultList) {
    for (const [key, value] of Object.entries(requiredItems)) {
        resultList.forEach(result => {
                               const k = Object.keys(result)
                               delete result[k][key]
                           }
        )
    }
    return resultList
}

// This function removes any empty properties from the final list
function removeEmptyArrayElements(resultList) {
    for (let key = 0; key < resultList.length; key++) {
        const element = resultList[key]
        for (const ele in element) {
            if (JSON.stringify(element[ele]) === "{}") {
                resultList.splice(key, 1)
                key -= 1;
            }
        }
    }
    return resultList
}

module.exports = allocator;
