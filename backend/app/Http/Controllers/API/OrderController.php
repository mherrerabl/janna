<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

Use App\Models\Order;
Use App\Models\ProductOrder;
Use App\Models\Address;
Use Log;

class OrderController extends Controller {

    protected $productOrderController;
    public function __construct(ProductOrderController $productOrderController)
    {
        $this->productOrderController = $productOrderController;
    }
    public function getAll(){
        $data = Order::get();

        $newData = $this->getData($data);
        
        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }


    public function get($id){
        $data = Order::where('id',$id)->get();
        $newData = $this->getData($data)[0];
      
        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }


    public function getByIdUser($idUser) {
        $data = Order::where('user_id', $idUser)->get();

        $newData = $this->getData($data);
       
        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }


    public function create($request){
        $data['user_id'] = $request['user_id'];
        $data['total_price'] = $request['total_price'];
        $data['address_id'] = $request['address_id'] == null ? NULL :  $request['address_id'];
        $data['state'] = $request['state'];
        $data['session_id'] = $request['session_id'];
        $data['creation_date'] = date('Y-m-d H:i:s');
        $data['modification_date'] = date('Y-m-d H:i:s');

        Order::create($data);

        $orderId = Order::where('session_id', $request['session_id'])->first()->id;

        for ($i=0; $i < count($request['products']); $i++) { 
            $product['name'] = $request['products'][$i]['name'];
            $product['price'] = $request['products'][$i]['price'];
            $product['quantity'] = $request['products'][$i]['quantity'];
            $product['state'] = 'En preparación';
            $product['order_id'] = $orderId;
            
            $this->productOrderController->create($product);
        }
        return response()->json($data, 200);
    }


    public function update(Request $request,$id){
        $data['user_id'] = $request['user_id'];
        $data['total_price'] = $request['total_price'];
        $data['state'] = $request['state'];
        $data['modification_date'] = date('Y-m-d H:i:s');
        Order::find($id)->update($data);

        return response()->json($data, 200);
    }


    public function updateState(Request $request,$session_id){
        $data['state'] = $request['state'];
        $data['modification_date'] = date('Y-m-d H:i:s');
        Order::where('session_id', $session_id)->update($data);


        $order = Order::where('session_id', $session_id)->get();

        $newData = $this->getData($order)[0];
       
        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);   
    }


    public function delete($id){
        $res = Order::find($id)->delete();
        return response()->json($id, 200);
    }

    public function deleteBySessionStripe($session_id) {
        $data = Order::where('session_id', $session_id)->first();
        if ($data !== null) {
            $this->productOrderController->deleteByOrder($data->id);
            $data->delete();
        }
        
    }

    
    private function getData($data) {
        $newData = [];
        if (!empty($data)) {
            $newData = [];
            for ($i=0; $i < count($data); $i++) {             
                $newData[$i]['id'] = $data[$i]->id;
                $newData[$i]['user_id'] = $data[$i]->user_id;
                $newData[$i]['total_price'] = $data[$i]->total_price;
                $newData[$i]['address_id'] = $data[$i]->address_id;
                $newData[$i]['state'] = $data[$i]->state;
                $newData[$i]['creation_date'] = $data[$i]->creation_date;
                $newData[$i]['modification_date'] = $data[$i]->modification_date;
    
                $products = ProductOrder::where('order_id', $data[$i]->id)->get();
    
                for ($x=0; $x < count($products); $x++) { 
                    $newData[$i]['products'][$x] = $products[$x];
                }
    
                $address = Address::find($data[$i]->address_id);
    
                $newData[$i]['address'] = $address;
            }

            return $newData;
        }

        return $newData;
    }
}
