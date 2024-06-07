<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => (string)2,
            'total_price' => $this->faker->randomFloat(2, 5, 50),
            'address_id' => (string)2,
            'state' => $this->faker->randomElement(['Pago realizado', 'En preparación', 'Pendiente de envío', 'Enviado', 'Pendiente de recoger en tienda', 'Entregado']),
            'session_id' => $this->faker->sha256();
            'creation_date' => $this->faker->dateTime('-2 weeks'),
            'modification_date' => $this->faker->dateTime(),
        ];
    }
}
