import addressRouter from "./addresses/addresses.routes.js"
import authRouter from "./auth/auth.routes.js"
import brandRouter from "./brand/brand.routes.js"
import cartRouter from "./cart/cart.routes.js"
import categoryRouter from "./category/category.routes.js"
import couponRouter from "./coupon/coupon.routes.js"
import orderRouter from "./order/order.routes.js"
import productRouter from "./product/product.routes.js"
import reviewRouter from "./review/review.routes.js"
import subCategoryRouter from "./subCategory/subCategory.routes.js"
import userRouter from "./user/user.routes.js"
import wishListRouter from "./wishlist/wishlist.routes.js"


export const appRoutes = (app) => {
  app.use('/api/v1/category',categoryRouter)
  app.use('/api/v1/subCategory',subCategoryRouter)
  app.use('/api/v1/brand',brandRouter)
  app.use('/api/v1/product',productRouter)
  app.use('/api/v1/user',userRouter)
  app.use('/api/v1/auth',authRouter)
  app.use('/api/v1/review',reviewRouter)
  app.use('/api/v1/wishlist',wishListRouter)
  app.use('/api/v1/addresses',addressRouter)
  app.use('/api/v1/coupon',couponRouter)
  app.use('/api/v1/cart',cartRouter)
  app.use('/api/v1/order',orderRouter)
}