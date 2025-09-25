const menuCategorySchema = new mongoose.Schema(
  {
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    name: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

const MenuCategory = mongoose.model("MenuCategory", menuCategorySchema);
export default MenuCategory;
