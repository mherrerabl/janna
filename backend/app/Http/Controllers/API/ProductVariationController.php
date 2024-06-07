<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

Use App\Models\ProductVariation;
Use Log;

class ProductVariationController extends Controller {

    public function getAll(){
        $data = ProductVariation::get();
        return response()->json($data, 200);
    }
    
    public function create(Request $request){
        $data['name'] = $request['name'];
        $data['stock'] = $request['stock'];
        $data['price_id'] = $request['price_id'];
        $data['purchasePrice'] = $request['purchasePrice'];
        $data['color'] = $request['color'];
        $data['product_id'] = $request['product_id'];
        ProductVariation::create($data);
        return response()->json([
            'message' => "Successfully created",
            'success' => true
        ], 200);
    }

    public function delete($id){
        $res = ProductVariation::find($id)->delete();
        return response()->json([
            'message' => "Successfully deleted",
            'success' => true
        ], 200);
    }

    public function get($id){
      $data = ProductVariation::find($id);
      return response()->json($data, 200);
    }

    public function update(Request $request,$id){
        $data['name'] = $request['name'];
        $data['stock'] = $request['stock'];
        $data['price_id'] = $request['price_id'];
        $data['purchasePrice'] = $request['purchasePrice'];
        $data['color'] = $request['color'];
        $data['product_id'] = $request['product_id'];
        ProductVariation::find($id)->update($data);
        return response()->json([
            'message' => "Successfully updated",
            'success' => true
        ], 200);
    }
}
