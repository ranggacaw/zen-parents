<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PartnerPromotion extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'summary',
        'body',
        'cta_label',
        'cta_url',
        'status',
    ];
}
