<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

Use App\Models\Category;
Use App\Models\Image;
Use Log;

class CategoryController extends Controller {

    public function getAll(){
        $data = Category::get();
       
        return response()->json($data, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }


    public function getByDepartment($department){
        $data = Category::where('department', $department)->where('category_id', null)->get();
        $newData = $this->getData($data);
       
        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }


    public function getByCategoriesByUrl($url){
        $id = Category::where('url', $url)->first()->id;
        $data = Category::where('category_id', $id)->get();
        $newData = $this->getData($data);
       
        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }


    public function getCategoryByUrl($url){
        $data = Category::where('url', $url)->get();
        $newData = $this->getData($data)[0];

        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }


    public function getCategoryById($id){
        $data = Category::where('id', $id)->get();
        $newData = $this->getData($data)[0];

        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }


    public function getCategoryNamebyUrl($url) {
        $data = Category::where('url', $url)->first();
        $newData['name'] = $data->name;
        $newData['url'] = $data->url;

        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }


    public function create(Request $request){
        $data['name'] = $request->name;
        $data['department'] = $request->department;
        $data['url'] = $request->url;
        $data['category_id'] = $request->category_id;
       
        Category::create($data);
        return response()->json($data, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);

    }

    
    public function update(Request $request,$id){
        $data['name'] = $request->name;
        $data['department'] = $request->department;
        $data['url'] = $request->url;
        $data['category_id'] = $request->category_id;
        Category::find($id)->update($data);

        return response()->json($data, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }

    
    public function delete($id){
        $res = Category::find($id)->delete();
        return response()->json([
            'message' => "Successfully deleted",
            'success' => true
        ], 200);
    }


    private function getData($data) {
        $newData = [];
        if (!empty($data)) {
            for ($i=0; $i < count($data); $i++) {
                $img = Image::where('category_id', $data[$i]->id)->first();
                $idCat = Category::where('url', $data[$i]->url)->first()->id;
                $isParent = Category::where('category_id', $idCat)->get();
    
                $newData[$i] = $data[$i];
                $newData[$i]['isParent'] = count($isParent) > 0;
                $newData[$i]['image'] = Image::where('category_id', $data[$i]->id)->first();
                $newData[$i]['image']['picture_jpg'] = base64_encode($img->picture_jpg);
                $newData[$i]['image']['picture_webp'] = base64_encode($img->picture_webp);
    
           }
           return $newData;
        }
        return $newData;
    }
}