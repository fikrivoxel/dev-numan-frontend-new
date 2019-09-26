export const NODE_ENV = 'development'
export const BASE_URL = 'http://api.numan.voxelsoftware.co'
export const PAGES = [
  {
    id: 'home',
    name: 'Home',
    title: {
      type: 'logo',
      image: '/images/logo.png'
    },
    active: true
  },
  {
    id: 'products',
    name: 'Products',
    title: {
      type: 'text',
      caption: 'Variant product of NOMAN'
    },
    active: false
  },
  {
    id: 'catalog',
    name: 'Catalogs Download',
    title: {
      type: 'text',
      caption: 'Get the product list of NOMAN'
    },
    active: false
  },
  {
    id: 'aboutus',
    name: 'About Us',
    title: {
      type: 'text',
      caption: 'Amazing stories of our product'
    },
    active: false
  },
  {
    id: 'contactus',
    name: 'Contact Us',
    title: {
      type: 'text',
      caption: 'Stay in touch with us!'
    },
    active: false
  }
]
export const DUMMY_COLLECTIONS = [
  {id: 1, name: 'Lunch Set', url: 'lunch-set', thumbnail: '/images/container.png'},
  {id: 2, name: 'Cook Ware', url: 'cook-ware', thumbnail: '/images/grill.png'},
  {id: 3, name: 'Home Supplies', url: 'home-supplies', thumbnail: '/images/hand.png'},
  {id: 4, name: 'Bathroom', url: 'bathroom', thumbnail: '/images/shampoo.png'},
  {id: 5, name: 'Storage', url: 'storage', thumbnail: '/images/box.png'}
]
