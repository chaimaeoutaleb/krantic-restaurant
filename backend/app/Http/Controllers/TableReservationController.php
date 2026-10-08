<?php

namespace App\Http\Controllers;

use App\Models\TableReservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TableReservationController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'phone' => 'required|string|max:20',
                'guests' => 'required|integer|min:1|max:20',
                'date' => 'required|date|after_or_equal:today',
                'time' => 'required|string',
                'special_requests' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $reservation = TableReservation::create($request->all());

            return response()->json([
                'message' => 'Table reservation request submitted successfully!',
                'data' => $reservation
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating reservation',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
