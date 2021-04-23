const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
const categoryData = await Category.findAll.catch(err) 
  res.json(err);
});
return res.json(categoryData);
  // be sure to include its associated Products


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {const categoryData = await Category.findByPk(req.params.id)}
  catch (err) {
    console.log(err)
  }
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {

    }
  )
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where:{
      id: req.params.id,
    },
  });
  
});

module.exports = router;
