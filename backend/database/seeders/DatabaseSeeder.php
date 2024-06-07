<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Treatment;
use App\Models\Saleperson;
use App\Models\Product;
use App\Models\Image;
use App\Models\User;
use App\Models\Address;
use App\Models\Order;
use App\Models\Appointment;
use App\Models\ProductOrder;
use App\Models\ProductVariation;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        //Treatment::factory(17)->create();

        //Image::factory(17)->create();//Execute 3 times

        //User::factory(5)->create();

        //Address::factory(20)->create();
        //Appointment::factory(30)->create();
        //Saleperson::factory(5)->create();

        //Product::factory(20)->create();

        //Change ImageFactory
        //Image::factory(20)->create();//Execute 3 times

        //Order::factory(10)->create();

        //ProductOrder::factory(10)->create(); //Execute 3 times
    }
}

