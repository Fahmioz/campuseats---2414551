const vendors = [
  {
    id: 'my-restaurant',
    name: 'Kafe Mahallah Asma',
    location: 'Mahallah Asma, Ground Floor',
    openHours: '7:00 am - 10:00 pm',
    isOpen: true,
    menu: [
      {
        id: 'my-1',
        name: 'Nasi Ayam Gepuk',
        description: 'Fried chicken with sambal and rice',
        price: 7.5,
        category: 'Rice',
        available: true,
      },
      {
        id: 'my-2',
        name: 'Korean Ramen Spicy Noodles',
        description: 'Spicy ramen noodles with various toppings',
        price: 6,
        category: 'Noodles',
        available: true,
      },
      {
        id: 'my-3',
        name: 'Milo Ais',
        description: 'Milo with ice',
        price: 2.5,
        category: 'Drinks',
        available: false,
      },
    ],
  },
  {
    id: 'kafe-aminah',
    name: 'Kafe Mahallah Aminah',
    location: 'Mahallah Aminah, Ground Floor',
    openHours: '8:00 am - 9:00 pm',
    isOpen: true,
    menu: [
      {
        id: 'ami-1',
        name: 'Nasi Ayam Penyet',
        description: 'Smashed fried chicken with sambal and rice',
        price: 9,
        category: 'Rice',
        available: true,
      },
      {
        id: 'ami-2',
        name: 'Air Bandung',
        description: 'Rose syrup with milk',
        price: 3,
        category: 'Drinks',
        available: true,
      },
    ],
  },
]

export default vendors