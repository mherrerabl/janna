<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

Use App\Models\Treatment;
Use App\Models\Price;
Use App\Models\Category;
Use App\Models\Image;
Use Log;

class TreatmentController extends Controller {

    public function getAll(){
        $data = Treatment::get();
        $newData = $this->getData($data);


        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }

    public function getTreatmentById($id) {
        $data = Treatment::where('id', $id)->get();
        $newData = $this->getData($data)[0];
             
        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }

    public function getTratmentByUrl($url) {
        $name = Category::where('url', $url)->get()->first()->name;
        $data = Treatment::where('name', $name)->get();
        $newData = $this->getData($data)[0];       
       
        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }

    public function getTratmentByCategoryId($categoryId) {
        $data = Treatment::where('category_id', $categoryId)->get();
        $newData = [];
        if (count($data) > 0) {
            $newData = $this->getData($data)[0];
        }
       

        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }

    public function create(Request $request){
        $data['name'] = $request->name;
        $data['description'] = $request->description;
        $data['sessions'] = $request->sessions;
        $data['duration'] = $request->duration;
        $data['price_id'] = $request->price_id;
        $data['category_id'] = $request->category_id;
        Treatment::create($data);
        return response()->json([
            'message' => "Successfully created",
            'success' => true
        ], 200);
    }
    

    public function update(Request $request,$id){
        $data['name'] = $request->name;
        $data['description'] = $request->description;
        $data['sessions'] = $request->sessions;
        $data['duration'] = $request->duration;
        $data['price_id'] = $request->price_id;
        $data['category_id'] = $request->category_id;
        Treatment::find($id)->update($data);
        return response()->json([
            'message' => "Successfully updated",
            'success' => true
        ], 200);
    }


    public function delete($id){
        $res = Treatment::find($id)->delete();
        return response()->json([
            'message' => "Successfully deleted",
            'success' => true
        ], 200);
    }

    
    private function getData($data) {
        $newData = [];
        if (!empty($data)) {
            for ($i=0; $i < count($data); $i++) { 
                $img = Image::where('treatment_id', $data[$i]->id)->get();

                $newData[$i]['id'] = $data[$i]->id;
                $newData[$i]['name'] = $data[$i]->name;
                $newData[$i]['description'] = $data[$i]->description;
                $newData[$i]['sessions'] = $data[$i]->sessions;
                $newData[$i]['duration'] = $data[$i]->duration;
                $newData[$i]['price_id'] = $data[$i]->price_id;
                $newData[$i]['category_id'] = $data[$i]->category_id;
                $newData[$i]['price'] = Price::where('id', $data[$i]->price_id)->get()[0];
            
                for ($x=0; $x < count($img); $x++) {
                    $newData[$i]['images'][$x]['id'] = $img[$x]->id;
                    $newData[$i]['images'][$x]['title'] = $img[$x]->title;
                    $newData[$i]['images'][$x]['picture_jpg'] = base64_encode($img[$x]->picture_jpg);
                    $newData[$i]['images'][$x]['picture_webp'] = base64_encode($img[$x]->picture_webp);
                    $newData[$i]['images'][$x]['product_id'] = $img[$x]->product_id;
                    $newData[$i]['images'][$x]['treatment_id'] = $img[$x]->treatment_id;
                    $newData[$i]['images'][$x]['category_id'] = $img[$x]->category_id;    
                }     
            }
            return $newData;
        }

        return newData;
    }
}
