<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
Use App\Models\Appointment;
Use App\Models\UserTreatment;
Use App\Models\Treatment;
Use Log;

class UserTreatmentController extends Controller {

    public function getAll(){
        $data = UserTreatment::get();

        $newData = $this->getData($data);
        
        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }


    public function get($id){
        $data = UserTreatment::where('id',$id)->get();
  
        $newData = $this->getData($data)[0];
  
        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }


    public function getByUserId($userId) {
        $data = UserTreatment::where('user_id', $userId)->get();

        $newData = $this->getData($data);

        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }


    public function create(Request $request){
        $data['user_id'] = $request['user_id'];
        $data['state'] = $request['state'];
        $data['sessions'] = $request['sessions'];
        $data['treatment_id'] = $request['treatment_id'];
        UserTreatment::create($data);
        return response()->json([
            'message' => "Successfully created",
            'success' => true
        ], 200);
    }
    

    public function update(Request $request,$id){
        $data['user_id'] = $request['user_id'];
        $data['state'] = $request['state'];
        $data['sessions'] = $request['sessions'];
        $data['treatment_id'] = $request['treatment_id'];
        UserTreatment::find($id)->update($data);

        return response()->json($data, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);

    }


    public function delete($id){
        $res = UserTreatment::find($id)->delete();
        return response()->json($id, 200);
    }

    
    private function getData($data) {
        $newData = [];
        if (!empty($data)) {
            for ($i=0; $i < count($data); $i++) { 
                $newData[$i]['id'] = $data[$i]->id;
                $newData[$i]['user_id'] = $data[$i]->user_id;
                $newData[$i]['state'] = $data[$i]->state;
                $newData[$i]['sessions'] = $data[$i]->sessions;
                $newData[$i]['treatment_id'] = $data[$i]->treatment_id;
    
                $treatment = Treatment::find($data[$i]->treatment_id);
                $newData[$i]['name']  = $treatment->name;
    
                $appointments = Appointment::where('user_treatment_id', $data[$i]->id)->get();
    
                for ($x=0; $x < count($appointments); $x++) { 
                    $newData[$i]['appointments'][$x]['id'] = $appointments[$x]->id;
                    $newData[$i]['appointments'][$x]['date'] = $appointments[$x]->date;
                    $newData[$i]['appointments'][$x]['state'] = $appointments[$x]->state;
                }
            }
            
            return $newData;
        }
        return $newData;
    }
}
