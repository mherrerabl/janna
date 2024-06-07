<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Price;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */


    public function definition(): array
    {

        return [
            'name' => $this->faker->sentence(1,6),
            'brand' => $this->faker->word(),
            'category_id' => rand(26, 48),
            'description' => $this->faker->realText(500),
            'routine' => rand(1, 10),
            'use' => $this->faker->realText(100),
            'benefits' => $this->faker->realText(),
            'saleperson_id' => rand(1,5),
            'stock' => rand(0,100),
            'price_id'=> function () {
                Price::factory(1)->create();
                return Price::orderBy('id', 'desc')->first()->id;
            },
            'purchasePrice' => function () {
                return Price::orderBy('id', 'desc')->first()->price * 0.8;
            },
            'trend' => $this->faker->boolean(),
            'forSale' => $this->faker->boolean(),
            'treatment_id' =>rand(1, 17),
            'creation_date' => $this->faker->unique()->dateTimeInInterval($startDate = '-20 days', $interval = '+ 5 days', $timezone = null) 
        ];
    }
}
