<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
Use App\Models\Order;

class CheckoutController extends Controller
{
    protected $orderController;
    public function __construct(OrderController $orderController)
    {
        $this->orderController = $orderController;
    }

    public function makePayment(Request $request) {
        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET_KEY'));
        header('Content-Type: application/json');
    
        $frontend_url = env('FRONTEND_URL');

        $data = [];
        $totalPrice = 0;
        $data['products'] = [];
        $products = [];

        for ($i=0; $i < count($request['cart']); $i++) { 
            $basePrice = $request['cart'][$i]['price']['price'];
            $discount = $request['cart'][$i]['price']['discount'];
            $offer = $request['cart'][$i]['price']['offer'];

            $price = $basePrice;

            if ($discount !== null) {
                $price = $price * ($discount/100);
            }


            if($offer == '2n 50%' && $request['cart'][$i]['quantity'] > 2) {
                if(($request['cart'][$i]['quantity'] % 2) == 0) {
                    $price = $price * 0.75;
                } else {
                    $price = $price * 0.83333;
                }
            } else if ($offer == '3x2' && $request['cart'][$i]['quantity'] > 3) {
                if(($request['cart'][$i]['quantity'] % 3) == 0) {
                    $price = $price * 0.66666;
                } else if(($request['cart'][$i]['quantity'] % 3) == 1) {
                    $price = $price * 0.75;
                } else if(($request['cart'][$i]['quantity'] % 3) == 2) {
                    $price = $price * 0.80;
                }

            }

            $products[$i] = [
                'price_data' => [
                    'product_data' => [
                        'name' => $request['cart'][$i]['name'],
                    ],
                    'currency' => 'eur',
                    'unit_amount' => $price * 100,

                ],
                'quantity' => $request['cart'][$i]['quantity']
            ];

            $totalPrice = $totalPrice + $price * $request['cart'][$i]['quantity'];
            $data['products'][$i]['id'] = $request['cart'][$i]['id'];
            $data['products'][$i]['name'] = $request['cart'][$i]['name'];
            $data['products'][$i]['price'] = $price;
            $data['products'][$i]['quantity'] = $request['cart'][$i]['quantity'];
        }
       
        $shipping_options = [];

        if ($totalPrice < 50 && $request['address_id'] !== null) {
            $shipping_options = [
                'shipping_rate_data' => [
                    'type' => 'fixed_amount',
                    'fixed_amount' => [
                    'amount' => 4.95 * 100,
                    'currency' => 'eur',
                    ],
                    'display_name' => 'Envío',
                    'delivery_estimate' => [
                    'minimum' => [
                        'unit' => 'business_day',
                        'value' => 2,
                    ],
                    'maximum' => [
                        'unit' => 'business_day',
                        'value' => 5,
                    ],
                    ],
                ],
            ];
        } else if ($totalPrice > 50 && $request['address_id'] !== null)  {
            $shipping_options = [
                'shipping_rate_data' => [
                    'type' => 'fixed_amount',
                    'fixed_amount' => [
                        'amount' => 0,
                        'currency' => 'eur',    
                    ],
                    'display_name' => 'Envío gratuito',
                    'delivery_estimate' => [
                        'minimum' => [
                            'unit' => 'business_day',
                            'value' => 2,
                        ],
                        'maximum' => [
                            'unit' => 'business_day',
                            'value' => 5,
                        ],
                    ],
                ],
            ];
        }

        try {

            if (!empty($request['session_stripe'])){
                $checkout_session = $stripe->checkout->sessions->retrieve(
                    $request['session_stripe'],
                    []
                );

                if ($checkout_session->status == 'open') {
                    $stripe->checkout->sessions->expire(
                        $request['session_stripe'],
                        []
                      ); 
                }
                
                $this->orderController->deleteBySessionStripe($request['session_stripe']);
            } 

            $checkout_session = $stripe->checkout->sessions->create([
                'shipping_options' => [$shipping_options],
                'ui_mode' => 'embedded',
                'line_items' => [
                    $products
                ],
                'mode' => 'payment',
                'return_url' => $frontend_url . '/checkout/success/{CHECKOUT_SESSION_ID}',
            ]);

            $data['user_id'] = $request['user_id'];
            $data['total_price'] = $totalPrice;
            $data['address_id'] = $request['address_id'];
            $data['state'] = 'Pendiente de pago';
            $data['session_id'] = $checkout_session->id;

            $this->orderController->create($data);
            
            return json_encode(array('clientSecret' => $checkout_session->client_secret,'session_id' =>  $checkout_session->id));


        } catch(Exception $e){
            
            return ['success'=>0,'message'=>"Error Processing Transaction",'data'=>[]];
            
            return json_encode(array('clientSecret' => $checkout_session->client_secret));

        }
    }
}

