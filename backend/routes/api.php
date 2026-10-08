<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ContactMessageController;
use App\Http\Controllers\TableReservationController;

Route::get('/menu', [ProductsController::class, 'index']);
Route::get('/menu/{id}', [ProductsController::class, 'show']);

// Order routes
Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders', [OrderController::class, 'index']);
Route::get('/orders/{order}', [OrderController::class, 'show']);
Route::patch('/orders/{order}/payment', [OrderController::class, 'updatePaymentStatus']);

Route::middleware('web')->group(function () {
    Route::post('/contact', [ContactMessageController::class, 'store']);
    Route::post('/reservations', [TableReservationController::class, 'store']);
});
