<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Price>
 */
class PriceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'price' => $this->faker->randomFloat(2, 5, 50),
            //'offer'=> $this->faker->randomElement(['3x2', '2n 50%', null]),
            //'discount' => $this->faker->numberBetween(0, 100)
        ];
    }
}
