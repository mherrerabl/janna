<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


Use App\Models\Price;
Use Log;

class PriceController extends Controller {

    public function getAll(){
        $data = Price::get();
        return response()->json($data, 200);
    }

    public function create(Request $request){
        $data['price'] = $request->price;
        $data['offer'] = $request->offer;
        $data['discount'] = $request->discount;
        Price::create($data);
        return response()->json([
            'message' => "Successfully created",
            'success' => true
        ], 200);
    }

    public function delete($id){
        $res = Price::find($id)->delete();
        return response()->json([
            'message' => "Successfully deleted",
            'success' => true
        ], 200);
    }

    public function get($id){
      $data = Price::find($id);
      return response()->json($data, 200);
    }

    public function update(Request $request,$id){
        $data['price'] = $request->price;
        $data['offer'] = $request->offer;
        $data['discount'] = $request->discount;
        Price::find($id)->update($data);
        return response()->json([
            'message' => "Successfully updated",
            'success' => true
        ], 200);
    }
}
