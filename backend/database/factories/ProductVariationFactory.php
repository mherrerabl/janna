<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Price;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductVariation>
 */
class ProductVariationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public static $counter = 25;

    public function definition(): array
    {
        $i = $this::$counter += 1;

        $faker = \Faker\Factory::create();

        return [
            'name' => $this->faker->sentence(1,6),
            'stock' => rand(0,100),
            'price_id'=> function () {
                Price::factory(1)->create();
                return Price::orderBy('id', 'desc')->first()->id;
            },
            'purchasePrice' => function () {
                return Price::orderBy('id', 'desc')->first()->price * 0.8;
            },

            'color' => $faker->hexColor(),
            //'color' => null,
            //'product_id' => (string)$i,
            'product_id' => null,
            'product_variation_id' => (string)$i,
            //'product_variation_id' => null,
            'creation_date' => $this->faker->unique()->dateTimeInInterval($startDate = '-15 days', $interval = '+ 5 days', $timezone = null) 
        ];
    }
}