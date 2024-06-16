<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

Use App\Models\Appointment;
Use App\Models\UserTreatment;
Use App\Models\Treatment;
Use App\Models\User;
Use App\Models\Person;
use DateTimeZone;
use DateTime;

Use Log;

class AppointmentController extends Controller {

    public function getAll(){
        $data = Appointment::get();
        $newData = $this->getData($data);
        
        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }


    public function get($id){
        $data = Appointment::where('id', $id)->get();

        $newData = $this->getData($data)[0];
      
      return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }


    public function getByUserId($userId) {
        $userTreatments = UserTreatment::where('user_id', $userId)->get();
        $newData = [];
        
        for ($i=0; $i < count($userTreatments); $i++) { 
            $appointments = Appointment::where('user_treatment_id', $userTreatments[$i]->id)->get();
            $data = $this->getData($appointments);
            $dataObj = array_shift($data);

            if ($dataObj !== null) {
                $newData[] = $dataObj;
            }
        }
        
        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }


    public function create(Request $request){
        $userTreatments = UserTreatment::where('user_id', $request->user_treatment['user_id'])->get();
        $userTreatment = [];
        $newData = [];
        $userTreatment = [];

        if (!empty($userTreatments)) {
            for ($i=0; $i < count($userTreatments); $i++) { 
                if ($userTreatments[$i]->treatment_id == $request->user_treatment['treatment_id']) {
                    if ($userTreatments[$i]->state !== 'Finalizado' && $userTreatments[$i]->state !== 'No realizado') {
                        $updateUserTreatment['sessions'] = $userTreatments[$i]['sessions'] + 1;
    
                        UserTreatment::find($userTreatments[$i]->id)->update($updateUserTreatment);

                        $userTreatment = UserTreatment::find($userTreatments[$i]->id);
                    }
                }
            }
        }
     
        if (empty($userTreatment)) {
            $userTreatment['user_id'] = $request->user_treatment['user_id'];
            $userTreatment['state'] =$request->user_treatment['state'];
            $userTreatment['sessions'] = 1;
            $userTreatment['treatment_id'] = $request->user_treatment['treatment_id'];

            UserTreatment::create($userTreatment);

            $userTreatment = UserTreatment::orderBy('id', 'desc')->first();
        }

          
        $date = new DateTime($request->date);
        $date->setTimeZone( new DateTimeZone('Europe/Madrid'));
        $newData['date'] = $date;
        $newData['state'] = $request->state;
        $newData['user_treatment_id'] = $userTreatment->id;

        Appointment::create($newData);

        $newData['user_treatment']['id'] = $userTreatment->id;
        $newData['user_treatment']['user_id'] = $userTreatment->user_id;
        $newData['user_treatment']['state'] = $userTreatment->state;
        $newData['user_treatment']['sessions'] = $userTreatment->sessions;
        $newData['user_treatment']['treatment_id'] = $userTreatment->treatment_id;

        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);

    }

    
    public function update(Request $request,$id){
        $userTreatments = UserTreatment::where('user_id', $request->user_treatment['user_id'])->get();
        $userTreatment = [];
        $newData = [];
        $userTreatment = [];

        if (!empty($userTreatments)) {
            for ($i=0; $i < count($userTreatments); $i++) { 
                if ($userTreatments[$i]->treatment_id == $request->user_treatment['treatment_id']) {
                    if ($userTreatments[$i]->state !== 'Finalizado' && $userTreatments[$i]->state !== 'No realizado') {
                        $updateUserTreatment['sessions'] = $userTreatments[$i]['sessions'] + 1;
    
                        UserTreatment::find($userTreatments[$i]->id)->update($updateUserTreatment);

                        $userTreatment = UserTreatment::find($userTreatments[$i]->id);
                    }
                }
            }
        }
     
        if (empty($userTreatment)) {
            $userTreatment['user_id'] = $request->user_treatment['user_id'];
            $userTreatment['state'] =$request->user_treatment['state'];
            $userTreatment['sessions'] = 1;
            $userTreatment['treatment_id'] = $request->user_treatment['treatment_id'];

            UserTreatment::create($userTreatment);

            $userTreatment = UserTreatment::orderBy('id', 'desc')->first();
        }

          
        $date = new DateTime($request->date);
        $date->setTimeZone( new DateTimeZone('Europe/Madrid'));
        $newData['date'] = $date;
        $newData['state'] = $request->state;
        $newData['user_treatment_id'] = $userTreatment->id;

        Appointment::find($id)->update($newData);

        $newData['user_treatment']['id'] = $userTreatment->id;
        $newData['user_treatment']['user_id'] = $userTreatment->user_id;
        $newData['user_treatment']['state'] = $userTreatment->state;
        $newData['user_treatment']['sessions'] = $userTreatment->sessions;
        $newData['user_treatment']['treatment_id'] = $userTreatment->treatment_id;

        return response()->json($newData, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);

    }

    
    public function delete($id){
        $res = Appointment::find($id)->delete();
        return response()->json($id, 200);
    }


    private function getData($data) {
        $newData = [];
        if (!empty($data)) {

            for ($i=0; $i < count($data); $i++) { 
                $newData[$i]['id'] = $data[$i]->id;
                $newData[$i]['date'] = $data[$i]->date;
                $newData[$i]['state'] = $data[$i]->state;
                $newData[$i]['user_treatment_id'] = $data[$i]->user_treatment_id;

                $userTreatment = UserTreatment::find($data[$i]->user_treatment_id);

                $newData[$i]['user_treatment'] = $userTreatment;

                $treatment = Treatment::find($userTreatment->treatment_id);
                $newData[$i]['treatment']['name'] = $treatment->name;
                $newData[$i]['treatment']['duration'] = $treatment->duration;
                $newData[$i]['treatment']['category_id'] = $treatment->category_id;

                $user = User::find($userTreatment->user_id);

                $newData[$i]['user']['id'] = $user->id;
                $newData[$i]['user']['name'] = $user->name;
                $newData[$i]['user']['surname'] = $user->surname;
            }
            return $newData;
        }
        return $newData;
    }
}
