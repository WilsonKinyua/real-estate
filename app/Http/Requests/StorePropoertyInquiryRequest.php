<?php

namespace App\Http\Requests;

use App\Models\PropoertyInquiry;
use Gate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;

class StorePropoertyInquiryRequest extends FormRequest
{
    public function authorize()
    {
        return Gate::allows('propoerty_inquiry_create');
    }

    public function rules()
    {
        return [
            'property_id' => [
                'required',
                'integer',
            ],
            'full_name' => [
                'string',
                'required',
            ],
            'phone_number' => [
                'required',
                'string',
                // 'min:-2147483648',
                // 'max:2147483647',
            ],
            'message' => [
                'required',
            ],
        ];
    }
}
