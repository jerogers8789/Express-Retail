const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
const categoryData = await Category.findAll({include: ['Product']}).catch(err) 
  console.log(err);
  return res.json(categoryData)
});

  // be sure to include its associated Products


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {const categoryData = await Category.findByPk(req.params.id, {include: ['Product']})} 
  catch (err) {
    console.log(err)
  }
  return res.json(categoryData)
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try { const categoryData = await Category.create(req.body);
  res.json(categoryData);
} catch (err)  {
  res.json(err);
}
  
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const id = req.params.id;
  try { const categoryData = await Category.update(req.body, {
    where: {id: id}
  })
if (!categoryData) { res.json({message: 'Invalid Entry.'})
return;
}
res.json(categoryData)
} catch (err) {
  res.json(err);
}
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value

  const categoryData = await Category.destroy({
    where:{
      id: req.params.id,
    },
  });
  return res.json(categoryData);
});

module.exports = router;
