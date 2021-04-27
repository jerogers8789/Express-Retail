const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
try {const categoryData = await Category.findAll({include: ['Product'],})
.then(result => { res.json(categoryData)})}
catch(err) {
  console.log(err)
}
});
  // be sure to include its associated Products
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {const categoryData = await Category.findByPk(req.params.id, {include: ['Product'],})
.then(result =>{res.json(result)})}
  catch (err) {
    console.log(err)
  } 
  // be sure to include its associated Products
});
router.post('/', (req, res) => {
  // create a new category
Category.create({
  id: req.body.id,
  category_name: req.body.category_name,
}).then(result => {res.json(result)})
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const id = req.params.id;
  try { const categoryData = await Category.update(req.body.category_name, {
    where: {id: id}
  }).then(result => {res.json(result)})
if (!categoryData) { res.json({message: 'Invalid Entry.'})
return;
}
} catch (err) {
 console.log(err);
}
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value

  const categoryData = await Category.destroy({
    where:{
      id: req.params.id,
    },
  }).then(result => res.json(result))
});

module.exports = router;
