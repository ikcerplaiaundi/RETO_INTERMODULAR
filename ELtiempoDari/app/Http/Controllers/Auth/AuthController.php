<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request) 
  {
        $request->validate([
        'email' => 'required|string|email',
        'password' => 'required|string',
        'remember_me' => 'boolean'
    ]);
    $credentials = request(['email', 'password']);
        if(!Auth::attempt($credentials))
        return response()->json([
        'message' => 'Unauthorized'
    ], 401);
    $user = $request->user();
    $tokenResult = $user->createToken('Personal Access Token');
    $token = $tokenResult->token;
    
    if ($request->remember_me)
    $token->expires_at = Carbon::now()->addWeeks(1);
    $token->save();
    
    return response()->json([
        'access_token' => $tokenResult,
        'token_type' => 'Bearer',
        'expires_at' => Carbon::parse(
        $tokenResult->token->expires_at
        )->toDateTimeString()
    ]);
}
  public function signUp(Request $request)
  {
    
    $request->validate([
    'name' => 'required|string',
    'email' => 'required|string|email|unique:users',
    'password' => 'required|string'
  ]);
  User::create ([
    'name' => $request->name,
    'email' => $request->email,
    'password' => bcrypt($request->password)
  ]);
  return response()->json([
    'message' => 'Successfully created user!'
  ], 201);
  }
public function logout(Request $request)
{
  $request->user()->token()->revoke();
  return response()->json([
   'message' => 'Successfully logged out'
  ]);
}
/**
* Get the authenticated User
*
* @return [json] user object
*/
  public function user(Request $request)
  {
    return response()->json($request->user());
  }
}