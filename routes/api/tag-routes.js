const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {const tagData = await Tag.findAll({include: ['Product','ProductTag']})}
  catch (err) {
    res.json(err)
  }
  return res.json(tagData)
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try { const tagData = Tag.findByPk(req.params.id, {include: ['Product','ProductTag']})}
  catch (err) {
    res.json(err)
  };
  return res.json(tagData)
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try { const tagData = Tag.create(req.body)}
  catch (err) {
    res.json(err)
  };
  return res.json(tagData)
  // create a new tag
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
const id = req.params.id;
try { const tagData = await Tag.update(req.body, {
  where: {id: id}
})
if (!tagData) { res.json({message: 'Invalid Entry.'})
return;
}
res.json(tagData)
} catch (err) {
  res.json(err);
}
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
const tagData = await Tag.destroy({
  where: {
    id: req.params.id,
  },
});
return res.json(tagData);
});

module.exports = router;
