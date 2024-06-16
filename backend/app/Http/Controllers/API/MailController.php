<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
Use Log;
use Mail;
use App\Mail\Contact;

class MailController extends Controller
{
   public function send(Request $request)  {
        $data = [
            'name' => $request['name'],
            'surname' => $request['surname'],
            'email' => $request['email'],
            'query' => $request['query']
        ];

        Mail::to([env('MAIL_FROM_ADDRESS'), $data['email']])->send(new Contact($data));

        return response()->json([
            'message' => "Successfully created",
            'success' => true
        ], 200);
   }
}
