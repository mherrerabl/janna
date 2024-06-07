<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

Use App\Models\Saleperson;
Use App\Models\Product;
Use Log;

class SalepersonController extends Controller {

    public function getAll(){
        $data = Saleperson::get();
        return response()->json($data, 200);
    }

    public function get($id){
        $data = Saleperson::find($id);

        $newData['name'] = $data->name;
        $newData['surname'] = $data->surname;
        $newData['email'] = $data->email;
        $newData['phone'] = $data->phone;
        $newData['products'] = Product::where('saleperson_id', $data->id)->get();

        return response()->json($newData, 200);
    }

    public function create(Request $request){
        $data['name'] = $request->name;
        $data['surname'] = $request->surname;
        $data['email'] = $request->email;
        $data['phone'] = $request->phone;

        Saleperson::create($data);
        return response()->json([
            'message' => "Successfully created",
            'success' => true
        ], 200);
    }

    public function update(Request $request,$id){
        $data['name'] = $request->name;
        $data['surname'] = $request->surname;
        $data['email'] = $request->email;
        $data['phone'] = $request->phone;

        Saleperson::find($id)->update($data);
        return response()->json([
            'message' => "Successfully updated",
            'success' => true
        ], 200);
    }

    
    public function delete($id){
        $res = Saleperson::find($id)->delete();
        return response()->json([
            'message' => "Successfully deleted",
            'success' => true
        ], 200);
    }

}
