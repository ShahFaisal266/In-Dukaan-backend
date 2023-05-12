const Fav = require("../models/Fav");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newProduct = new Fav(req.body);
  console.log("products",newProduct);
  try {
    const savedProduct = await newProduct.save();
    console.log("Saved Products",savedProduct);
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Fav.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Fav.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT by ID

/*router.get("/find/:id", async (req, res) => {
  try {
    const product = await Fav.findById(req.params.id);
    console.log("id",req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});
*/

router.get("/find/:id", async (req, res) => {
  try {


    const userId = req.params.id;
//const productTitle = req.query.productTitle;
const favorites = await Fav.find({userId});
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json(err);
  }
});




//GET PRODUCT by NAME

router.get("/finds/:catName", async (req, res) => {
  try {
    const product = await Fav.find(req.params.catName)
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Fav.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Fav.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Fav.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
