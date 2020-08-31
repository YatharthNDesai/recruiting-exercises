let pineapple;
const inventoryList = [
    {
        name: "owd",
        inventory: {apple: 5, mango: 3, pineapple: 3}
    },
    {
        name: "dm",
        inventory: {apple: 5}
    },
    {
        name: "ast",
        inventory: {apple: 3, mango: 7, pineapple: 1}
    },
    {
        name: "abc",
        inventory: {apple: 5, mango: 3, pineapple: 6}
    }
]

const requiredItems = {
    apple: 10,
    mango: 10,
    pineapple: 10
}

allocator(inventoryList, requiredItems)

function allocator(inventoryList, requiredItems) {
    let resultList = []
    let inventory = {}
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
        }
        resultList = [...resultList, {[name]: inventory}]
    }
    return resultList
}
