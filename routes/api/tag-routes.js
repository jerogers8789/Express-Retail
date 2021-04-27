const router = require('express').Router();
const { where } = require('sequelize/types');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {const tagData = await Tag.findAll({include: [Product,{
    through: ProductTag
  }]}).then(result => {res.json(result);
  })}
  catch (err) {
    res.json(err)
  };
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try { const tagData = Tag.findByPk(req.params.id, {include: [Product,{
    through: ProductTag
  }]}).then(result => {res.json(result);
  })}
  catch (err) {
    res.json(err)
  };  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try { const tagData = Tag.create(req.body.id, req.body.tag_name)
  .then(tagData => {res.json(tagData)})}
  catch (err) {
    res.json(err)
  };
  // create a new tag
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    id: req.body.id,
    tag_name: req.body.tag_name,
  },
  {
    where: {
      id: req.params.id,
    },
  }
  ).then(result => {
    res.json(result);
  });
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
const tagData = await Tag.destroy({
  where: {
    id: req.params.id,
  },
}).then(result => {
  res.json(result);
})
});

module.exports = router;
