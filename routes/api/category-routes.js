const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
try {const categoryData = await Category.findAll({include: [Product]})
res.json(categoryData)}
catch(err) {
  console.log(err)
}
});
  // be sure to include its associated Products
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {const categoryData = await Category.findByPk(req.params.id, {include: [Category],
  through: Product, as: 'category_id'})
  res.json(categoryData)}
  catch (err) {
    console.log(err)
  } 
  // be sure to include its associated Products
});
router.post('/', async (req, res) => {
  // create a new category
try { const categoryData = await Category.create(req.body);
  res.json(categoryData);
} catch (err) {
  console.log(err)
}});


router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const id = req.params.id;
  try { const categoryData = await Category.update(req.body.category_id, {
    where: {id: id}
  });
if (!categoryData) { res.json({message: 'Invalid Entry.'})
return;
} res.json(categoryData)
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
  }).then(categoryData => res.json(categoryData))
});

module.exports = router;
