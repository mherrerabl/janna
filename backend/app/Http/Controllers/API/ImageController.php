<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


Use App\Models\Image;

Use Log;

class ImageController extends Controller {

    public function getAll(){
        $data = Image::get();
        $newData = $this->getData($data);

        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }

    
    public function get($id){
        $data = Image::where('id', $id)->get();
        $newData = $this->getData($data)[0];
  
        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }


    public function getByProduct($product_id){
        $data = Image::get()->where('product_id', $product_id)->get();
        $newData = $this->getData($data);
        
        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }


    public function getByTreatment($treatment_id){
        $data = Image::where('treatment_id', $treatment_id)->get();
        $newData = $this->getData($data);

        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }


    public function getByCategory($category_id){
        $data = Image::where('category_id', $category_id)->get();
        $newData = $this->getData($data)[0];    
            
        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }


    public function create(Request $request){
        $data['title'] = $request->title;
        $data['picture_jpg'] = $request->picture_jpg;
        $data['picture_webp'] = $request->picture_webp;
        $data['product_id'] = $request->product_id;
        $data['treatment_id'] = $request->treatment_id;
        $data['category_id'] = $request->category_id;
        Image::create($data);

        return response()->json($data, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }


    public function update(Request $request,$id){
        $data['title'] = $request->title;
        $data['picture_jpg'] = $request->picture_jpg;
        $data['picture_webp'] = $request->picture_webp;
        $data['product_id'] = $request->product_id;
        $data['treatment_id'] = $request->treatment_id;
        $data['category_id'] = $request->category_id;
        Image::find($id)->update($data);

        return response()->json($data, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }

    
    public function delete($id){
        $res = Image::find($id)->delete();
        return response()->json([
            'message' => "Successfully deleted",
            'success' => true
        ], 200);
    }

    private function getData($data) {
        if (!empty($data)) {
            for ($i=0; $i < count($data); $i++) { 
                $newData[$i] = $data[$i];
                $newData[$i]['picture_jpg'] = base64_encode($data[$i]->picture_jpg);
                $newData[$i]['picture_webp'] = base64_encode($data[$i]->picture_webp);            
            }
            
            return $newData;
        }
        return [];
    }
}