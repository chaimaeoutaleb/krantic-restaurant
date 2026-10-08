<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'city' => 'required|string|max:255',
            'postal_code' => 'required|string|max:20',
            'notes' => 'nullable|string',
            'payment_method' => 'required|in:cod,paypal',
            'items' => 'required|array',
            'items.*.id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'total_amount' => 'required|numeric|min:0'
        ]);

        try {
            DB::beginTransaction();

            $order = Order::create([
                'full_name' => $request->full_name,
                'email' => $request->email,
                'phone' => $request->phone,
                'address' => $request->address,
                'city' => $request->city,
                'postal_code' => $request->postal_code,
                'notes' => $request->notes,
                'payment_method' => $request->payment_method,
                'total_amount' => $request->total_amount,
                'status' => 'pending',
            ]);

            foreach ($request->items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['id'],
                    'product_name' => $item['name'],
                    'price' => $item['price'],
                    'quantity' => $item['quantity'],
                    'subtotal' => $item['price'] * $item['quantity'],
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Order created successfully',
                'order' => $order->load('items')
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error creating order',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function index()
    {
        $orders = Order::with('items')->latest()->get();
        return response()->json($orders);
    }

    public function show(Order $order)
    {
        return response()->json($order->load('items'));
    }

    public function updatePaymentStatus(Request $request, Order $order)
    {
        $request->validate([
            'payment_id' => 'required|string',
            'status' => 'required|in:completed,cancelled'
        ]);

        $order->update([
            'payment_id' => $request->payment_id,
            'status' => $request->status
        ]);

        return response()->json([
            'message' => 'Order payment status updated successfully',
            'order' => $order
        ]);
    }
}
