<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
Use App\Models\Cart;
Use App\Models\ProductCart;
Use App\Models\Product;
Use App\Models\Price;
Use App\Models\Image;

class CartController extends Controller
{
    public function getAll(){
        $carts = Cart::get();
        $newData = $this->getData($carts);

        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }

    public function get($id){
        $cart = Cart::where('id', $id)->get();

        if (empty($cart[0])) {
            $newCart = $this->create($id);
            
            return response()->json($newCart, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
        }

        $newData = $this->getData($cart)[0];

      return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }

    public function getCartByUserId($user){
        $newData = [];
        $cart = Cart::where('user_id', $user)->get();

        if (count($cart) == 0) {
            $cart = $this->create($user_id);
            return response()->json($cart, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
        }
        
        $newData = $this->getData($cart)[0];

      return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }


    public function create($id) {
        $newData['user_id'] = $id;
        $newData['total_price'] = 0;

        Cart::create($newData);
        $newCart = Cart::orderBy('id', 'desc')->first();

        return $newCart;
    }


    public function addProduct(Request $request, $userId) {
        $cart = Cart::where('user_id', $userId)->get();

        if (count($cart) == 0) {
            $this->create($userId);
        }
        $cart = Cart::where('user_id', $userId)->get();

        $productsCart = ProductCart::where('cart_id', $cart[0]->id)->get();

        $productCartId = '';
        $quantity = 0;
        

        for ($i=0; $i < count($productsCart); $i++) { 
           if ($productsCart[$i]->product_id == $request->product_id) {
                $productCartId = $productsCart[$i]->id;
                $quantity = $productsCart[$i]->quantity;
            }
        }

        if ($productCartId !== '') {
            $product['quantity'] = $request->quantity + $quantity;

            ProductCart::find($productCartId)->update($product);
        } else {
            $product['product_id'] = $request->product_id;
            $product['quantity'] = $request->quantity;
            $product['cart_id'] = $cart[0]->id;

            ProductCart::create($product);
        }

        $newData = $this->getData($cart)[0];

        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }


    public function removeProduct(Request $request, $userId) {
        $cart = Cart::where('user_id', $userId)->get();

        $product = ProductCart::where('cart_id', $cart[0]->id)->where('product_id', $request[0])->first();

        $newData = [];
        if (!empty($product)) {
            $product = ProductCart::find($product->id)->delete();


            $newData = $this->getData($cart)[0];
        }

        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }


    public function addQuantity(Request $request, $userId) {
        $cart = Cart::where('user_id', $userId)->get();
        $newData = [];

        $productsCart = ProductCart::where('cart_id', $cart[0]->id)->get();            

        if (!empty($productsCart)) {
            for ($i=0; $i < count($productsCart); $i++) { 
                if ($productsCart[$i]->product_id == $request[0]) {
                    $productCart['quantity'] = $productsCart[$i]->quantity + 1;
                    if ($productCart['quantity'] >= 0) {
                        ProductCart::find($productsCart[$i]->id)->update($productCart);
                    } else {
                        ProductCart::find($productsCart[$i]->id)->delete();
                    }
                }
            }
        }
            
        $newData = $this->getData($cart)[0];


        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }


    public function removeQuantity(Request $request, $userId) {
        $cart = Cart::where('user_id', $userId)->get();
        $newData = [];

        $productsCart = ProductCart::where('cart_id', $cart[0]->id)->get();       

        if (!empty($productsCart)) {
            for ($i=0; $i < count($productsCart); $i++) { 
                if ($productsCart[$i]->product_id == $request[0]) {
                    $productCart['quantity'] = $productsCart[$i]->quantity - 1;
                    if ($productCart['quantity'] >= 0) {
                        ProductCart::find($productsCart[$i]->id)->update($productCart);
                    } else {
                        ProductCart::find($productsCart[$i]->id)->delete();
                    }
                    
                }
            }
        }

        $newData = $this->getData($cart)[0];

        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }

    
    public function removeAllProducts($cart_id) {
        $cart = Cart::where('id', $cart_id)->get();

        $products = ProductCart::where('cart_id', $cart[0]->id)->get();

        $newData = [];
        if (!empty($products)) {
            for ($i=0; $i < count($products); $i++) { 
                $product = ProductCart::find($products[$i]->id)->first();
                if($product != null) {
                    $product->delete();
                }
            }

            $newData = $this->getData($cart)[0];
        }

        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }


    public function delete($id){
        $res = Cart::find($id)->delete();

        return response()->json([
            'message' => "Successfully deleted",
            'success' => true
        ], 200);
    }


    public function update(Request $request,$id){
        $data['total_price'] = $request->total_price;
   
        Cart::find($id)->update($data);
        $cart = Cart::find($id);

        $newData = $this->getData($cart)[0];

        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }
 

    private function getData($data) {
        $newData =[];
        if (!empty($data)) {
            for ($x=0; $x < count($data); $x++) { 
                $newData[$x]['id'] = $data[$x]->id;
                $newData[$x]['user_id'] = $data[$x]->user_id;
                $newData[$x]['total_price'] = $data[$x]->total_price;
                $newData[$x]['products_cart'] = [];
                $productsCart = ProductCart::where('cart_id', $data[$x]->id)->get();
    
                for ($i=0; $i < count($productsCart); $i++) { 
                    $newData[$x]['products_cart'][$i]['id'] = $productsCart[$i]['id'];
                    $newData[$x]['products_cart'][$i]['product_id'] = $productsCart[$i]['product_id'];
                    $newData[$x]['products_cart'][$i]['quantity'] = $productsCart[$i]['quantity'];
                    $newData[$x]['products_cart'][$i]['cart_id'] = $data[$x]->id;
    
                    $product = Product::find($productsCart[$i]['product_id']);
                    $img = Image::where('product_id', $productsCart[$i]['product_id'])->first();
                    $newData[$x]['products_cart'][$i]['product'] = $product;
                    $newData[$x]['products_cart'][$i]['product']['price'] = Price::find($product->price_id);
                    $newData[$x]['products_cart'][$i]['product']['image'] = $img;
                    $newData[$x]['products_cart'][$i]['product']['image']['picture_jpg'] = base64_encode($img->picture_jpg);
                    $newData[$x]['products_cart'][$i]['product']['image']['picture_webp'] = base64_encode($img->picture_webp);
                }   
            }
            return $newData;
        }
        return  $newData;
    }
}
