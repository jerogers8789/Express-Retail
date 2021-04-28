const router = require('express').Router();
//const { where } = require('sequelize/types');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {const tagData = await Tag.findAll({include: [Product,{
    through: ProductTag,
    as: 'tag'
  }]})
  res.json(tagData);
}
  catch (err) {
    res.json(err)
  };
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try { const tagData = await Tag.findByPk(req.params.id, {include: [Product,{
    through: ProductTag,
    as: 'tag'
  }]})
  res.json (tagData)
}
  catch (err) {
    res.json(err)
  };  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try { const tagData = await Tag.create(req.body.id, req.body.tag_name)
  res.json (tagData)
  }
  catch (err) {
    res.json(err)
  };
  // create a new tag
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
 try { const tagData = await Tag.update({
   where: {
     id: req.params.id
   }
 })
 res.json(tagData);
} catch (err) {
  console.log(err);
}});
  
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
 try { const tagData = await Tag.destroy({
  where: {
    id: req.params.id,
  },
});
res.json(tagData);
} catch (err) {
  console.log(err)
}
});

module.exports = router;
