<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


Use App\Models\ProductOrder;
Use Log;

class ProductOrderController extends Controller {

    public function getAll(){
        $data = ProductOrder::get();
        return response()->json($data, 200);
    }

    public function create($request){
        $data['name'] = $request['name'];
        $data['price'] = $request['price'];
        $data['quantity'] = $request['quantity'];
        $data['state'] = $request['state'];
        $data['order_id'] = $request['order_id'];

        ProductOrder::create($data);

        return response()->json($data, 200);
    }


    public function get($id){
      $data = ProductOrder::find($id);
      return response()->json($data, 200);
    }

    public function update(Request $request,$id){
        $data['name'] = $request['name'];
        $data['price'] = $request['price'];
        $data['quantity'] = $request['quantity'];
        $data['state'] = $request['state'];
        $data['order_id'] = $request['order_id'];

        ProductOrder::find($id)->update($data);
        
        return response()->json($data, 200);
    }

    
    public function delete($id){
        $res = ProductOrder::find($id)->delete();
        
        return response()->json($id, 200);
    }

    public function deleteByOrder($order_id){
        $orders = ProductOrder::where('order_id', $order_id)->delete();
        
        return response()->json($orders, 200);
    }
}
