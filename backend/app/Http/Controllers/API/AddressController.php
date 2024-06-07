<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

Use App\Models\Address;
Use Log;

class AddressController extends Controller {

    public function getAll(){
        $data = Address::get();
        return response()->json($data, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }


    public function get($id){
        $data = Address::find($id);
        return response()->json($data, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }


    public function getByIdUser($idUser) {
        $addresses = Address::where('user_id', $idUser)->get();      
        $data = [];

        for ($i=0; $i < count($addresses); $i++) { 
            $data[$i] = $addresses[$i];
            $data[$i]['predetermined'] = $addresses[$i]->predetermined == 0 ? false : true;
        }
        return response()->json($data, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }

    
    public function create(Request $request){
        if ($request->predetermined == true) {
            $addresses = Address::where('user_id', $request->user_id)->get();

            for ($i=0; $i < count($addresses); $i++) { 
                $changeData[$i]['predetermined'] = false;

                Address::find($addresses[$i]->id)->update($changeData[$i]);
            }
        }

        $data['name'] = $request->name;
        $data['address'] = $request->address;
        $data['number'] = $request->number;
        $data['additionalInfo'] = $request->additionalInfo;
        $data['zip'] = $request->zip;
        $data['city'] = $request->city;
        $data['predetermined'] = $request->predetermined;
        $data['user_id'] = $request->user_id;
        
        Address::create($data);
       
        return response()->json($data, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }


    public function update(Request $request,$id){
        $data['id'] = $id;
        $data['name'] = $request->name;
        $data['address'] = $request->address;
        $data['number'] = $request->number;
        $data['additionalInfo'] = $request->additionalInfo;
        $data['zip'] = $request->zip;
        $data['city'] = $request->city;
        $data['predetermined'] = $request->predetermined;
        $data['user_id'] = $request->user_id;

        if ($request->predetermined === false) {            
            $addressesUser = $this->getByIdUser($request->user_id)->original;

            for ($i=0; $i < count($addressesUser); $i++) { 
            $addressesUser[$i]->predetermined = false;
            }
        }
        Address::find($id)->update($data);

        return response()->json($data, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }


    public function delete($id){
        $res = Address::find($id)->delete();
        return response()->json($id, 200);

    }
}