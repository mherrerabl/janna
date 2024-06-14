<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
Use App\Models\User;
use Illuminate\Support\Str;

Use Log;

class UserController extends Controller {

    public function getAll(){
        $data = User::get();
        return response()->json($data, 200);
    }

    
    public function getById($id){
        $data = User::find($id);
        return response()->json($data, 200);
    }

    public function getByEmail($email){
        $user = User::where('email', $email)->first();
        
        $data = null;

        if (!empty($user)) {
            return $user;
        }
          
        return $data;
    }

    public function getLogin(Request $request){
        $user = $this->getByEmail($request->email);
        $data = null;

        if ($user !== null) {

            if (password_verify($request->password, $user->password)) {
                $data['id'] = $user->id;
                $data['name'] = $user->name;
                $data['surname'] = $user->surname;
                $data['email'] = $user->email;
                $data['phone'] = $user->phone;
                $data['type'] = $user->type;
                $data['token'] = $user->token;

                return response()->json($data, 200);
            }

            if ($request->token === $user->token) {
                $data['id'] = $user->id;
                $data['name'] = $user->name;
                $data['surname'] = $user->surname;
                $data['email'] = $user->email;
                $data['phone'] = $user->phone;
                $data['type'] = $user->type;
                $data['token'] = $user->token;

                return response()->json($data, 200);
            }

            $data = 'password';
            return response()->json($data, 200);
        }

        $data = 'email';

        return response()->json($data, 200);
    }

      
    public function create(Request $request){
        $user = $this->getByEmail($request->email);
        $data = null;

        if ($user === null) {
            $data['name'] = $request->name;
            $data['surname'] = $request->surname;
            $data['email'] = $request->email;
            $data['phone'] = $request->phone;
            $data['password'] = $request->password;
            $data['type'] = 'user';
            $data['token'] = Str::random(10);

            User::create($data);
            $user = User::orderBy('id', 'desc')->first();

            $data['id'] = $user->id;

            return response()->json($data, 200);
        }

        $data = 'email';
        return response()->json($data, 200);
    }

    public function delete($id){
        $res = User::find($id)->delete();
        return response()->json([
            'message' => "Successfully deleted",
            'success' => true
        ], 200);
    }

    public function update(Request $request,$id){
        $user = User::find($id);
        $data = [];

        $data['name'] = $request->name;
        $data['surname'] = $request->surname;
        $data['email'] = $request->email;
        $data['phone'] = $request->phone;
        $data['password'] = $request->password;
        $data['token'] = $user->token;

        if(empty($request->type)){
            $data['type'] = $user->type;
        } else {
            $data['type'] = $request->type;
        }
        

        User::find($id)->update($data);

        return response()->json($data, 200);
    }
}
