<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductOrder>
 */
class ProductOrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public static $counter = 0;

    public function definition(): array
    {
        $i = $this::$counter += 1;

        return [
            'name' => $this->faker->sentence(1,6),
            'price' => $this->faker->randomFloat(2, 5, 50),
            'quantity' => random_int(1,5),
            'state' => $this->faker->randomElement(['En preparación', 'Listo para envío', 'Pedido al proveedor']),
            'order_id' => (string)$i
        ];
    
    }
}
