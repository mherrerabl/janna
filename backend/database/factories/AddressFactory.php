<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Address>
 */
class AddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'address' => $this->faker->streetName(),
            'number' => $this->faker->buildingNumber(),
            'additionalInfo' => $this->faker->realText(100),
            'zip' => $this->faker->postcode(),
            'city' => $this->faker->city(),
            'predetermined' => $this->faker->boolean(false),
            'user_id' => rand(2,7),
        ];
    }
}
