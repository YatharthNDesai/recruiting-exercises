
const allocator = require('../src/InventoryAllocator')

// The first case in the example
test('Demo test 1', () => {
    expect(allocator({apple: 1}, [
        {name: "owd", inventory: {apple: 1}}
    ])).toEqual([
                    {
                        owd: {apple: 1}
                    }
                ])
})

// The second case in the example
test('Demo test 2', () => {
    expect(allocator({apple: 10}, [
        {
            name: "owd",
            inventory: {apple: 5}
        },
        {
            name: "dm",
            inventory: {apple: 5}
        }
    ])).toEqual([
                    {
                        owd: {apple: 5}
                    },
                    {
                        dm: {apple: 5}
                    }
                ])
})

// The third case in the example
test('Demo test 3', () => {
    expect(allocator({apple: 1}, [
        {name: "owd", inventory: {apple: 0}}
    ])).toEqual([])
})

// The fourth case in the example
test('Demo test 4', () => {
    expect(allocator({apple: 2}, [
        {name: "owd", inventory: {apple: 1}}
    ])).toEqual([])
})

// Ship multiple items from the warehouse
test('Ship multiple items', () => {
    expect(allocator({apple: 2, banana: 4, grapes: 2}, [
        {name: "owd", inventory: {apple: 4, banana: 5, grapes: 4}}
    ])).toEqual([{owd: {apple: 2, banana: 4, grapes: 2}}])
})

// Ship multiple items but one incomplete from same warehouse
test('Ship multiple items but one incomplete', () => {
    expect(allocator({apple: 2, banana: 4, grapes: 2}, [
        {name: "owd", inventory: {apple: 4, banana: 3, grapes: 4}}
    ])).toEqual([{owd: {apple: 2, grapes: 2}}])
})

// Ship multiple items but multiple incomplete from same warehouse
test('Ship multiple items but multiple incomplete', () => {
    expect(allocator({apple: 2, banana: 4, grapes: 5}, [
        {name: "owd", inventory: {apple: 4, banana: 3, grapes: 4}}
    ])).toEqual([{owd: {apple: 2}}])
})

// Ship multiple items but none complete from same warehouse
test('Ship multiple items but multiple incomplete', () => {
    expect(allocator({apple: 7, banana: 4, grapes: 5}, [
        {name: "owd", inventory: {apple: 4, banana: 3, grapes: 4}}
    ])).toEqual([])
})

// Ship multiple items from multiple warehouses
test('Multiple items from multiple warehouses', () => {
    expect(allocator({apple: 10, mango: 6, pineapple: 5}, [
        {
            name: "owd",
            inventory: {apple: 5, mango: 3, pineapple: 3}
        },
        {
            name: "dm",
            inventory: {apple: 5, mango: 2, pineapple: 2}
        },

        {
            name: "tm",
            inventory: {apple: 5, mango: 2, pineapple: 2}
        }

    ])).toEqual([{
        owd: {
            apple: 5,
            mango: 3,
            pineapple: 3
        }
    },
                    {
                        dm: {
                            apple: 5,
                            mango: 2,
                            pineapple: 2
                        }
                    },
                    {
                        tm: {
                            mango: 1
                        }
                    }])
})

// Ship multiple items from multiple warehouses but some incomplete
test('Multiple items multiple warehouses and some incomplete', () => {
    expect(allocator({apple: 10, mango: 6, pineapple: 5}, [
        {
            name: "owd",
            inventory: {apple: 5, mango: 3, pineapple: 3}
        },
        {
            name: "dm",
            inventory: {apple: 4, mango: 2, pineapple: 2}
        },

        {
            name: "tm",
            inventory: {pineapple: 2}
        }

    ])).toEqual([{
        owd: {
            pineapple: 3
        }
    },
                    {
                        dm: {
                            pineapple: 2
                        }
                    },

                ])
})

// Ship multiple items from multiple warehouses but none complete
test('Multiple items multiple warehouses and none complete', () => {
    expect(allocator({apple: 10, mango: 6, pineapple: 15}, [
        {
            name: "owd",
            inventory: {apple: 5, mango: 3, pineapple: 3}
        },
        {
            name: "dm",
            inventory: {apple: 4, mango: 2, pineapple: 2}
        },

        {
            name: "tm",
            inventory: {pineapple: 2}
        }

    ])).toEqual([])
})

// Test whether empty incomplete warehouses are removed from the list
test('Empty incomplete warehouses are removed from the list', () => {
    expect(allocator({apple: 10, mango: 6, pineapple: 5}, [
        {
            name: "owd",
            inventory: {apple: 5, mango: 3, pineapple: 3}
        },
        {
            name: "dm",
            inventory: {apple: 4}
        },

        {
            name: "tm",
            inventory: {pineapple: 2, mango: 3}
        }

    ])).toEqual(
        [{
            owd: {
                mango: 3,
                pineapple: 3
            }
        },
            {
                tm: {
                    mango: 3,
                    pineapple: 2
                }
            }])
})

// A random test
test('Random test', () => {
    // expect(add(1,3)).toBe(4)

    expect(allocator({apple: 10}, [
        {
            name: "owd",
            inventory: {apple: 5, mango: 3, pineapple: 3}
        },
        {
            name: "dm",
            inventory: {apple: 5}
        }])).toEqual([
                         {
                             owd: {apple: 5}
                         },
                         {
                             dm: {apple: 5}
                         }

                     ])
})
