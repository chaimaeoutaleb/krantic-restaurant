<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactMessageController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'phone' => 'nullable|string|max:50',
                'guests' => 'nullable|string|max:10',
                'date' => 'nullable|date',
                'time' => 'nullable|string|max:20',
                'message' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $contact = ContactMessage::create($request->all());

            return response()->json([
                'message' => 'Message sent successfully!',
                'data' => $contact
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating message',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
